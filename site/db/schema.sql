-- Tablenote back office schema.
-- Plain SQL, no ORM/migration framework: run this once against a fresh database
-- with `node scripts/init-db.mjs` (idempotent - safe to run again later).

create table if not exists admin_users (
  id serial primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

-- Restaurant-owner accounts for the customer dashboard. Created right after
-- checkout completes (see app/api/customer/signup), not at signup-anywhere -
-- an account always starts from a real completed order.
create table if not exists customers (
  id serial primary key,
  email text not null unique,
  password_hash text not null,
  created_at timestamptz not null default now()
);

create table if not exists orders (
  id serial primary key,
  -- Stripe identifiers, used to upsert from the webhook without duplicating on retries.
  stripe_session_id text unique,
  stripe_subscription_id text,
  stripe_customer_id text,

  status text not null default 'new'
    check (status in ('new', 'design_sent', 'approved', 'printing', 'shipped', 'active')),

  -- What they ordered
  restaurant_name text not null,
  restaurant_address text default '',
  cards integer not null default 0,
  has_report boolean not null default false,
  amount_total numeric(10, 2) not null default 0,

  -- Card design
  template text default '',
  headline text default '',
  subline text default '',
  brand_color text default '',
  show_stars boolean default false,
  has_logo boolean default false,
  logo_url text,            -- Vercel Blob URL, set at checkout time
  logo_filename text,

  -- Where the card points
  link_mode text default 'find',
  google_review_link text default '',

  -- Contact + shipping
  contact_name text default '',
  contact_email text default '',
  contact_phone text default '',
  shipping_line1 text default '',
  shipping_line2 text default '',
  shipping_city text default '',
  shipping_state text default '',
  shipping_postal_code text default '',
  shipping_country text default '',

  notes text default '',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Set once the customer who placed this order creates a dashboard login (see
-- app/api/customer/signup). Null until then - most orders are linked
-- automatically by matching contact_email when the account is created.
--
-- A plain column inside `create table if not exists orders` above would only
-- take effect on a brand-new database - on a database where `orders`
-- already exists, that whole create-table statement is skipped and the
-- column would never get added. `alter table ... add column if not exists`
-- is the idempotent way to add a column to a table that might already exist.
alter table orders add column if not exists customer_id integer references customers(id) on delete set null;

-- Print and fulfillment handoff (build item #6). ship_to records which of the
-- two shipping modes this order uses - to Isiah for hand-delivery, or direct
-- to the restaurant. supplier_order_ref is free text: whatever the card
-- supplier's own order/confirmation number is, filled in by hand once it's
-- placed there - there's no supplier API to integrate with. shipped_at is set
-- once, when the order is marked shipped, and is what the customer-facing
-- email is triggered from.
alter table orders add column if not exists ship_to text not null default 'to_me' check (ship_to in ('to_me', 'direct'));
alter table orders add column if not exists supplier_order_ref text not null default '';
alter table orders add column if not exists shipped_at timestamptz;

create index if not exists orders_restaurant_name_idx on orders using gin (to_tsvector('english', restaurant_name));
create index if not exists orders_status_idx on orders (status);
create index if not exists orders_created_at_idx on orders (created_at desc);
create index if not exists orders_customer_id_idx on orders (customer_id);
-- Postgres.js sends the empty string for a blank contact_email, not null - a
-- plain unique/lower() index would collide across every order missing one,
-- so the customer-linking lookup filters those out with a partial index.
create index if not exists orders_contact_email_idx on orders (lower(contact_email)) where contact_email <> '';

-- Free-form notes an admin adds while working an order, separate from the
-- customer-facing `notes` field they submitted at checkout.
create table if not exists order_notes (
  id serial primary key,
  order_id integer not null references orders(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists order_notes_order_id_idx on order_notes (order_id);