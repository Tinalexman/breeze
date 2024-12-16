package project

import (
	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/model"
	"encoding/json"
)

type Project struct {
	Name      string `json:"name"`
	Directory string `json:"directory"`
}

type modelData struct {
	Models []model.Model `json:"models"`
}

type controllerData struct {
	Controllers []controller.Controller `json:"controllers"`
}

func (p *Project) CreateNewProject(name string) error {
	err := files.CreateNewDirectory(files.GetFullPath(name))
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(name, "models.json"), "models")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(name, "controllers.json"), "controllers")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(name, "routes.json"), "routes")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(name, "middlewares.json"), "middlewares")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(name, "globals.json"), "globals")
	if err != nil {
		return err
	}

	p.Name = name
	p.Directory = files.GetFullPath(name)

	err = createProjectData(files.GetFullPath(name, "breeze.json"), p)

	return err
}

func createSingleFileAndWriteDefault(directory, target string) error {
	err := files.CreateNewFile(directory)
	if err != nil {
		return err
	}
	err = files.WriteContentToFile(directory, []byte("{\""+target+"\": []}"))
	return err
}

func loadSingleFile(name, target string) ([]byte, error) {
	return files.ReadContentFromFile(files.GetFullPath(name, target+".json"))
}

func writeSingleFile(name, target string, data []byte) error {
	return files.WriteContentToFile(files.GetFullPath(name, target+".json"), data)
}

func createProjectData(directory string, data *Project) error {
	err := files.CreateNewFile(directory)
	if err != nil {
		return err
	}

	jsonData, err := json.Marshal(data)
	if err != nil {
		return err
	}

	err = files.WriteContentToFile(directory, jsonData)

	return err
}

func LoadProject(projectName string) error {
	// LOAD MODELS
	modelByteData, err := loadSingleFile(projectName, "models")
	if err != nil {
		return err
	}

	var m modelData

	err = json.Unmarshal(modelByteData, &m)
	if err != nil {
		return err
	}
	model.AllModels = m.Models

	// LOAD CONTROLLERS
	controllerByteData, err := loadSingleFile(projectName, "controllers")
	if err != nil {
		return err
	}

	var c controllerData

	err = json.Unmarshal(controllerByteData, &c)
	if err != nil {
		return err
	}
	controller.AllControllers = c.Controllers

	return nil
}

func SaveProject(projectName string) error {

	// SAVE CONTROLLERS
	var controllerData controllerData
	controllerData.Controllers = controller.AllControllers

	controllerByteData, err := json.Marshal(controllerData)
	if err != nil {
		return err
	}

	err = writeSingleFile(projectName, "controllers", controllerByteData)
	if err != nil {
		return err
	}

	// SAVE MODELS
	var modelData modelData
	modelData.Models = model.AllModels

	modelByteData, err := json.Marshal(modelData)
	if err != nil {
		return err
	}

	err = writeSingleFile(projectName, "models", modelByteData)
	if err != nil {
		return err
	}

	return nil
}
