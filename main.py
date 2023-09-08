from flask import Flask

app = Flask(__name__)

from flask import render_template

@app.route("/")
def index(name=None):
    return render_template('index.html', name=name)

from flask import request

from ask_question_to_pdf import gpt3_completion

from ask_question_to_pdf import ask_question_to_pdf

@app.route('/prompt',methods=['POST'])
def prompt():
    prompt = request.form['prompt']
    return {'answer':gpt3_completion(prompt)}

@app.route('/question',methods=['GET'])
def question():
    return {'answer':ask_question_to_pdf(request.form['file'])}

from ask_question_to_pdf import verification

@app.route('/answer',methods=['POST'])
def answer():
    question = request.form['question']
    prompt = request.form['prompt']
    return {'answer':verification(question, prompt)}