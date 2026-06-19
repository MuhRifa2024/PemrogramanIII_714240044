package router

import (
	"be_latihan/config/middleware"
	"be_latihan/handler"
	"be_latihan/model"

	"github.com/gofiber/fiber/v2"
	swagger "github.com/gofiber/swagger"
)

func SetupRouter(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(model.Response{
			Message: "API be_latihan aktif",
		})
	})

	app.Get("/docs/*", swagger.HandlerDefault)

	app.Post("/register", handler.Register)
	app.Post("/login", handler.Login)

	mahasiswa := app.Group("/api/mahasiswa", middleware.JWTProtected("admin"))
	mahasiswa.Get("/", handler.GetAllMahasiswa)
	mahasiswa.Get("/:npm", handler.GetMahasiswaByNPM)
	mahasiswa.Post("/", handler.InsertMahasiswa)
	mahasiswa.Put("/:npm", handler.UpdateMahasiswa)
	mahasiswa.Put("/change-password", middleware.JWTProtected(""), handler.ChangePassword)
	mahasiswa.Delete("/:npm", handler.DeleteMahasiswa)
}