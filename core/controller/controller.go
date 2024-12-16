package controller

import (
	"breeze/core/util"
)

type Controller struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ID          string `json:"id"`
	ModelID     string `json:"model"`
}

var AllControllers []Controller = make([]Controller, 0)

func GetControllerByID(id string) (Controller, bool) {
	for _, c := range AllControllers {
		if c.ID == id {
			return c, true
		}
	}
	return Controller{}, false
}

func CreateNewController(name, description, modelID string) {

	c := Controller{
		Name:        name,
		ModelID:     modelID,
		Description: description,
		ID:          util.GetHash(name),
	}

	AllControllers = append(AllControllers, c)
}
