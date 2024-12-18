package core

import (
	"breeze/core/global"
	"breeze/core/model"
	// "breeze/core/util"
)

func (a *App) GetAllModels(search string) []model.Model {
	return model.GetAllModels(search)
}

func (a *App) GetModelTypes() []string {
	return model.GetModelTypes()
}

func (a *App) GetModelByID(id string) (model.Model, error) {
	m, err := model.GetModelByID(id)
	if err != nil {
		return model.Model{}, err
	}
	return m, nil
}

func (a *App) CreateModel(payload model.CreateModelPayload) error {
	err := model.CreateNewModel(payload)
	if err == nil {
		a.SaveTarget(global.MODEL_FILE_NAME)
	}

	return err
}

func (a *App) UpdateModel(payload model.UpdateModelPayload) error {
	err := model.UpdateModel(payload)
	if err == nil {
		a.SaveTarget(global.MODEL_FILE_NAME)
	}
	return err
}

func (a *App) DeleteModelByID(id string) error {
	err := model.DeleteModelByID(id)
	if err == nil {
		a.SaveTarget(global.MODEL_FILE_NAME)
	}
	return err
}
