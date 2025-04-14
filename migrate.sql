-- Add teaching_guidance column to materials table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'materials' AND column_name = 'teaching_guidance'
    ) THEN
        ALTER TABLE materials ADD COLUMN teaching_guidance JSONB;
    END IF;
END$$;