revoke delete on table "public"."users" from "anon";

revoke insert on table "public"."users" from "anon";

revoke references on table "public"."users" from "anon";

revoke select on table "public"."users" from "anon";

revoke trigger on table "public"."users" from "anon";

revoke truncate on table "public"."users" from "anon";

revoke update on table "public"."users" from "anon";

revoke delete on table "public"."users" from "authenticated";

revoke insert on table "public"."users" from "authenticated";

revoke references on table "public"."users" from "authenticated";

revoke select on table "public"."users" from "authenticated";

revoke trigger on table "public"."users" from "authenticated";

revoke truncate on table "public"."users" from "authenticated";

revoke update on table "public"."users" from "authenticated";

revoke delete on table "public"."users" from "service_role";

revoke insert on table "public"."users" from "service_role";

revoke references on table "public"."users" from "service_role";

revoke select on table "public"."users" from "service_role";

revoke trigger on table "public"."users" from "service_role";

revoke truncate on table "public"."users" from "service_role";

revoke update on table "public"."users" from "service_role";

alter table "public"."users" drop constraint "users_id_key";

alter table "public"."generations" drop constraint "generations_user_id_fkey";

drop function if exists "public"."handle_new_user"();

drop index if exists "public"."users_id_key";

drop table "public"."users";

alter table "public"."generations" add column "diagram_url" text not null;

alter table "public"."generations" alter column "user_id" set default auth.uid();

alter table "public"."generations" alter column "user_id" set data type uuid using "user_id"::uuid;

alter table "public"."generations" enable row level security;

alter table "public"."generations" add constraint "generations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."generations" validate constraint "generations_user_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."generations"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."generations"
as permissive
for select
to authenticated
using ((auth.uid() = user_id));



