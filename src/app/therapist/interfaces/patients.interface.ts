/*Respuesta de la api cuando se obtienen los pacientes de un terapista*/
export interface ApiResponseGetMyPatientsI {
    data: MyPatientsI[];
}

/*Respuesta dentro de la data*/
export interface MyPatientsI {
    id: number;
    createdAt: string;
    updatedAt: string;
    patient: MyPatientDetailI;
}

/*Respuesta dentro de patient de la interfaz anterior*/
export interface MyPatientDetailI {
    id: 9,
    firstName: string;
    lastName: string;
    docNumber: string
    phone: string;
    birthDate: string;
    description: string;
    status: boolean;
    createdBy: number;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
    role: string;
    categoryId: number;
}

/*Respuesta de la API cuando se busca un usuario por el ID*/
export interface ApiResponseGetMyPatientByIdI {
    data: MyPatientDetailByIdI;
    message: string;
}

/*Interfaz que viene dentro de data cuando se obtienen los datos de un paciente por ID*/
export interface MyPatientDetailByIdI {
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    description: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    role: string;
    categoryId: number;
    categoryName: string;
    status: boolean;
}

/*Interfaz de respuesta para cuando se crea un paciente*/
export interface ApiResponseRegisterPatientI {
    data: string;
    message: string;
}

/*Interfaz requerida (body) para cuando se va a registrar un paciente*/
export interface RegisterPatientI {
    docNumber: string;
    firstName: string;
    lastName: string;
    phone: string;
    description: string;
    birthDate: string;
}

/*Interfaz con body requerido para editar un paciente*/
export interface EditMyPatientBodyI{
    phone: string;
    description: string;
    birthDate: string;
    firstName: string;
    lastName: string;
  }

/*Interfaz de respuesta para cuando se edita un usuario de tipo PACIENTE*/
export interface ApiResponseEditPatientI {
    data: EditPatientDetailI[];
    message: string;
}

/*Interfaz que viene dentro de data, la cual es la respuesta cuando se edita un paciente*/
export interface EditPatientDetailI {
    id: number;
    firstName: string;
    lastName: string;
    docNumber: string;
    phone: string;
    description: string;
    birthDate: string;
    createdAt: string;
    updatedAt: string;
    role: string;
}

