from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy import Column, ForeignKey, Enum
from sqlalchemy.types import ARRAY
from sqlalchemy.dialects.postgresql import INTEGER, VARCHAR, TIMESTAMP, BOOLEAN, UUID, ARRAY as pgUUID

import os
from dotenv import load_dotenv, find_dotenv
from urllib.parse import quote_plus

load_dotenv(find_dotenv())

metadata = MetaData()

Base = declarative_base()

############ USER PROFILE ############

class UserProfile(Base):
    __tablename__ = "user"
    user_id = Column(
        pgUUID(as_uuid=True),
        primary_key=True,
        nullable=False,
        unique=True,
    )
    first_name = Column(VARCHAR, nullable=False)
    last_name = Column(VARCHAR, nullable=False)
    email = Column(VARCHAR, primary_key=True)
    created_at = Column(TIMESTAMP, nullable=False)
    deleted = Column(BOOLEAN, nullable=True, default=False)

    food = relationship("Food", back_populates="user", uselist=False)
    cosmetics = relationship("Cosmetics", back_populates="user", uselist=False)
    additional_info = relationship("AdditionalInfo", back_populates="user", uselist=False)

class Food(Base):
    __tablename__ = "food"
    user_id = Column(
        pgUUID(as_uuid=True),
        ForeignKey("user.user_id"),
        primary_key=True,
        nullable=False,
    )
    allergies = Column(ARRAY(VARCHAR), nullable=True)
    medical_conditions = Column(ARRAY(VARCHAR), nullable=True)
    dietary_restrictions = Column(ARRAY(VARCHAR), nullable=True)

    user = relationship("UserProfile", back_populates="food")
    additional_info = relationship("AdditionalInfo", back_populates="food")

class Cosmetics(Base):
    __tablename__ = "cosmetics"
    user_id = Column(
        pgUUID(as_uuid=True),
        ForeignKey("user.user_id"),
        primary_key=True,
        nullable=False,
    )
    allergies = Column(ARRAY(VARCHAR), nullable=True)
    medical_conditions = Column(ARRAY(VARCHAR), nullable=True)
    restrictions = Column(ARRAY(VARCHAR), nullable=True)

    user = relationship("UserProfile", back_populates="cosmetics")
    additional_info = relationship("AdditionalInfo", back_populates="cosmetics")

class AdditionalInfo(Base):
    __tablename__ = "additional_info"
    user_id = Column(
        pgUUID(as_uuid=True),
        ForeignKey("user.user_id"),
        primary_key=True,
        nullable=False,
    )
    food_info = Column(VARCHAR, ForeignKey("food.user_id"), nullable=True)
    cosmetics_info = Column(VARCHAR, ForeignKey("cosmetics.user_id"), nullable=True)

    user = relationship("UserProfile", back_populates="additional_info")
    food = relationship("Food", back_populates="additional_info")
    cosmetics = relationship("Cosmetics", back_populates="additional_info")



















DB_NAME = os.getenv('PG_DB_NAME')
DB_USER = os.getenv('PG_DB_USER')
DB_PASSWORD = os.getenv('PG_DB_PASSWORD')
DB_HOST = os.getenv('PG_DB_HOST')
DB_PORT = os.getenv('PG_DB_PORT')

SQLALCHEMY_DATABASE_URI = (
    f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URI, echo=True)

metadata.reflect(bind=engine, schema="auth")

Base.metadata.create_all(bind=engine)

table_creation_session = scoped_session(
    sessionmaker(autocommit=False, autoflush=False, bind=engine)
)
