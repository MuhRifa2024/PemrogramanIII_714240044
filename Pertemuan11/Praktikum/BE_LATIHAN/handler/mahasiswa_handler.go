package handler

import (
	"be_latihan/model"
	"be_latihan/repository"
	"strconv"
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

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