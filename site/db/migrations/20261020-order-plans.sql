-- Apply before deploying the package checkout. Existing rows remain null.
alter table orders add column if not exists plan text check (plan in ('starter', 'regulars'));
alter table orders add column if not exists monthly_amount numeric(10, 2);
