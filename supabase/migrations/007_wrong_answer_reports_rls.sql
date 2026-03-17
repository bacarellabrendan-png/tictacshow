-- Allow anonymous users to insert into wrong_answer_reports
-- (the table has RLS enabled but no INSERT policy for anon)
CREATE POLICY "Allow anonymous inserts"
  ON wrong_answer_reports
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Also create an RPC wrapper as a fallback
CREATE OR REPLACE FUNCTION submit_wrong_answer_report(
  p_player_name text,
  p_question_clue text,
  p_reported_valid boolean DEFAULT false,
  p_reporter_name text DEFAULT 'anonymous'
)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
AS $$
  INSERT INTO wrong_answer_reports (player_name, question_clue, reported_valid, reporter_name)
  VALUES (p_player_name, p_question_clue, p_reported_valid, p_reporter_name);
$$;
