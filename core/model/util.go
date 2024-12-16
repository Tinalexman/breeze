package model

import (
	"breeze/core/util"
	"fmt"
)

type CreateModelPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func GetModelByID(id string) (Model, error) {
	for _, m := range AllModels {
		if m.ID == id {
			return m, nil
		}
	}
	return Model{}, fmt.Errorf("Model with ID '%s' does not exist", id)
}

func CreateNewModel(payload CreateModelPayload) error {
	for _, m := range AllModels {
		if m.Name == payload.Name {
			return fmt.Errorf("Model '%s' already exists", payload.Name)
		}
	}

	m := Model{
		Name:        payload.Name,
		Description: payload.Description,
		ID:          util.GetHash(payload.Name),
	}

	AllModels = append(AllModels, m)
	return nil
}

func UpdateModelMetaData(id string, data map[string]ModelData) error {
	for i, m := range AllModels {
		if m.ID == id {
			AllModels[i].MetaData = data
			return nil
		}
	}

	return fmt.Errorf("Model with ID '%s' does not exist", id)
}

func DeleteModelByID(id string) error {
	for i, m := range AllModels {
		if m.ID == id {
			AllModels = append(AllModels[:i], AllModels[i+1:]...)
			return nil
		}
	}

	return fmt.Errorf("Model with ID '%s' does not exist", id)
}
