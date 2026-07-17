import logging

import httpx
from fastapi import APIRouter, HTTPException
from PIL import Image
import io

from ..adapters.factory import get_ocr_adapter, get_text_adapter, get_vision_adapter
from ..models.schemas import EmbedImageRequest, EmbedImageResponse, EmbedTextRequest, EmbedTextResponse

router = APIRouter(prefix="/v1/embed", tags=["embeddings"])
logger = logging.getLogger(__name__)


@router.post("/image", response_model=EmbedImageResponse)
async def embed_image(request: EmbedImageRequest) -> EmbedImageResponse:
    vision_adapter = get_vision_adapter()
    ocr_adapter = get_ocr_adapter()

    async with httpx.AsyncClient(timeout=15.0) as client:
        try:
            response = await client.get(request.image_url)
            response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(status_code=422, detail=f"Could not fetch image: {exc}") from exc

    try:
        image = Image.open(io.BytesIO(response.content))
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Invalid image data: {exc}") from exc

    vector = vision_adapter.embed_image(image)
    ocr_text = ocr_adapter.extract_text(image)

    return EmbedImageResponse(
        item_image_id=request.item_image_id,
        vector=vector,
        model_name=vision_adapter.model_name,
        ocr_text=ocr_text,
    )


@router.post("/text", response_model=EmbedTextResponse)
async def embed_text(request: EmbedTextRequest) -> EmbedTextResponse:
    text_adapter = get_text_adapter()
    vector = text_adapter.embed_text(request.text)
    return EmbedTextResponse(vector=vector, model_name=text_adapter.model_name)
