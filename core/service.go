package core

import (
	"breeze/core/global"
	"breeze/core/service"
)

func (a *App) GetAllServices(search string) []service.Service {
	return service.GetAllServices(search)
}

func (a *App) GetServiceByID(id string) (service.Service, error) {
	s, err := service.GetServiceByID(id)
	if err != nil {
		return service.Service{}, err
	}
	return s, nil
}

func (a *App) CreateService(payload service.CreateServicePayload) error {
	err := service.CreateService(payload)
	if err == nil {
		a.SaveTarget(global.SERVICES_FILE_NAME)
	}
	return err
}

func (a *App) UpdateService(payload service.UpdateServicePayload) error {
	err := service.UpdateService(payload)
	if err == nil {
		a.SaveTarget(global.SERVICES_FILE_NAME)
	}
	return err
}

func (a *App) DeleteServiceByID(id string) error {
	err := service.DeleteServiceByID(id)
	if err == nil {
		a.SaveTarget(global.SERVICES_FILE_NAME)
	}
	return err
}
