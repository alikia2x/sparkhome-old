from fastapi import WebSocket, APIRouter
import asyncio
import logging
from onesearch.executor.mainExecutor import Executor
from onesearch.parser import parse

router = APIRouter()

connections = {}


@router.websocket("/ws/{uid}")
async def websocket_endpoint(websocket: WebSocket, uid: str):
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
    connections[uid]["task"] = task
    await task


async def process_query(uid: str, query: str, websocket: WebSocket):
    query_dict = parse(query)
    executor = Executor(query_dict, websocket)
    await executor.execute()
