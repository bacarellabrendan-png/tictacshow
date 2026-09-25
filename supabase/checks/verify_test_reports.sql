-- READ-ONLY. Run BEFORE migration 014 to see what the Sept 25 verification wrote.
-- Test accounts: tts_test_1@example.com, tts_test_2@example.com

WITH test_users AS (
  SELECT id FROM auth.users WHERE email IN ('tts_test_1@example.com', 'tts_test_2@example.com')
)
SELECT r.id, r.game_mode, r.game_id, r.local_game_id, r.move_id, r.cell_index, r.sport,
       r.row_category_id, r.row_category_label, r.col_category_id, r.col_category_label,
       r.typed_answer, r.game_ruling, r.reported_player, r.reporter_is_answerer,
       r.reporter_says_correct, r.note, r.submission_id,
       s.typed_text AS submission_typed, s.valid AS submission_valid, s.role AS submission_role,
       r.question_clue, r.player_name, r.reported_valid, r.reporter_name
  FROM wrong_answer_reports r
  LEFT JOIN answer_submissions s ON s.id = r.submission_id
 WHERE r.reporter_id IN (SELECT id FROM test_users)
 ORDER BY r.id;
-- Expected (from the latest run, report ids 14–17):
--   14 multiplayer · p1 reports OPPONENT's answer (p2, accepted) · says should be rejected · submission 24
--   15 multiplayer · p2 reports OWN rejected answer "Not A Real Player Zz" · says should be accepted · submission 26
--   16 cpu        · reports the CPU's answer · submission_id NULL (CPU answers aren't recorded)
--   17 cpu        · reports own answer "Frank Ntilikina" · submission 32
-- Earlier runs (two interrupted partway) created more reports from the same accounts;
-- all are deleted by 014.
