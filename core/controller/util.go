package controller

import (
	"breeze/core/util"
	"fmt"
)

type CreateControllerPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

func GetControllerByID(id string) (Controller, error) {
	for _, c := range AllControllers {
		if c.ID == id {
			return c, nil
		}
	}

	return Controller{}, fmt.Errorf("Controller with ID '%s' does not exists", id)
}

func CreateNewController(payload CreateControllerPayload) error {
	for _, c := range AllControllers {
		if c.Name == payload.Name {
			return fmt.Errorf("Controller '%s' already exists", payload.Name)
		}
	}

	c := Controller{
		Name:        payload.Name,
		ModelID:     payload.ModelID,
		Description: payload.Description,
		ID:          util.GetHash(payload.Name),
	}

	AllControllers = append(AllControllers, c)
	return nil
}

func DeleteControllerByID(id string) error {
	for i, c := range AllControllers {
		if c.ID == id {
			AllControllers = append(AllControllers[:i], AllControllers[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Controller with ID '%s' does not exists", id)
}
