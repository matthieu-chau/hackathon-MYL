from flask import Flask, render_template, request

from ask_question_to_pdf import gpt3_completion

app = Flask(__name__)

@app.route('/')
def template(prompt=None):
    return render_template('index.html', prompt=prompt)

@app.route('/prompt', methods=['POST'])
def prompt():
    return {'answer':gpt3_completion(request.form['prompt'])}