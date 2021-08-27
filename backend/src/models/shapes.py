from sqlalchemy import BigInteger, String, Column, Integer, ForeignKey
from sqlalchemy.orm import relationship

from uuid import uuid4

from database.types import UUID
from database.database import Base


class Shape(Base):
    # define sql table name
    __tablename__ = "shapes"

    # define fields
    id = Column(UUID, primary_key=True, default=uuid4)
    image_id = Column(UUID, ForeignKey("images.id"),
                      primary_key=True, default=uuid4)

    # define relationships
