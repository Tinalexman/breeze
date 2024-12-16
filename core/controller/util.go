package controller

import (
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateControllerPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

func GetAllControllers(search string) []Controller {
	if search == "" {
		return AllControllers
	}

	searchedControllers := make([]Controller, 0)
	for _, m := range AllControllers {
		if strings.Contains(util.PrepareFieldForSearch(m.Name), util.PrepareFieldForSearch(search)) {
			searchedControllers = append(searchedControllers, m)
		}
	}
	return searchedControllers
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
