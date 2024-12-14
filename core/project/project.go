package project

import "breeze/core/files"

type Project struct {
	Name string
	Path string
}

const BREEZE_DIRECTORY = "C:/Users/taiwo/Breeze/"

func CreateNewProject(projectName string) error {
	err := files.CreateNewDirectory(BREEZE_DIRECTORY + projectName)
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/models.json")
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/controllers.json")
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/routes.json")
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/middlewares.json")
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/global.json")
	if err != nil {
		return err
	}

	err = files.CreateNewFile(BREEZE_DIRECTORY + projectName + "/breeze.json")
	if err != nil {
		return err
	}

	return nil
}
