from fastapi import FastAPI, WebSocket
import time
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        # 处理接收到的消息，例如将消息原样发送回客户端
        await websocket.send_text(f"Message text was: {data}")
