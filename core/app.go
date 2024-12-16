package core

import (
	"context"
	"encoding/json"
	"fmt"

	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/model"
	"breeze/core/project"
	"breeze/core/route"
	// "breeze/core/util"
)

// var log = util.Logger()

type App struct {
	ctx            context.Context
	RecentProjects []project.Project `json:"recentProjects"`
}

func NewApp() *App {
	return &App{
		RecentProjects: []project.Project{},
	}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.Load()
}

func (a *App) DomReady(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) BeforeClose(ctx context.Context) (ok bool) {
	ok = false

	_ = a.Save()
	return
}

func (a *App) GetRecentProjects() ([]string, error) {
	return files.GetAvailableDirectories()
}

func (a *App) Load() error {
	breezePath := files.GetFullPath("settings.json")

	var newApp App
	newApp.RecentProjects = []project.Project{}

	if files.DoesFileNotExist(breezePath) {
		jsonData, _ := json.MarshalIndent(newApp, "", "  ")
		files.WriteContentToFile(breezePath, jsonData)
		return nil
	}

	data, err := files.ReadContentFromFile(breezePath)

	if err != nil {
		json.Unmarshal(data, &newApp)
		a.RecentProjects = newApp.RecentProjects
	}

	return err
}

func (a *App) Save() error {
	if a.RecentProjects == nil {
		return nil
	}

	breezePath := files.GetFullPath("settings.json")

	appByteData, err := json.MarshalIndent(a, "", "  ")
	if err != nil {
		return err
	}

	return files.WriteContentToFile(breezePath, appByteData)
}

// PROJECT
func (a *App) CreateProject(payload project.CreateNewProjectPayload) error {
	for _, p := range a.RecentProjects {
		if p.Name == payload.Name {
			return fmt.Errorf("'%s' already exists", payload.Name)
		}
	}

	newProject := project.Project{}
	err := newProject.CreateNewProject(payload)
	if err == nil {
		a.RecentProjects = append(a.RecentProjects, newProject)
	}

	return err
}

func (a *App) updateRecentProjects(p project.Project, name string) {
	ok := true
	for _, pr := range a.RecentProjects {
		if pr.Name == name {
			ok = false
		}
	}

	if ok {
		a.RecentProjects = append(a.RecentProjects, p)
	}
}

func (a *App) LoadProject(name string) error {
	p := project.Project{Name: name}

	err := p.LoadProject()
	a.updateRecentProjects(p, name)

	return err
}

func (a *App) SaveProject(name string) error {
	p := project.Project{Name: name}
	a.updateRecentProjects(p, name)
	return p.SaveProject()
}

func (a *App) SaveCurrentProject() {
	if len(a.RecentProjects) > 0 {
		projectName := a.RecentProjects[0].Name
		go a.SaveProject(projectName)
	}
}

// ROUTES
func (a *App) GetAllRoutes(search string) []route.Route {
	return route.GetAllRoutes(search)
}

func (a *App) GetRouteByID(id string) (route.Route, error) {
	r, err := route.GetRouteByID(id)
	if err != nil {
		return route.Route{}, err
	}
	return r, nil
}

func (a *App) CreateRoute(payload route.CreateRoutePayload) error {
	err := route.CreateNewRoute(payload)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

func (a *App) DeleteRouteByID(id string) error {
	err := route.DeleteRouteByID(id)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

// CONTROLLERS
func (a *App) GetAllControllers(search string) []controller.Controller {
	return controller.GetAllControllers(search)
}

func (a *App) GetControllerByID(id string) (controller.Controller, error) {
	c, err := controller.GetControllerByID(id)
	if err != nil {
		return controller.Controller{}, err
	}
	return c, nil
}

func (a *App) CreateController(payload controller.CreateControllerPayload) error {
	err := controller.CreateNewController(payload)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

func (a *App) DeleteControllerByID(id string) error {
	err := controller.DeleteControllerByID(id)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

// MODEL
func (a *App) GetAllModels(search string) []model.Model {
	return model.GetAllModels(search)
}

func (a *App) GetModelByID(id string) (model.Model, error) {
	m, err := model.GetModelByID(id)
	if err != nil {
		return model.Model{}, err
	}
	return m, nil
}

func (a *App) CreateModel(payload model.CreateModelPayload) error {
	err := model.CreateNewModel(payload)
	if err == nil {
		a.SaveCurrentProject()
	}

	return err
}

func (a *App) UpdateModelMetaData(id string, data map[string]model.ModelData) error {
	err := model.UpdateModelMetaData(id, data)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

func (a *App) DeleteModelByID(id string) error {
	err := model.DeleteModelByID(id)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}
