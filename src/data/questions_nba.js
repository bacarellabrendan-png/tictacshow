// ─── NBA QUESTIONS ────────────────────────────────────────────────────────────
// Every question has TWO conditions joined by AND.

export const NBA_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_nba_champ_foreign: { clue: "Name an NBA player who won a championship AND was born outside the United States", sport: "NBA", rules: [{ fact_type: "nba_champion" }, { fact_type: "born_outside_us" }], answers: [
    {name:"Hakeem Olajuwon"},{name:"Tony Parker"},{name:"Manu Ginobili"},
    {name:"Dirk Nowitzki"},{name:"Steve Nash"},{name:"Pau Gasol"},
    {name:"Tim Duncan"},{name:"Nikola Jokic"},{name:"Giannis Antetokounmpo"},
    {name:"Luol Deng"},{name:"Toni Kukoc"},{name:"Patrick Ewing"},
    {name:"Luc Longley"},{name:"Rik Smits"},{name:"Sarunas Marciulionis"},
    {name:"Boris Diaw"},{name:"Marco Belinelli"},{name:"Patty Mills"},
    {name:"Goran Dragic"},{name:"Mario Chalmers"},{name:"Andrew Bogut"},
  ]},

  q_nba_mvp_champ_same_year: { clue: "Name an NBA player who won the regular season MVP award AND won a championship in the same year", sport: "NBA", rules: [{ fact_type: "nba_mvp" }, { fact_type: "nba_champion_same_year_as_mvp" }], answers: [
    {name:"LeBron James"},{name:"Michael Jordan"},{name:"Magic Johnson"},
    {name:"Larry Bird"},{name:"Kareem Abdul-Jabbar"},{name:"Shaquille O'Neal"},
    {name:"Tim Duncan"},{name:"Moses Malone"},{name:"Stephen Curry"},
    {name:"Giannis Antetokounmpo"},{name:"Nikola Jokic"},{name:"Bob Pettit"},
    {name:"Willis Reed"},{name:"Dave Cowens"},{name:"Bill Russell"},
  ]},

  q_nba_top5_pick_allstar10: { clue: "Name an NBA player drafted in the top 5 AND selected to 10 or more All-Star games", sport: "NBA", rules: [{ fact_type: "nba_top_5_pick" }, { fact_type: "nba_10_plus_allstar" }], answers: [
    {name:"LeBron James"},{name:"Shaquille O'Neal"},{name:"Magic Johnson"},
    {name:"Patrick Ewing"},{name:"Allen Iverson"},{name:"Kareem Abdul-Jabbar"},
    {name:"Tim Duncan"},{name:"Kevin Durant"},{name:"Dwight Howard"},
    {name:"Kyrie Irving"},{name:"Derrick Rose"},{name:"Chris Webber"},
    {name:"Jason Kidd"},{name:"Glenn Robinson"},{name:"Danny Manning"},
  ]},

  q_nba_50pts_2000s: { clue: "Name an NBA player who scored 50 or more points in a game AND it happened in the 2000s or later", sport: "NBA", rules: [{ fact_type: "nba_50_point_game" }, { fact_type: "nba_50_point_game_2000s" }], answers: [
    {name:"Kobe Bryant"},{name:"LeBron James"},{name:"James Harden"},
    {name:"Kevin Durant"},{name:"Devin Booker"},{name:"Donovan Mitchell"},
    {name:"Damian Lillard"},{name:"Luka Doncic"},{name:"Giannis Antetokounmpo"},
    {name:"Joel Embiid"},{name:"Carmelo Anthony"},{name:"Gilbert Arenas"},
    {name:"Tracy McGrady"},{name:"Dwyane Wade"},{name:"Karl-Anthony Towns"},
    {name:"Kemba Walker"},{name:"Bradley Beal"},{name:"Kyrie Irving"},
  ]},

  q_nba_20k_pts_champ: { clue: "Name an NBA player who scored 20,000 or more career points AND won at least one championship", sport: "NBA", rules: [{ fact_type: "nba_20000_career_points" }, { fact_type: "nba_champion" }], answers: [
    {name:"LeBron James"},{name:"Kareem Abdul-Jabbar"},{name:"Kobe Bryant"},
    {name:"Michael Jordan"},{name:"Shaquille O'Neal"},{name:"Tim Duncan"},
    {name:"Hakeem Olajuwon"},{name:"Moses Malone"},{name:"Kevin Durant"},
    {name:"Dirk Nowitzki"},{name:"Magic Johnson"},{name:"Jerry West"},
    {name:"Elgin Baylor"},{name:"Oscar Robertson"},{name:"Paul Pierce"},
  ]},

  q_nba_lakers_celtics: { clue: "Name an NBA player who played for both the Los Angeles Lakers AND the Boston Celtics during their career", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Lakers" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"Gary Payton"},{name:"Antoine Walker"},{name:"Dominique Wilkins"},
    {name:"Rick Fox"},{name:"Sherman Douglas"},{name:"Robert Parish"},
    {name:"Randy Foye"},{name:"Dino Radja"},{name:"Kareem Abdul-Jabbar"},
    {name:"Rajon Rondo"},{name:"Isaiah Thomas"},{name:"Chris Paul"},
    {name:"Joe Johnson"},{name:"Kevin McHale"},{name:"Vlade Divac"},
    {name:"Nate Archibald"},{name:"Danny Ainge"},{name:"Chris Mihm"},
  ]},

  q_nba_6th_man_champ: { clue: "Name an NBA player who won the Sixth Man of the Year Award AND also won a championship during their career", sport: "NBA", rules: [{ fact_type: "nba_sixth_man_award" }, { fact_type: "nba_champion" }], answers: [
    {name:"Kevin McHale"},{name:"Manu Ginobili"},{name:"Jason Terry"},
    {name:"Detlef Schrempf"},{name:"Ricky Pierce"},{name:"Lamar Odom"},
    {name:"Taj Gibson"},{name:"Lou Williams"},{name:"Leandro Barbosa"},
    {name:"Jamal Crawford"},{name:"Vinnie Johnson"},{name:"Bobby Jackson"},
    {name:"Thabo Sefolosha"},{name:"Corey Brewer"},{name:"Dell Curry"},
    {name:"Toney Douglas"},{name:"James Jones"},
  ]},

  q_nba_finals_mvp_1st_round: { clue: "Name an NBA player who won Finals MVP AND was drafted outside of the top 10 overall picks", sport: "NBA", rules: [{ fact_type: "nba_finals_mvp" }, { fact_type: "nba_drafted_outside_top_10" }], answers: [
    {name:"Andre Iguodala"},{name:"Kawhi Leonard"},{name:"Tony Parker"},
    {name:"Chauncey Billups"},{name:"Dwyane Wade"},{name:"LeBron James"},
    {name:"Bill Walton"},{name:"Jo Jo White"},{name:"Tom Gola"},
    {name:"Jerry West"},{name:"Cedric Maxwell"},{name:"Magic Johnson"},
    {name:"Larry Bird"},{name:"Isiah Thomas"},{name:"Michael Jordan"},
    {name:"Hakeem Olajuwon"},{name:"Shaquille O'Neal"},{name:"Tim Duncan"},
    {name:"Dirk Nowitzki"},{name:"Giannis Antetokounmpo"},{name:"Stephen Curry"},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_nba_triple_dbl_season_champ: { clue: "Name an NBA player who averaged a triple-double for a full season AND won a championship during their career", sport: "NBA", rules: [{ fact_type: "nba_triple_double_season" }, { fact_type: "nba_champion" }], answers: [
    {name:"Russell Westbrook"},{name:"Oscar Robertson"},{name:"Nikola Jokic"},
    {name:"LeBron James"},{name:"Magic Johnson"},{name:"Jason Kidd"},
    {name:"Draymond Green"},{name:"Rajon Rondo"},{name:"Larry Bird"},
    {name:"Bob Cousy"},{name:"Wilt Chamberlain"},{name:"Michael Jordan"},
    {name:"Scottie Pippen"},{name:"Tim Duncan"},{name:"Manu Ginobili"},
    {name:"Tony Parker"},{name:"Stephen Curry"},{name:"Klay Thompson"},
  ]},

  q_nba_undrafted_mvp: { clue: "Name an NBA player who was drafted outside the top 5 picks in their draft class AND won an NBA MVP award", sport: "NBA", rules: [{ fact_type: "nba_drafted_outside_top_5" }, { fact_type: "nba_mvp" }], answers: [
    {name:"Steve Nash"},{name:"Dirk Nowitzki"},{name:"Giannis Antetokounmpo"},
    {name:"Moses Malone"},{name:"Willis Reed"},{name:"Nikola Jokic"},
    {name:"Bob Cousy"},{name:"Wes Unseld"},{name:"Dave Cowens"},
    {name:"Dolph Schayes"},{name:"Dennis Rodman"},{name:"Oscar Robertson"},
    {name:"Larry Bird"},{name:"Bill Russell"},{name:"Bob Pettit"},
    {name:"Derrick Rose"},{name:"Karl Malone"},{name:"Charles Barkley"},
  ]},

  q_nba_coach_500w_ring: { clue: "Name an NBA head coach who won 500 or more regular season games AND won at least one championship", sport: "NBA", rules: [{ fact_type: "nba_coach_500_wins" }, { fact_type: "nba_champion_coach" }], answers: [
    {name:"Phil Jackson"},{name:"Pat Riley"},{name:"Gregg Popovich"},
    {name:"Red Auerbach"},{name:"Chuck Daly"},{name:"Larry Brown"},
    {name:"Doc Rivers"},{name:"Bill Fitch"},{name:"K.C. Jones"},
    {name:"Bill Russell"},{name:"Tom Heinsohn"},{name:"Alex Hannum"},
    {name:"Eddie Gottlieb"},{name:"Lenny Wilkens"},{name:"Don Nelson"},
    {name:"Billy Cunningham"},{name:"Rick Adelman"},
  ]},

  q_nba_scoring_title_assists_title: { clue: "Name an NBA player who won an NBA scoring title in at least one season AND averaged 7 or more assists per game for their career", sport: "NBA", rules: [{ fact_type: "nba_scoring_title" }, { fact_type: "nba_7_assists_career_avg" }], answers: [
    {name:"Michael Jordan"},{name:"Oscar Robertson"},{name:"Allen Iverson"},
    {name:"Nate Archibald"},{name:"Russell Westbrook"},{name:"James Harden"},
    {name:"Pete Maravich"},{name:"Isiah Thomas"},{name:"Magic Johnson"},
    {name:"Kevin Johnson"},{name:"Lenny Wilkens"},{name:"Jerry West"},
    {name:"Kevin Durant"},{name:"John Havlicek"},{name:"David Thompson"},
    {name:"George Gervin"},{name:"Adrian Dantley"},
  ]},

  q_nba_center_20ppg_2bpg: { clue: "Name an NBA center who averaged 20 or more points per game AND 2 or more blocks per game for their career", sport: "NBA", rules: [{ fact_type: "nba_center" }, { fact_type: "nba_20ppg_career" }, { fact_type: "nba_2bpg_career" }], answers: [
    {name:"Kareem Abdul-Jabbar"},{name:"Hakeem Olajuwon"},{name:"Shaquille O'Neal"},
    {name:"David Robinson"},{name:"Patrick Ewing"},{name:"Dikembe Mutombo"},
    {name:"Alonzo Mourning"},{name:"Dwight Howard"},{name:"Joel Embiid"},
    {name:"Anthony Davis"},{name:"Bob McAdoo"},{name:"Mark Eaton"},
    {name:"Manute Bol"},{name:"Elmore Smith"},{name:"Tree Rollins"},
  ]},

  q_nba_acc_college_20ppg_career: { clue: "Name an NBA player who played college basketball in the ACC AND averaged 20 or more points per game for their NBA career", sport: "NBA", rules: [{ fact_type: "college_acc" }, { fact_type: "nba_20ppg_career" }], answers: [
    {name:"Michael Jordan"},{name:"Elgin Baylor"},{name:"Grant Hill"},
    {name:"Bob McAdoo"},{name:"Buck Williams"},{name:"Len Bias"},
    {name:"James Worthy"},{name:"Phil Ford"},{name:"Vince Carter"},
    {name:"Tracy McGrady"},{name:"Danny Ferry"},{name:"Sam Perkins"},
    {name:"Jeff Mullins"},{name:"Dennis Scott"},{name:"Bobby Hurley"},
  ]},

  q_nba_all_def_20ppg_season: { clue: "Name an NBA player who was named to an All-Defensive team AND averaged 20 or more points per game in the same season", sport: "NBA", rules: [{ fact_type: "nba_all_defensive_team" }, { fact_type: "nba_all_def_20ppg_same_season" }], answers: [
    {name:"Michael Jordan"},{name:"LeBron James"},{name:"Scottie Pippen"},
    {name:"Gary Payton"},{name:"Kevin Durant"},{name:"Kawhi Leonard"},
    {name:"Giannis Antetokounmpo"},{name:"Jimmy Butler"},{name:"Paul George"},
    {name:"Draymond Green"},{name:"Luol Deng"},{name:"Ron Artest"},
    {name:"Dennis Johnson"},{name:"Jerry Sloan"},{name:"Walt Frazier"},
    {name:"Dave DeBusschere"},{name:"Bobby Jones"},
  ]},

  q_nba_point_guard_champ_10assists: { clue: "Name an NBA point guard who averaged 10 or more assists per game in a season AND won a championship during their career", sport: "NBA", rules: [{ fact_type: "nba_point_guard" }, { fact_type: "nba_10_assists_season" }, { fact_type: "nba_champion" }], answers: [
    {name:"Magic Johnson"},{name:"John Stockton"},{name:"Chris Paul"},
    {name:"Isiah Thomas"},{name:"Kevin Johnson"},{name:"Jason Kidd"},
    {name:"Bob Cousy"},{name:"Rajon Rondo"},{name:"Tim Hardaway"},
    {name:"Mark Jackson"},{name:"Steve Nash"},{name:"Norm Nixon"},
    {name:"Guy Rodgers"},{name:"Dennis Johnson"},{name:"Terry Porter"},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_nba_foreign_born_allstar_champ: { clue: "Name a foreign-born NBA player who was selected to 5 or more All-Star games AND won at least one championship", sport: "NBA", rules: [{ fact_type: "born_outside_us" }, { fact_type: "nba_5_plus_allstar" }, { fact_type: "nba_champion" }], answers: [
    {name:"Hakeem Olajuwon"},{name:"Tony Parker"},{name:"Dirk Nowitzki"},
    {name:"Pau Gasol"},{name:"Giannis Antetokounmpo"},{name:"Nikola Jokic"},
    {name:"Manu Ginobili"},{name:"Tim Duncan"},{name:"Patrick Ewing"},
    {name:"Steve Nash"},{name:"Vlade Divac"},{name:"Peja Stojakovic"},
    {name:"Toni Kukoc"},{name:"Rik Smits"},{name:"Chris Bosh"},
    {name:"Luol Deng"},{name:"Detlef Schrempf"},
  ]},

  q_nba_dpoy_all_nba: { clue: "Name an NBA player who won Defensive Player of the Year AND was also named to an All-NBA team in the same season", sport: "NBA", rules: [{ fact_type: "nba_dpoy" }, { fact_type: "nba_dpoy_all_nba_same_season" }], answers: [
    {name:"Michael Jordan"},{name:"Hakeem Olajuwon"},{name:"Kevin Garnett"},
    {name:"David Robinson"},{name:"Giannis Antetokounmpo"},{name:"Kawhi Leonard"},
    {name:"Ben Wallace"},{name:"Dwight Howard"},{name:"Dikembe Mutombo"},
    {name:"Draymond Green"},{name:"Anthony Davis"},{name:"Rudy Gobert"},
    {name:"Sidney Moncrief"},{name:"Bobby Jones"},{name:"Alvin Robertson"},
    {name:"Mark Eaton"},{name:"Dennis Rodman"},
  ]},

  q_nba_50pts_and_won_ring: { clue: "Name an NBA player who scored 50 or more points in a game AND won at least one NBA championship", sport: "NBA", rules: [{ fact_type: "nba_50_point_game" }, { fact_type: "nba_champion" }], answers: [
    {name:"Michael Jordan"},{name:"Kobe Bryant"},{name:"LeBron James"},
    {name:"Wilt Chamberlain"},{name:"Elgin Baylor"},{name:"Rick Barry"},
    {name:"Kevin Durant"},{name:"Stephen Curry"},{name:"Jerry West"},
    {name:"Kareem Abdul-Jabbar"},{name:"Dwyane Wade"},{name:"Magic Johnson"},
    {name:"Shaquille O'Neal"},{name:"Hakeem Olajuwon"},{name:"Tim Duncan"},
    {name:"Isiah Thomas"},{name:"Larry Bird"},{name:"Moses Malone"},
    {name:"Giannis Antetokounmpo"},{name:"Nikola Jokic"},
  ]},

  q_nba_scoring_champ_no_ring: { clue: "Name an NBA player who won the scoring title AND never won an NBA championship during their career", sport: "NBA", rules: [{ fact_type: "nba_scoring_title" }, { fact_type: "nba_never_won_championship" }], answers: [
    {name:"Carmelo Anthony"},{name:"Kevin Durant"},{name:"Allen Iverson"},
    {name:"Dominique Wilkins"},{name:"Adrian Dantley"},{name:"Richie Guerin"},
    {name:"Pete Maravich"},{name:"Bob McAdoo"},{name:"Neil Johnston"},
    {name:"George Gervin"},{name:"James Harden"},{name:"Damian Lillard"},
    {name:"Joel Embiid"},{name:"Bernard King"},{name:"Max Zaslofsky"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NBA_BEGINNER = [
  "q_nba_champ_foreign","q_nba_mvp_champ_same_year","q_nba_top5_pick_allstar10",
  "q_nba_50pts_2000s","q_nba_20k_pts_champ","q_nba_lakers_celtics",
  "q_nba_6th_man_champ","q_nba_finals_mvp_1st_round",
];

export const NBA_KNOWLEDGEABLE = [
  "q_nba_triple_dbl_season_champ","q_nba_undrafted_mvp","q_nba_coach_500w_ring",
  "q_nba_scoring_title_assists_title","q_nba_center_20ppg_2bpg",
  "q_nba_acc_college_20ppg_career","q_nba_all_def_20ppg_season",
  "q_nba_point_guard_champ_10assists",
];

export const NBA_EXPERT = [
  "q_nba_foreign_born_allstar_champ","q_nba_dpoy_all_nba",
  "q_nba_50pts_and_won_ring","q_nba_scoring_champ_no_ring",
];
