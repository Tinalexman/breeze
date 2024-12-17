package route

import (
	"breeze/core/util"
	"fmt"
	"strings"
)

type CreateRoutePayload struct {
	Name         string `json:"name"`
	Description  string `json:"description"`
	ControllerID string `json:"controllerID"`
}

func GetAllRoutes(search string) []Route {
	if search == "" {
		return AllRoutes
	}

	searchedRoutes := make([]Route, 0)
	for _, m := range AllRoutes {
		if strings.Contains(util.PrepareFieldForSearch(m.Name), util.PrepareFieldForSearch(search)) {
			searchedRoutes = append(searchedRoutes, m)
		}
	}
	return searchedRoutes
}

func GetRouteByID(id string) (Route, error) {
	for _, c := range AllRoutes {
		if c.ID == id {
			return c, nil
		}
	}

	return Route{}, fmt.Errorf("Route with ID '%s' does not exists", id)
}

func CreateNewRoute(payload CreateRoutePayload) error {
	for _, r := range AllRoutes {
		if r.Name == payload.Name {
			return fmt.Errorf("Route '%s' already exists", payload.Name)
		}
	}

	r := Route{
		Name:         payload.Name,
		ControllerID: payload.ControllerID,
		Description:  util.Ternary(payload.Description, "No Description Provided", len(payload.Description) > 0).(string),
		ID:           util.GetHash(payload.Name),
		Data:         make([]RouteData, 0),
	}

	AllRoutes = append(AllRoutes, r)
	return nil
}

func DeleteRouteByID(id string) error {
	for i, r := range AllRoutes {
		if r.ID == id {
			AllRoutes = append(AllRoutes[:i], AllRoutes[i+1:]...)
			return nil
		}
	}
	return fmt.Errorf("Route with ID '%s' does not exists", id)
}
