# Promptbook

Promptbook is an open library of AI prompts organized as a simple and visual
multicategory library.

The goal of the project is to let users discover, publish, organize, and reuse
prompts in a fast and intuitive way across different categories like AI tools,
programming, academic work, productivity, marketing, design, and more.

## Features

- Create and publish prompts
- Explore prompts in a visual grid
- Browse prompts by category and subcategory
- View prompt details
- Copy prompts with one click
- Real likes by authenticated users
- Username-based auth with Supabase
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

## Database Setup

Before using the app against a real Supabase project, you must run the SQL
migrations in the correct order.

Apply these files in Supabase SQL Editor or with the Supabase CLI:

1. `supabase/migrations/202603211500_add_prompt_categories.sql`
2. `supabase/migrations/202603221030_seed_prompt_examples.sql`
3. `supabase/migrations/202603221215_add_real_likes_and_profiles.sql`
4. `supabase/migrations/202603221430_add_prompts_rls.sql`

### What each migration does

- `202603211500_add_prompt_categories.sql`
  Adds `category` and `subcategory` to `public.prompts`.
- `202603221030_seed_prompt_examples.sql`
  Seeds example prompts for the default categories/subcategories.
- `202603221215_add_real_likes_and_profiles.sql`
  Creates `public.profiles` and `public.prompt_likes`.
- `202603221430_add_prompts_rls.sql`
  Enables RLS on `public.prompts` and adds initial policies for beta.

### Manual Verification After Running Migrations

After applying the migrations, verify these checks:

1. `explore` loads without schema errors.
2. Clicking a category/subcategory shows prompts.
3. A logged-in user can create a prompt.
4. A logged-in user can give and remove a like.
5. The prompt detail page shows the usernames of users who liked it.

### Important

If the app shows errors like:

- `column prompts.category does not exist`
- `Could not find the table 'public.profiles' in the schema cache`

your Supabase project is not aligned with the local repo yet. Re-run the
migrations in the order above.

Current Status

This project is currently in MVP stage.
The current version includes the core flow:

create prompt
explore prompts
prompt detail page
copy prompt
real likes
categories and subcategories
username auth
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
