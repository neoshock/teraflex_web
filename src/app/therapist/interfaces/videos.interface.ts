import { SafeResourceUrl } from "@angular/platform-browser";

export interface ApiResponseMyVideosI {
    statusCode: number;
    message: string;
    data: GetAllMyVideosI[];
}

/*Respuesta de cuando se registra un video*/
export interface ApiResponseRegisterVideoLocalI {
    data: RegisterVideoLocalResponse[];
    message: string;
}

/*Para registrar un video en formato .mp4*/
export interface UploadVideos {
    isPublic: boolean;
    description: string;
    files: File;
}

/*Interfaz para registrar un enlace*/
export interface RegisterVideoLinkI {
    url: string;
    title: string;
    isPublic: boolean;
    description: string;
}


/*Listar todos los videos*/
export interface GetAllMyVideosI {
    id: number;
    url: string,
    title: string;
    type: string;
    isPublic: boolean;
    description: string;
    createdAt: string;
    updatedAt: string;
}

/*Interfaz para registrar un video como archivo .mp4*/
export interface RegisterVideoLocal {
    isPublic: boolean;
    description: string;
    files: FormData[];
}

/*Respuesta dentro de data, cuando se registra un video*/
export interface RegisterVideoLocalResponse {
    id: number;
    title: string;
    url: string; /*Esto estaba con comillas*/
}

/*Interfaz de respuesta para cuando se intenta obtener un video que no es descargable*/
export interface ApiResponseGetVideo{
    message: string;
    error: string;
    statusCode: number;
}

/*Interfaz de respuesta de la API para cuando se edita un video*/
export interface ApiResponseEditDesactivateVideoI{
    statusCode: number;
    message: string;
}

/*Interfaz que contiene el body para editar un video*/
export interface editVideoI{
    isPublic: boolean;
    description: string;
}