from flask import Flask, json, request
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
        return f(*args, **kwargs)
    return decorated_function

@api.route('/quizz/questions', methods=['POST'])
@protected
def get_questions():
    filters = json.load(request.data['filters'])
    return json.dumps(db.find_questions(filters))

@api.route('/quizz/categories', methods=['GET'])
@protected
def get_categories():
    return json.dumps(db.get_all_categories())

if __name__ == '__main__':
    default_app = firebase_admin.initialize_app()
    print(default_app.name)
    db = DataBase()
    api.run(host= '0.0.0.0')
