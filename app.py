from flask import Flask, render_template, request, jsonify
from model_prediction import *

app = Flask(__name__)

text = ""
predicted_emotion = ""
predicted_emotion_img_url = ""

# Renderize a página HTML
@app.route("/")
def home():
    entries = show_entry()
    return render_template("index.html", entries=entries)
    
# Configure a função: Preveja a emoção


# Salve a entrada
@app.route("/save-entry", methods=["POST"])
def save_entry():
    save_data = request.json
    if not save_data:
        return jsonify({
            "status": "error",
            "message": "Dados de entrada ausentes na solicitação."
        }), 400

    date = save_data.get("date")
    text = save_data.get("text")
    emotion = save_data.get("emotion")

    if not (date and text and emotion):
        return jsonify({
            "status": "error",
            "message": "Dados de entrada incompletos."
        }), 400

    # Agora, você deve salvar esses dados em um local persistente, como um arquivo CSV.
    # Supondo que você tenha uma função para salvar em um arquivo CSV, algo assim:

    save_to_csv(date, text, emotion)

    entries = show_entry()  # Atualiza as entradas após o salvamento
    return render_template("index.html", entries=entries)

# Função para salvar no arquivo CSV (você pode ajustar conforme necessário)
def save_to_csv(date, text, emotion):
    with open("./static/assets/data_files/data_entry.csv", "a") as file:
        file.write(f"{date},{text},{emotion}\n")

if __name__ == "__main__":
    app.run(debug=True)
