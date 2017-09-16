#!/usr/bin/python
import cgi
import cgitb
import newspaper
from newspaper import Article
import requests
import json
import re
cgitb.enable()
form = cgi.FieldStorage()
print("Content-type: text/html\n\n")

url = ""
short_url = ""

try:
    url = form.getvalue("site")
    short_url = form.getvalue("u")
except ValueError:
    url = ""
    short_url = ""

if url == "" or str(url) == "None":
    print("Error")
else:
    article = Article(url)
    article.download()
    article.parse()
    data = {}
    data["author"] = article.authors
    data["text"] = article.text.encode('ascii','ignore')

    # Author data, article data, website data
    availables = [True, True, True]
    if len(data["text"]) < 20:
        availables[1] = False
    if len(data["author"]) > 1:
        availables[0] = False
    elif len(data["author"]) == 0:
        availables[0] = False
    else:
        data["author"] = data["author"][0]

    if availables[0] is True:
        data["author_data"] = requests.post('http://138.197.83.96:8080/author', data["author"][0]).text
    if availables[1] is True:
        data["article_data"] = requests.post('http://138.197.83.96:8080/article', {"author": data["author"], "urlx": url, "text": data["text"]}).text
    if availables[2] is True:
        data["site_data"] = requests.post('http://138.197.83.96:8080/site', short_url).text

    print_data = str(data).replace("\"", "\\\"").replace("'", "\"")
    print_data = re.sub("[\"][ a-zA-Z]*:[ a-zA-Z]*[\"]", "\" : \"", print_data)
    print("[" + print_data + "]")
