package network

type Request struct {
	Headers map[string]interface{} `json:"headers"`
	Queries map[string]interface{} `json:"queries"`
	Method  string                 `json:"method"`
	Body    interface{}            `json:"body"`
}

type Response struct {
	Header map[string]string `json:"headers"`
	Body   ResponseBody      `json:"body"`
	Status int               `json:"status"`
}

type ResponseBody struct {
	StatusCode int         `json:"statusCode"`
	Data       interface{} `json:"data"`
	Message    string      `json:"message"`
}

type HandlerData struct {
	ID   string                 `json:"id"`
	Data map[string]interface{} `json:"steps"`
}

func (r *ResponseBody) Error(message string, code int) {
	r.Data = nil
	r.Message = message
	r.StatusCode = code
}

const (
	OK      = 200
	CREATED = 201

	BAD_REQUEST        = 400
	UNAUTHORIZED       = 401
	UNAUTHENTICATED    = 403
	METHOD_NOT_ALLOWED = 405

	INTERNAL_SERVER_ERROR = 500
	GATEWAY_ERROR         = 502
)
