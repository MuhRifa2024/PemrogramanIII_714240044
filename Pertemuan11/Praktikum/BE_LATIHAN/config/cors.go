package config

var allowedOrigins = []string{
	"http://localhost:5173",
}

func GetAllowedOrigins() []string {
	return allowedOrigins
}