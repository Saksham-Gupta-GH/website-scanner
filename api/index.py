from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .crawler import crawl_website
from .ai import analyze_website_content
import json

app = FastAPI(title="AI Website Optimization Platform API", version="1.0.0")

# Allow CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "message": "API is running on Vercel"}

@app.get("/api/analyze")
async def analyze_website(url: str):
    try:
        # 1. Crawl the website
        crawled_data = await crawl_website(url)
        
        # 2. Analyze content with Gemini
        ai_response_raw = await analyze_website_content(crawled_data)
        
        # Parse JSON
        try:
            # Strip markdown formatting if Gemini returns it
            clean_json = ai_response_raw.strip()
            if clean_json.startswith("```json"):
                clean_json = clean_json[7:]
            if clean_json.startswith("```"):
                clean_json = clean_json[3:]
            if clean_json.endswith("```"):
                clean_json = clean_json[:-3]
            clean_json = clean_json.strip()
            
            analysis_result = json.loads(clean_json)
        except json.JSONDecodeError:
            analysis_result = {"error": "Failed to parse AI response", "raw": ai_response_raw}
            
        return {
            "status": "success", 
            "url": url, 
            "crawled_data": crawled_data,
            "analysis": analysis_result
        }
    except Exception as e:
        return {"status": "error", "message": str(e)}
