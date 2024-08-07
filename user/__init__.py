from sqlalchemy import MetaData, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker, relationship
from sqlalchemy import Column, ForeignKey, Enum
from sqlalchemy.dialects.postgresql import INTEGER, VARCHAR, TIMESTAMP, BOOLEAN, UUID as pgUUID

import os
from dotenv import load_dotenv, find_dotenv
from urllib.parse import quote_plus

load_dotenv(find_dotenv())

metadata = MetaData()

Base = declarative_base()

############ USER PROFILE ############

class UserProfile(Base):
    pass

class Food(Base):
    pass

class Cosmetics(Base):
    pass

class AdditionalInfo(Base):
    pass



















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
