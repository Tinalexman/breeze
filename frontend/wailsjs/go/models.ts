export namespace controller {
	
	export class Controller {
	    name: string;
	    id: string;
	    model: string;
	
	    static createFrom(source: any = {}) {
	        return new Controller(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.id = source["id"];
	        this.model = source["model"];
	    }
	}

}

export namespace model {
	
	export class ModelData {
	    type: string;
	    default: any;
	
	    static createFrom(source: any = {}) {
	        return new ModelData(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.type = source["type"];
	        this.default = source["default"];
	    }
	}
	export class Model {
	    name: string;
	    id: string;
	    description: string;
	    metadata: {[key: string]: ModelData};
	
	    static createFrom(source: any = {}) {
	        return new Model(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.id = source["id"];
	        this.description = source["description"];
	        this.metadata = this.convertValues(source["metadata"], ModelData, true);
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
