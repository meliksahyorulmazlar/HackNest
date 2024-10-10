from flask import Flask,render_template

app = Flask(__name__)

@app.route("/")
def main_page():
    return render_template("index.html")

@app.route("/match")
def match():
    return render_template("match.html")


if __name__ == "__main__":
    app.run()

#indigo black purple