from flask import Flask, render_template, request, jsonify
from transformers import pipeline
from flask_cors import CORS 
app = Flask(__name__)
CORS(app)
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer_question(question, paragraph):
    answer = qa_pipeline(question=question, context=paragraph)
    return answer['answer']

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        paragraph = data.get('paragraph', '')
        question = data.get('question', '')
        answer = answer_question(question, paragraph)
        return jsonify({'paragraph': paragraph, 'question': question, 'answer': answer})
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
