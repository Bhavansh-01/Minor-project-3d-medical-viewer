from transformers import pipeline

# Load the question-answering model
qa_pipeline = pipeline("question-answering", model="distilbert-base-cased-distilled-squad")

def answer_question(question, paragraph):
    # Generate an answer to the question based on the input paragraph
    answer = qa_pipeline(question=question, context=paragraph)
    return answer['answer']

def main():
    # Example paragraph
    paragraph_text = """
    Natural Language Processing (NLP) is a subfield of artificial intelligence (AI) that focuses on the interaction between computers and human language. It involves the development of models and algorithms that enable computers to understand, interpret, and generate human language in a valuable way.
    """

    # Example question
    question = "What is Natural Language Processing (NLP)?"

    # Get the answer
    answer = answer_question(question, paragraph_text)
    print(f"Question: {question}")
    print(f"Answer: {answer}")

if __name__ == "__main__":
    main()
