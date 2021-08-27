# import type hintes
from typing import Dict
import uvicorn

# import dependencies
from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# required to bind a phyisical folder to a virtual path
from fastapi.staticfiles import StaticFiles
from starlette.middleware.cors import CORSMiddleware

from database.database import engine
from database.base import Base

from router import images
from router import tags

# create migrations
Base.metadata.create_all(bind=engine)

# initialize application
app = FastAPI()

# app = CORSMiddleware(
#     app=app,
#     allow_origins=["http://localhost:3000"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"])

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="127.0.0.1", port=8000, reload=True)

# bind images folder to images path
app.mount(path="/images", app=StaticFiles(directory="images"), name="static")

# register routers
app.include_router(router=images.router, prefix="/images")
app.include_router(router=tags.router, prefix="/tags")
