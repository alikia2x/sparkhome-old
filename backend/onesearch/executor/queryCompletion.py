import requests, json, logging, aiohttp

async def request_google(query, language="zh-CN"):
    url = f"https://www.google.com/complete/search?q={query}&cp=4&client=gws-wiz&xssi=t&gs_pcrt=undefined&hl={language}&authuser=0&psi=EZ1HZYWXK6fe1e8P7JSE-A8.1699192082457&dpr=2&newwindow=1"
    
    async with aiohttp.ClientSession() as session:
        async with session.get(url, proxy="http://127.0.0.1:7890", timeout=2) as response:
            try:
                text = await response.text()
                print(text)
                lines = text.splitlines()
                response_data = lines[1]
                response = json.loads(response_data)[0]
                result = [{"type":"search","content":item[0]} for item in response]                 
                return result
            except Exception as e:
                logging.error(e)
                return []

async def request_baidu(query):
    url = f"https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd={query}&csor=1"

    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            try:
                data = await response.text()
                data = json.loads(data)
                result = [item["q"] for item in data["g"]]
                return result
            except Exception as e:
                logging.error(e)
                return []

async def queryCompletionExecutor(data):
    engine = data["engine"]
    query = data["query"]
    print(data)
    if engine == "google":
        result = await request_google(query)
    elif engine == "baidu":
        result = await request_baidu(query)
    else:
        result = []
    return result