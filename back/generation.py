from typing import Optional
import shutil

async def generate_n_images(
    img, 
    mask_path: str = "",
    prompt: str = "", 
    neg_prompt: str = "", 
    product_category: str = "", 
    controlnet_scale: Optional[float] = 1.0, 
    n: Optional[int] = 1
) -> str:
    # mock
    with open(f"received_{img.filename}", "wb") as buffer:
        shutil.copyfileobj(img.file, buffer)

    return f"received_{img.filename}"