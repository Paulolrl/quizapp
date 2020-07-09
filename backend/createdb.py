import requests
import json
import random
from database import DataBase
import base64

def decode(b):
    return base64.b64decode(b).decode('utf-8')

cats = {
    'GENERAL': {
        'id': '9',
        'name': {'pt': 'Geral', 'en': 'General'},
        'color': '#b1f0e8',
        'identifier': 'GENERAL',
        'description': {'pt': 'Perguntas de conhecimento geral', 'en': 'general knowledge questions'},
        'count': 0
    },
    'MOVIES': {
        'id': '11',
        'name': {'pt': 'Filmes', 'en': 'Movies'},
        'color': '#eb7ab6',
        'identifier': 'MOVIES',
        'description': {'pt': 'Perguntas sobre filmes', 'en': 'movies questions'},
        'count': 0
    },
    'GEOGRAPHY': {
        'id': '22',
        'name': {'pt': 'Geografia', 'en': 'Geography'},
        'color': '#e0f567',
        'identifier': 'GEOGRAPHY',
        'description': {'pt': 'Perguntas sobre geografia', 'en': 'geography questions'},
        'count': 0
    },
    'VIDEO_GAMES': {
        'id': '15',
        'name': {'pt': 'Video Games', 'en': 'Video Games'},
        'color': '#ca67f5',
        'identifier': 'VIDEO_GAMES',
        'description': {'pt': 'Perguntas sobre video games', 'en': 'video games questions'},
        'count': 0
    },
    'HISTORY': {
        'id': '23',
        'name': {'pt': 'História', 'en': 'History'},
        'color': '#804204',
        'identifier': 'HISTORY',
        'description': {'pt': 'Perguntas sobre história', 'en': 'history questions'},
        'count': 0
    },
    'SPORTS': {
        'id': '21',
        'name': {'pt': 'Esportes', 'en': 'Sports'},
        'color': '#94d1c4',
        'identifier': 'SPORTS',
        'description': {'pt': 'Perguntas sobre esportes', 'en': 'sports questions'},
        'count': 0
    }
}

questions = []
db = DataBase()

for cat in cats:
    print('-------------------------------------------')
    response = requests.get('https://opentdb.com/api.php?amount=40&category='+cats[cat]['id']+'&type=multiple&encode=base64')
    content = json.loads(response.content)['results']
    del cats[cat]['id']
    db.insert_category(cats[cat])
    for question in content:
        r = random.randint(0, 3)
        answers = []
        correctans = decode(question['correct_answer'])
        wrongans = question['incorrect_answers']

        for i in range(4):
            if i == r:
                answers.append({'id': i, 'text': correctans, 'count': 0})
            else:
                index = i if i < r else i - 1
                answers.append({'id': i, 'text': decode(wrongans[index]), 'count': 0})

        new_question = {}
        new_question['text'] = decode(question['question'])
        new_question['answers'] = answers
        new_question['right_answer'] = r
        new_question['language'] = 'en'
        new_question['difficulty'] = decode(question['difficulty']).upper()
        new_question['type'] = 'MULTIPLE_CHOICE'
        new_question['category'] = cat

        questions.append(new_question)

db.insert_multiple_questions(questions)
db.find_questions({})
