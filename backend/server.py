from flask import Flask, json, request
from bson import json_util
from functools import wraps
from firebase_admin import auth
from database import DataBase
import firebase_admin

companies = [{"id": 1, "name": "Company One"}, {"id": 2, "name": "Company Two"}]

api = Flask(__name__)

def protected(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        try:
            id_token = request.headers['Authorization']
            decoded_token = auth.verify_id_token(id_token)
            uid = decoded_token['uid']
        except:
            return 'Não autorizado', 403
        return f(uid, *args, **kwargs)
    return decorated_function

@api.route('/quiz/questions', methods=['POST'])
@protected
def get_questions(uid):
    filters = json.loads(request.data)['filters']
    return json_util.dumps(db.find_questions(filters))

@api.route('/quiz/questions/random', methods=['POST'])
@protected
def get_random_questions(uid):
    body = json.loads(request.data)
    size = body['size']
    filters = {} if 'filters' not in body else body['filters']
    return json_util.dumps(db.find_random_questions(size, filters))

@api.route('/quiz/questions/update', methods=['POST'])
@protected
def update_question(uid):
    print('entrou no update_question', request.data)
    body = json_util.loads(request.data)
    db.update_question(body['_id'], body['ans_id'])
    return 'Questão atualizada'

@api.route('/quiz/categories', methods=['GET'])
@protected
def get_categories(uid):
    return json_util.dumps(db.get_all_categories())

@api.route('/user/create', methods=['POST'])
@protected
def create_user(uid):
    attrs = json_util.loads(request.data)
    return json_util.dumps(db.create_user(uid, attrs))

@api.route('/user/update_progress', methods=['POST'])
@protected
def update_progress(uid):
    body = json_util.loads(request.data)
    db.update_progress(uid, body['category'], body['value'])
    return 'Progresso atualizado'

@api.route('/user', methods=['GET'])
@protected
def get_user(uid):
    return json_util.dumps(db.get_user(uid))


if __name__ == '__main__':
    default_app = firebase_admin.initialize_app()
    print(default_app.name)
    db = DataBase()
    api.run(host= '0.0.0.0')
