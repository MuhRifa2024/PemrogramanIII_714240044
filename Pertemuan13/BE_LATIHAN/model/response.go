package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}

// Struct khusus untuk Response 200 OK
type Response200 struct {
	Message string      `json:"message" example:"Berhasil memproses permintaan"`
	Data    interface{} `json:"data,omitempty"`
}

// Struct khusus untuk Response 201 Created
type Response201 struct {
	Message string      `json:"message" example:"Data berhasil dibuat"`
	Data    interface{} `json:"data,omitempty"`
}

// Struct khusus untuk Response 401 Unauthorized
type Response401 struct {
	Message string `json:"message" example:"Unauthorized - Token JWT tidak valid atau tidak ditemukan"`
}

// Struct khusus untuk Response 403 Forbidden
type Response403 struct {
	Message string `json:"message" example:"Forbidden - Anda tidak memiliki akses ke resource ini (Role bukan admin)"`
}
