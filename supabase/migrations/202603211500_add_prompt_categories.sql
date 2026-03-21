alter table public.prompts
add column if not exists category text,
add column if not exists subcategory text;

create index if not exists prompts_category_idx on public.prompts (category);
create index if not exists prompts_subcategory_idx on public.prompts (subcategory);
