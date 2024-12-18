// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {controller} from '../models';
import {model} from '../models';
import {project} from '../models';
import {route} from '../models';

export function AddControllerMethod(arg1:controller.ModifyControllerMethodPayload):Promise<void>;

export function CreateController(arg1:controller.CreateControllerPayload):Promise<void>;

export function CreateModel(arg1:model.CreateModelPayload):Promise<void>;

export function CreateProject(arg1:project.CreateNewProjectPayload):Promise<void>;

export function CreateRoute(arg1:route.CreateRoutePayload):Promise<void>;

export function DeleteControllerByID(arg1:string):Promise<void>;

export function DeleteModelByID(arg1:string):Promise<void>;

export function DeleteRouteByID(arg1:string):Promise<void>;

export function GetAllControllers(arg1:string):Promise<Array<controller.Controller>>;

export function GetAllModels(arg1:string):Promise<Array<model.Model>>;

export function GetAllRoutes(arg1:string):Promise<Array<route.Route>>;

export function GetControllerByID(arg1:string):Promise<controller.Controller>;

export function GetModelByID(arg1:string):Promise<model.Model>;

export function GetModelTypes():Promise<Array<string>>;

export function GetRecentProjects():Promise<Array<string>>;

export function GetRouteByID(arg1:string):Promise<route.Route>;

export function Load():Promise<void>;

export function LoadProject(arg1:string):Promise<void>;

export function RemoveControllerMethod(arg1:controller.ModifyControllerMethodPayload):Promise<void>;

export function RenameControllerMethod(arg1:controller.ModifyControllerMethodPayload):Promise<void>;

export function Save():Promise<void>;

export function SaveCurrentProject():Promise<void>;

export function SaveProject(arg1:string):Promise<void>;

export function SaveTarget(arg1:string):Promise<void>;

export function UpdateController(arg1:controller.UpdateControllerPayload):Promise<void>;

export function UpdateModel(arg1:model.UpdateModelPayload):Promise<void>;
