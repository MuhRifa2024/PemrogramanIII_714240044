package handler

import (
	"be_latihan/config/middleware"
	"be_latihan/model"
	"be_latihan/pkg/password"
	"be_latihan/repository"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// Register godoc
// @Summary Register user baru
// @Description Membuat akun user baru. Role dapat diisi admin atau user. Jika role kosong, backend akan memakai default admin.
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body model.AuthRequest true "Payload register user"
// @Success 201 {object} model.Response201
// @Failure 400 {object} model.Response
// @Failure 409 {object} model.Response
// @Failure 500 {object} model.Response
// @Router /register [post]
func Register(c *fiber.Ctx) error {
	var payload model.AuthRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	payload.Username = strings.TrimSpace(payload.Username)
	payload.Role = strings.TrimSpace(payload.Role)
	if payload.Role == "" {
		payload.Role = "admin"
	}

	if payload.Username == "" || payload.Password == "" {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "username dan password wajib diisi",
		})
	}

	hashedPassword, err := password.HashPassword(payload.Password)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal membuat hash password",
			Error:   err.Error(),
		})
	}

	user := model.User{
		Username: payload.Username,
		Password: hashedPassword,
		Role:     payload.Role,
	}

	data, err := repository.InsertUser(&user)
	if err != nil {
		return c.Status(fiber.StatusConflict).JSON(model.Response{
			Message: "username sudah digunakan atau data tidak valid",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.Response{
		Message: "register berhasil",
		Data: model.AuthUserResponse{
			ID:       data.ID,
			Username: data.Username,
			Role:     data.Role,
		},
	})
}

// Login godoc
// @Summary Login user
// @Description Melakukan login dan mengembalikan JWT jika username dan password valid.
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body model.AuthRequest true "Payload login user"
// @Success 200 {object} model.Response200
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 500 {object} model.Response
// @Router /login [post]
func Login(c *fiber.Ctx) error {
	var payload model.AuthRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	user, err := repository.FindUserByUsername(strings.TrimSpace(payload.Username))
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusUnauthorized).JSON(model.Response{
				Message: "username atau password salah",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mencari user",
			Error:   err.Error(),
		})
	}

	if !password.CheckPasswordHash(payload.Password, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(model.Response{
			Message: "username atau password salah",
		})
	}

	token, err := middleware.GenerateJWT(user, 2*time.Hour)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal membuat token",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "login berhasil",
		Data: model.LoginResponse{
			Token: token,
			User: model.AuthUserResponse{
				ID:       user.ID,
				Username: user.Username,
				Role:     user.Role,
			},
		},
	})
}

// ChangePassword godoc
// @Summary Mengubah password user
// @Description Endpoint untuk mengubah password user yang sedang login. Memerlukan input berupa password lama, password baru, dan konfirmasi.
// @Tags Auth
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body model.ChangePasswordRequest true "Payload untuk ubah password"
// @Success 200 {object} model.Response200
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 404 {object} model.Response
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/change-password [put]
func ChangePassword(c *fiber.Ctx) error {
	var payload model.ChangePasswordRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "Payload tidak valid",
		})
	}

	// Validasi konfirmasi password
	if payload.NewPassword != payload.ConfirmPassword {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "Password baru dan konfirmasi password tidak cocok",
		})
	}

	// Ambil informasi user yang sedang login dari JWT token
	username := c.Locals("username").(string)

	// Cari user di database berdasarkan username
	user, err := repository.FindUserByUsername(username)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(model.Response{
			Message: "User tidak ditemukan",
		})
	}

	// Cek apakah password lama (OldPassword) benar
	if !password.CheckPasswordHash(payload.OldPassword, user.Password) {
		return c.Status(fiber.StatusUnauthorized).JSON(model.Response{
			Message: "Password lama salah",
		})
	}

	// Hash password baru
	hashedPassword, err := password.HashPassword(payload.NewPassword)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "Gagal memproses password baru",
		})
	}

	// Simpan password baru ke database
	if err := repository.UpdatePassword(user.Username, hashedPassword); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "Gagal menyimpan password",
		})
	}

	return c.JSON(model.Response{
		Message: "Password berhasil diubah",
	})
}
