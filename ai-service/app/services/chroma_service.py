from chromadb import HttpClient
from llama_index.vector_stores.chroma import ChromaVectorStore


class ChromaOptions:
    def __init__(self, host: str, port: int) -> None:
        self.host = host
        self.port = port


class ChromaService:
    def __init__(self, chroma_options: ChromaOptions) -> None:
        self.__chroma_client = HttpClient(
            host=chroma_options.host,
            port=chroma_options.port,
        )

    def get_or_create_chroma_vector_store(self, name: str) -> ChromaVectorStore:
        return ChromaVectorStore(
            chroma_collection=self.__chroma_client.get_or_create_collection(
                name=name
            )
        )
