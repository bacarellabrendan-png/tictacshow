-- Migration 016b: make normalize_name independent of the installed unaccent dictionary
-- Run in Supabase SQL Editor. Steps 0-2 run as one transaction.
-- THIS FILE IS PURE ASCII: every non-ASCII character is written as a U&'\XXXX' escape, so
-- nothing can be altered on the way into the SQL editor.
--
-- Why: after 016 the live function and the local one disagreed on U+00B4 (acute accent):
-- 'D' U+00B4 'Angelo' -> 'd angelo' live vs 'dangelo' locally; and the 016 check inputs with
-- a-acute / i-acute / o-slash came back wrong in the SQL editor although the same literals give
-- the right answers through the API. Both point at text/dictionary differences we can't control.
--
-- What changes:
-- 1. public.name_fold(text): explicit letter table (922 entries: o-slash->o, eth->d, l-stroke->l,
--    ae-ligature->ae, sharp s->ss, thorn->th, d-stroke->d, dotless i->i, all Latin accented letters;
--    combining accent marks removed). Generated from the same table as src/data/normalizeName.js.
--    unaccent is NOT used any more.
-- 2. normalize_name_exact(text) rebuilt on name_fold; lowercases A-Z only (locale-independent);
--    drops apostrophe-like marks (' U+2018 U+2019 ` U+00B4 U+02BB U+02BC) and periods; other
--    punctuation -> space; joins single-letter initials; collapses spaces. normalize_name(text)
--    is unchanged (strips a trailing jr/sr/ii/iii/iv) and uses the new exact function.
-- No data changes: players / player_aliases are still empty and nothing indexes these functions yet.

BEGIN;

-- --- 0. BACKUP of the 016 function definitions (RLS on, no browser access) ---
CREATE TABLE backup_20260925_normalize_fns AS
  SELECT p.proname, pg_get_functiondef(p.oid) AS definition
    FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
   WHERE n.nspname = 'public' AND p.proname IN ('normalize_name', 'normalize_name_exact');
ALTER TABLE backup_20260925_normalize_fns ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON backup_20260925_normalize_fns FROM anon, authenticated;

-- --- 1. LETTER TABLE ---------------------------------------------------------
CREATE OR REPLACE FUNCTION public.name_fold(p TEXT)
RETURNS TEXT
LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
SET search_path = pg_catalog, pg_temp
AS $$
  SELECT replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(translate(p, U&'\00AA\00BA\00C0\00C1\00C2\00C3\00C4\00C5\00C7\00C8\00C9\00CA\00CB\00CC\00CD\00CE\00CF\00D0\00D1\00D2\00D3\00D4\00D5\00D6\00D8\00D9\00DA\00DB\00DC\00DD\00E0\00E1\00E2\00E3\00E4\00E5\00E7\00E8\00E9\00EA\00EB\00EC\00ED\00EE\00EF\00F0\00F1\00F2\00F3\00F4\00F5\00F6\00F8\00F9\00FA\00FB\00FC\00FD\00FF\0100\0101\0102\0103\0104\0105\0106\0107\0108\0109\010A\010B\010C\010D\010E\010F\0110\0111\0112\0113\0114\0115\0116\0117\0118\0119\011A\011B\011C\011D\011E\011F\0120\0121\0122\0123\0124\0125\0126\0127\0128\0129\012A\012B\012C\012D\012E\012F\0130\0131\0134\0135\0136\0137\0138\0139\013A\013B\013C\013D\013E\013F\0140\0141\0142\0143\0144\0145\0146\0147\0148\014A\014B\014C\014D\014E\014F\0150\0151\0154\0155\0156\0157\0158\0159\015A\015B\015C\015D\015E\015F\0160\0161\0162\0163\0164\0165\0166\0167\0168\0169\016A\016B\016C\016D\016E\016F\0170\0171\0172\0173\0174\0175\0176\0177\0178\0179\017A\017B\017C\017D\017E\017F\0180\0181\0182\0183\0187\0188\0189\018A\018B\018C\0190\0191\0192\0193\0196\0197\0198\0199\019A\019D\019E\01A0\01A1\01A4\01A5\01AB\01AC\01AD\01AE\01AF\01B0\01B2\01B3\01B4\01B5\01B6\01CD\01CE\01CF\01D0\01D1\01D2\01D3\01D4\01D5\01D6\01D7\01D8\01D9\01DA\01DB\01DC\01DE\01DF\01E0\01E1\01E4\01E5\01E6\01E7\01E8\01E9\01EA\01EB\01EC\01ED\01F0\01F4\01F5\01F8\01F9\01FA\01FB\0200\0201\0202\0203\0204\0205\0206\0207\0208\0209\020A\020B\020C\020D\020E\020F\0210\0211\0212\0213\0214\0215\0216\0217\0218\0219\021A\021B\021E\021F\0221\0224\0225\0226\0227\0228\0229\022A\022B\022C\022D\022E\022F\0230\0231\0232\0233\0234\0235\0236\0237\023A\023B\023C\023D\023E\023F\0240\0243\0244\0246\0247\0248\0249\024C\024D\024E\024F\0253\0255\0256\0257\025B\025F\0260\0261\0262\0266\0267\0268\026A\026B\026C\026D\0271\0272\0273\0274\027C\027D\027E\0280\0282\0288\0289\028B\028F\0290\0291\0299\029B\029C\029D\029F\02A0\02B0\02B2\02B3\02B7\02B8\02E1\02E2\02E3\1D00\1D03\1D04\1D05\1D06\1D07\1D0A\1D0B\1D0C\1D0D\1D0F\1D18\1D1B\1D1C\1D20\1D21\1D22\1D2C\1D2E\1D30\1D31\1D33\1D34\1D35\1D36\1D37\1D38\1D39\1D3A\1D3C\1D3E\1D3F\1D40\1D41\1D42\1D43\1D47\1D48\1D49\1D4D\1D4F\1D50\1D52\1D56\1D57\1D58\1D5B\1D62\1D63\1D64\1D65\1D6C\1D6D\1D6E\1D6F\1D70\1D71\1D72\1D73\1D74\1D75\1D76\1D7B\1D7D\1D7E\1D80\1D81\1D82\1D83\1D84\1D85\1D86\1D87\1D88\1D89\1D8A\1D8C\1D8D\1D8E\1D8F\1D91\1D92\1D93\1D96\1D99\1D9C\1DA0\1DBB\1E00\1E01\1E02\1E03\1E04\1E05\1E06\1E07\1E08\1E09\1E0A\1E0B\1E0C\1E0D\1E0E\1E0F\1E10\1E11\1E12\1E13\1E14\1E15\1E16\1E17\1E18\1E19\1E1A\1E1B\1E1C\1E1D\1E1E\1E1F\1E20\1E21\1E22\1E23\1E24\1E25\1E26\1E27\1E28\1E29\1E2A\1E2B\1E2C\1E2D\1E2E\1E2F\1E30\1E31\1E32\1E33\1E34\1E35\1E36\1E37\1E38\1E39\1E3A\1E3B\1E3C\1E3D\1E3E\1E3F\1E40\1E41\1E42\1E43\1E44\1E45\1E46\1E47\1E48\1E49\1E4A\1E4B\1E4C\1E4D\1E4E\1E4F\1E50\1E51\1E52\1E53\1E54\1E55\1E56\1E57\1E58\1E59\1E5A\1E5B\1E5C\1E5D\1E5E\1E5F\1E60\1E61\1E62\1E63\1E64\1E65\1E66\1E67\1E68\1E69\1E6A\1E6B\1E6C\1E6D\1E6E\1E6F\1E70\1E71\1E72\1E73\1E74\1E75\1E76\1E77\1E78\1E79\1E7A\1E7B\1E7C\1E7D\1E7E\1E7F\1E80\1E81\1E82\1E83\1E84\1E85\1E86\1E87\1E88\1E89\1E8A\1E8B\1E8C\1E8D\1E8E\1E8F\1E90\1E91\1E92\1E93\1E94\1E95\1E96\1E97\1E98\1E99\1E9A\1E9C\1E9D\1EA0\1EA1\1EA2\1EA3\1EA4\1EA5\1EA6\1EA7\1EA8\1EA9\1EAA\1EAB\1EAC\1EAD\1EAE\1EAF\1EB0\1EB1\1EB2\1EB3\1EB4\1EB5\1EB6\1EB7\1EB8\1EB9\1EBA\1EBB\1EBC\1EBD\1EBE\1EBF\1EC0\1EC1\1EC2\1EC3\1EC4\1EC5\1EC6\1EC7\1EC8\1EC9\1ECA\1ECB\1ECC\1ECD\1ECE\1ECF\1ED0\1ED1\1ED2\1ED3\1ED4\1ED5\1ED6\1ED7\1ED8\1ED9\1EDA\1EDB\1EDC\1EDD\1EDE\1EDF\1EE0\1EE1\1EE2\1EE3\1EE4\1EE5\1EE6\1EE7\1EE8\1EE9\1EEA\1EEB\1EEC\1EED\1EEE\1EEF\1EF0\1EF1\1EF2\1EF3\1EF4\1EF5\1EF6\1EF7\1EF8\1EF9\1EFC\1EFD\1EFE\1EFF\2071\207F\2090\2091\2092\2093\2095\2096\2097\2098\2099\209A\209B\209C\2102\210A\210B\210C\210D\210E\2110\2111\2112\2113\2115\2119\211A\211B\211C\211D\2124\2128\212A\212B\212C\212D\212F\2130\2131\2133\2134\2139\2145\2146\2147\2148\2149\2C60\2C61\2C62\2C63\2C64\2C65\2C66\2C67\2C68\2C69\2C6A\2C6B\2C6C\2C6E\2C71\2C72\2C73\2C74\2C78\2C7A\2C7C\2C7D\2C7E\2C7F\0300\0301\0302\0303\0304\0305\0306\0307\0308\0309\030A\030B\030C\030D\030E\030F\0310\0311\0312\0313\0314\0315\0316\0317\0318\0319\031A\031B\031C\031D\031E\031F\0320\0321\0322\0323\0324\0325\0326\0327\0328\0329\032A\032B\032C\032D\032E\032F\0330\0331\0332\0333\0334\0335\0336\0337\0338\0339\033A\033B\033C\033D\033E\033F\0340\0341\0342\0343\0344\0345\0346\0347\0348\0349\034A\034B\034C\034D\034E\034F\0350\0351\0352\0353\0354\0355\0356\0357\0358\0359\035A\035B\035C\035D\035E\035F\0360\0361\0362\20DD\20DE\20DF\20E0\20E2\20E3\20E4', U&'aoAAAAAACEEEEIIIIDNOOOOOOUUUUYaaaaaaceeeeiiiidnoooooouuuuyyAaAaAaCcCcCcCcDdDdEeEeEeEeEeGgGgGgGgHhHhIiIiIiIiIiJjKkqLlLlLlLlLlNnNnNnNnOoOoOoRrRrRrSsSsSsSsTtTtTtUuUuUuUuUuUuWwYyYZzZzZzsbBBbCcDDDdEFfGIIKklNnOoPptTtTUuVYyZzAaIiOoUuUuUuUuUuAaAaGgGgKkOoOojGgNnAaAaAaEeEeIiIiOoOoRrRrUuUuSsTtHhdZzAaEeOoOoOoOoYylntjACcLTszBUEeJjRrYybcddejggGhhiIlllmnnNrrrRstuvYzzBGHjLqhjrwylsxABCDDEJKLMOPTUVWZABDEGHIJKLMNOPRTUWabdegkmoptuviruvbdfmnprrstzIpUbdfgklmnprsvxzadeeiucfzAaBbBbBbCcDdDdDdDdDdEeEeEeEeEeFfGgHhHhHhHhHhIiIiKkKkKkLlLlLlLlMmMmMmNnNnNnNnOoOoOoOoPpPpRrRrRrRrSsSsSsSsSsTtTtTtTtUuUuUuUuUuVvVvWwWwWwWwWwXxXxYyZzZzZzhtwyassAaAaAaAaAaAaAaAaAaAaAaAaEeEeEeEeEeEeEeEeIiIiOoOoOoOoOoOoOoOoOoOoOoOoUuUuUuUuUuUuUuYyYyYyYyVvYyinaeoxhklmnpstCgHHHhIILlNPQRRRZZKABCeEFMoiDdeijLlLPRatHhKkZzMvWwveojVSZ'), U&'\00C6', 'AE'), U&'\00DE', 'TH'), U&'\00DF', 'ss'), U&'\00E6', 'ae'), U&'\00FE', 'th'), U&'\0132', 'IJ'), U&'\0133', 'ij'), U&'\0152', 'OE'), U&'\0153', 'oe'), U&'\0195', 'hv'), U&'\01A2', 'OI'), U&'\01A3', 'oi'), U&'\01C4', 'DZ'), U&'\01C5', 'Dz'), U&'\01C6', 'dz'), U&'\01C7', 'LJ'), U&'\01C8', 'Lj'), U&'\01C9', 'lj'), U&'\01CA', 'NJ'), U&'\01CB', 'Nj'), U&'\01CC', 'nj'), U&'\01F1', 'DZ'), U&'\01F2', 'Dz'), U&'\01F3', 'dz'), U&'\0238', 'db'), U&'\0239', 'qp'), U&'\0276', 'OE'), U&'\02A3', 'dz'), U&'\02A5', 'dz'), U&'\02A6', 'ts'), U&'\02AA', 'ls'), U&'\02AB', 'lz'), U&'\1D01', 'AE'), U&'\1D6B', 'ue'), U&'\1D7A', 'th'), U&'\1E9E', 'SS'), U&'\1EFA', 'LL'), U&'\1EFB', 'll')
$$;

-- --- 2. NORMALIZER ON THE LETTER TABLE ---------------------------------------
CREATE OR REPLACE FUNCTION public.normalize_name_exact(p TEXT)
RETURNS TEXT
LANGUAGE sql IMMUTABLE PARALLEL SAFE STRICT
SET search_path = pg_catalog, pg_temp
AS $$
  SELECT btrim(regexp_replace(
           regexp_replace(
             regexp_replace(
               regexp_replace(
                 translate(public.name_fold(p), 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'),
                 U&'[''\2018\2019`\00B4\02BB\02BC.]', '', 'g'),                  -- drop apostrophe-like marks and periods
               '[^a-z0-9]+', ' ', 'g'),                         -- everything else -> space
             '\m([a-z]) (?=[a-z]\M)', '\1', 'g'),                -- join initials: j r smith -> jr smith
           '\s+', ' ', 'g'))
$$;

COMMIT;

-- --- 3. CHECKS (run after COMMIT; one row; non-ASCII inputs written as escapes) ---
SELECT
  normalize_name(U&'Iv\00E1n Rodr\00EDguez') = normalize_name('Ivan Rodriguez') AS n4,   -- true
  normalize_name(U&'Martin \00D8degaard') AS n6,                                     -- martin odegaard
  normalize_name(U&'Petur Gu\00F0mundsson \0141ukasz Stra\00DFe \00C6sir \00DE\00F3r \0110or\0111e \0130lkay K\0131l\0131\00E7') AS n9,
                     -- petur gudmundsson lukasz strasse aesir thor dorde ilkay kilic
  normalize_name(U&'D\00B4Angelo') = 'dangelo' AS n10,                              -- true
  normalize_name(U&'Shaquille O\2019Neal') AS n5,                                   -- shaquille oneal
  normalize_name('J. R. Smith') = normalize_name('JR Smith') AS n3,                              -- true
  normalize_name_exact('Ken Griffey, Sr.') AS n2,                                                -- ken griffey sr
  normalize_name('Ken Griffey, Sr.') AS n1,                                                      -- ken griffey
  normalize_name('Gary Payton II') = normalize_name('Gary Payton') AS n8,                        -- true
  (SELECT count(*) FROM backup_20260925_normalize_fns) AS fns_backed_up,                         -- 2
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'backup_20260925_normalize_fns') AS backup_rls;  -- true

-- --- ROLLBACK (only if needed): restore the 016 definitions ------------------
-- WARNING (found after applying): the saved 016 definition of normalize_name_exact is the
-- version whose U+00B4 was corrupted in transit (it turns D U+00B4 Angelo into "d angelo"). Prefer
-- fixing forward over restoring it.
-- DO $r$ DECLARE d TEXT; BEGIN
--   FOR d IN SELECT definition FROM backup_20260925_normalize_fns LOOP EXECUTE d; END LOOP;
-- END $r$;
-- DROP FUNCTION IF EXISTS public.name_fold(TEXT);
