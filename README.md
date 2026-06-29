# AI Website Optimization Platform 🚀

A modern SaaS application that helps founders, startups, marketers, designers, and developers automatically optimize their websites for conversions using AI. 

🌐 **Live Demo:** [https://website-scanner-seven.vercel.app/](https://website-scanner-seven.vercel.app/)

## Features
- **Instant Website Crawling**: Extracts metadata, headings, and core content directly from your URL.
- **AI-Powered Insights**: Uses Google's Gemini AI to evaluate your landing page.
- **Detailed Metric Scorecards**: Visual grades for UX, SEO, Copywriting, and Conversion.
- **AI Rewrite Tool**: Generates an instantly improved Headline, Subheadline, and Call-to-Action based on your specific product.

## Tech Stack
- **Frontend**: Next.js 15 (App Router), React, Tailwind CSS, shadcn/ui.
- **Backend**: FastAPI (Python), deployed as Vercel Serverless Functions.
- **AI Integration**: Google Generative AI SDK (Gemini 1.5 Flash).
- **Deployment**: Vercel.

## Local Setup

### 1. Clone the repository
```bash
git clone https://github.com/Saksham-Gupta-GH/website-scanner.git
cd website-scanner
```

### 2. Install Dependencies
```bash
# Install frontend dependencies
npm install

# Install backend dependencies (Python)
pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your Gemini API Key:
```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The API routes will be available at `http://localhost:3000/api/...`.

## Created By
[Saksham Gupta](https://github.com/Saksham-Gupta-GH)
