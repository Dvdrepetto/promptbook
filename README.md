# Promptbook

Promptbook is an open library of AI prompts focused on image generation.

The goal of the project is to let users discover, publish, organize, and reuse prompts in a simple and visual way.  
This MVP is focused on image prompts for tools like DALL·E, Midjourney, and Stable Diffusion, with a structure ready to support more prompt types in the future.

## Features

- Create and publish prompts
- Explore prompts in a visual grid
- View prompt details
- Copy prompts with one click
- Basic likes system
- Responsive layout with navbar and footer

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Supabase

## Project Structure

```bash
src/
  app/
  components/
  lib/
  types/
```
## Getting Started

1. Clone the repository
git clone https://github.com/Dvdrepetto/promptbook.git
cd promptbook
2. Install dependencies
npm install
3. Add environment variables

Create a .env.local file in the project root:

NEXT_PUBLIC_SUPABASE_URL=xxxx
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
4. Run the development server
npm run dev

Open:

http://localhost:3000
Environment Notes

The .env.local file is required and should not be committed to Git.

Current Status

This project is currently in MVP stage.
The current version includes the core flow:

create prompt
explore prompts
prompt detail page
copy prompt
basic likes
Roadmap
Authentication with Supabase
Saved prompts
User profiles
Collections
Comments
Search and filters
Prompt categories and tags
Author

David Repetto

LinkedIn: https://www.linkedin.com/in/davidrepetto1
GitHub: https://github.com/Dvdrepetto
Portfolio: https://david-repetto-portfolio.vercel.app/