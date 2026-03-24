alter table public.prompts
add column if not exists user_id uuid references public.profiles(id) on delete set null;

create index if not exists prompts_user_id_idx on public.prompts (user_id);

alter table public.prompts enable row level security;

drop policy if exists "Prompts are viewable by everyone" on public.prompts;
create policy "Prompts are viewable by everyone"
on public.prompts
for select
to public
using (true);

drop policy if exists "Authenticated users can create prompts" on public.prompts;
create policy "Authenticated users can create prompts"
on public.prompts
for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users cannot update prompts yet" on public.prompts;
drop policy if exists "Users can update their own prompts" on public.prompts;
create policy "Users can update their own prompts"
on public.prompts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users cannot delete prompts yet" on public.prompts;
drop policy if exists "Users can delete their own prompts" on public.prompts;
create policy "Users can delete their own prompts"
on public.prompts
for delete
to authenticated
using (auth.uid() = user_id);
