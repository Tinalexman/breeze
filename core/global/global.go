package global

import "breeze/core/project"

type GlobalData struct {
	CurrentProject project.Project `json:"currentProject"`
}

var Global GlobalData = GlobalData{
	CurrentProject: project.Project{},
}
