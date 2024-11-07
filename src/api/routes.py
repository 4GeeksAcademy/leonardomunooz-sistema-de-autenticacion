"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route("/user", methods = ["POST"])
def add_user():

    body = request.json

    email  = body.get("email", None)
    password = body.get("password", None)

    if email is None or password is None:
        return jsonify("Necesitas las credenciales"), 400
    
    user = User(email = email, password = password)
    #  validar si existe o no el ususario en la base de datos 
    try : 
        db.session.add(user)
        db.session.commit()
        return jsonify({"Message": "User created"}), 201
    except Exception as error:
        print(error.args)
        db.session.rollback()
        return jsonify({"Message":f"error : {error}"}), 500




@api.route("/login", methods = ["POST"])
def login():
    # captura lo que el cliente le manda
    body = request.json

    # captura los campos que el cliente le mande. Si no manda nada o algo ocurre retorna None
    email = body.get("email", None)
    password  = body.get("password", None)

    # valida si alguno de los campos esta incompleto o mal escritos
    if email is None or password is None:
        return jsonify("Necesitas las credenciales"), 400
    # caso contrario, crea el usuario y se hace un query para ver si el email de la bd es el mismo que envia el cliente
    user = User()
    user = user.query.filter_by(email = email).one_or_none()

    if user is None : 
        return jsonify({"Message": "bad credentials"}),404
    else :
        # valida si el password de la tabla User es igual a la que envia el cliente
        if user.password == password:
            return jsonify({"Message": "Tienes permisos"}), 200
        else :
            return jsonify({"Message": "bad credentials"}), 400


    return jsonify([]),200