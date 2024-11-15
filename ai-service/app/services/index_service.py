from llama_index.core import StorageContext, VectorStoreIndex

from app.services.chroma_service import ChromaService


class IndexService:
    def __init__(self, chroma_service: ChromaService) -> None:
        self.__chroma_service = chroma_service

    # def index(self, command: BotCommandModel) -> VectorStoreIndex:
    #     document = DocumentBuilder.get_bot_command_as_document(command)
    #     vector_store = self.__chroma_service.get_or_create_chroma_vector_store(
    #         name=str(command.bot_id)
    #     )
    #
    #     storage_context = StorageContext.from_defaults(
    #         vector_store=vector_store
    #     )
    #
    #     index = VectorStoreIndex.from_documents([document], storage_context)
    #     return index

    def get_index(self, hospital_name: str) -> VectorStoreIndex:
        vector_store = self.__chroma_service.get_or_create_chroma_vector_store(name=hospital_name)
        storage_context = StorageContext.from_defaults(vector_store=vector_store)

        index = VectorStoreIndex.from_vector_store(
            vector_store=vector_store,
            storage_context=storage_context
        )
        return index

    def get_collection_data(self, collection_name: str):
        vector_store = self.__chroma_service.get_or_create_chroma_vector_store(collection_name)
        return vector_store
