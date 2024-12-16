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

func (a *App) GetControllerByID(id string) controller.Controller {
	c, ok := controller.GetControllerByID(id)
	if ok {
		return c
	}
	return controller.Controller{
		ID: global.INVALID_ID,
	}
}

func (a *App) CreateController(payload controller.CreateControllerPayload) {
	controller.CreateNewController(payload)
}

func (a *App) DeleteControllerByID(id string) {
	controller.DeleteControllerByID(id)
}

// MODEL
func (a *App) GetAllModels() []model.Model {
	return model.AllModels
}

func (a *App) GetModelByID(id string) model.Model {
	c, ok := model.GetModelByID(id)
	if ok {
		return c
	}
	return model.Model{
		ID: global.INVALID_ID,
	}
}

func (a *App) CreateModel(payload model.CreateModelPayload) {
	model.CreateNewModel(payload)
}

func (a *App) DeleteModelByID(id string) {
	model.DeleteModelByID(id)
}
