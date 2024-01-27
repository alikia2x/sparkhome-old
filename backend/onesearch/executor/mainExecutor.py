from onesearch.executor.queryCompletion import queryCompletionExecutor
import asyncio, logging, concurrent

class Executor:
    def __init__(self, data, websocket):
        self.data = data
        self.websocket = websocket

    async def execute(self):
        match self.data["task"]:
            case 'completion':
                response={}
                result = await queryCompletionExecutor(self.data)
                response["result"] = result
                logging.info(response)
                await self.websocket.send_json(response)

                
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