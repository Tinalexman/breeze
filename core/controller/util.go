package controller

import (
	"breeze/core/model"
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateControllerPayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

type UpdateControllerPayload struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
	ModelID     string `json:"modelID"`
}

type ModifyControllerMethodPayload struct {
	ID     string `json:"id"`
	Method string `json:"method"`
}

func GetAllControllers(search string) []Controller {
	if search == "" {
		return AllControllers
	}

	searchedControllers := make([]Controller, 0)
	for _, m := range AllControllers {
		if strings.Contains(util.PrepareFieldForSearch(m.Name), util.PrepareFieldForSearch(search)) {
			searchedControllers = append(searchedControllers, m)
		}
	}
	return searchedControllers
}

func GetControllerByID(id string) (Controller, error) {
	for _, c := range AllControllers {
		if c.ID == id {
			return c, nil
		}
	}

	return Controller{}, fmt.Errorf("Controller with ID '%s' does not exists", id)
}

func CreateNewController(payload CreateControllerPayload) error {
	for _, c := range AllControllers {
		if c.Name == payload.Name {
			return fmt.Errorf("Controller '%s' already exists", payload.Name)
		}
	}

	m, err := model.GetModelByID(payload.ModelID)
	if err != nil {
		return err
	}

	c := Controller{
		Name:        payload.Name,
		ModelID:     payload.ModelID,
		Description: util.Ternary(payload.Description, "No Description Provided", len(payload.Description) > 0).(string),
		ID:          util.GetHash(payload.Name),
		Methods:     generateDefaultMethods(m.Name),
	}

	AllControllers = append(AllControllers, c)
	return nil
}

func UpdateController(data UpdateControllerPayload) error {
	_, err := model.GetModelByID(data.ModelID)
	if err != nil {
		return err
	}

	for i, m := range AllControllers {
		if m.ID == data.ID {
			methods := m.Methods
			AllControllers[i] = Controller{
				Name:        data.Name,
				ID:          data.ID,
				Description: data.Description,
				Methods:     methods,
			}
			return nil
		}
	}

	return fmt.Errorf("Controller with ID '%s' does not exist", data.ID)
}

func DeleteControllerByID(id string) error {
	for i, c := range AllControllers {
		if c.ID == id {
			AllControllers = append(AllControllers[:i], AllControllers[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Controller with ID '%s' does not exists", id)
}

func GetControllerMethods(id string) ([]string, error) {
	c, err := GetControllerByID(id)
	if err != nil {
		return []string{}, err
	}

	return c.Methods, nil
}

// Generate default methods, custom methods can be added using the builder

func generateDefaultMethods(name string) []string {
	return []string{
		fmt.Sprintf("getAll%ss", name),
		fmt.Sprintf("get%sByID", name),
		fmt.Sprintf("create%s", name),
		fmt.Sprintf("update%sByID", name),
		fmt.Sprintf("delete%sByID", name),
		fmt.Sprintf("deleteAll%ss", name),
	}
}

func AddControllerMethod(payload ModifyControllerMethodPayload) error {

	controllerIndex := -1

	for i, m := range AllControllers {
		if m.ID == payload.ID {
			controllerIndex = i
		}
	}

	if controllerIndex == -1 {
		return fmt.Errorf("Controller with ID '%s' does not exist", payload.ID)
	}

	methodIndex := -1
	for i, m := range AllControllers[controllerIndex].Methods {
		if m == payload.Method {
			methodIndex = i
			break
		}
	}

	if methodIndex != -1 {
		return fmt.Errorf("Method '%s' already exists", payload.Method)
	}

	AllControllers[controllerIndex].Methods = append(AllControllers[controllerIndex].Methods, payload.Method)
	return nil
}

func RemoveControllerMethod(payload ModifyControllerMethodPayload) error {
	controllerIndex := -1

	for i, m := range AllControllers {
		if m.ID == payload.ID {
			controllerIndex = i
		}
	}

	if controllerIndex == -1 {
		return fmt.Errorf("Controller with ID '%s' does not exist", payload.ID)
	}

	methodIndex := -1
	for i, m := range AllControllers[controllerIndex].Methods {
		if m == payload.Method {
			methodIndex = i
			break
		}
	}

	if methodIndex == -1 {
		return fmt.Errorf("Method '%s' does not exist", payload.Method)
	}

	methods := AllControllers[controllerIndex].Methods

	AllControllers[controllerIndex].Methods = append(methods[:methodIndex], methods[methodIndex+1:]...)
	return nil
}
