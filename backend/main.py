from fastapi import FastAPI
from onesearch.wsConnecting.wsRoot import router as websocket_router
from onesearch.httpConnecting.httpRoot import router as http_router

app = FastAPI()

connections = {}


app.include_router(websocket_router)

app.include_router(http_router)
