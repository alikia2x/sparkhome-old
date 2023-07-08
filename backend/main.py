from fastapi import FastAPI
from datetime import datetime
import uvicorn

app = FastAPI()


if __name__ == '__main__':
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=False)
