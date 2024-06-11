from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import FileResponse
import uvicorn
import shutil

from generation import generate_n_images

app = FastAPI()

@app.post("/process/")
async def process(
    img: UploadFile = File(...), 
    mask_path: str = Form(...), 
    product_category: str = Form(...),
):
    # mock
    result: str = await generate_n_images(img=img, mask_path=mask_path, product_category=product_category)
    return FileResponse(result)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
