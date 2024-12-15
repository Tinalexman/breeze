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

func (a *App) GetAllModels() []model.Model {
	return model.GetAllModels()
}

func (a *App) GetAllControllers() []controller.Controller {
	return controller.GetAllControllers()
}

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
