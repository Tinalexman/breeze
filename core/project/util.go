package project

import (
	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/global"
	"breeze/core/model"
	"breeze/core/route"
	"breeze/core/service"
	"encoding/json"
	"fmt"
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

type serviceData struct {
	Services []service.Service `json:"services"`
}

type CreateNewProjectPayload struct {
	Name string `json:"name"`
}

func (p *Project) CreateNewProject(payload CreateNewProjectPayload) error {
	err := files.CreateNewDirectory(files.GetFullPath(payload.Name))
	if err != nil {
		return err
	}

	filesToCreate := []string{
		global.GLOBALS_FILE_NAME,
		global.MIDDLEWARE_FILE_NAME,
		global.CONTROLLER_FILE_NAME,
		global.ROUTE_FILE_NAME,
		global.MODEL_FILE_NAME,
	}

	for _, f := range filesToCreate {
		err = createSingleFileAndWriteDefault(files.GetFullPath(payload.Name, fmt.Sprintf("%s.json", f)), f)
		if err != nil {
			return err
		}
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
	modelByteData, err := loadSingleFile(p.Name, global.MODEL_FILE_NAME)
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
	controllerByteData, err := loadSingleFile(p.Name, global.CONTROLLER_FILE_NAME)
	if err != nil {
		return err
	}

	var c controllerData

	err = json.Unmarshal(controllerByteData, &c)
	if err != nil {
		return err
	}
	controller.AllControllers = c.Controllers

	// LOAD SERVICES
	serviceByteData, err := loadSingleFile(p.Name, global.SERVICES_FILE_NAME)
	if err != nil {
		return err
	}

	var s serviceData

	err = json.Unmarshal(serviceByteData, &s)
	if err != nil {
		return err
	}
	service.AllServices = s.Services

	// LOAD ROUTES
	routeByteData, err := loadSingleFile(p.Name, global.ROUTE_FILE_NAME)
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
	err := p.saveModels()
	if err != nil {
		return err
	}

	err = p.saveControllers()
	if err != nil {
		return err
	}

	err = p.saveRoutes()
	if err != nil {
		return err
	}

	err = p.saveServices()
	if err != nil {
		return err
	}

	return nil
}

func (p *Project) Save(target string) error {
	if target == global.CONTROLLER_FILE_NAME {
		return p.saveControllers()
	} else if target == global.MODEL_FILE_NAME {
		return p.saveModels()
	} else if target == global.ROUTE_FILE_NAME {
		return p.saveRoutes()
	} else if target == global.SERVICES_FILE_NAME {
		return p.saveServices()
	}

	return nil
}

func (p *Project) saveModels() error {
	var modelData modelData
	modelData.Models = model.AllModels

	modelByteData, err := json.MarshalIndent(modelData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(p.Name, global.MODEL_FILE_NAME, modelByteData)
	return err
}

func (p *Project) saveControllers() error {
	var controllerData controllerData
	controllerData.Controllers = controller.AllControllers

	controllerByteData, err := json.MarshalIndent(controllerData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(p.Name, global.CONTROLLER_FILE_NAME, controllerByteData)
	return err
}

func (p *Project) saveRoutes() error {
	var routeData routeData
	routeData.Routes = route.AllRoutes

	routeByteData, err := json.MarshalIndent(routeData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(p.Name, global.ROUTE_FILE_NAME, routeByteData)
	return err
}

func (p *Project) saveServices() error {
	var serviceData serviceData
	serviceData.Services = service.AllServices

	serviceByteData, err := json.MarshalIndent(serviceData, "", "  ")
	if err != nil {
		return err
	}

	err = writeSingleFile(p.Name, global.SERVICES_FILE_NAME, serviceByteData)
	return err
}
