package project

import (
	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/model"
	"breeze/core/route"
	"encoding/json"
)

type modelData struct {
	Models []model.Model `json:"models"`
}

type controllerData struct {
	Controllers []controller.Controller `json:"controllers"`
}

type routeData struct {
	Routes []route.Route `json:"routes"`
}

type CreateNewProjectPayload struct {
	Name string `json:"name"`
}

func (p *Project) CreateNewProject(payload CreateNewProjectPayload) error {
	err := files.CreateNewDirectory(files.GetFullPath(payload.Name))
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, "models.json"), "models")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, "controllers.json"), "controllers")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, "routes.json"), "routes")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, "middlewares.json"), "middlewares")
	if err != nil {
		return err
	}

	err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, "globals.json"), "globals")
	if err != nil {
		return err
	}

	p.Name = payload.Name
	p.Directory = files.GetFullPath(payload.Name)

	err = createProjectData(files.GetFullPath(payload.Name, "breeze.json"), p)

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

func (p *Project) LoadProject() error {
	// LOAD MODELS
	modelByteData, err := loadSingleFile(p.Name, "models")
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
	controllerByteData, err := loadSingleFile(p.Name, "controllers")
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
	routeByteData, err := loadSingleFile(p.Name, "routes")
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

func (p *Project) SaveProject() error {
	// SAVE CONTROLLERS
	var controllerData controllerData
	controllerData.Controllers = controller.AllControllers

	controllerByteData, err := json.MarshalIndent(controllerData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(p.Name, "controllers", controllerByteData)
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

	err = writeSingleFile(p.Name, "models", modelByteData)
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

	err = writeSingleFile(p.Name, "routes", routeByteData)
	if err != nil {
		return err
	}

	return nil
}
