import json
import websockets
import uuid
import time
import asyncio

url = "ws://127.0.0.1:8000/v1/" + str(uuid.uuid1())


async def test_websocket():
    async with websockets.connect(url) as websocket:
        message = {
            "query": "现在的时间",
            "schemes": ["time://","time://now"],
            "time": time.time(),
        }
        await websocket.send(json.dumps(message))
        response = await websocket.recv()
        print(response)

asyncio.run(test_websocket())