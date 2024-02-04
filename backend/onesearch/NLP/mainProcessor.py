class Processor:
    def __init__(self, data):
        self.data = data
    def process(self):
        for task in self.data['tasks']:
            task['queryId']=self.data['queryId']
        return self.data