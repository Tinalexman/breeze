package project

import (
	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/model"
	"breeze/core/route"
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

type routeData struct {
	Routes []route.Route `json:"routes"`
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
	err = files.WriteContentToFile(directory, []byte("{\n  \""+target+"\": []\n}"))
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

	jsonData, err := json.MarshalIndent(data, "", "  ")
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

	// LOAD CONTROLLERS
	routeByteData, err := loadSingleFile(projectName, "routes")
	if err != nil {
		return err
	}

	var r routeData

	err = json.Unmarshal(routeByteData, &r)
	if err != nil {
		return err
	}
	route.AllRoutes = r.Routes

	return nil
}

func SaveProject(projectName string) error {

	// SAVE CONTROLLERS
	var controllerData controllerData
	controllerData.Controllers = controller.AllControllers

	controllerByteData, err := json.MarshalIndent(controllerData, "", "  ")
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

	modelByteData, err := json.MarshalIndent(modelData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(projectName, "models", modelByteData)
	if err != nil {
		return err
	}

	// SAVE ROUTES
	var routeData routeData
	routeData.Routes = route.AllRoutes

	routeByteData, err := json.MarshalIndent(routeData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(projectName, "routes", routeByteData)
	if err != nil {
		return err
	}

	return nil
}
