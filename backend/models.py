from pydantic import BaseModel
from typing import Optional

class JournalEntryCreate(BaseModel):
    content: str
    mood_rating: Optional[int] = None 