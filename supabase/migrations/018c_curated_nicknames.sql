-- Migration 018c: curated nicknames (62 entries from supabase/data/curated_nicknames.csv)
-- Run in Supabase SQL Editor. One small transaction. PURE ASCII (accented titles are U& escapes).
-- 0. BACKUP: backup_20260926_player_aliases_018c = player_aliases as it is now (RLS on, closed).
-- 1. GUARD: every entry must name exactly one player who owns facts in that sport; otherwise
--    nothing changes and the error lists the bad entries.
-- 2. Each nickname becomes a player_aliases row: kind 'nickname', source 'curated', curated = true.
--    Where the same spelling already exists for that player (from Wikidata, always kind
--    'nickname'), that row is only marked curated = true.
-- Resolution rules are unchanged (018a): a nickname resolves only when exactly one player in the
-- sport has it; shared ones (Pudge, LT, The Kid, Joe Cool, The Dream) show the chooser.

BEGIN;

-- --- 0. BACKUP (RLS on, no browser access) --------------------------------------------
CREATE TABLE backup_20260926_player_aliases_018c AS SELECT * FROM player_aliases;
ALTER TABLE backup_20260926_player_aliases_018c ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260926_player_aliases_018c FROM anon, authenticated;

DO $mig$
DECLARE bad TEXT; n_ins BIGINT; n_mark BIGINT;
BEGIN
  -- --- 1. GUARD ---------------------------------------------------------------------------
  WITH nick(sport, nickname, title) AS (VALUES
    ('NBA', 'Shaq', 'Shaquille O''Neal'),
    ('NBA', 'King James', 'LeBron James'),
    ('NBA', 'Black Mamba', 'Kobe Bryant'),
    ('NBA', 'Magic', 'Magic Johnson'),
    ('NBA', 'Dr. J', 'Julius Erving'),
    ('NBA', 'The Answer', 'Allen Iverson'),
    ('NBA', 'The Admiral', 'David Robinson'),
    ('NBA', 'The Dream', 'Hakeem Olajuwon'),
    ('NBA', 'The Mailman', 'Karl Malone'),
    ('NBA', 'Pistol Pete', 'Pete Maravich'),
    ('NBA', 'Greek Freak', 'Giannis Antetokounmpo'),
    ('NBA', 'Steph Curry', 'Stephen Curry'),
    ('NBA', 'KD', 'Kevin Durant'),
    ('NBA', 'CP3', 'Chris Paul'),
    ('NBA', 'D-Wade', 'Dwyane Wade'),
    ('NBA', 'The Big Fundamental', 'Tim Duncan'),
    ('NBA', 'MJ', 'Michael Jordan'),
    ('NBA', 'The Beard', 'James Harden'),
    ('NBA', 'The Glove', 'Gary Payton'),
    ('MLB', 'A-Rod', 'Alex Rodriguez'),
    ('MLB', 'Big Papi', 'David Ortiz'),
    ('MLB', 'The Babe', 'Babe Ruth'),
    ('MLB', 'Mr. October', 'Reggie Jackson'),
    ('MLB', 'Pudge', U&'Iv\00E1n Rodr\00EDguez'),
    ('MLB', 'Pudge', 'Carlton Fisk'),
    ('MLB', 'The Big Hurt', 'Frank Thomas'),
    ('MLB', 'Mr. November', 'Derek Jeter'),
    ('MLB', 'Hammerin'' Hank', 'Hank Aaron'),
    ('MLB', 'Charlie Hustle', 'Pete Rose'),
    ('MLB', 'Big Unit', 'Randy Johnson'),
    ('MLB', 'Ichiro', 'Ichiro Suzuki'),
    ('MLB', 'The Kid', 'Ken Griffey Jr.'),
    ('MLB', 'Say Hey Kid', 'Willie Mays'),
    ('MLB', 'Stan the Man', 'Stan Musial'),
    ('MLB', 'Mr. Cub', 'Ernie Banks'),
    ('NFL', 'Prime Time', 'Deion Sanders'),
    ('NFL', 'Megatron', 'Calvin Johnson'),
    ('NFL', 'Sweetness', 'Walter Payton'),
    ('NFL', 'Broadway Joe', 'Joe Namath'),
    ('NFL', 'TB12', 'Tom Brady'),
    ('NFL', 'Beast Mode', 'Marshawn Lynch'),
    ('NFL', 'Johnny U', 'Johnny Unitas'),
    ('NFL', 'The Bus', 'Jerome Bettis'),
    ('NFL', 'LT', 'Lawrence Taylor'),
    ('NFL', 'LT', 'LaDainian Tomlinson'),
    ('NFL', 'Gronk', 'Rob Gronkowski'),
    ('NFL', 'Joe Cool', 'Joe Montana'),
    ('NHL', 'The Great One', 'Wayne Gretzky'),
    ('NHL', 'Super Mario', 'Mario Lemieux'),
    ('NHL', 'Mr. Hockey', 'Gordie Howe'),
    ('NHL', 'The Golden Jet', 'Bobby Hull'),
    ('NHL', 'The Rocket', 'Maurice Richard'),
    ('NHL', 'Sid the Kid', 'Sidney Crosby'),
    ('NHL', 'Ovi', 'Alexander Ovechkin'),
    ('NHL', 'The Dominator', U&'Dominik Ha\0161ek'),
    ('NHL', 'Mr. Game 7', 'Justin Williams'),
    ('Soccer', 'CR7', 'Cristiano Ronaldo'),
    ('Soccer', 'Zizou', 'Zinedine Zidane'),
    ('Soccer', 'King Kenny', 'Kenny Dalglish'),
    ('Soccer', 'Der Kaiser', 'Franz Beckenbauer'),
    ('Soccer', 'Zlatan', U&'Zlatan Ibrahimovi\0107'),
    ('Soccer', 'El Nino', 'Fernando Torres')
  )
  SELECT string_agg(nk.sport || ' ' || nk.nickname || ' -> ' || nk.title || ' (' || nk.c || ' players)', '; ')
    INTO bad
    FROM (SELECT x.*, (SELECT count(*) FROM players p WHERE p.wikipedia_title = x.title
                         AND EXISTS (SELECT 1 FROM player_facts f WHERE f.player_id = p.id AND f.sport = x.sport)) AS c
            FROM nick x) nk
   WHERE nk.c <> 1;
  IF bad IS NOT NULL THEN RAISE EXCEPTION '018c: entries not matching exactly one player: %. Nothing changed.', bad; END IF;

  -- --- 2. LOAD -----------------------------------------------------------------------------
  WITH nick(sport, nickname, title) AS (VALUES
    ('NBA', 'Shaq', 'Shaquille O''Neal'),
    ('NBA', 'King James', 'LeBron James'),
    ('NBA', 'Black Mamba', 'Kobe Bryant'),
    ('NBA', 'Magic', 'Magic Johnson'),
    ('NBA', 'Dr. J', 'Julius Erving'),
    ('NBA', 'The Answer', 'Allen Iverson'),
    ('NBA', 'The Admiral', 'David Robinson'),
    ('NBA', 'The Dream', 'Hakeem Olajuwon'),
    ('NBA', 'The Mailman', 'Karl Malone'),
    ('NBA', 'Pistol Pete', 'Pete Maravich'),
    ('NBA', 'Greek Freak', 'Giannis Antetokounmpo'),
    ('NBA', 'Steph Curry', 'Stephen Curry'),
    ('NBA', 'KD', 'Kevin Durant'),
    ('NBA', 'CP3', 'Chris Paul'),
    ('NBA', 'D-Wade', 'Dwyane Wade'),
    ('NBA', 'The Big Fundamental', 'Tim Duncan'),
    ('NBA', 'MJ', 'Michael Jordan'),
    ('NBA', 'The Beard', 'James Harden'),
    ('NBA', 'The Glove', 'Gary Payton'),
    ('MLB', 'A-Rod', 'Alex Rodriguez'),
    ('MLB', 'Big Papi', 'David Ortiz'),
    ('MLB', 'The Babe', 'Babe Ruth'),
    ('MLB', 'Mr. October', 'Reggie Jackson'),
    ('MLB', 'Pudge', U&'Iv\00E1n Rodr\00EDguez'),
    ('MLB', 'Pudge', 'Carlton Fisk'),
    ('MLB', 'The Big Hurt', 'Frank Thomas'),
    ('MLB', 'Mr. November', 'Derek Jeter'),
    ('MLB', 'Hammerin'' Hank', 'Hank Aaron'),
    ('MLB', 'Charlie Hustle', 'Pete Rose'),
    ('MLB', 'Big Unit', 'Randy Johnson'),
    ('MLB', 'Ichiro', 'Ichiro Suzuki'),
    ('MLB', 'The Kid', 'Ken Griffey Jr.'),
    ('MLB', 'Say Hey Kid', 'Willie Mays'),
    ('MLB', 'Stan the Man', 'Stan Musial'),
    ('MLB', 'Mr. Cub', 'Ernie Banks'),
    ('NFL', 'Prime Time', 'Deion Sanders'),
    ('NFL', 'Megatron', 'Calvin Johnson'),
    ('NFL', 'Sweetness', 'Walter Payton'),
    ('NFL', 'Broadway Joe', 'Joe Namath'),
    ('NFL', 'TB12', 'Tom Brady'),
    ('NFL', 'Beast Mode', 'Marshawn Lynch'),
    ('NFL', 'Johnny U', 'Johnny Unitas'),
    ('NFL', 'The Bus', 'Jerome Bettis'),
    ('NFL', 'LT', 'Lawrence Taylor'),
    ('NFL', 'LT', 'LaDainian Tomlinson'),
    ('NFL', 'Gronk', 'Rob Gronkowski'),
    ('NFL', 'Joe Cool', 'Joe Montana'),
    ('NHL', 'The Great One', 'Wayne Gretzky'),
    ('NHL', 'Super Mario', 'Mario Lemieux'),
    ('NHL', 'Mr. Hockey', 'Gordie Howe'),
    ('NHL', 'The Golden Jet', 'Bobby Hull'),
    ('NHL', 'The Rocket', 'Maurice Richard'),
    ('NHL', 'Sid the Kid', 'Sidney Crosby'),
    ('NHL', 'Ovi', 'Alexander Ovechkin'),
    ('NHL', 'The Dominator', U&'Dominik Ha\0161ek'),
    ('NHL', 'Mr. Game 7', 'Justin Williams'),
    ('Soccer', 'CR7', 'Cristiano Ronaldo'),
    ('Soccer', 'Zizou', 'Zinedine Zidane'),
    ('Soccer', 'King Kenny', 'Kenny Dalglish'),
    ('Soccer', 'Der Kaiser', 'Franz Beckenbauer'),
    ('Soccer', 'Zlatan', U&'Zlatan Ibrahimovi\0107'),
    ('Soccer', 'El Nino', 'Fernando Torres')
  ),
  src AS (
    SELECT DISTINCT p.id AS player_id, x.nickname
      FROM nick x JOIN players p ON p.wikipedia_title = x.title
  ),
  up AS (
    INSERT INTO player_aliases (player_id, alias, alias_exact, alias_norm, kind, source, curated)
    SELECT s.player_id, s.nickname, normalize_name_exact(s.nickname), normalize_name(s.nickname), 'nickname', 'curated', true
      FROM src s
    ON CONFLICT (player_id, alias_exact) DO UPDATE SET curated = true
      WHERE player_aliases.kind = 'nickname'
    RETURNING (xmax = 0) AS inserted
  )
  SELECT count(*) FILTER (WHERE inserted), count(*) FILTER (WHERE NOT inserted) INTO n_ins, n_mark FROM up;
  IF n_ins + n_mark <> 62 THEN
    RAISE EXCEPTION '018c: expected 62 nickname rows, got % new + % marked (a same-spelling alias that is not a nickname?). Nothing changed.', n_ins, n_mark;
  END IF;
END
$mig$;

COMMIT;

-- --- 3. CHECKS (run after COMMIT; one row; permanent tables and read-only calls) ----------------
SELECT
  (SELECT count(*) FROM player_aliases WHERE curated)                                              AS curated_rows,
  (SELECT count(*) FROM player_aliases WHERE source = 'curated')                                   AS new_rows,
  (SELECT count(*) FROM player_aliases) - (SELECT count(*) FROM backup_20260926_player_aliases_018c) AS added,
  (SELECT count(*) FROM player_aliases a WHERE a.curated AND a.kind <> 'nickname')                 AS curated_not_nickname,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'backup_20260926_player_aliases_018c')      AS backup_rls,
  (SELECT count(*) FROM information_schema.role_table_grants WHERE table_name = 'backup_20260926_player_aliases_018c'
     AND grantee IN ('anon', 'authenticated'))                                                     AS backup_browser_grants,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('MJ', 'NBA'))               AS r_mj,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Big Unit', 'MLB'))         AS r_big_unit,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('the rocket', 'NHL'))       AS r_the_rocket,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Zlatan', 'Soccer'))        AS r_zlatan,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player(U&'El Ni\00F1o', 'Soccer')) AS r_el_nino,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C") FROM resolve_player('Pudge', 'MLB'))    AS r_pudge,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C") FROM resolve_player('LT', 'NFL'))       AS r_lt,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C") FROM resolve_player('The Kid', 'MLB'))  AS r_the_kid,
  (SELECT string_agg(status || ':' || display_name, ' | ' ORDER BY display_name COLLATE "C") FROM resolve_player('Joe Cool', 'NFL')) AS r_joe_cool,
  (SELECT string_agg(status || ':' || display_name, ' | ') FROM resolve_player('Magic Johnson', 'NBA'))    AS r_magic_johnson_name;
-- EXPECTED: curated_rows = 62; new_rows = 20; added = 20; curated_not_nickname = 0; backup_rls = true; backup_browser_grants = 0; r_mj = resolved:Michael Jordan; r_big_unit = resolved:Randy Johnson; r_the_rocket = resolved:Maurice Richard; r_zlatan = resolved:Zlatan Ibrahimovi<U+0107>; r_el_nino = resolved:Fernando Torres; r_pudge = ambiguous:Carlton Fisk | ambiguous:Iv<U+00E1>n Rodr<U+00ED>guez; r_lt = ambiguous:LaDainian Tomlinson | ambiguous:Lawrence Taylor; r_the_kid = ambiguous:Ken Griffey Jr. | ambiguous:Robin Yount | ambiguous:Ted Williams; r_joe_cool = ambiguous:Joe Burrow | ambiguous:Joe Montana; r_magic_johnson_name = resolved:Magic Johnson

-- --- ROLLBACK (only if needed; puts player_aliases back exactly as backed up) -------------------
-- BEGIN;
-- DELETE FROM player_aliases a WHERE NOT EXISTS (SELECT 1 FROM backup_20260926_player_aliases_018c b WHERE b.id = a.id);
-- UPDATE player_aliases a SET curated = b.curated FROM backup_20260926_player_aliases_018c b WHERE b.id = a.id AND a.curated IS DISTINCT FROM b.curated;
-- COMMIT;
