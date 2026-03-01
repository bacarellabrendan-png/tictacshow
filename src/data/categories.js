// ─── CATEGORY MASTER LIST ─────────────────────────────────────────────────────
// Each category maps to a player_facts condition for board intersection validation.
// Only categories with confirmed data in player_facts are included.
//
// Category shape:
//   id         — unique identifier
//   label      — full display name (shown on grid axes)
//   shortLabel — abbreviated (for mobile)
//   type       — "team" | "award" | "stat" | "attribute"
//   sport      — "NBA" | "NFL" | "MLB" | "NHL" | "Soccer"
//   fact       — { type, value } maps to player_facts (fact_type, fact_value)

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function team(id, label, shortLabel, factValue, sport) {
  return { id, label, shortLabel, type: "team", sport, fact: { type: "played_for_team", value: factValue } };
}
function award(id, label, shortLabel, factType, sport) {
  return { id, label, shortLabel, type: "award", sport, fact: { type: factType, value: "true" } };
}
function stat(id, label, shortLabel, factType, sport) {
  return { id, label, shortLabel, type: "stat", sport, fact: { type: factType, value: "true" } };
}
function attr(id, label, shortLabel, factType, sport) {
  return { id, label, shortLabel, type: "attribute", sport, fact: { type: factType, value: "true" } };
}

// ═════════════════════════════════════════════════════════════════════════════
//  NBA
// ═════════════════════════════════════════════════════════════════════════════

const NBA_TEAMS = [
  team("nba_lakers",         "Los Angeles Lakers",          "Lakers",         "Lakers",         "NBA"),
  team("nba_celtics",        "Boston Celtics",              "Celtics",        "Celtics",        "NBA"),
  team("nba_warriors",       "Golden State Warriors",       "Warriors",       "Warriors",       "NBA"),
  team("nba_bulls",          "Chicago Bulls",               "Bulls",          "Bulls",          "NBA"),
  team("nba_heat",           "Miami Heat",                  "Heat",           "Heat",           "NBA"),
  team("nba_nets",           "Brooklyn Nets",               "Nets",           "Nets",           "NBA"),
  team("nba_rockets",        "Houston Rockets",             "Rockets",        "Rockets",        "NBA"),
  team("nba_76ers",          "Philadelphia 76ers",          "76ers",          "76ers",          "NBA"),
  team("nba_cavaliers",      "Cleveland Cavaliers",         "Cavaliers",      "Cavaliers",      "NBA"),
  team("nba_knicks",         "New York Knicks",             "Knicks",         "Knicks",         "NBA"),
  team("nba_suns",           "Phoenix Suns",                "Suns",           "Suns",           "NBA"),
  team("nba_spurs",          "San Antonio Spurs",           "Spurs",          "Spurs",          "NBA"),
  team("nba_raptors",        "Toronto Raptors",             "Raptors",        "Raptors",        "NBA"),
  team("nba_mavericks",      "Dallas Mavericks",            "Mavericks",      "Mavericks",      "NBA"),
  team("nba_trail_blazers",  "Portland Trail Blazers",      "Trail Blazers",  "Trail Blazers",  "NBA"),
  team("nba_clippers",       "Los Angeles Clippers",        "Clippers",       "Clippers",       "NBA"),
  team("nba_bucks",          "Milwaukee Bucks",             "Bucks",          "Bucks",          "NBA"),
  team("nba_timberwolves",   "Minnesota Timberwolves",      "Timberwolves",   "Timberwolves",   "NBA"),
  team("nba_hawks",          "Atlanta Hawks",               "Hawks",          "Hawks",          "NBA"),
  team("nba_pistons",        "Detroit Pistons",             "Pistons",        "Pistons",        "NBA"),
  team("nba_thunder",        "Oklahoma City Thunder",       "Thunder",        "Thunder",        "NBA"),
  team("nba_nuggets",        "Denver Nuggets",              "Nuggets",        "Nuggets",        "NBA"),
  team("nba_pacers",         "Indiana Pacers",              "Pacers",         "Pacers",         "NBA"),
  team("nba_jazz",           "Utah Jazz",                   "Jazz",           "Jazz",           "NBA"),
  team("nba_kings",          "Sacramento Kings",            "Kings",          "Kings",          "NBA"),
  team("nba_hornets",        "Charlotte Hornets",           "Hornets",        "Hornets",        "NBA"),
  team("nba_magic",          "Orlando Magic",               "Magic",          "Magic",          "NBA"),
  team("nba_wizards",        "Washington Wizards",          "Wizards",        "Wizards",        "NBA"),
  team("nba_pelicans",       "New Orleans Pelicans",        "Pelicans",       "Pelicans",       "NBA"),
  team("nba_grizzlies",      "Memphis Grizzlies",           "Grizzlies",      "Grizzlies",      "NBA"),
];

const NBA_AWARDS = [
  award("nba_champion",       "NBA Champion",                "NBA Champ",        "nba_champion",          "NBA"),  // 87
  award("nba_all_nba",        "All-NBA Team",                "All-NBA",          "nba_all_nba_team",      "NBA"),  // 70
  award("nba_mvp",            "NBA MVP",                     "NBA MVP",          "nba_mvp",               "NBA"),  // 42
  award("nba_allstar",        "NBA All-Star",                "All-Star",         "nba_all_star",          "NBA"),  // 24
  award("nba_finals_mvp",     "NBA Finals MVP",              "Finals MVP",       "nba_finals_mvp",        "NBA"),  // 33
  award("nba_scoring_title",  "NBA Scoring Title",           "Scoring Title",    "nba_scoring_title",     "NBA"),  // 33
  award("nba_dpoy",           "NBA Defensive Player of the Year", "NBA DPOY",    "nba_dpoy",              "NBA"),  // 30
  award("nba_all_defense",    "NBA All-Defensive Team",      "All-Defense",      "nba_all_defensive_team","NBA"),  // 17
  award("nba_sixth_man",      "NBA Sixth Man of the Year",   "Sixth Man",        "nba_sixth_man_award",   "NBA"),  // 17
];

const NBA_STATS = [
  stat("nba_50pt_game",       "Scored 50+ Points in a Game", "50+ Pt Game",      "nba_50_point_game",     "NBA"),  // 33
  stat("nba_20ppg",           "20+ PPG Career Average",      "20+ PPG",          "nba_20ppg_career",      "NBA"),  // 29
  stat("nba_20k_pts",         "20,000+ Career Points",       "20K+ Points",      "nba_20000_career_points","NBA"), // 15
  stat("nba_triple_dbl",      "Triple-Double Season Average","Triple-Dbl Avg",   "nba_triple_double_season","NBA"),// 18
  stat("nba_10apg_season",    "10+ APG in a Season",         "10+ APG Season",   "nba_10_assists_season", "NBA"),  // 15
  stat("nba_2bpg",            "2+ BPG Career Average",       "2+ BPG",           "nba_2bpg_career",       "NBA"),  // 15
];

const NBA_ATTRS = [
  attr("nba_born_outside_us", "Born Outside the United States","Born Outside US", "born_outside_us",       "NBA"),  // 25
  attr("nba_outside_top_10",  "Drafted Outside the Top 10",  "Outside Top 10",   "nba_drafted_outside_top_10","NBA"),// 21
  attr("nba_top_5_pick",      "Top 5 Draft Pick",            "Top 5 Pick",       "nba_top_5_pick",        "NBA"),  // 15
];

// ═════════════════════════════════════════════════════════════════════════════
//  NFL
// ═════════════════════════════════════════════════════════════════════════════

const NFL_TEAMS = [
  team("nfl_patriots",    "New England Patriots",    "Patriots",    "Patriots",    "NFL"),
  team("nfl_cowboys",     "Dallas Cowboys",          "Cowboys",     "Cowboys",     "NFL"),
  team("nfl_broncos",     "Denver Broncos",          "Broncos",     "Broncos",     "NFL"),
  team("nfl_steelers",    "Pittsburgh Steelers",     "Steelers",    "Steelers",    "NFL"),
  team("nfl_49ers",       "San Francisco 49ers",     "49ers",       "49ers",       "NFL"),
  team("nfl_chiefs",      "Kansas City Chiefs",      "Chiefs",      "Chiefs",      "NFL"),
  team("nfl_raiders",     "Las Vegas Raiders",       "Raiders",     "Raiders",     "NFL"),
  team("nfl_bears",       "Chicago Bears",           "Bears",       "Bears",       "NFL"),
  team("nfl_saints",      "New Orleans Saints",      "Saints",      "Saints",      "NFL"),
  team("nfl_seahawks",    "Seattle Seahawks",        "Seahawks",    "Seahawks",    "NFL"),
  team("nfl_eagles",      "Philadelphia Eagles",     "Eagles",      "Eagles",      "NFL"),
  team("nfl_packers",     "Green Bay Packers",       "Packers",     "Packers",     "NFL"),
  team("nfl_ravens",      "Baltimore Ravens",        "Ravens",      "Ravens",      "NFL"),
  team("nfl_giants",      "New York Giants",         "Giants",      "Giants",      "NFL"),
  team("nfl_chargers",    "Los Angeles Chargers",    "Chargers",    "Chargers",    "NFL"),
  team("nfl_dolphins",    "Miami Dolphins",          "Dolphins",    "Dolphins",    "NFL"),
  team("nfl_vikings",     "Minnesota Vikings",       "Vikings",     "Vikings",     "NFL"),
  team("nfl_falcons",     "Atlanta Falcons",         "Falcons",     "Falcons",     "NFL"),
  team("nfl_buccaneers",  "Tampa Bay Buccaneers",    "Buccaneers",  "Buccaneers",  "NFL"),
  team("nfl_rams",        "Los Angeles Rams",        "Rams",        "Rams",        "NFL"),
  team("nfl_bengals",     "Cincinnati Bengals",      "Bengals",     "Bengals",     "NFL"),
  team("nfl_bills",       "Buffalo Bills",           "Bills",       "Bills",       "NFL"),
  team("nfl_colts",       "Indianapolis Colts",      "Colts",       "Colts",       "NFL"),
  team("nfl_lions",       "Detroit Lions",           "Lions",       "Lions",       "NFL"),
  team("nfl_texans",      "Houston Texans",          "Texans",      "Texans",      "NFL"),
  team("nfl_panthers",    "Carolina Panthers",       "Panthers",    "Panthers",    "NFL"),
  team("nfl_cardinals",   "Arizona Cardinals",       "Cardinals",   "Cardinals",   "NFL"),
  team("nfl_browns",      "Cleveland Browns",        "Browns",      "Browns",      "NFL"),
  team("nfl_jaguars",     "Jacksonville Jaguars",    "Jaguars",     "Jaguars",     "NFL"),
  team("nfl_jets",        "New York Jets",           "Jets",        "Jets",        "NFL"),
  team("nfl_titans",      "Tennessee Titans",        "Titans",      "Titans",      "NFL"),
];

const NFL_AWARDS = [
  award("nfl_sb_champ",       "Super Bowl Champion",           "SB Champ",         "nfl_super_bowl_winner",   "NFL"),  // 175
  award("nfl_pro_bowl",       "Pro Bowl Selection",            "Pro Bowl",         "nfl_pro_bowl",            "NFL"),  // 57
  award("nfl_dpoy",           "NFL Defensive Player of the Year","NFL DPOY",       "nfl_dpoy",                "NFL"),  // 15
];

const NFL_STATS = [
  stat("nfl_300td",           "300+ Career TD Passes",         "300+ TD Passes",   "nfl_300_career_td_passes","NFL"),  // 21
  stat("nfl_800rec",          "800+ Career Receptions",        "800+ Receptions",  "nfl_800_receptions",      "NFL"),  // 20
  stat("nfl_10k_rush",        "10,000+ Career Rushing Yards",  "10K+ Rush Yds",    "nfl_10000_rush_yards",    "NFL"),  // 18
  stat("nfl_4k_pass_season",  "4,000+ Passing Yards in a Season","4K+ Pass Season","nfl_4000_pass_yard_season","NFL"), // 18
  stat("nfl_1k_rec",          "1,000+ Career Receptions",      "1K+ Receptions",   "nfl_1000_receptions",     "NFL"),  // 17
  stat("nfl_14rush_td",       "14+ Rushing TDs in a Season",   "14+ Rush TD Season","nfl_14_rushing_td_season","NFL"), // 17
  stat("nfl_2k_rush_season",  "2,000+ Rushing Yards in a Season","2K+ Rush Season","nfl_2000_rush_yard_season","NFL"), // 17
  stat("nfl_100_sacks",       "100+ Career Sacks",             "100+ Sacks",       "nfl_100_career_sacks",    "NFL"),  // 16
  stat("nfl_50_int",          "50+ Career Interceptions",      "50+ INTs",         "nfl_50_career_interceptions","NFL"),// 15
];

const NFL_ATTRS = [
  attr("nfl_first_round",     "First Round Draft Pick",        "1st Round Pick",   "nfl_first_round_pick",    "NFL"),  // 20
  attr("nfl_heisman",         "Heisman Trophy Winner",         "Heisman Winner",   "heisman_trophy",          "NFL"),  // 18
  attr("nfl_undrafted",       "Undrafted Player",              "Undrafted",        "nfl_undrafted",           "NFL"),  // 18
  attr("nfl_5_pro_bowls",     "5+ Pro Bowl Selections",        "5+ Pro Bowls",     "nfl_5_plus_pro_bowls",    "NFL"),  // 15
];

// ═════════════════════════════════════════════════════════════════════════════
//  MLB
// ═════════════════════════════════════════════════════════════════════════════

const MLB_TEAMS = [
  team("mlb_yankees",      "New York Yankees",          "Yankees",      "Yankees",      "MLB"),
  team("mlb_red_sox",      "Boston Red Sox",            "Red Sox",      "Red Sox",      "MLB"),
  team("mlb_dodgers",      "Los Angeles Dodgers",       "Dodgers",      "Dodgers",      "MLB"),
  team("mlb_cubs",         "Chicago Cubs",              "Cubs",         "Cubs",         "MLB"),
  team("mlb_cardinals",    "St. Louis Cardinals",       "Cardinals",    "Cardinals",    "MLB"),
  team("mlb_braves",       "Atlanta Braves",            "Braves",       "Braves",       "MLB"),
  team("mlb_giants",       "San Francisco Giants",      "Giants",       "Giants",       "MLB"),
  team("mlb_mets",         "New York Mets",             "Mets",         "Mets",         "MLB"),
  team("mlb_phillies",     "Philadelphia Phillies",     "Phillies",     "Phillies",     "MLB"),
  team("mlb_reds",         "Cincinnati Reds",           "Reds",         "Reds",         "MLB"),
  team("mlb_astros",       "Houston Astros",            "Astros",       "Astros",       "MLB"),
  team("mlb_white_sox",    "Chicago White Sox",         "White Sox",    "White Sox",    "MLB"),
  team("mlb_athletics",    "Oakland Athletics",         "Athletics",    "Athletics",    "MLB"),
  team("mlb_padres",       "San Diego Padres",          "Padres",       "Padres",       "MLB"),
  team("mlb_angels",       "Los Angeles Angels",        "Angels",       "Angels",       "MLB"),
  team("mlb_rangers",      "Texas Rangers",             "Rangers",      "Rangers",      "MLB"),
  team("mlb_marlins",      "Miami Marlins",             "Marlins",      "Marlins",      "MLB"),
  team("mlb_mariners",     "Seattle Mariners",          "Mariners",     "Mariners",     "MLB"),
  team("mlb_pirates",      "Pittsburgh Pirates",        "Pirates",      "Pirates",      "MLB"),
  team("mlb_guardians",    "Cleveland Guardians",       "Guardians",    "Indians",      "MLB"),
  team("mlb_tigers",       "Detroit Tigers",            "Tigers",       "Tigers",       "MLB"),
  team("mlb_orioles",      "Baltimore Orioles",         "Orioles",      "Orioles",      "MLB"),
  team("mlb_brewers",      "Milwaukee Brewers",         "Brewers",      "Brewers",      "MLB"),
  team("mlb_twins",        "Minnesota Twins",           "Twins",        "Twins",        "MLB"),
  team("mlb_royals",       "Kansas City Royals",        "Royals",       "Royals",       "MLB"),
  team("mlb_rays",         "Tampa Bay Rays",            "Rays",         "Rays",         "MLB"),
  team("mlb_rockies",      "Colorado Rockies",          "Rockies",      "Rockies",      "MLB"),
  team("mlb_nationals",    "Washington Nationals",      "Nationals",    "Nationals",    "MLB"),
  team("mlb_diamondbacks", "Arizona Diamondbacks",      "D-backs",      "Diamondbacks", "MLB"),
];

const MLB_AWARDS = [
  award("mlb_mvp",            "MLB MVP",                     "MLB MVP",          "mlb_mvp",               "MLB"),  // 149
  award("mlb_ws_champ",       "World Series Champion",       "WS Champ",         "mlb_ws_winner",         "MLB"),  // 112
  award("mlb_cy_young",       "Cy Young Award",              "Cy Young",         "mlb_cy_young",          "MLB"),  // 63
  award("mlb_hof",            "MLB Hall of Fame",            "Hall of Fame",     "mlb_hall_of_fame",      "MLB"),  // 63
  award("mlb_batting_title",  "Batting Title",               "Batting Title",    "mlb_batting_title",     "MLB"),  // 32
  award("mlb_allstar",        "MLB All-Star",                "All-Star",         "mlb_all_star",          "MLB"),  // 24
  award("mlb_ws_mvp",         "World Series MVP",            "WS MVP",           "mlb_ws_mvp",            "MLB"),  // 15
];

const MLB_STATS = [
  stat("mlb_300sb",           "300+ Career Stolen Bases",    "300+ SB",          "mlb_300_stolen_bases",  "MLB"),  // 26
  stat("mlb_2500hits",        "2,500+ Career Hits",          "2,500+ Hits",      "mlb_2500_career_hits",  "MLB"),  // 24
  stat("mlb_300avg",          ".300+ Career Batting Average", ".300+ AVG",        "mlb_300_career_avg",    "MLB"),  // 24
  stat("mlb_200hr",           "200+ Career Home Runs",       "200+ HR",          "mlb_200_home_runs",     "MLB"),  // 20
  stat("mlb_no_hitter",       "Threw a No-Hitter",           "No-Hitter",        "mlb_no_hitter",         "MLB"),  // 20
  stat("mlb_500hr",           "500+ Career Home Runs",       "500+ HR",          "mlb_500_home_runs",     "MLB"),  // 18
  stat("mlb_40hr_season",     "40+ Home Runs in a Season",   "40+ HR Season",    "mlb_40_hr_season",      "MLB"),  // 17
  stat("mlb_300hr",           "300+ Career Home Runs",       "300+ HR",          "mlb_300_home_runs",     "MLB"),  // 15
  stat("mlb_300wins",         "300+ Career Wins (Pitcher)",  "300+ Wins",        "mlb_300_wins",          "MLB"),  // 15
  stat("mlb_3000k",           "3,000+ Career Strikeouts",    "3,000+ K",         "mlb_3000_strikeouts",   "MLB"),  // 15
  stat("mlb_300saves",        "300+ Career Saves",           "300+ Saves",       "mlb_300_saves",         "MLB"),  // 15
  stat("mlb_30_30",           "30-30 Season (HR + SB)",      "30-30 Season",     "mlb_30_30_season",      "MLB"),  // 15
];

const MLB_ATTRS = [
  attr("mlb_born_outside_us", "Born Outside the United States","Born Outside US", "born_outside_us",       "MLB"),  // 15
];

// ═════════════════════════════════════════════════════════════════════════════
//  NHL
// ═════════════════════════════════════════════════════════════════════════════

const NHL_TEAMS = [
  team("nhl_bruins",       "Boston Bruins",             "Bruins",       "Bruins",       "NHL"),
  team("nhl_penguins",     "Pittsburgh Penguins",       "Penguins",     "Penguins",     "NHL"),
  team("nhl_rangers",      "New York Rangers",          "Rangers",      "Rangers",      "NHL"),
  team("nhl_red_wings",    "Detroit Red Wings",         "Red Wings",    "Red Wings",    "NHL"),
  team("nhl_blackhawks",   "Chicago Blackhawks",        "Blackhawks",   "Blackhawks",   "NHL"),
  team("nhl_canadiens",    "Montreal Canadiens",        "Canadiens",    "Canadiens",    "NHL"),
  team("nhl_maple_leafs",  "Toronto Maple Leafs",       "Maple Leafs",  "Maple Leafs",  "NHL"),
  team("nhl_oilers",       "Edmonton Oilers",           "Oilers",       "Oilers",       "NHL"),
  team("nhl_kings",        "Los Angeles Kings",         "Kings",        "Kings",        "NHL"),
  team("nhl_flyers",       "Philadelphia Flyers",       "Flyers",       "Flyers",       "NHL"),
  team("nhl_blues",        "St. Louis Blues",           "Blues",        "Blues",         "NHL"),
  team("nhl_avalanche",    "Colorado Avalanche",        "Avalanche",    "Avalanche",    "NHL"),
  team("nhl_capitals",     "Washington Capitals",       "Capitals",     "Capitals",     "NHL"),
  team("nhl_canucks",      "Vancouver Canucks",         "Canucks",      "Canucks",      "NHL"),
  team("nhl_sabres",       "Buffalo Sabres",            "Sabres",       "Sabres",       "NHL"),
  team("nhl_devils",       "New Jersey Devils",         "Devils",       "Devils",       "NHL"),
  team("nhl_sharks",       "San Jose Sharks",           "Sharks",       "Sharks",       "NHL"),
  team("nhl_flames",       "Calgary Flames",            "Flames",       "Flames",       "NHL"),
  team("nhl_lightning",    "Tampa Bay Lightning",       "Lightning",    "Lightning",    "NHL"),
  team("nhl_senators",     "Ottawa Senators",           "Senators",     "Senators",     "NHL"),
  team("nhl_stars",        "Dallas Stars",              "Stars",        "Stars",        "NHL"),
  team("nhl_islanders",    "New York Islanders",        "Islanders",    "Islanders",    "NHL"),
  team("nhl_ducks",        "Anaheim Ducks",             "Ducks",        "Ducks",        "NHL"),
  team("nhl_hurricanes",   "Carolina Hurricanes",       "Hurricanes",   "Hurricanes",   "NHL"),
  team("nhl_jets",         "Winnipeg Jets",             "Jets",         "Jets",         "NHL"),
];

const NHL_AWARDS = [
  award("nhl_stanley_cup",    "Stanley Cup Champion",        "Stanley Cup",      "nhl_stanley_cup",       "NHL"),  // 106
  award("nhl_hart",           "Hart Trophy (NHL MVP)",       "Hart Trophy",      "nhl_hart_trophy",       "NHL"),  // 67
  award("nhl_norris",         "Norris Trophy",               "Norris Trophy",    "nhl_norris_trophy",     "NHL"),  // 21
  award("nhl_vezina",         "Vezina Trophy",               "Vezina Trophy",    "nhl_vezina_trophy",     "NHL"),  // 18
];

const NHL_STATS = [
  stat("nhl_100pt_season",    "100+ Point Season",           "100+ Pt Season",   "nhl_100_point_season",  "NHL"),  // 35
  stat("nhl_30g_season",      "30+ Goal Season",             "30+ Goal Season",  "nhl_30_goal_season",    "NHL"),  // 33
  stat("nhl_50g_season",      "50+ Goal Season",             "50+ Goal Season",  "nhl_50_goal_season",    "NHL"),  // 27
  stat("nhl_300g",            "300+ Career Goals",           "300+ Goals",       "nhl_300_career_goals",  "NHL"),  // 27
  stat("nhl_1000pts",         "1,000+ Career Points",        "1,000+ Points",    "nhl_1000_career_points","NHL"),  // 21
  stat("nhl_500g",            "500+ Career Goals",           "500+ Goals",       "nhl_500_career_goals",  "NHL"),  // 20
  stat("nhl_100_playoff_pts", "100+ Playoff Points",         "100+ Playoff Pts", "nhl_100_playoff_points","NHL"),  // 18
];

const NHL_ATTRS = [
  attr("nhl_15_seasons",      "15+ NHL Seasons",             "15+ Seasons",      "nhl_15_plus_seasons",   "NHL"),  // 20
  attr("nhl_cup_multi_teams", "Won Cup with Multiple Teams", "Cup Multi Teams",  "nhl_cup_multiple_teams","NHL"),  // 20
  attr("nhl_3_cups",          "Won 3+ Stanley Cups",         "3+ Cups",          "nhl_3_plus_cups",       "NHL"),  // 20
  attr("nhl_born_europe",     "Born in Europe",              "Born in Europe",   "born_in_europe",        "NHL"),  // 20
  attr("nhl_played_canadian", "Played for a Canadian Team",  "Played Canadian",  "nhl_played_canadian_team","NHL"),// 24
  attr("nhl_captain",         "Team Captain",                "Captain",          "nhl_team_captain",      "NHL"),  // 18
];

// ═════════════════════════════════════════════════════════════════════════════
//  SOCCER
// ═════════════════════════════════════════════════════════════════════════════

const SOCCER_TEAMS = [
  team("soc_real_madrid",   "Real Madrid",               "Real Madrid",    "Real Madrid",         "Soccer"),
  team("soc_chelsea",       "Chelsea",                   "Chelsea",        "Chelsea",             "Soccer"),
  team("soc_barcelona",     "FC Barcelona",              "Barcelona",      "Barcelona",           "Soccer"),
  team("soc_juventus",      "Juventus",                  "Juventus",       "Juventus",            "Soccer"),
  team("soc_ac_milan",      "AC Milan",                  "AC Milan",       "AC Milan",            "Soccer"),
  team("soc_liverpool",     "Liverpool FC",              "Liverpool",      "Liverpool",           "Soccer"),
  team("soc_man_utd",       "Manchester United",         "Man United",     "Manchester United",   "Soccer"),
  team("soc_psg",           "Paris Saint-Germain",       "PSG",            "Paris Saint-Germain", "Soccer"),
  team("soc_inter",         "Inter Milan",               "Inter Milan",    "Inter Milan",         "Soccer"),
  team("soc_bayern",        "Bayern Munich",             "Bayern",         "Bayern Munich",       "Soccer"),
  team("soc_man_city",      "Manchester City",           "Man City",       "Manchester City",     "Soccer"),
  team("soc_arsenal",       "Arsenal",                   "Arsenal",        "Arsenal",             "Soccer"),
  team("soc_atletico",      "Atletico Madrid",           "Atletico",       "Atletico Madrid",     "Soccer"),
  team("soc_tottenham",     "Tottenham Hotspur",         "Tottenham",      "Tottenham",           "Soccer"),
  team("soc_dortmund",      "Borussia Dortmund",         "Dortmund",       "Borussia Dortmund",   "Soccer"),
  team("soc_roma",          "AS Roma",                   "Roma",           "Roma",                "Soccer"),
  team("soc_napoli",        "SSC Napoli",                "Napoli",         "Napoli",              "Soccer"),
];

const SOCCER_AWARDS = [
  award("soc_ucl",            "Champions League Winner",     "UCL Winner",       "ucl_winner",            "Soccer"), // 100
  award("soc_pl_champ",       "Premier League Champion",     "PL Champ",         "premier_league_winner", "Soccer"), // 62
  award("soc_ballon_dor",     "Ballon d'Or",                 "Ballon d'Or",      "ballon_dor",            "Soccer"), // 54
  award("soc_wc_winner",      "FIFA World Cup Winner",       "WC Winner",        "world_cup_winner",      "Soccer"), // 43
  award("soc_bundesliga",     "Bundesliga Champion",         "Bundesliga",       "bundesliga_winner",     "Soccer"), // 20
  award("soc_ligue_1",        "Ligue 1 Champion",            "Ligue 1",          "ligue_1_winner",        "Soccer"), // 20
  award("soc_serie_a",        "Serie A Champion",            "Serie A",          "serie_a_winner",        "Soccer"), // 19
  award("soc_pl_golden_boot", "Premier League Golden Boot",  "PL Golden Boot",   "pl_golden_boot",        "Soccer"), // 20
];

const SOCCER_STATS = [
  stat("soc_ucl_final_goal",  "Scored in a UCL Final",       "UCL Final Goal",   "scored_in_ucl_final",   "Soccer"), // 20
  stat("soc_wc_final_goal",   "Scored in a World Cup Final", "WC Final Goal",    "wc_final_scorer",       "Soccer"), // 20
  stat("soc_50_ucl_goals",    "50+ Champions League Goals",  "50+ UCL Goals",    "ucl_50_goals",          "Soccer"), // 18
  stat("soc_50_intl_goals",   "50+ International Goals",     "50+ Intl Goals",   "international_50_goals","Soccer"), // 18
  stat("soc_golden_boot",     "Domestic League Golden Boot", "Golden Boot",      "domestic_golden_boot",  "Soccer"), // 18
  stat("soc_wc_hat_trick",    "World Cup Hat Trick",         "WC Hat Trick",     "wc_hat_trick",          "Soccer"), // 15
];

const SOCCER_ATTRS = [
  attr("soc_played_la_liga",  "Played in La Liga",           "La Liga",          "played_in_la_liga",     "Soccer"), // 24
  attr("soc_played_pl",       "Played in the Premier League","Played in PL",     "played_in_premier_league","Soccer"),// 24
  attr("soc_ucl_multi_clubs", "Won UCL with 2+ Clubs",       "UCL 2+ Clubs",     "ucl_final_two_clubs",   "Soccer"), // 20
];

// ═════════════════════════════════════════════════════════════════════════════
//  MASTER LIST + EXPORTS
// ═════════════════════════════════════════════════════════════════════════════

export const CATEGORIES = [
  ...NBA_TEAMS, ...NBA_AWARDS, ...NBA_STATS, ...NBA_ATTRS,
  ...NFL_TEAMS, ...NFL_AWARDS, ...NFL_STATS, ...NFL_ATTRS,
  ...MLB_TEAMS, ...MLB_AWARDS, ...MLB_STATS, ...MLB_ATTRS,
  ...NHL_TEAMS, ...NHL_AWARDS, ...NHL_STATS, ...NHL_ATTRS,
  ...SOCCER_TEAMS, ...SOCCER_AWARDS, ...SOCCER_STATS, ...SOCCER_ATTRS,
];

// Quick lookup: id → category
export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.id, c]));

// Grouped by sport
export const CATEGORIES_BY_SPORT = {};
for (const c of CATEGORIES) {
  if (!CATEGORIES_BY_SPORT[c.sport]) CATEGORIES_BY_SPORT[c.sport] = [];
  CATEGORIES_BY_SPORT[c.sport].push(c);
}

// Non-team categories by sport (awards, stats, attributes)
export const NON_TEAM_BY_SPORT = {};
for (const c of CATEGORIES) {
  if (c.type === "team") continue;
  if (!NON_TEAM_BY_SPORT[c.sport]) NON_TEAM_BY_SPORT[c.sport] = [];
  NON_TEAM_BY_SPORT[c.sport].push(c);
}

// Team categories by sport
export const TEAMS_BY_SPORT = {};
for (const c of CATEGORIES) {
  if (c.type !== "team") continue;
  if (!TEAMS_BY_SPORT[c.sport]) TEAMS_BY_SPORT[c.sport] = [];
  TEAMS_BY_SPORT[c.sport].push(c);
}

// ─── SUMMARY ──────────────────────────────────────────────────────────────────
// NBA:    30 teams + 18 awards/stats/attrs = 48 categories
// NFL:    31 teams + 16 awards/stats/attrs = 47 categories
// MLB:    29 teams + 20 awards/stats/attrs = 49 categories
// NHL:    25 teams + 17 awards/stats/attrs = 42 categories
// Soccer: 17 teams + 17 awards/stats/attrs = 34 categories
// ──────────────────────────────────────────────────────────────────────────────
// TOTAL: 220 categories
