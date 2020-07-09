from pymongo import MongoClient
from random import randint
import json


class DataBase():
    def __init__(self):
        with open('config.json') as f:
            config = json.load(f)
        client = MongoClient(config['mongokey'])
        self.db_quiz = client.quiz
        self.db_admin = client.administrative

    def insert_question(self, attrs):
        self.db_quiz.questions.insert_one(attrs)
        self.db_quiz.category.update_one({'identifier': attrs['category']}, {'$inc': {'count': 1}})

    def insert_multiple_questions(self, questions):
        self.db_quiz.questions.insert_many(questions)
        categories = self.get_all_categories()
        for cat in categories:
            count = self.db_quiz.questions.find({'category': cat['identifier']}).count()
            self.db_quiz.category.update_one({'identifier': cat['identifier']}, {'$set': {'count': count}})

    def find_questions(self, filters):
        return list(self.db_quiz.questions.find(filters))

    def insert_category(self, attrs):
        self.db_quiz.category.insert_one(attrs)

    def get_all_categories(self):
        return list(self.db_quiz.category.find({}))

    def create_user(self, uid, attrs):
        categories = self.get_all_categories()
        progress = {}
        for cat in categories:
            progress[cat['identifier']] = 0
        attrs['_id'] = uid
        attrs['progress'] = progress
        self.db_admin.users.insert_one(attrs)
        return attrs

    def update_progress(self, uid, category, value):
        self.db_admin.users.update_one({'_id': uid}, {'$set': {'progress.'+category: value }})

    def update_question(self, _id, ans_id):
        self.db_quiz.questions.update_one({'_id': _id}, {'$inc': {'answers.'+str(ans_id)+'.count': 1 }})

    def get_users(self):
        return list(self.db_admin.users.find({}))

    def get_user(self, uid):
        return self.db_admin.users.find({'_id': uid})

# db = DataBase()
# db.create_user('fad89fds7a98fkw', {'email': 'paulo.lu@g.com', 'name': 'Paulo Lucas Rodrigues'})
# print(db.get_users())
# db.update_progress('fad89fds7a98fkw', 'MATH', 5)
# print(db.get_users())


# q = {'type': 'MULTIPLE_CHOICE', 'text': 'quanto é 1+2?', 'answers': [{'id': 0, 'text': '2', 'count': 0}, {'id': 1, 'text': '3', 'count': 2}], 'right_answer': 1, 'category': 'MATH'}
# db = DataBase()
# db.insert_question(q)
# db.find_questions({'type': 'MULTIPLE_CHOICE'})
# db.insert_category({'name': {'pt': 'Matemática'}, 'color': '#00ff00', 'identifier': 'MATH', 'description': {'pt': 'perguntas de matemática'}})
# print(db.get_all_categories())
