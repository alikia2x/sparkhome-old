import time, requests

def time_executor(data):
    payload = data['payload']
    target = data['loc']
    path = data['path']
    if not data['payload'] and (target == "now" or target == ""):
        current_timestamp = round(time.time(),3)
        a=requests.get("https://google.com")
        result = {
            "type": "text",
            "content": str(current_timestamp)
        }
        return result
