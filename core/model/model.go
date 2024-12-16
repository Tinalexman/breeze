package model

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
	Icon        string               `json:"icon"`
	MetaData    map[string]ModelData `json:"metadata"`
}

var AllModels []Model = make([]Model, 0)
