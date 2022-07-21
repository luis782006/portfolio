export class Persona {
    id?:number;
    nombre:String;
    apellido:String;
    descripcion_acerca:String;
    photo_url:String;
    path_git:String;
    path_link:String;


    constructor(id:number, nombre:String,apellido:String,descripcion_acerca:String, photo_url:String,path_git:String,path_link:String){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.descripcion_acerca=descripcion_acerca;
        this.photo_url=photo_url;
        this.path_git=path_git;
        this.path_link=path_link;
    }
}
