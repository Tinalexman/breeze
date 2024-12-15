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

func LoadProject(name string) error {
	modelData, err := loadSingleFile(name, "models")
	if err != nil {
		return err
	}

	model.Load(modelData)

	controllerData, err := loadSingleFile(name, "controllers")
	if err != nil {
		return err
	}

	controller.Load(controllerData)

	return nil
}
