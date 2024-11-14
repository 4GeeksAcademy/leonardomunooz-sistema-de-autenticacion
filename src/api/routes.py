"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required 

from werkzeug.security import generate_password_hash, check_password_hash

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# hashea el password
def set_password(password):
    return generate_password_hash(password)

def check_password(hash_password, password):
    return check_password_hash(hash_password,password)

@api.route('/users', methods=['POST', 'GET'])
@jwt_required()    
def get_all_users():
    users = User()
    users = users.query.all()
    users = list(map(lambda item : item.serialize(),users))

    return jsonify(users), 200


@api.route("/user", methods = ["POST"])

def add_user():

    body = request.json
    email  = body.get("email", None)
    password = body.get("password", None)

    if email is None or password is None:
        return jsonify("Necesitas las credenciales"), 400
    
    password = set_password(password)
    user = User(email = email, password = password)

    if user is    None: 
        return jsonify({"Message": "User already exists"}), 409
    else :
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
    body = request.json

    # captura los campos que el cliente le mande. Si no manda nada o algo ocurre retorna None
    email = body.get("email", None)
    password  = body.get("password", None)

    # valida si alguno de los campos esta incompleto o mal escritos
    if email is None or password is None:
        return jsonify("Necesitas las credenciales"), 400
    # caso contrario, crea el usuario y se hace un query para ver si el email de la bd es el mismo que envia el cliente
    else :
        # hashea el password
        user = User()
        user = user.query.filter_by(email = email).one_or_none()
        
        if user is None : 
            return jsonify({"Message": "User not found!"}),404
        else :
            # valida si el password de la tabla User es igual a la que envia el cliente
            if check_password(user.password, password):
                token = create_access_token(identity = user.id)
                return jsonify({"token": token}), 200
            else :
                return jsonify({"Message": "bad credentials"}), 400
