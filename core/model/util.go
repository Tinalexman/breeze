package model

import "breeze/core/util"

type CreateModelPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

func GetModelByID(id string) (Model, bool) {
	for _, m := range AllModels {
		if m.ID == id {
			return m, true
		}
	}
	return Model{}, false
}

func CreateNewModel(payload CreateModelPayload) {
	m := Model{
		Name:        payload.Name,
		Description: payload.Description,
		ID:          util.GetHash(payload.Name),
	}

	AllModels = append(AllModels, m)
}

func UpdateModelMetaData(id string, data map[string]ModelData) {
	for i, m := range AllModels {
		if m.ID == id {
			AllModels[i].MetaData = data
			return
		}
	}
}

func DeleteModelByID(id string) {
	for i, m := range AllModels {
		if m.ID == id {
			AllModels = append(AllModels[:i], AllModels[i+1:]...)
			return
		}
	}
}
