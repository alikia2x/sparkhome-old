import time
from fastapi import APIRouter

router = APIRouter()

connections = {}


@router.get("/v1/time_process")
async def websocket_endpoint():
    return {"time_process": time.time()}
