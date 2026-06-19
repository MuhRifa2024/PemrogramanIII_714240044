package password

import "golang.org/x/crypto/bcrypt"

func HashPassword(plainPassword string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(plainPassword), 12)
	return string(hashedPassword), err
}

func CheckPasswordHash(plainPassword, hashedPassword string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(plainPassword))
	return err == nil
}