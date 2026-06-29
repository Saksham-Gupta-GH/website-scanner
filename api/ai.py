import os
import google.generativeai as genai

# Configure Gemini API
# This requires GEMINI_API_KEY environment variable to be set
genai.configure(api_key=os.environ.get("GEMINI_API_KEY"))

# Use the recommended model for text processing
model = genai.GenerativeModel('gemini-1.5-flash')

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
        response = await model.generate_content_async(prompt)
        return response.text
    except Exception as e:
        return f'{{"error": "{str(e)}"}}'
