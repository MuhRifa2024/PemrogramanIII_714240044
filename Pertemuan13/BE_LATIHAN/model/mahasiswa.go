package model

import "github.com/lib/pq"

type Mahasiswa struct {
	NPM    int64          `json:"npm"    gorm:"column:npm;primaryKey;type:bigint;not null" example:"2300012345"`
	Nama   string         `json:"nama"   gorm:"column:nama;type:varchar(100);not null" example:"Budi Santoso"`
	Prodi  string         `json:"prodi"  gorm:"column:prodi;type:varchar(100);not null" example:"Teknik Informatika"`
	Alamat string         `json:"alamat" gorm:"column:alamat;type:varchar(200)" example:"Bandung"`
	Email  string         `json:"email"  gorm:"column:email;type:varchar(100)" example:"budi@example.com"`
	Hobi   pq.StringArray `json:"hobi"   gorm:"column:hobi;type:text[]" swaggertype:"array,string" example:"coding,membaca"`
}

func (Mahasiswa) TableName() string { return "mahasiswa" }
