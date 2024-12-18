package core

import (
	"breeze/core/global"
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
		a.SaveTarget(global.ROUTE_FILE_NAME)
	}
	return err
}

func (a *App) DeleteRouteByID(id string) error {
	err := route.DeleteRouteByID(id)
	if err == nil {
		a.SaveTarget(global.ROUTE_FILE_NAME)
	}
	return err
}

func (a *App) AddRouteData(payload route.ModifyRouteDataPayload) error {
	err := route.AddRouteData(payload)
	if err == nil {
		a.SaveTarget(global.ROUTE_FILE_NAME)
	}
	return err
}

func (a *App) RemoveRouteData(payload route.ModifyRouteDataPayload) error {
	err := route.RemoveRouteData(payload)
	if err == nil {
		a.SaveTarget(global.ROUTE_FILE_NAME)
	}
	return err
}

func (a *App) UpdateRouteData(payload route.ModifyRouteDataPayload) error {
	err := route.UpdateRouteData(payload)
	if err == nil {
		a.SaveTarget(global.ROUTE_FILE_NAME)
	}
	return err
}
