package service

import (
	"breeze/core/network"
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateServicePayload struct {
	Name        string `json:"name"`
	Description string `json:"description"`
}

type UpdateServicePayload struct {
	Name        string `json:"name"`
	ServiceID   string `json:"id"`
	Description string `json:"description"`
}

type ModifyHandlerPayload struct {
	ServiceID string `json:"id"`

	NewData map[string]interface{} `json:"steps"`
	DataID  string                 `json:"dataID"`
}

func CreateService(payload CreateServicePayload) error {
	for _, c := range AllServices {
		if c.Name == payload.Name {
			return fmt.Errorf("Service '%s' already exists", payload.Name)
		}
	}

	s := Service{
		Name:        payload.Name,
		Description: util.Ternary(payload.Description, "No Description Provided", len(payload.Description) > 0).(string),
		ID:          util.GetHash(payload.Name),
		HandlerData: make([]network.HandlerData, 0),
	}

	AllServices = append(AllServices, s)
	return nil
}

func GetAllServices(search string) []Service {
	if search == "" {
		return AllServices
	}

	searchedServices := make([]Service, 0)
	for _, m := range AllServices {
		if strings.Contains(util.PrepareFieldForSearch(m.Name), util.PrepareFieldForSearch(search)) {
			searchedServices = append(searchedServices, m)
		}
	}
	return searchedServices
}

func GetServiceByID(id string) (Service, error) {
	for _, c := range AllServices {
		if c.ID == id {
			return c, nil
		}
	}

	return Service{}, fmt.Errorf("Service with ID '%s' does not exists", id)
}

func UpdateService(data UpdateServicePayload) error {
	for i, s := range AllServices {
		if s.ID == data.ServiceID {
			handlerData := s.HandlerData
			AllServices[i] = Service{
				Name:        data.Name,
				ID:          data.ServiceID,
				Description: data.Description,
				HandlerData: handlerData,
			}
			return nil
		}
	}

	return fmt.Errorf("Service with ID '%s' does not exist", data.ServiceID)
}

func DeleteServiceByID(id string) error {
	for i, c := range AllServices {
		if c.ID == id {
			AllServices = append(AllServices[:i], AllServices[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Service with ID '%s' does not exists", id)
}

func AddServiceHandler(payload ModifyHandlerPayload) error {
	serviceIndex := -1

	for i, m := range AllServices {
		if m.ID == payload.ServiceID {
			serviceIndex = i
		}
	}

	if serviceIndex == -1 {
		return fmt.Errorf("Service with ID '%s' does not exist", payload.ServiceID)
	}

	AllServices[serviceIndex].HandlerData = append(AllServices[serviceIndex].HandlerData,
		network.HandlerData{
			ID:   util.GetRandomHash(),
			Data: payload.NewData,
		},
	)
	return nil
}

func RemoveServiceHandler(payload ModifyHandlerPayload) error {
	serviceIndex := -1

	for i, m := range AllServices {
		if m.ID == payload.ServiceID {
			serviceIndex = i
		}
	}

	if serviceIndex == -1 {
		return fmt.Errorf("Service with ID '%s' does not exist", payload.ServiceID)
	}

	handlerIndex := -1
	for i, m := range AllServices[serviceIndex].HandlerData {
		if m.ID == payload.DataID {
			handlerIndex = i
			break
		}
	}

	if handlerIndex == -1 {
		return fmt.Errorf("Handler with ID '%s' does not exist", payload.DataID)
	}

	handlers := AllServices[serviceIndex].HandlerData

	AllServices[serviceIndex].HandlerData = append(handlers[:handlerIndex], handlers[handlerIndex+1:]...)
	return nil
}

func RenameControllerMethod(payload ModifyHandlerPayload) error {
	serviceIndex := -1

	for i, m := range AllServices {
		if m.ID == payload.ServiceID {
			serviceIndex = i
		}
	}

	if serviceIndex == -1 {
		return fmt.Errorf("Service with ID '%s' does not exist", payload.ServiceID)
	}

	handlerIndex := -1
	for i, m := range AllServices[serviceIndex].HandlerData {
		if m.ID == payload.DataID {
			handlerIndex = i
			break
		}
	}

	if handlerIndex == -1 {
		return fmt.Errorf("Handler with ID '%s' does not exist", payload.DataID)
	}

	handlers := AllServices[serviceIndex].HandlerData

	AllServices[serviceIndex].HandlerData = append(handlers[:handlerIndex], network.HandlerData{
		ID:   payload.DataID,
		Data: payload.NewData,
	})
	AllServices[serviceIndex].HandlerData = append(AllServices[serviceIndex].HandlerData, handlers[handlerIndex:]...)
	return nil
}
