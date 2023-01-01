# -*- coding: utf-8 -*-
from time import time
import traceback
import flask
import requests
import base64
import chardet
import urllib
import sys
import codecs
import cv2
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from gevent import pywsgi
from flask import jsonify, Response, abort, request, send_file
from flask_cors import CORS, cross_origin

sys.stdout = codecs.getwriter("utf-8")(sys.stdout.detach())

headers = {
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
}

not_fond = {"code": 404, "info": "你走错地了~(￣▽￣)"}
para_error = {"code": -1, "info": "参数错误(* ￣︿￣)"}
b64_error = {"code": -2, "info": "Base64 解码错误T_T"}
unknown_err = {"code": 114514, "info": "未知错误.┗|｀O′|┛"}


def getFavicon(url):
    headers = {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36",
    }
    domain = urlparse(url).scheme+"://"+urlparse(url).netloc
    headers["referer"] = domain

    # 先发送head请求, 获取目标URL的类型，仅在目标URL回传为HTML时，我们才解析数据
    head = requests.head(url)
    if "Content-Type" in head.headers and "html" in head.headers["Content-Type"]:
        page = requests.get(url, headers=headers, timeout=1)
        codec = chardet.detect(page.content)["encoding"]
        # if codec != "gbk":
        #     codec = "utf-8"
        page.encoding = codec
        # bs4解析网页内容
        soup = BeautifulSoup(page.text, features="html.parser")
        # 获取icon链接和网站标题
        icon_link = soup.find("link", rel="shortcut icon")
        title = soup.title.string

        if icon_link is None:
            icon_link = soup.find("link", rel="icon")
        if icon_link is None:
            data = {}
            data["code"] = 0
            data["title"] = base64.b64encode(
                urllib.parse.quote(title).encode()).decode()
            data["icon"] = base64.b64encode(urllib.parse.quote(
                domain + '/favicon.ico').encode()).decode()
            return data
        icon_url = icon_link["href"]

        # 判断相对路径等复杂情况
        if urlparse(icon_url).netloc == "":
            if icon_url[0] != "/" and domain[-1] != "/":
                domain += "/"
            icon_url = domain+icon_url

        print("解析标题:"+title, "图标:"+icon_url)
        data = {}
        data["code"] = 0
        data["title"] = base64.b64encode(
            urllib.parse.quote(title).encode()).decode()
        data["icon"] = base64.b64encode(
            urllib.parse.quote(icon_url).encode()).decode()
    else:
        data = {}
        data["code"] = 0
        data["title"] = domain
        data["icon"] = ""
    return data


app = flask.Flask(__name__)
CORS(app, resources=r'/*')  # 注册CORS, "/*" 允许访问所有api


@app.route('/icon', methods=['get'])
@cross_origin()
def geticon():
    try:
        url = flask.request.args.get('url')
    except:
        return jsonify(para_error)
    if url == None:
        return jsonify(para_error)
    # 解码参数中的base64
    try:
        url = base64.b64decode(url).decode()
    except ValueError:
        return jsonify(b64_error)
    print("收到请求:"+url)
    # 简单的反爬虫策略，加上user-agent可以应对绝大部分网站
    domain = urlparse(url).scheme+"://"+urlparse(url).netloc
    headers["referer"] = domain
    # 当遇到requests等错误时返回空
    try:
        data = getFavicon(url)
        return jsonify(data)
    except requests.exceptions.ConnectionError:
        data = {}
        data["code"] = 0
        data["title"] = urlparse(url).netloc
        data["icon"] = ""
        return jsonify(data)
    except:
        traceback.print_exc()
        err_dict = unknown_err
        err_dict["detail"] = traceback.format_exc()
        return jsonify(err_dict)


@app.route('/time', methods=['get'])
def gettime():
    return str(int(time()*1000))


@app.route('/ping', methods=['get'])
def ping():
    data = {}
    data["code"] = 0
    data["message"] = "万叶，我的叶宝🤤"
    return jsonify(data)


@app.route('/about', methods=['get'])
def about():
    with open("./about.html", "r", encoding="utf-8") as fp:
        return fp.read()


@app.route('/bing', methods=['get'])
def bing():
    with open("./bing/today_bing.json", "r", encoding="utf-8") as fp:
        return Response(fp.read(), mimetype='application/json')


@app.route('/index.html', methods=['GET'])
@app.route('/', methods=['GET'])
def index():
    try:
        with open("index.html", encoding="utf-8") as fp:
            return fp.read()
    except FileNotFoundError:
        abort(404)
    except:
        abort(500)

@app.route('/js/<file_name>')
def js(file_name):
    try:
        with open("./js/"+file_name, encoding="utf-8") as fp:
            return fp.read()
    except FileNotFoundError:
        abort(404)
    except:
        abort(500)

@app.route('/css/<file_name>')
def css(file_name):
    try:
        with open("./css/"+file_name, encoding="utf-8") as fp:
            return Response(fp.read(), mimetype='text/css')
    except FileNotFoundError:
        abort(404)
    except:
        abort(500)

@app.route('/font/<file_name>')
def font(file_name):
    try:
        return send_file("./font/"+file_name, mimetype="application/font-woff2")
    except FileNotFoundError:
        abort(404)
    except:
        abort(500)

@app.route('/img/<file_name>')
def img(file_name):
    try:
        return send_file("./img/"+file_name)
    except FileNotFoundError:
        abort(404)
    except:
        abort(500)

@app.errorhandler(404)
def page_not_found():
    with open("404.html", encoding="utf-8") as fp:
        return fp.read()

@app.errorhandler(500)
def page_not_found():
    with open("500.html", encoding="utf-8") as fp:
        return fp.read()

@app.errorhandler(403)
def page_not_found():
    with open("403.html", encoding="utf-8") as fp:
        return fp.read()

@app.errorhandler(429)
def page_not_found():
    with open("429.html", encoding="utf-8") as fp:
        return fp.read()

server = pywsgi.WSGIServer(('localhost', 5003), app)
server.serve_forever()
