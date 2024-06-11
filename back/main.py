from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
from typing import Optional
import uvicorn
import shutil

app = FastAPI()

@app.post("/generate_n_images/")
async def generate_n_images(
    img: UploadFile = File(...), 
    prompt: str = Form(...), 
    neg_prompt: str = Form(...), 
    product_category: str = Form(...), 
    controlnet_scale: Optional[float] = Form(1.0), 
    n: Optional[int] = Form(1)
):
    # mock
    with open(f"received_{img.filename}", "wb") as buffer:
        shutil.copyfileobj(img.file, buffer)
    return FileResponse(f"received_{img.filename}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
