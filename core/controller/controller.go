package controller

import (
	"breeze/core/network"
)

type Controller struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	ID          string `json:"id"`
	ModelID     string `json:"modelID"`
	Handlers    []network.Handler
}

var AllControllers []Controller = make([]Controller, 0)

func (c *Controller) Handle(request network.Request) network.Response {
	if len(c.Handlers) == 0 {
		return network.Response{
			Body: network.ResponseBody{
				Message:    "There are no handlers attached to this controller",
				StatusCode: network.INTERNAL_SERVER_ERROR,
			},
		}
	}

	for i, handler := range c.Handlers {
		resp, ok := handler.Process(request)
		if !ok || i == len(c.Handlers)-1 {
			return resp
		}
	}

	return network.Response{
		Body: network.ResponseBody{
			Message:    "No handlers resolved the request",
			StatusCode: network.INTERNAL_SERVER_ERROR,
		},
	}

}
