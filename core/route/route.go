package route

type Route struct {
	Method          string
	Name            string
	RequestHeaders  map[string]interface{}
	RequestBody     interface{}
	ResponseHeaders map[string]interface{}
	ResponseBody    interface{}
}
