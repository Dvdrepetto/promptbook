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
with check (auth.uid() is not null);

drop policy if exists "Users cannot update prompts yet" on public.prompts;
create policy "Users cannot update prompts yet"
on public.prompts
for update
to authenticated
using (false)
with check (false);

drop policy if exists "Users cannot delete prompts yet" on public.prompts;
create policy "Users cannot delete prompts yet"
on public.prompts
for delete
to authenticated
using (false);
