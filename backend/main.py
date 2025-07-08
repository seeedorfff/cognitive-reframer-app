from fastapi import FastAPI, HTTPException
from models import JournalEntryCreate
from database import supabase

# Create FastAPI app instance
app = FastAPI()

# Root endpoint
@app.get("/")
def root():
    return {"status": "API is running"}

# GET /entries endpoint - retrieve all journal entries
@app.get("/entries")
async def get_entries():
    try:
        # Query all entries from the database, ordered by created_at descending
        result = supabase.table("journal_entries").select("*").order("created_at", desc=True).execute()
        
        # Return the entries
        return result.data
        
    except Exception as e:
        # Handle database errors gracefully
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

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