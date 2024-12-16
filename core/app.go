package core

import (
	"context"
	"encoding/json"
	"fmt"

	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/model"
	"breeze/core/project"
	"breeze/core/util"
)

var log = util.Logger()

type App struct {
	ctx            context.Context
	RecentProjects []project.Project `json:"recentProjects"`
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	a.LoadRecentProject()
}

func (a *App) DomReady(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) BeforeClose(ctx context.Context) bool {
	return false
}

func (a *App) LoadRecentProject() {
	breezePath := files.GetFullPath("settings.json")

	var newApp App
	newApp.RecentProjects = []project.Project{}

	exists := files.DoesFileExist(breezePath)
	if !exists {
		jsonData, _ := json.MarshalIndent(newApp, "", "  ")
		files.WriteContentToFile(breezePath, jsonData)
	}

	data, err := files.ReadContentFromFile(breezePath)

	if err != nil {
		json.Unmarshal(data, &newApp)
		a.RecentProjects = newApp.RecentProjects
		if len(newApp.RecentProjects) > 0 {
			a.LoadProject(newApp.RecentProjects[0].Name)
		}
	}
}

// PROJECT
func (a *App) CreateProject(name string) error {
	for _, p := range a.RecentProjects {
		if p.Name == name {
			return fmt.Errorf("The project '%s' already exists", name)
		}
	}

	newProject := project.Project{}
	err := newProject.CreateNewProject(name)
	if err == nil {
		a.RecentProjects = append(a.RecentProjects, newProject)
	}

	return err
}

func (a *App) LoadProject(name string) error {
	return project.LoadProject(name)
}

func (a *App) SaveProject(name string) error {
	return project.SaveProject(name)
}

func (a *App) SaveCurrentProject() {
	if len(a.RecentProjects) > 0 {
		projectName := a.RecentProjects[0].Name
		go a.SaveProject(projectName)
	}
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
