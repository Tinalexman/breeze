package global

import "breeze/core/project"

const INVALID_ID = "Invalid"

type GlobalData struct {
	CurrentProject project.Project `json:"currentProject"`
}

var Global GlobalData = GlobalData{
	CurrentProject: project.Project{},
}
