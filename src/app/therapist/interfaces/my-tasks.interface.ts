/*Interfaz de respuesta de la API cuando se listan las tareas*/
export interface ApiResponseMyTasksI {
  statusCode: number;
  message: string;
  data: MyTasksI[];
}

/*Interfaz para obtener obtener el listado de las tareas*/
export interface MyTasksI {
  id: number;
  title: string;
  description: string;
  estimatedTime: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  disabled: boolean;
  categoryIds: number[];
}

/*Interfaz para cuando se registra una tarea*/
export interface RegisterTaskDetailI {
  title: string;
  description: string;
  status: boolean;
  estimatedTime: number;
  isPublic: boolean;
  categoryIds: number[];
  fileIds: number[];
}

/*Interfaz de respuesta de la API para cuando se registra una tarea*/
export interface ApiResponseRegisterTaskDetailI {
  statusCode: number;
  message: string;
  data: TaskDetailResponseApiI[];
}

/*Interfaz del detalla de registro de la tarea, viene dentro de la data*/
export interface TaskDetailResponseApiI {
  title: string;
  description: string;
  status: boolean;
  estimatedTime: number;
  isPublic: boolean;
  createdById: number;
  updatedById: number;
  updatedAt: string;
  id: number;
  createdAt: string;
}

/*Interfaz de respuesta de la API cuando se obtiene una tarea por el ID*/
export interface ApiResponseGetTaskByIdI {
  statusCode: number;
  message: string;
  data: TaskDetailByIdI;
}

/*Detalle de la tarea que viene dentro de la data al consumir servicio de task by ID*/
export interface TaskDetailByIdI {
  id: number,
  title: string;
  description: string;
  estimatedTime: number,
  isPublic: boolean,
  createdAt: string;
  updatedAt: string;
  categories: [
    {
      id: number;
      name: string;
    }
  ],
  files: [
    {
      id: number;
      url: string;
      title: string;
      type: string;
    }
  ]
}

/*Interfaz de respuesta de la API para cuando se edita una tarea*/
export interface ApiResponseEditTaskDetailI{
  statusCode: number;
  message: string;
  data: {
    generatedMaps: any[];
    raw: any[];
    affected: number;
  }
}

/*Interfaz necesaria para editar el detalle de una tarea*/
export interface EditTaskDetailI {
  title: string;
  description: string;
  status: boolean;
  estimatedTime: number;
  isPublic: boolean;
  categories: number[];
}