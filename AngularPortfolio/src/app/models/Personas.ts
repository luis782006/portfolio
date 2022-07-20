export class Persona {
    id:number;
    nombre:String;
    apellido:String;
    photo_url:String;
    path_git:String;
    path_link:String;


    constructor(id:number, nombre:String,apellido:String, photo_url:String,path_git:String,path_link:String){
        this.id=id;
        this.nombre=nombre;
        this.apellido=apellido;
        this.photo_url=photo_url;
        this.path_git=path_git;
        this.path_link=path_link;
    }
}
