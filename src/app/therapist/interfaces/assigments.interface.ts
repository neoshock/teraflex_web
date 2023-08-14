/*Interfaz que se usa para asignar las tareas a un usuario*/
export interface AssignTasksToPatientI {
    tasks: BodyTaskToAssignI[];
    dueDate: string;
}

/*Interfaz que contiene el detalle de la tarea a asignar, va dentro de la interfaz de arriba*/
export interface BodyTaskToAssignI {
    description: string,
    estimatedTime: number,
    id: number
}

/*Respuesta de la API una vez que se registran las asignaciones*/
export interface ApiResponseAssignTasksToPatientI {
    statusCode: number;
    message: string;
    data: {
        identifiers: [
            {
                id: number;
            }
        ],
        generatedMaps: [
            {
                id: number;
                status: boolean;
                estimatedTime: number;
                isCompleted: boolean;
                createdAt: string;
                updatedAt: string;
            }
        ],
        raw: [
            {
                id: number,
                status: true,
                estimated_time: number,
                is_completed: boolean,
                created_at: string,
                updated_at: string
            }
        ]
    }
}

/*Interfaz de respuesta de la API para visualizar la lista de tareas asignadas a un paciente por ID*/
export interface ApiResponseListTasksAssignsToPatientI {
    statusCode: number;
    message: string;
    data: TaskDetailAssignToPatientI[];
}

/*Interfaz que viene dentro de la interfaz de arriba, contiene el detalle de la tarea asignada*/
export interface TaskDetailAssignToPatientI {
    id: number;
    task: {
        id: number;
        title: string;
        description: string;
        estimatedTime: number;
    }
    createdAt: string;
    dueDate: string;
}

/*Interfaz de respuesta de la API para cuando se obtiene el detalle de una tarea Asignada*/
export interface ApiResponseTaskDetailExtendAssignToPatientI{
    statusCode: number;
    message: string;
    data: TaskDetailExtendAssignToPatientI[];
}

/*Ibterfaz que viene dentro de data de la interfaz de arriba*/
export interface TaskDetailExtendAssignToPatientI{
    assignmentId: number;
    taskId: number;
    title: string;
    description: string;
    estimatedTime: number;
    isCompleted: boolean;
    createdAt: string;
    dueDate: string;
    files: [
      {
        id: number;
        url: string;
        title: string;
        type: string;
      }
    ]
}
