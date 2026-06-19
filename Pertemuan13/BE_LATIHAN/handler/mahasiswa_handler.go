package handler

import (
	"be_latihan/model"
	"be_latihan/repository"
	"strconv"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

// GetAllMahasiswa godoc
// @Summary Ambil semua data mahasiswa
// @Description Mengambil seluruh data mahasiswa. Endpoint ini membutuhkan token JWT, tetapi tidak membatasi role admin.
// @Tags Mahasiswa
// @Security BearerAuth
// @Accept json
// @Produce json
// @Success 200 {object} model.Response200
// @Failure 401 {object} model.Response401
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/ [get]
func GetAllMahasiswa (c *fiber.Ctx) error {
	data, err := repository.GetAllMahasiswa()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengambil data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.Status(201).JSON(model.Response{
		Message: "berhasil mengambil data mahasiswa",
		Data:    data,
	})
}

// GetMahasiswaByNPM godoc
// @Summary Ambil data mahasiswa berdasarkan NPM
// @Description Mengambil satu data mahasiswa berdasarkan NPM. Endpoint ini hanya dapat diakses oleh role admin.
// @Tags Mahasiswa
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param npm path int true "NPM mahasiswa"
// @Success 200 {object} model.Response200
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 403 {object} model.Response403
// @Failure 404 {object} model.Response
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/{npm} [get]
func GetMahasiswaByNPM(c *fiber.Ctx) error {
	// npmQuery := c.Query("npm")
	// if npmQuery == "" {
	// 	return c.Status(fiber.StatusBadRequest).JSON(model.Response{
	// 		Message: "npm query parameter is required",
	// 	})
	// }

	npm, err :=  strconv.ParseInt(c.Params("npm"), 10, 64)
	
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "npm tidak valid",
			Error: err.Error(),
		})
	}

	mhs, err := repository.GetMahasiswaByNPM(npm)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "data mahasiswa dengan npm tersebut tidak ditemukan",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
		Message: "gagal mengambil data mahasiswa",
		Error: err.Error(),
		})

	}

	return c.JSON(model.Response{
		Message: "Data ditemukan",
		Data: mhs,
	})
}

// InsertMahasiswa godoc
// @Summary Tambah data mahasiswa
// @Description Menambahkan data mahasiswa baru. Endpoint ini hanya dapat diakses oleh role admin.
// @Tags Mahasiswa
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body model.Mahasiswa true "Payload data mahasiswa"
// @Success 201 {object} model.Response201
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 403 {object} model.Response403
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/ [post]
func InsertMahasiswa(c *fiber.Ctx) error {
	var payload model.Mahasiswa
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	data, err := repository.InsertMahasiswa(&payload)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal menambahkan data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.Status(fiber.StatusCreated).JSON(model.Response{
		Message: "berhasil menambahkan data mahasiswa",
		Data:    data,
	})
}

// UpdateMahasiswa godoc
// @Summary Ubah data mahasiswa
// @Description Mengubah data mahasiswa berdasarkan NPM. NPM pada body akan dipaksa mengikuti NPM pada URL.
// @Tags Mahasiswa
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param npm path int true "NPM mahasiswa"
// @Param request body model.Mahasiswa true "Payload data mahasiswa"
// @Success 200 {object} model.Response200
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 403 {object} model.Response403
// @Failure 404 {object} model.Response
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/{npm} [put]
func UpdateMahasiswa(c *fiber.Ctx) error {
	npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "npm tidak valid",
			Error:   err.Error(),
		})
	}

	var payload model.Mahasiswa
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "payload tidak valid",
			Error:   err.Error(),
		})
	}

	data, err := repository.UpdateMahasiswa(npm, &payload)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return c.Status(fiber.StatusNotFound).JSON(model.Response{
				Message: "data mahasiswa tidak ditemukan",
			})
		}

		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal mengubah data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "berhasil mengubah data mahasiswa",
		Data:    data,
	})
}

// DeleteMahasiswa godoc
// @Summary Hapus data mahasiswa
// @Description Menghapus data mahasiswa berdasarkan NPM. Endpoint ini hanya dapat diakses oleh role admin.
// @Tags Mahasiswa
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param npm path int true "NPM mahasiswa"
// @Success 200 {object} model.Response200
// @Failure 400 {object} model.Response
// @Failure 401 {object} model.Response401
// @Failure 403 {object} model.Response403
// @Failure 500 {object} model.Response
// @Router /api/mahasiswa/{npm} [delete]
func DeleteMahasiswa(c *fiber.Ctx) error {
	npm, err := strconv.ParseInt(c.Params("npm"), 10, 64)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(model.Response{
			Message: "npm tidak valid",
			Error:   err.Error(),
		})
	}

	if err := repository.DeleteMahasiswa(npm); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(model.Response{
			Message: "gagal menghapus data mahasiswa",
			Error:   err.Error(),
		})
	}

	return c.JSON(model.Response{
		Message: "berhasil menghapus data mahasiswa",
	})
}