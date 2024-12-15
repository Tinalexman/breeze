package controller

import (
	"breeze/core/files"
	"breeze/core/global"
	"encoding/json"
	"fmt"
)

type Controller struct {
	Name    string `json:"name"`
	ID      string `json:"id"`
	ModelID string `json:"model"`
}

var allControllers []Controller

func GetAllControllers() []Controller {
	var controllers []Controller = make([]Controller, 0)
	controllers = append(controllers, allControllers...)
	return controllers
}

func GetControllerByID(id string) (Controller, bool) {
	for _, c := range allControllers {
		if c.ID == id {
			return c, true
		}
	}
	return Controller{}, false
}

type controllerData struct {
	Controllers []Controller `json:"controllers"`
}

var controllerPath = files.GetFullPath(global.Global.CurrentProject.Name, "controllers.json")

func Save() error {
	var data controllerData
	data.Controllers = allControllers

	jsonData, err := json.Marshal(data)
	if err != nil {
		fmt.Println("Error marshaling struct:", err)
		return err
	}

	return files.WriteContentToFile(controllerPath, jsonData)
}

func Load(byteData []byte) error {
	var data controllerData

	err := json.Unmarshal(byteData, &data)
	if err != nil {
		fmt.Println("Error unmarshaling struct:", err)
		return err
	}

	allControllers = data.Controllers

	return nil
}
