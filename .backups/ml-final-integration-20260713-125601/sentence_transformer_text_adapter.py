import logging

from sentence_transformers import SentenceTransformer

from .base import TextEmbeddingAdapter

logger = logging.getLogger(__name__)


class SentenceTransformerTextAdapter(TextEmbeddingAdapter):
    def __init__(self, model_name: str = "sentence-transformers/all-MiniLM-L6-v2", device: str = "cpu"):
        self.model_name = model_name
        logger.info("Loading text embedding model: %s", model_name)
        self.model = SentenceTransformer(model_name, device=device)

    def embed_text(self, text: str) -> list[float]:
        vector = self.model.encode(text, normalize_embeddings=True)
        return vector.tolist()
