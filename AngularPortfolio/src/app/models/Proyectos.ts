export class Proyectos{
    id?:number;
    nombre_proyecto:string;
    descripcion_proyecto:string;
    photo_url:string;
    link_url:string;

    constructor(nombre_proyecto:string,descripcion_proyecto:string,photo_url:string,link_url:string){
        this.nombre_proyecto=nombre_proyecto;
        this.descripcion_proyecto=descripcion_proyecto;
        this.photo_url=photo_url;
        this.link_url=link_url;
    }
}