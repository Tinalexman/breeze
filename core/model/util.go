package model

import (
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateModelPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateModelPayload struct {
	ModelID     string      `json:"id"`
	Name        string      `json:"name"`
	Description string      `json:"description"`
	MetaData    []ModelData `json:"metadata"`
}

func GetAllModels(search string) []Model {
	if search == "" {
		return AllModels
	}

	searchedModels := make([]Model, 0)
	for _, m := range AllModels {
		if strings.Contains(util.PrepareFieldForSearch(m.Name), util.PrepareFieldForSearch(search)) {
			searchedModels = append(searchedModels, m)
		}
	}
	return searchedModels
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
		Description: util.Ternary(payload.Description, "No Description Provided", len(payload.Description) > 0).(string),
		ID:          util.GetHash(payload.Name),
		MetaData:    make([]ModelData, 0),
	}

	AllModels = append(AllModels, m)
	return nil
}

func UpdateModel(data UpdateModelPayload) error {
	for i, m := range AllModels {
		if m.ID == data.ModelID {
			AllModels[i] = Model{
				Name:        data.Name,
				ID:          data.ModelID,
				Description: data.Description,
				MetaData:    data.MetaData,
			}
			return nil
		}
	}

	return fmt.Errorf("Model with ID '%s' does not exist", data.ModelID)
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

func GetModelTypes() []string {
	return []string{
		TYPE_BOOLEAN,
		TYPE_DOUBLE,
		TYPE_INTEGER,
		TYPE_LIST,
		TYPE_STRING,
		TYPE_OBJECT_REF,
	}
}
