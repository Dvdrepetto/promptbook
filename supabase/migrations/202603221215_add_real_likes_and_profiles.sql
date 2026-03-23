create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null unique,
  created_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;

drop policy if exists "Profiles are viewable by everyone" on public.profiles;
create policy "Profiles are viewable by everyone"
on public.profiles
for select
to public
using (true);

drop policy if exists "Users can insert their own profile" on public.profiles;
create policy "Users can insert their own profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "Users can update their own profile" on public.profiles;
create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create table if not exists public.prompt_likes (
  prompt_id uuid not null references public.prompts(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default timezone('utc', now()),
  primary key (prompt_id, user_id)
);

alter table public.prompt_likes enable row level security;

drop policy if exists "Prompt likes are viewable by everyone" on public.prompt_likes;
create policy "Prompt likes are viewable by everyone"
on public.prompt_likes
for select
to public
using (true);

drop policy if exists "Authenticated users can like prompts" on public.prompt_likes;
create policy "Authenticated users can like prompts"
on public.prompt_likes
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Authenticated users can remove their likes" on public.prompt_likes;
create policy "Authenticated users can remove their likes"
on public.prompt_likes
for delete
to authenticated
using (auth.uid() = user_id);

create index if not exists prompt_likes_user_id_idx on public.prompt_likes (user_id);
create index if not exists prompt_likes_prompt_id_idx on public.prompt_likes (prompt_id);

alter table public.prompts
alter column likes_count set default 0;

update public.prompts
set likes_count = 0
where likes_count is distinct from 0;
