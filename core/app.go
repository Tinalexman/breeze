package core

import (
	"context"
	"encoding/json"

	"breeze/core/files"
	"breeze/core/project"
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
