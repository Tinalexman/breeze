package model

import (
	"breeze/core/files"
	"breeze/core/global"
	"encoding/json"
	"fmt"
)

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

var allModels []Model

func GetAllModels() []Model {
	var models []Model = make([]Model, 0)
	models = append(models, allModels...)
	return models
}

func GetModelByID(id string) (Model, bool) {
	for _, m := range allModels {
		if m.ID == id {
			return m, true
		}
	}
	return Model{}, false
}

type modelData struct {
	Models []Model `json:"models"`
}

var modelPath = files.GetFullPath(global.Global.CurrentProject.Name, "models.json")

func Save() error {
	var data modelData
	data.Models = allModels

	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshaling struct:", err)
		return err
	}

	return files.WriteContentToFile(modelPath, jsonData)
}

func Load(byteData []byte) error {
	var data modelData
	err := json.Unmarshal(byteData, &data)
	if err != nil {
		fmt.Println("Error unmarshaling struct:", err)
		return err
	}

	allModels = data.Models
	return nil
}
