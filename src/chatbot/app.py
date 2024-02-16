import os
import streamlit as st
import gdown  # Import gdown library
import subprocess  # Import subprocess module for executing terminal commands
import speech_recognition as sr  # Import speech_recognition library for speech-to-text

from llama_index import (
    SimpleDirectoryReader,
    VectorStoreIndex,
    ServiceContext,
)
from llama_index.llms import LlamaCPP
from llama_index.llms.llama_utils import (
    messages_to_prompt,
    completion_to_prompt,
)
from langchain.schema import (SystemMessage, HumanMessage, AIMessage)

def init_page() -> None:
    st.set_page_config(
        page_title="Personal Chatbot"
    )
    st.header("Personal Chatbot")
    st.sidebar.title("Options")

def download_model(file_id, output_path):
    gdown.download(f"https://drive.google.com/uc?id={file_id}", output_path, quiet=False)

# Specify the file ID for the llama-2-7b-chat.Q2_K.gguf file on Google Drive
file_id = "13tDZbrSRM7S0VakE6I8VUQexcrTzvVvT"

# Check if the model file exists before downloading
# if not os.path.exists(model_path):
#     download_model(file_id, model_path)  # Download to the specified path

def select_llm() -> LlamaCPP:
    try:
        return LlamaCPP(
            temperature=0.1,
            max_new_tokens=500,
            context_window=3900,
            generate_kwargs={},
            model_kwargs={"n_gpu_layers": 1},
            messages_to_prompt=messages_to_prompt,
            completion_to_prompt=completion_to_prompt,
            verbose=True,
        )
    except Exception as e:
        st.error(f"Error initializing LlamaCPP: {e}")
        return None


def init_messages() -> None:
    clear_button = st.sidebar.button("Clear Conversation", key="clear")
    if clear_button or "messages" not in st.session_state:
        st.session_state.messages = [
            SystemMessage(
                content="you are a helpful AI assistant. Reply your answer in markdown format."
            )
        ]

def get_answer(llm, messages) -> str:
    response = llm.complete(messages)
    return response.text

def text_to_speech(text):
    subprocess.run(['say', text])

def speech_to_text():
    recognizer = sr.Recognizer()

    with sr.Microphone() as source:
        print("Please speak something...")
        recognizer.adjust_for_ambient_noise(source)  # Adjust for ambient noise
        audio = recognizer.listen(source)

    try:
        print("Transcribing...")
        text = recognizer.recognize_google(audio)
        return text
    except sr.UnknownValueError:
        print("Sorry, I couldn't understand what you said.")
    except sr.RequestError as e:
        print("Could not request results from Google Speech Recognition service; {0}".format(e))

def main() -> None:
    init_page()
    llm = select_llm()

    if llm is None:
        st.error("Failed to initialize LlamaCPP. Please check the error message above.")
        return

    init_messages()

    st.write("Choose an input method:")
    input_method = st.selectbox("", ["Text", "Speech"])

    if input_method == "Text":
        if user_input := st.chat_input("Input your question!"):
            st.session_state.messages.append(HumanMessage(content=user_input))
            answer = get_answer(llm, user_input)
            st.session_state.messages.append(AIMessage(content=answer))
    else:
        if st.button("Record Speech"):
            st.write("Recording...")
            question = speech_to_text()  # Get speech input
            if question:
                st.session_state.messages.append(HumanMessage(content=question))
                answer = get_answer(llm, question)
                st.session_state.messages.append(AIMessage(content=answer))

    read_aloud = st.button("Read Aloud")
    if read_aloud:
        last_answer = st.session_state.messages[-1].content
        if not st.session_state.get("reading", False):
            st.session_state.reading = True
            text_to_speech(last_answer)  # Speak the answer
        else:
            subprocess.run(['pkill', '-f', 'say'])  # Stop reading
            st.session_state.reading = False  # Reset reading flag

    messages = st.session_state.get("messages", [])
    for message in messages:
        if isinstance(message, AIMessage):
            with st.chat_message("assistant"):
                st.markdown(message.content)
        elif isinstance(message, HumanMessage):
            with st.chat_message("user"):
                st.markdown(message.content)


if __name__ == "__main__":
    main()
