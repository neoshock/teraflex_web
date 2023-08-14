import Swal from "sweetalert2";

export class SweetAlerts{

    /*Alerta que muestra botones de aceptar o cancelar*/
    async  alertConfirmCancel(title: string, message: string): Promise<any>{
        const result = await Swal.fire({
            title: title,
            text: message,
            icon: 'warning',
            iconColor: '#FC3B56',
            showCancelButton: true,
            confirmButtonColor: '#007BBD',
            cancelButtonColor: '#FC3B56',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        })
        return result
    }
}