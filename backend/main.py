from fastapi import FastAPI
import time
import uvicorn

app = FastAPI()

# 返回当前时间
@app.get("/time")
def get_time():
    return {"time": time.time()}

if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
