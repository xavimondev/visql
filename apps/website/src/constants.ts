export const INITIAL_CODE_SQL = `create table
  users (
    id bigint primary key generated always as identity,
    name text,
    email text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
  );
-----------------TABLE-----------------
create table
  roles (
    id bigint primary key generated always as identity,
    name text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);
-----------------TABLE-----------------
create table
  user_roles (
    user_id bigint,
    role_id bigint,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    foreign key (user_id) references users (id),
    foreign key (role_id) references roles (id)
);
`

export const ADD_COMMAND = `npx dbac add`
