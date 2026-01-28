-- 1. Crear la tabla de Leads
create table public.leads (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  nombre text not null,
  telefono text not null,
  email text not null,
  cp text not null,
  consent_policy boolean not null default false, -- RGPD Obligatorio
  consent_commercial boolean not null default false, -- Opcional
  origen text default 'landing_dkv_dentisalud',
  estado text default 'nuevo' -- nuevo, contactado, convertido
);

-- 2. Habilitar Row Level Security (RLS)
alter table public.leads enable row level security;

-- 3. Política: Permitir inserción anónima (Formulario público)
create policy "Permitir inserción pública"
on public.leads
for insert
to public
with check (true);

-- 4. Política: Permitir lectura solo a usuarios autenticados (Admin/Agente)
create policy "Permitir lectura a autenticados"
on public.leads
for select
to authenticated
using (true);