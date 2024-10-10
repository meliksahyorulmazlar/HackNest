import os

from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def main_page():
    key = os.environ.get("key")
    return render_template("index.html",key=key)

@app.route("/match")
def match():
    return render_template("match.html")

@app.route("/login")
def login():
    return render_template("login.html")

if __name__ == "__main__":
    app.run()

#indigo black purple