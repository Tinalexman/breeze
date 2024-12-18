export namespace controller {
	
	export class Controller {
	    name: string;
	    description: string;
	    id: string;
	    modelID: string;
	    methods: string[];
	
	    static createFrom(source: any = {}) {
	        return new Controller(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.id = source["id"];
	        this.modelID = source["modelID"];
	        this.methods = source["methods"];
	    }
	}
	export class CreateControllerPayload {
	    name: string;
	    description: string;
	    modelID: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateControllerPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.modelID = source["modelID"];
	    }
	}
	export class ModifyControllerMethodPayload {
	    id: string;
	    method: string;
	
	    static createFrom(source: any = {}) {
	        return new ModifyControllerMethodPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.method = source["method"];
	    }
	}
	export class UpdateControllerPayload {
	    name: string;
	    description: string;
	    id: string;
	    modelID: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateControllerPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.id = source["id"];
	        this.modelID = source["modelID"];
	    }
	}

}

export namespace model {
	
	export class CreateModelPayload {
	    name: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateModelPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	    }
	}
	export class ModelData {
	    name: string;
	    type: string;
	    default: any;
	
	    static createFrom(source: any = {}) {
	        return new ModelData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.type = source["type"];
	        this.default = source["default"];
	    }
	}
	export class Model {
	    name: string;
	    id: string;
	    description: string;
	    metadata: ModelData[];
	
	    static createFrom(source: any = {}) {
	        return new Model(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.id = source["id"];
	        this.description = source["description"];
	        this.metadata = this.convertValues(source["metadata"], ModelData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class UpdateModelPayload {
	    id: string;
	    name: string;
	    description: string;
	    metadata: ModelData[];
	
	    static createFrom(source: any = {}) {
	        return new UpdateModelPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.description = source["description"];
	        this.metadata = this.convertValues(source["metadata"], ModelData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace network {
	
	export class HandlerData {
	    id: string;
	    steps: {[key: string]: any};
	
	    static createFrom(source: any = {}) {
	        return new HandlerData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.steps = source["steps"];
	    }
	}

}

export namespace project {
	
	export class CreateNewProjectPayload {
	    name: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateNewProjectPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	    }
	}

}

export namespace route {
	
	export class CreateRoutePayload {
	    name: string;
	    description: string;
	    serviceID: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateRoutePayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.serviceID = source["serviceID"];
	    }
	}
	export class RouteData {
	    id: string;
	    method: string;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new RouteData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.method = source["method"];
	        this.path = source["path"];
	    }
	}
	export class ModifyRouteDataPayload {
	    id: string;
	    data: RouteData;
	
	    static createFrom(source: any = {}) {
	        return new ModifyRouteDataPayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.data = this.convertValues(source["data"], RouteData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Route {
	    name: string;
	    id: string;
	    description: string;
	    serviceID: string;
	    data: RouteData[];
	
	    static createFrom(source: any = {}) {
	        return new Route(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.id = source["id"];
	        this.description = source["description"];
	        this.serviceID = source["serviceID"];
	        this.data = this.convertValues(source["data"], RouteData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

export namespace service {
	
	export class CreateServicePayload {
	    name: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateServicePayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	    }
	}
	export class Service {
	    name: string;
	    description: string;
	    id: string;
	    data: network.HandlerData[];
	
	    static createFrom(source: any = {}) {
	        return new Service(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.description = source["description"];
	        this.id = source["id"];
	        this.data = this.convertValues(source["data"], network.HandlerData);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class UpdateServicePayload {
	    name: string;
	    id: string;
	    description: string;
	
	    static createFrom(source: any = {}) {
	        return new UpdateServicePayload(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.id = source["id"];
	        this.description = source["description"];
	    }
	}

}

