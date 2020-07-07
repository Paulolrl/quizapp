from pymongo import MongoClient
from random import randint
import json


class DataBase():
    def __init__(self):
        with open('config.json') as f:
            config = json.load(f)
        client = MongoClient(config['mongokey'])
        self.db = client.quizz

    def insert_question(self, attrs):
        self.db.questions.insert_one(attrs)

    def find_questions(self, filters):
        return list(self.db.questions.find(filters, {'_id': False}))

    def insert_category(self, attrs):
        self.db.category.insert_one(attrs)

    def get_all_categories(self):
        return list(self.db.category.find({}, {'_id': False}))

# q = {'type': 'MULTIPLE_CHOICE', 'text': 'quanto é 1+2?', 'answers': [{'id': 1, 'text': '2'}, {'id': 2, 'text': '3'}], 'right_answer': 2, 'category': 'MATH'}
# db = DataBase()
# db.insert_question(q)
# db.find_questions({'type': 'MULTIPLE_CHOICE'})
# db.insert_category({'name': {'pt': 'Geral'}, 'color': '#ff0000', 'identifier': 'GENERAL', 'description': {'pt': 'perguntas de conhecimento geral'}})
# print(db.get_all_categories())
