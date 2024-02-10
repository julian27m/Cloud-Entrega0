from flask_sqlalchemy import SQLAlchemy
from marshmallow import fields, Schema
from marshmallow_sqlalchemy import SQLAlchemyAutoSchema

db = SQLAlchemy()

class Tarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    texto = db.Column(db.String(128))
    fechaInicial = db.Column(db.String(128))
    fechaFinal = db.Column(db.String(128))
    estado = db.Column(db.String(128))
    #usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    #idUsuario
    #idCategoria

class CategoriaTarea(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    #cantidad = db.Column(db.Numeric)
    tarea = db.Column(db.Integer, db.ForeignKey('tarea.id'))
    categoria = db.Column(db.Integer, db.ForeignKey('categoria.id'))

class Categoria(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(128))
    descripcion = db.Column(db.String(128))
    tareas = db.relationship('CategoriaTarea', cascade='all, delete, delete-orphan')
    usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'))
    

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    usuario = db.Column(db.String(50))
    contrasena = db.Column(db.String(50))
    foto = db.Column(db.String(255))
    #tareas = db.relationship('Tarea', cascade='all, delete, delete-orphan')
    categorias = db.relationship('Categoria', cascade='all, delete, delete-orphan')

class TareaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Tarea
        load_instance = True
        
    id = fields.String()

class CategoriaTareaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = CategoriaTarea
        include_relationships = True
        include_fk = True
        load_instance = True
        
    id = fields.String()
    tarea = fields.String()

class CategoriaSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Categoria
        include_relationships = True
        include_fk = True
        load_instance = True
        
    id = fields.String()
    tareas = fields.List(fields.Nested(CategoriaTareaSchema()))

class UsuarioSchema(SQLAlchemyAutoSchema):
    class Meta:
        model = Usuario
        include_relationships = True
        load_instance = True
        
    id = fields.String()
