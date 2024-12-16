package model

import "breeze/core/util"

const (
	TYPE_STRING  = "String"
	TYPE_INTEGER = "Integer"
	TYPE_DOUBLE  = "Double"
	TYPE_BOOLEAN = "Boolean"
	TYPE_LIST    = "List"
)

type ModelData struct {
	Type         string      `json:"type"`
	DefaultValue interface{} `json:"default"`
}

type Model struct {
	Name        string               `json:"name"`
	ID          string               `json:"id"`
	Description string               `json:"description"`
	MetaData    map[string]ModelData `json:"metadata"`
}

var AllModels []Model = make([]Model, 0)

func GetModelByID(id string) (Model, bool) {
	for _, m := range AllModels {
		if m.ID == id {
			return m, true
		}
	}
	return Model{}, false
}

func CreateNewModel(name, description string) {
	m := Model{
		Name:        name,
		Description: description,
		ID:          util.GetHash(name),
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
