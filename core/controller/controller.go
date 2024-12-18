package controller

type Controller struct {
	Name        string   `json:"name"`
	Description string   `json:"description"`
	ID          string   `json:"id"`
	ModelID     string   `json:"modelID"`
	Methods     []string `json:"methods"`
}

var AllControllers []Controller = make([]Controller, 0)
