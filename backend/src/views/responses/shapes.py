from pydantic import BaseModel, validator
from uuid import UUID
from typing import List


class ReadShape(BaseModel):
    """
    The view of an annotation response.
    """
    id: UUID

    @validator("id")
    def process_uuid_to_hex(cls, v):
        return v.hex

    class Config:
        orm_mode = True
