export class Experiencia {
    id?:number;
    nombre_empresa:String;
    inicio_empresa?:String;
    fin_empresa?:String;
    descripcion_empresa:String;
    photo_url_empresa?:String;
    

    constructor(id:number, nombre_empresa:String , inicio_empresa:String , fin_empresa:String, descripcion_empresa:String , photo_url_empresa:String) {
        this.id = id;
        this.nombre_empresa = nombre_empresa;
        this.inicio_empresa = inicio_empresa;
        this.fin_empresa = fin_empresa;
        this.descripcion_empresa = descripcion_empresa;
        this.photo_url_empresa = photo_url_empresa;
    }
}    