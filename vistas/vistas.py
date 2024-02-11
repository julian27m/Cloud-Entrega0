from flask import request
from flask_jwt_extended import jwt_required, create_access_token
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from datetime import datetime
import hashlib
import os

from modelos import \
    db, \
    Tarea, TareaSchema, \
    CategoriaTarea, CategoriaTareaSchema, \
    Categoria, CategoriaSchema, \
    Usuario, UsuarioSchema


tarea_schema = TareaSchema()
categoria_tarea_schema = CategoriaTareaSchema()
categoria_schema = CategoriaSchema()
usuario_schema = UsuarioSchema()
    
class VistaSignIn(Resource):

    def post(self):
        print("request.json:", request.json)
        usuario = Usuario.query.filter(Usuario.usuario == request.json["usuario"]).first()
        if usuario is None:
            contrasena_encriptada = hashlib.md5(request.json["contrasena"].encode('utf-8')).hexdigest()
            foto = request.json.get('foto')
            if foto:
                ruta_foto = guardar_foto(foto)
            else:
                # Establecer una foto por defecto si no se proporciona ninguna foto
                ruta_foto = "avatar.png"

            nuevo_usuario = Usuario(usuario=request.json["usuario"], contrasena=contrasena_encriptada, foto=ruta_foto)
            db.session.add(nuevo_usuario)
            db.session.commit()
            token_de_acceso = create_access_token(identity=nuevo_usuario.id)
            return {"mensaje": "usuario creado exitosamente", "id": nuevo_usuario.id}
        else:
            return "El usuario ya existe", 404

    def put(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        usuario.contrasena = request.json.get("contrasena", usuario.contrasena)
        db.session.commit()
        return usuario_schema.dump(usuario)

    def delete(self, id_usuario):
        usuario = Usuario.query.get_or_404(id_usuario)
        db.session.delete(usuario)
        db.session.commit()
        return '', 204

    def guardar_foto(foto):
        directorio_fotos = os.getenv('DIRECTORIO_FOTOS', '/app/fotos_perfil')
        if not os.path.exists(directorio_fotos):
            os.makedirs(directorio_fotos)
                
        nombre_foto = 'foto_' + str(datetime.now().timestamp()) + '.jpg'
        ruta_foto = os.path.join(directorio_fotos, nombre_foto)
        foto.save(ruta_foto)

        return ruta_foto


class VistaLogIn(Resource):

    def post(self):
        contrasena_encriptada = hashlib.md5(request.json["contrasena"].encode('utf-8')).hexdigest()
        usuario = Usuario.query.filter(Usuario.usuario == request.json["usuario"],
                                       Usuario.contrasena == contrasena_encriptada).first()
        db.session.commit()
        print(str(hashlib.md5("admin".encode('utf-8')).hexdigest()))
        if usuario is None:
            return "El usuario no existe", 404
        else:
            token_de_acceso = create_access_token(identity=usuario.id)
            return {"mensaje": "Inicio de sesión exitoso", "token": token_de_acceso, "id": usuario.id}


class VistaTareas(Resource):
    @jwt_required()
    def get(self, id_usuario):
        tareas = Tarea.query.filter_by(usuario=id_usuario).all()
        return [tarea_schema.dump(tarea) for tarea in tareas]

    @jwt_required()
    def post(self, id_usuario):
        nuevo_tarea = Tarea( \
            texto=request.json["texto"], \
            fechaInicial=request.json["fechaInicial"], \
            fechaFinal=request.json["fechaFinal"], \
            estado=request.json["estado"], \
            usuario=id_usuario  # Asociar la tarea con el usuario actual
        )
        
        db.session.add(nuevo_tarea)
        db.session.commit()
        return tarea_schema.dump(nuevo_tarea)


class VistaTarea(Resource):
    @jwt_required()
    def get(self, id_tarea):
        tarea = Tarea.query.get_or_404(id_tarea)
        return tarea_schema.dump(tarea)
        
    @jwt_required()
    def put(self, id_tarea):
        tarea = Tarea.query.get_or_404(id_tarea)
        tarea.texto = request.json["texto"]
        tarea.fechaInicial = request.json["fechaInicial"]
        tarea.fechaFinal = request.json["fechaFinal"]
        tarea.estado = request.json["estado"]
        db.session.commit()
        return tarea_schema.dump(tarea)

    @jwt_required()
    def delete(self, id_tarea):
        tarea = Tarea.query.get_or_404(id_tarea)
        categoriasTarea = CategoriaTarea.query.filter_by(tarea=id_tarea).all()
        if not categoriasTarea:
            db.session.delete(tarea)
            db.session.commit()
            return '', 204
        else:
            return 'La tarea se está usando en diferentes categorías', 409



class VistaCategorias(Resource):
    @jwt_required()
    def get(self, id_usuario):
        categorias = Categoria.query.filter_by(usuario=str(id_usuario)).all()
        resultados = [categoria_schema.dump(categoria) for categoria in categorias]
        tareas = Tarea.query.all()
        for categoria in resultados:
            for categoria_tarea in categoria['tareas']:
                self.actualizar_tareas_util(categoria_tarea, tareas)

        return resultados

    @jwt_required()
    def post(self, id_usuario):
        nueva_categoria = Categoria( \
            nombre = request.json["nombre"], \
            descripcion = request.json["descripcion"], \
            tareas = [], \
            usuario = id_usuario \
        )
        for categoria_tarea in request.json["tareas"]:
            nueva_categoria_tarea = CategoriaTarea( \
                tarea = int(categoria_tarea["idTarea"])
            )
            nueva_categoria.tareas.append(nueva_categoria_tarea)
            
        db.session.add(nueva_categoria)
        db.session.commit()
        return tarea_schema.dump(nueva_categoria)
        
    def actualizar_tareas_util(self, categoria_tarea, tareas):
        for tarea in tareas: 
            if str(tarea.id)==categoria_tarea['tarea']:
                categoria_tarea['tarea'] = tarea_schema.dump(tarea)
        

class VistaCategoria(Resource):
    @jwt_required()
    def get(self, id_categoria):
        categoria = Categoria.query.get_or_404(id_categoria)
        tareas = Tarea.query.all()
        resultados = categoria_schema.dump(Categoria.query.get_or_404(id_categoria))
        categoriaTareas = resultados['tareas']
        for categoriaTarea in categoriaTareas:
            for tarea in tareas: 
                if str(tarea.id)==categoriaTarea['tarea']:
                    categoriaTarea['tarea'] = tarea_schema.dump(tarea)
        
        return resultados

    @jwt_required()
    def put(self, id_categoria):
        categoria = Categoria.query.get_or_404(id_categoria)
        categoria.nombre = request.json["nombre"]
        categoria.descripcion = request.json["descripcion"]
    
        for categoria_tarea in categoria.tareas:
            borrar = self.borrar_tarea_util(request.json["tareas"], categoria_tarea)
                
            if borrar==True:
                db.session.delete(categoria_tarea)
            
        db.session.commit()
        
        for categoria_tarea_editar in request.json["tareas"]:
            if categoria_tarea_editar['id']=='':
                nueva_categoria_tarea = CategoriaTarea( \
                    tarea = int(categoria_tarea_editar["idTarea"])
                    
                )
                categoria.tareas.append(nueva_categoria_tarea)
            else:
                categoria_tarea = self.actualizar_tarea_util(categoria.tareas, categoria_tarea_editar)
                db.session.add(categoria_tarea)
        
        db.session.add(categoria)
        db.session.commit()
        return tarea_schema.dump(categoria)

    @jwt_required()
    def delete(self, id_categoria):
        categoria = Categoria.query.get_or_404(id_categoria)
        db.session.delete(categoria)
        db.session.commit()
        return '', 204 
        
    def borrar_tarea_util(self, categoria_tareas, categoria_tarea):
        borrar = True
        for categoria_tarea_editar in categoria_tareas:
            if categoria_tarea_editar['id']!='':
                if int(categoria_tarea_editar['id']) == categoria_tarea.id:
                    borrar = False
        
        return(borrar)

    def actualizar_tarea_util(self, categoria_tareas, categoria_tarea_editar):
        categoria_tarea_retornar = None
        for categoria_tarea in categoria_tareas:
            if int(categoria_tarea_editar['id']) == categoria_tarea.id:
                categoria_tarea.tarea = categoria_tarea_editar['idTarea']
                categoria_tarea_retornar = categoria_tarea
                
        return categoria_tarea_retornar
        