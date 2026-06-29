import httpx
from bs4 import BeautifulSoup

async def crawl_website(url: str):
    headers = {
        "User-Agent": "Mozilla/5.0 (compatible; OptimizAI/1.0; +http://yourwebsite.com)"
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(url, headers=headers, timeout=10.0)
            response.raise_for_status()
            html = response.text
        except Exception as e:
            raise Exception(f"Failed to crawl website: {str(e)}")

    soup = BeautifulSoup(html, "html.parser")
    
    # Extract Title and Meta Description
    title = soup.title.string if soup.title else ""
    meta_desc_tag = soup.find("meta", attrs={"name": "description"})
    meta_description = meta_desc_tag["content"] if meta_desc_tag else ""
    
    # Extract Headings
    headings = {
        "h1": [h.get_text(strip=True) for h in soup.find_all("h1")],
        "h2": [h.get_text(strip=True) for h in soup.find_all("h2")],
    }
    
    # Extract text from body
    # Remove script and style elements
    for script in soup(["script", "style", "nav", "footer"]):
        script.extract()
        
    text_content = soup.get_text(separator=' ', strip=True)
    
    return {
        "url": url,
        "title": title,
        "meta_description": meta_description,
        "headings": headings,
        "content_sample": text_content[:2000] # Limit to 2000 chars for API constraints
    }
