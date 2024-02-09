from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from flask_restful import Api

from modelos import db
from vistas import \
    VistaTarea, VistaTareas, \
    VistaCategoria, VistaCategorias, \
    VistaSignIn, VistaLogIn

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dbapp.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = 'frase-secreta'
app.config['PROPAGATE_EXCEPTIONS'] = True

app_context = app.app_context()
app_context.push()

db.init_app(app)
db.create_all()

cors = CORS(app)

api = Api(app)
api.add_resource(VistaSignIn, '/signin')
api.add_resource(VistaLogIn, '/login')
api.add_resource(VistaTareas, '/tareas')
api.add_resource(VistaTarea, '/tarea/<int:id_tarea>')
api.add_resource(VistaCategorias, '/categorias/<int:id_usuario>')
api.add_resource(VistaCategoria, '/categoria/<int:id_categoria>')

jwt = JWTManager(app)
