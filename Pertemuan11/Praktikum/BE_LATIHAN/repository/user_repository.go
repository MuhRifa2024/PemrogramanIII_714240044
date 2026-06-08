package repository

import (
	"be_latihan/config"
	"be_latihan/model"
)

func FindUserByUsername(username string) (model.User, error) {
	var user model.User
	result := config.GetDB().First(&user, "username = ?", username)
	return user, result.Error
}

func InsertUser(user *model.User) (*model.User, error) {
	result := config.GetDB().Create(user)
	return user, result.Error
}