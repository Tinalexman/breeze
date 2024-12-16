package controller

import "breeze/core/util"

type CreateControllerPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

func GetControllerByID(id string) (Controller, bool) {
	for _, c := range AllControllers {
		if c.ID == id {
			return c, true
		}
	}
	return Controller{}, false
}

func CreateNewController(payload CreateControllerPayload) {
	c := Controller{
		Name:        payload.Name,
		ModelID:     payload.ModelID,
		Description: payload.Description,
		ID:          util.GetHash(payload.Name),
	}

	AllControllers = append(AllControllers, c)
}

func DeleteControllerByID(id string) {
	for i, c := range AllControllers {
		if c.ID == id {
			AllControllers = append(AllControllers[:i], AllControllers[i+1:]...)
			return
		}
	}
}
