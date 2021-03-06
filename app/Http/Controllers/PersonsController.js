'use strict'
const database = use('Database')
const Persona=use('App/Model/Person');
const User=use('App/Model/User');
const Validator = use('Validator');
const Hash = use('Hash')

class PersonsController {
    * Registro(request,response){
        const persona = new Persona()
        persona.nombres = "Brenda Laura"
        persona.apellidos = "Martell Medina"
        persona.email = "brendalauramartell@gmail.com"
        persona.status = "Activo"
        yield persona.save()
        yield response.redirect('/log')
    }
    
    * DUser(request,response){
        const data = request.all();
        const Datos_Persona= yield database.from('users').innerJoin('people','users.id_persona','people.id').where('users.numero_aut',data.usuario);
        yield response.json(Datos_Persona);
    }
    
    * insert(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Persona.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const user = new User()
            const persona=new Persona();
            user.id_persona = data.id_persona
            persona.nombres = data.nombres
            persona.apellidos = data.apellidos
            persona.email = data.email
            persona.status = "Activo"
            const id_persona=yield persona.save()
            if(id_persona==true){
                user.id_persona=persona.id;
                user.id_rol = '1'
                var num_tarj=Math.floor((Math.random() * 999999) + 100000);
                user.numero_aut = "0000" + num_tarj;
                user.password = yield Hash.make(data.password)
                user.estado= "A"
                yield user.save()
                yield response.redirect('/cat_ctes')
            }else{
            yield response.send('No se ingresaron los datos')
            }
        }
    }
    
    * insertCte(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Persona.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const user = new User()
            const persona=new Persona();
            user.id_persona = data.id_persona
            persona.nombres = data.nombres
            persona.apellidos = data.apellidos
            persona.email = data.email
            persona.status = "Activo"
            const id_persona=yield persona.save()
            if(id_persona==true){
                user.id_persona=persona.id;
                user.id_rol = '1'
                var num_tarj=Math.floor((Math.random() * 999999) + 100000);
                user.numero_aut = "0000" + num_tarj;
                user.password = yield Hash.make(data.password)
                user.estado= "A"
                yield user.save()
                //yield response.redirect('/cat_ctes')
            yield response.sendView('registro',{persona,user});
            }else{
            yield response.sendView('registro',{persona,user});
            }
        }
    }
    
    * insertEmp(request,response){
        const data=request.all();
        const validacion = yield Validator.validate(data,Persona.validaInsert)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const user = new User()
            const persona=new Persona();
            user.id_persona = data.id_persona
            persona.nombres = data.nombres
            persona.apellidos = data.apellidos
            persona.email = data.email
            persona.status = "Activo"
            const id_persona=yield persona.save()
            if(id_persona==true){
                user.id_persona=persona.id;
                user.id_rol = '2'
                var num_tarj=Math.floor((Math.random() * 999999) + 100000);
                user.numero_aut = "1111" + num_tarj;
                user.password = yield Hash.make(data.password)
                user.estado= "A"
                yield user.save()
                yield response.redirect('/cat_emp')
            }else{
            yield response.send('No se ingresaron los datos')
            }
        }
    }
    
    * update(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Persona.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const user = new User()
            const persona= yield Persona.findBy('id', data.id_persona)
            persona.nombres = data.nombres
            persona.apellidos = data.apellidos
            persona.email = data.email
            const id_persona=yield persona.save()
            yield response.redirect('/cat_ctes')
            yield response.send("Actualizacion Exitosa")
        }
    }
    
    * updateEmp(request,response){
        const data=request.all();
        console.log(data)
        const validacion = yield Validator.validate(data,Persona.validaActualizacion)
        if(validacion.fails()){
            yield response.send('No se ingresaron correctamente los datos')
        }else{
            const persona= yield Persona.findBy('id', data.id_persona)
            persona.nombres = data.nombres
            persona.apellidos = data.apellidos
            persona.email = data.email
            const id_persona=yield persona.save()
            console.log(data);
            const user=yield User.findBy('numero_aut',data.numero_aut)
            user.estado=data.estado
            const i_user=yield user.save()
            yield response.redirect('/cat_emp')
            yield response.send("Actualizacion Exitosa")
        }
    }
    
    * filt_ctes(request,response){
        const data = request.all();
        const subquery = database.from('users')
        .where('id_rol',1)
        .select('id_persona');
        
        const clientes= yield database
        .from('people')
        .whereIn('id',subquery);
        console.log(clientes);
        yield response.redirect('/cat_ctes')
    }
    
    ext_tarjeta(){
        return tarjeta;
    }
}

module.exports = PersonsController
