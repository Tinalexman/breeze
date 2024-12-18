package core

import (
	"breeze/core/controller"
	"breeze/core/global"
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
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}

func (a *App) UpdateController(payload controller.UpdateControllerPayload) error {
	err := controller.UpdateController(payload)
	if err == nil {
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}

func (a *App) AddControllerMethod(payload controller.ModifyControllerMethodPayload) error {
	err := controller.AddControllerMethod(payload)
	if err == nil {
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}

func (a *App) RemoveControllerMethod(payload controller.ModifyControllerMethodPayload) error {
	err := controller.RemoveControllerMethod(payload)
	if err == nil {
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}

func (a *App) RenameControllerMethod(payload controller.ModifyControllerMethodPayload) error {
	err := controller.RenameControllerMethod(payload)
	if err == nil {
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}

func (a *App) DeleteControllerByID(id string) error {
	err := controller.DeleteControllerByID(id)
	if err == nil {
		a.SaveTarget(global.CONTROLLER_FILE_NAME)
	}
	return err
}
