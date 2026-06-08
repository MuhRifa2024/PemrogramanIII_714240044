package model

import "github.com/lib/pq"

type Mahasiswa struct {
	NPM    int64          `json:"npm"    gorm:"column:npm;primaryKey;type:bigint;not null"`
	Nama   string         `json:"nama"   gorm:"column:nama;type:varchar(100);not null"`
	Prodi  string         `json:"prodi"  gorm:"column:prodi;type:varchar(100);not null"`
	Alamat string         `json:"alamat" gorm:"column:alamat;type:varchar(200)"`
	Email  string         `json:"email"  gorm:"column:email;type:varchar(100)"`
	NoHP   int64          `json:"nohp" gorm:"column:nohp;type:bigint"`
	Hobi   pq.StringArray `json:"hobi"   gorm:"column:hobi;type:text[]"`
}

func (Mahasiswa) TableName() string { return "mahasiswa" }
