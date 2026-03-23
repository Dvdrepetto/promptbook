# Supabase Setup

Run the SQL migrations in this exact order:

1. `migrations/202603211500_add_prompt_categories.sql`
2. `migrations/202603221030_seed_prompt_examples.sql`
3. `migrations/202603221215_add_real_likes_and_profiles.sql`
4. `migrations/202603221430_add_prompts_rls.sql`

## Minimum Verification

After running them, confirm:

1. `public.prompts` has `category` and `subcategory`
2. `public.profiles` exists
3. `public.prompt_likes` exists
4. `explore` works without schema errors
5. likes can be created by logged-in users

## Recommended Workflow

- Keep migrations in the repo
- Apply them in order in Supabase
- Test the app right after each schema change
- Avoid editing production tables manually without recording the SQL here
