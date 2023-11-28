import asyncio
import json
import logging
from fastapi import FastAPI, WebSocket
import time
from onesearch.executor import Executor
from onesearch.parser import parse
from onesearch.

app = FastAPI()

connections = {}


# 返回当前时间
@app.get("/time_process")
def get_time():
    return {"time_process": time.time()}


@app.websocket("/ws/{uid}")
async def websocket_endpoint(websocket: WebSocket, uid: str):
    print(uid)
    await websocket.accept()

    connections[uid] = {"websocket": websocket, "task": None}

    try:
        while True:
            data = await websocket.receive_text()
            await handle_query(uid, data)
    except Exception as e:
        logging.error(e)
    finally:
        del connections[uid]


async def handle_query(uid: str, data: str):
    websocket = connections[uid]["websocket"]

    if connections[uid]["task"] and not connections[uid]["task"].done():
        connections[uid]["task"].cancel()

    task = asyncio.create_task(process_query(uid, data, websocket))
    await task


async def process_query(uid: str, query: str, websocket: WebSocket):
    query_dict = parse(query)
    executor = Executor(query_dict)

    result = await executor.execute(query_dict, websocket)

    if result:
        result = json.dumps(result)
        await websocket.send_text(result)
