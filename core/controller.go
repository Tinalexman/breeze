package core

import (
	"breeze/core/controller"
	// "breeze/core/util"
)

// CONTROLLERS
func (a *App) GetAllControllers(search string) []controller.Controller {
	return controller.GetAllControllers(search)
}

func (a *App) GetControllerByID(id string) (controller.Controller, error) {
	c, err := controller.GetControllerByID(id)
	if err != nil {
		return controller.Controller{}, err
	}
	return c, nil
}

func (a *App) CreateController(payload controller.CreateControllerPayload) error {
	err := controller.CreateNewController(payload)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

func (a *App) DeleteControllerByID(id string) error {
	err := controller.DeleteControllerByID(id)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}
