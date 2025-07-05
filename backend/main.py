from fastapi import FastAPI, HTTPException
from models import JournalEntryCreate
from database import supabase

# Create FastAPI app instance
app = FastAPI()

# Root endpoint
@app.get("/")
def root():
    return {"status": "API is running"}

# POST /entries endpoint
@app.post("/entries")
async def create_entry(entry: JournalEntryCreate):
    try:
        # Prepare data for insertion (user_id is now nullable)
        entry_data = {
            "content": entry.content,
            "mood_rating": entry.mood_rating
        }
        
        # Insert entry into the database
        result = supabase.table("journal_entries").insert(entry_data).execute()
        
        # Return the newly created record
        return {"message": "Entry created successfully", "data": result.data[0]}
        
    except Exception as e:
        # Handle database errors gracefully
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}") 