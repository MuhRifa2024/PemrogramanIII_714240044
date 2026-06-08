package model

type Response struct {
	Message string `json:"message"`
	Data interface{} `json:"data,omitempty"`
	Error string `json:"error,omitempty"`
}