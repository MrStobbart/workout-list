CREATE FUNCTION public.set_current_timestamp_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  _new record;
BEGIN
  _new := NEW;
  _new."updated_at" = NOW();
  RETURN _new;
END;
$$;
CREATE TABLE public."Workout" (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    "startDate" date NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public."WorkoutCategory" (
    value text NOT NULL
);
ALTER TABLE ONLY public."WorkoutCategory"
    ADD CONSTRAINT "WorkoutCategory_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public."Workout"
    ADD CONSTRAINT "Workout_pkey" PRIMARY KEY (id);
CREATE TRIGGER "set_public_Workout_updated_at" BEFORE UPDATE ON public."Workout" FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Workout_updated_at" ON public."Workout" IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public."Workout"
    ADD CONSTRAINT "Workout_category_fkey" FOREIGN KEY (category) REFERENCES public."WorkoutCategory"(value) ON UPDATE CASCADE ON DELETE RESTRICT;
