package model

const (
	TYPE_STRING     = "String"
	TYPE_INTEGER    = "Integer"
	TYPE_DOUBLE     = "Double"
	TYPE_BOOLEAN    = "Boolean"
	TYPE_LIST       = "List"
	TYPE_OBJECT_REF = "Object"
)

type ModelData struct {
	Name         string      `json:"name"`
	Type         string      `json:"type"`
	DefaultValue interface{} `json:"default"`
}

type Model struct {
	Name        string      `json:"name"`
	ID          string      `json:"id"`
	Description string      `json:"description"`
	MetaData    []ModelData `json:"metadata"`
}

var AllModels []Model = make([]Model, 0)
