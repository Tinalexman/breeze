package route

const (
	METHOD_GET    = "GET"
	METHOD_POST   = "POST"
	METHOD_PATCH  = "PATCH"
	METHOD_PUT    = "PUT"
	METHOD_DELETE = "DELETE"
)

type RouteData struct {
	ID     string `json:"id"`
	Method string `json:"method"`
	Path   string `json:"path"`
}

type Route struct {
	Name        string      `json:"name"`
	ID          string      `json:"id"`
	Description string      `json:"description"`
	ServiceID   string      `json:"serviceID"`
	Data        []RouteData `json:"data"`
}

var AllRoutes []Route = make([]Route, 0)
