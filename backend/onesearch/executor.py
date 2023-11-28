from onesearch.executor.time_executor import time_executor


class Executor:
    def __init__(self, data, websocket):
        self.data = data

    def execute(self):
        result = []
        match self.data["scheme"]:
            case 'time':
                result.append(time_executor(self.data))
        return result
