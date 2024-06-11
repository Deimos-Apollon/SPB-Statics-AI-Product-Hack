from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse, StreamingResponse
import uvicorn
import io
import shutil
from fastapi.middleware.cors import CORSMiddleware
from generation import generate_n_images

app = FastAPI()

@app.post("/process")
async def process(
    img: UploadFile = File(...), 
    mask_path: str = Form(...), 
    product_category: str = Form(...),
):
    # mock
    result: str = await generate_n_images(img=img, mask_path=mask_path, product_category=product_category)
    return FileResponse(result)


origins = [
    "http://127.0.0.1:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Authorization"],
)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
