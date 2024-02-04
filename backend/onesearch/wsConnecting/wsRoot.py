import json
from fastapi import WebSocket, APIRouter
from fastapi.responses import JSONResponse
import asyncio
import logging
from onesearch.executor.mainExecutor import Executor
from onesearch.parser import parse
import httpx, requests
import concurrent.futures
import time,traceback

router = APIRouter()


@router.websocket("/v1/{uid}")
async def websocket_endpoint(websocket: WebSocket, uid: str):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            try:
                message = json.loads(data)
            except ValueError:
                return JSONResponse(content={"error": "Invalid JSON"}, status_code=400)

            # NLP processing
            from onesearch.NLP.mainProcessor import Processor
            processor = Processor(message)
            tasks = processor.process()["tasks"]
            logging.info(str(tasks))
            
            for task in tasks:
                from onesearch.executor.mainExecutor import Executor
                executor = Executor(task, websocket)
                # 使用 asyncio.create_task 创建并行任务
                asyncio.create_task(executor.execute())
                
    except Exception as e:
        logging.error(traceback.print_exc())

# async def process_query(message: str, websocket: WebSocket):
#     response = {"processed_content": f"Processed: {message}"}

#     if message == "a":
#         # 使用 ThreadPoolExecutor 创建线程池来执行计算密集型任务
#         with concurrent.futures.ThreadPoolExecutor() as executor:
#             # 直接调用 compute_intensive_task 并返回结果
#             result = await asyncio.to_thread(compute_intensive_task)
#             response["result"] = result
#     elif message == "time://":
#         response["result"]=time.time()

#     await websocket.send_json(response)

# def compute_intensive_task():
#     # 模拟计算密集型任务
#     result = 0
#     for _ in range(500000000):
#         result += 1
#     return result

# def payload():
#     response = requests.get("https://google.com")
#     return response.text

# async def handle_query(uid: str, data: str):
#     query = json.loads(data)
#     websocket = connections[uid]["websocket"]

#     if query["time"] < connections[uid]["newest"]:
#         return

#     task_list = []
#     for scheme in query["schemes"]:
#         task = asyncio.create_task(process_query(uid, scheme, websocket))
#         task_list.append(task)

#     while task_list:
#         done, task_list = await asyncio.wait(task_list, return_when=asyncio.FIRST_COMPLETED)
#         for task in done:
#             result = await task
#             await websocket.send_text(str(result))

# async def process_query(uid: str, query: str, websocket: WebSocket):
#     print("processing query", query)
#     query_dict = parse(query)
#     executor = Executor(query_dict, websocket)
#     result = await executor.execute()
#     return result
