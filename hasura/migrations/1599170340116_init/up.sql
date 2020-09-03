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
CREATE TABLE public.workout (
    id uuid DEFAULT public.gen_random_uuid() NOT NULL,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    start_date date NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);
CREATE TABLE public.workout_category (
    value text NOT NULL
);
ALTER TABLE ONLY public.workout_category
    ADD CONSTRAINT "WorkoutCategory_pkey" PRIMARY KEY (value);
ALTER TABLE ONLY public.workout
    ADD CONSTRAINT "Workout_pkey" PRIMARY KEY (id);
CREATE TRIGGER "set_public_Workout_updated_at" BEFORE UPDATE ON public.workout FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER "set_public_Workout_updated_at" ON public.workout IS 'trigger to set value of column "updated_at" to current timestamp on row update';
CREATE TRIGGER set_public_workout_updated_at BEFORE UPDATE ON public.workout FOR EACH ROW EXECUTE FUNCTION public.set_current_timestamp_updated_at();
COMMENT ON TRIGGER set_public_workout_updated_at ON public.workout IS 'trigger to set value of column "updated_at" to current timestamp on row update';
ALTER TABLE ONLY public.workout
    ADD CONSTRAINT "Workout_category_fkey" FOREIGN KEY (category) REFERENCES public.workout_category(value) ON UPDATE CASCADE ON DELETE RESTRICT;

INSERT INTO public.workout_category (value)
VALUES ('c1'),
       ('c2'),
       ('c3'),
       ('c4'),
       ('c5'),
       ('c6'),
       ('c7');
