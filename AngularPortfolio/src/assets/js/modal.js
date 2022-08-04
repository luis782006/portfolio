$(document).ready(function(){
    
    var AgregarExp=$('.modalAgregarExp');
    AgregarExp.addClass(AgregarExp.attr('data-animate-in'));

    AgregarExp.on('hide.bs.modal',function(){
        
        $(this).addClass($(this).attr('data-animate-out')); 
        $(this).removeClass($(this).attr('data-animate-in'));
    })
})
 
   // alert("¡Hola..., Soy un mensaje de alerta...!");

