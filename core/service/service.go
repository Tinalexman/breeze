package service

import "breeze/core/network"

type Service struct {
	Name        string            `json:"name"`
	Description string            `json:"description"`
	ID          string            `json:"id"`
	Handlers    []network.Handler `json:"handlers"`
}

var AllServices []Service = make([]Service, 0)

func (s *Service) Handle(request network.Request) network.Response {
	if len(s.Handlers) == 0 {
		return network.Response{
			Body: network.ResponseBody{
				Message:    "There are no handlers attached to this service",
				StatusCode: network.INTERNAL_SERVER_ERROR,
			},
		}
	}

	for i, handler := range s.Handlers {
		resp, ok := handler.Process(request)
		if !ok || i == len(s.Handlers)-1 {
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
