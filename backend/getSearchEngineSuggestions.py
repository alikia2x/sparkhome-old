import requests, json, logging


def request_google(query, language="zh-CN"):
    url = "https://www.google.com/complete/search?q=" + query + "&cp=4&client=gws-wiz&xssi=t&gs_pcrt=undefined&hl="+language+"&authuser=0&psi=EZ1HZYWXK6fe1e8P7JSE-A8.1699192082457&dpr=2&newwindow=1"
    r = requests.get(url)
    try:
        response = json.loads(r.text.splitlines()[1])[0]
        result = []
        for item in response:
            result.append(item[0])
        return result
    except Exception as e:
        logging.error(e)
        return []


def request_baidu(query):
    url = "https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=" + query + "&csor=1"
    r = requests.get(url)
    try:
        response = r.json()["g"]
        result = []
        for item in response:
            result.append(item["q"])
        return result
    except Exception as e:
        logging.error(e)
        return []


print(request_google("维基百"))
