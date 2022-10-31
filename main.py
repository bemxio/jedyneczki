from fastapi.responses import FileResponse, PlainTextResponse
from fastapi import FastAPI, Request, HTTPException
import uvicorn

from vulcan import Keystore, Account, Vulcan
import os

# load JSON files needed to log into vulcan
with open("keystore.json", "r") as file:
    keystore = Keystore.load(file)

with open("account.json", "r") as file:
    account = Account.load(file)

app = FastAPI(openapi_url=None)
vulcan = Vulcan(keystore, account)

# needed to show stuff in the front-end
@app.exception_handler(404)
async def handler(request: Request, exception: HTTPException):
    path = "static" + request.url.path

    if not os.path.exists(path):
        return PlainTextResponse("404 Not Found", status_code=404)
    
    if path.endswith("/"):
        path += "index.html"
    
    return FileResponse(path)

@app.get("/api/get_grades")
async def get_grades():
    if not vulcan.student:
        await vulcan.select_student()
    
    grades = {}

    async for grade in await vulcan.data.get_grades():
        if grade.value is None:
            continue
        
        subject = grade.column.subject

        if subject.name not in grades:
            grades[subject.name] = []

        grades[subject.name].append(grade.value)

    return grades

if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)