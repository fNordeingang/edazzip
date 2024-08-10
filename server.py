import datetime
import random

import pytz
from bottle import Bottle, request, response, run, static_file
from escpos import printer

p = printer.Network(host="172.28.0.50", port=4210, profile="TM-T88IV")
app = Bottle()


@app.hook("after_request")
def enable_cors():
    """
    You need to add some headers to each request.
    Don't use the wildcard '*' for Access-Control-Allow-Origin in production.
    """
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "PUT, GET, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = (
        "Origin, Accept, Content-Type, X-Requested-With, X-CSRF-Token"
    )


@app.route("/")
def send_static():
    return static_file("index.html", root="./static")


@app.post("/text")
def print_text():
    text = request.forms.get("text")
    if not text:
        return "nope"
    d = printer.Dummy()
    d.set(width=3, height=3, font="b", smooth=True, align="center")
    now = datetime.datetime.now(pytz.timezone("Europe/Berlin"))
    d.text(now.strftime("%d.%m.%Y %H:%M") + "\r\n")
    d.text(text + "\r\n")
    d.cut()
    print(d.output)
    p._raw(d.output)
    return "OK"


@app.route("/time")
def print_time():
    p.set(width=3, height=3, font="b", smooth=True, align="center")
    now = datetime.datetime.now(pytz.timezone("Europe/Berlin"))
    p.text(now.strftime("%d.%m.%Y %H:%M") + "\r\n")
    p.cut()
    return "OK"


@app.route("/print")
def do_print():
    p.set(width=1, height=1, smooth=True, align="center")
    p.text("Amtliche\r\n")
    p.set(width=3, height=3, font="b", smooth=True, align="center")
    p.text("Wartemarke\r\n")
    p.set(width=2, height=2, smooth=True, align="center")
    p.text("Salzamt Zehdehnik\r\n\r\n")
    p.set(width=8, height=8, align="center", font="b", smooth=True)
    nummer = random.randrange(100, 999)
    p.text(f"A{nummer}\r\n")
    p.set(width=1, height=1, smooth=True, align="center")
    p.text("Kategorie: Kurzfristige Anfragen ohne Termin\r\n")
    p.text("Bitte nehmen Sie Platz. Sie werden aufgerufen.\r\n")

    wartezeit = [
        "Lange",
        "5 Minuten",
        "12,4 Minuten",
        "Sehr lange",
        "1 PT",
        "Ja",
        "Nein",
        "Vielleicht",
        "GURU MEDITATION",
        "3.14",
        "LOL",
        "10 Minuten",
        "68 Minuten",
        "EOB",
        "13:37",
        "$wartezeit",
        "Error",
        "No space left on device",
        "Nach der Mittagspause",
        "Fruehstens morgen",
        "42 Minuten",
    ]
    p.text(f"Geschaetzte Wartezeit: {random.choice(wartezeit)}\r\n")
    p.cut()
    response.content_type = "text/plain"
    return f"{nummer}"


run(app, host="0.0.0.0", port=31337)
