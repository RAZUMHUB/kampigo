"""
Adapter interfaces. Every concrete implementation (CLIP vs DINOv2, Tesseract
vs PaddleOCR, YOLO variants, etc.) implements one of these so the rest of the
service - and the matching logic on the Node side - never depends on a
specific model. Swapping an adapter is a config change (see core/config.py),
not a rewrite.
"""

from abc import ABC, abstractmethod
from typing import Optional

from PIL import Image


class VisionEmbeddingAdapter(ABC):
    model_name: str

    @abstractmethod
    def embed_image(self, image: Image.Image) -> list[float]:
        """Returns a single dense vector for one image. Called once PER IMAGE -
        never averaged across an item's photos - to preserve instance-specific
        visual signal (scratches, stickers, unique wear patterns) that an
        averaged multi-image embedding would wash out."""
        raise NotImplementedError


class TextEmbeddingAdapter(ABC):
    model_name: str

    @abstractmethod
    def embed_text(self, text: str) -> list[float]:
        raise NotImplementedError


class OcrAdapter(ABC):
    @abstractmethod
    def extract_text(self, image: Image.Image) -> Optional[str]:
        raise NotImplementedError


class ObjectDetectionAdapter(ABC):
    @abstractmethod
    def detect(self, image: Image.Image) -> list[dict]:
        """Returns a list of {label, confidence, bbox} - used to crop to the
        primary object before embedding, improving embedding quality when a
        photo has background clutter."""
        raise NotImplementedError


class SegmentationAdapter(ABC):
    @abstractmethod
    def segment_primary_object(self, image: Image.Image) -> Optional[Image.Image]:
        """Returns an image with the background removed/masked, when
        segmentation is enabled. Optional - matching must work without it."""
        raise NotImplementedError
