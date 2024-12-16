package core

import (
	"context"

	"breeze/core/controller"
	"breeze/core/files"
	"breeze/core/global"
	"breeze/core/model"
	"breeze/core/project"
)

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) Startup(ctx context.Context) {
	a.ctx = ctx
	// a.CreateProject("test")
	a.LoadProject("test")
}

func (a *App) DomReady(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) BeforeClose(ctx context.Context) bool {
	return false
}

// PROJECT
func (a *App) CreateProject(name string) error {
	currentProject := project.Project{}
	err := currentProject.CreateNewProject(name)
	if err == nil {
		global.Global.CurrentProject = currentProject
	}

	return err
}

func (a *App) LoadProject(name string) error {
	err := project.LoadProject(name)
	if err == nil {
		global.Global.CurrentProject = project.Project{Name: name, Directory: files.GetFullPath(name)}
	}

	return err
}

func (a *App) SaveProject(name string) error {
	return project.SaveProject(name)
}

// CONTROLLERS
func (a *App) GetAllControllers() []controller.Controller {
	return controller.AllControllers
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
		a.SaveProject("test")
	}
	return err
}

func (a *App) DeleteControllerByID(id string) error {
	err := controller.DeleteControllerByID(id)
	if err == nil {
		a.SaveProject("test")
	}
	return err
}

// MODEL
func (a *App) GetAllModels() []model.Model {
	return model.AllModels
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
		a.SaveProject("test")
	}

	return err
}

func (a *App) UpdateModelMetaData(id string, data map[string]model.ModelData) error {
	err := model.UpdateModelMetaData(id, data)
	if err == nil {
		a.SaveProject("test")
	}
	return err
}

func (a *App) DeleteModelByID(id string) error {
	err := model.DeleteModelByID(id)
	if err == nil {
		a.SaveProject("test")
	}
	return err
}
