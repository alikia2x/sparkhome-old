import json

from fastapi import FastAPI, WebSocket
import time
from scheme.executor import Executor
from scheme.parser import parse

app = FastAPI()


# 返回当前时间
@app.get("/time")
def get_time():
    return {"time": time.time()}


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        # 接收客户端发送的消息
        data = await websocket.receive_text()
        parsed_data = parse(data)
        executor = Executor(parsed_data)
        result_data = executor.execute()
        # 处理接收到的消息，例如将消息原样发送回客户端
        await websocket.send_text(json.dumps(result_data))