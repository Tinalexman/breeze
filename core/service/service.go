package service

import "breeze/core/network"

type Service struct {
	Name        string                `json:"name"`
	Description string                `json:"description"`
	ID          string                `json:"id"`
	HandlerData []network.HandlerData `json:"data"`
}

var AllServices []Service = make([]Service, 0)

func (s *Service) Handle(request network.Request) network.Response {
	if len(s.HandlerData) == 0 {
		return network.Response{
			Body: network.ResponseBody{
				Message:    "There are no handlers attached to this service",
				StatusCode: network.INTERNAL_SERVER_ERROR,
			},
		}
	}

	for i, data := range s.HandlerData {
		resp, ok := process(request, data)
		if !ok || i == len(s.HandlerData)-1 {
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

// This is where the data is actually parsed and processed to perform the operation
func process(request network.Request, data network.HandlerData) (network.Response, bool) {

	return network.Response{}, false
}
