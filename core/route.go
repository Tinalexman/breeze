package core

import (
	"breeze/core/route"
)

func (a *App) GetAllRoutes(search string) []route.Route {
	return route.GetAllRoutes(search)
}

func (a *App) GetRouteByID(id string) (route.Route, error) {
	r, err := route.GetRouteByID(id)
	if err != nil {
		return route.Route{}, err
	}
	return r, nil
}

func (a *App) CreateRoute(payload route.CreateRoutePayload) error {
	err := route.CreateNewRoute(payload)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}

func (a *App) DeleteRouteByID(id string) error {
	err := route.DeleteRouteByID(id)
	if err == nil {
		a.SaveCurrentProject()
	}
	return err
}
