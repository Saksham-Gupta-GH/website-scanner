import os
import httpx
import google.generativeai as genai

# Configure Gemini API
# This requires GEMINI_API_KEY environment variable to be set
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Use the recommended model for text processing
gemini_model = genai.GenerativeModel('gemini-2.5-flash-lite')

async def call_openrouter(prompt: str) -> str:
    api_key = os.environ.get("OPENROUTER_API_KEY")
    if not api_key:
        raise Exception("OPENROUTER_API_KEY is not set.")
        
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # We use the generic free router from OpenRouter which auto-selects available free models
    data = {
        "model": "openrouter/free",
        "messages": [
            {"role": "user", "content": prompt}
        ]
    }
    
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://openrouter.ai/api/v1/chat/completions",
            headers=headers,
            json=data,
            timeout=30.0
        )
        response.raise_for_status()
        result = response.json()
        return result["choices"][0]["message"]["content"]

async def analyze_website_content(crawled_data: dict):
    prompt = f"""
    You are an expert Website Optimization Consultant. Analyze the following website data and provide a comprehensive optimization report.
    
    URL: {crawled_data['url']}
    Title: {crawled_data['title']}
    Meta Description: {crawled_data['meta_description']}
    Headings (H1/H2): {crawled_data['headings']}
    Content Snippet: {crawled_data['content_sample']}
    
    Please provide your analysis in the following format (output raw JSON without markdown formatting):
    {{
      "overall_score": 85,
      "scores": {{
        "ux": {{"score": 80, "explanation": "..."}},
        "seo": {{"score": 90, "explanation": "..."}},
        "copywriting": {{"score": 75, "explanation": "..."}},
        "conversion": {{"score": 85, "explanation": "..."}}
      }},
      "recommendations": [
        "Improve CTA visibility",
        "Add more social proof"
      ],
      "ai_rewrite": {{
        "headline": "A better headline here",
        "subheadline": "A better subheadline here",
        "cta": "Get Started Free"
      }}
    }}
    """
    
    try:
        # First try Gemini
        response = await gemini_model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        print(f"Gemini API failed: {e}. Falling back to OpenRouter...")
        try:
            # Fallback to OpenRouter
            openrouter_response = await call_openrouter(prompt)
            return openrouter_response
        except Exception as fallback_error:
            return f'{{"error": "Gemini failed: {str(e)} | OpenRouter fallback failed: {str(fallback_error)}"}}'
