package core

import (
	"fmt"

	"breeze/core/files"
	"breeze/core/project"
)

func (a *App) GetRecentProjects() ([]string, error) {
	return files.GetAvailableDirectories()
}

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

func (a *App) SaveTarget(target string) error {
	if len(a.RecentProjects) > 0 {
		p := a.RecentProjects[0]
		go p.Save(target)
	}

	return nil
}
