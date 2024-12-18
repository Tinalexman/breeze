package controller

import (
	"breeze/core/model"
	"breeze/core/network"
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateControllerPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

type UpdateControllerPayload struct {
	ID          string            `json:"id"`
	Name        string            `json:"name"`
	Description string            `json:"description"`
	ModelID     string            `json:"modelID"`
	Handlers    []network.Handler `json:"handlers"`
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
		Description: util.Ternary(payload.Description, "No Description Provided", len(payload.Description) > 0).(string),
		ID:          util.GetHash(payload.Name),
		Handlers:    make([]network.Handler, 0),
	}

	AllControllers = append(AllControllers, c)
	return nil
}

func UpdateController(data UpdateControllerPayload) error {
	_, err := model.GetModelByID(data.ModelID)
	if err != nil {
		return err
	}

	for i, m := range AllControllers {
		if m.ID == data.ID {
			AllControllers[i] = Controller{
				Name:        data.Name,
				ID:          data.ID,
				Description: data.Description,
				Handlers:    data.Handlers,
			}
			return nil
		}
	}

	return fmt.Errorf("Controller with ID '%s' does not exist", data.ID)
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
