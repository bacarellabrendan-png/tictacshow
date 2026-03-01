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

  q_nba_lakers_heat: { clue: "Name an NBA player who played for both the Lakers AND the Heat", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Lakers" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"LeBron James"},{name:"Shaquille O'Neal"},{name:"Dwyane Wade"},
    {name:"Lamar Odom"},{name:"Eddie Jones"},{name:"Gary Payton"},
    {name:"Glen Rice"},{name:"Alonzo Mourning"},{name:"Trevor Ariza"},
    {name:"Norris Cole"},{name:"Mario Chalmers"},{name:"James Jones"},
  ]},

  q_nba_lakers_bulls: { clue: "Name an NBA player who played for both the Lakers AND the Bulls", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Lakers" }, { fact_type: "played_for_team", fact_value: "Bulls" }], answers: [
    {name:"Shaquille O'Neal"},{name:"Pau Gasol"},{name:"Lamar Odom"},
    {name:"Ron Artest"},{name:"Dennis Rodman"},{name:"Horace Grant"},
    {name:"Robert Horry"},{name:"Caron Butler"},{name:"Elgin Baylor"},
    {name:"Carlos Boozer"},{name:"Luol Deng"},{name:"Norm Nixon"},
  ]},

  q_nba_knicks_nets: { clue: "Name an NBA player who played for both the Knicks AND the Nets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Knicks" }, { fact_type: "played_for_team", fact_value: "Nets" }], answers: [
    {name:"Jason Kidd"},{name:"Kenyon Martin"},{name:"Kerry Kittles"},
    {name:"Marcus Camby"},{name:"Stephon Marbury"},{name:"Vince Carter"},
    {name:"Carmelo Anthony"},{name:"Drazen Petrovic"},{name:"Buck Williams"},
    {name:"Kevin Durant"},{name:"DeAndre Jordan"},{name:"Julius Randle"},
  ]},

  q_nba_warriors_cavaliers: { clue: "Name an NBA player who played for both the Warriors AND the Cavaliers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Warriors" }, { fact_type: "played_for_team", fact_value: "Cavaliers" }], answers: [
    {name:"Kevin Durant"},{name:"Andrew Wiggins"},{name:"Anderson Varejao"},
    {name:"Donyell Marshall"},{name:"Larry Hughes"},{name:"Mo Williams"},
    {name:"Baron Davis"},{name:"Alonzo Mourning"},{name:"Andrew Bogut"},
    {name:"Ricky Davis"},{name:"Omri Casspi"},{name:"Iman Shumpert"},
  ]},

  q_nba_celtics_nets: { clue: "Name an NBA player who played for both the Celtics AND the Nets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Celtics" }, { fact_type: "played_for_team", fact_value: "Nets" }], answers: [
    {name:"Kevin Garnett"},{name:"Paul Pierce"},{name:"Jason Terry"},
    {name:"Ray Allen"},{name:"Kyrie Irving"},{name:"Joe Johnson"},
    {name:"Deron Williams"},{name:"Stephon Marbury"},{name:"Antoine Walker"},
    {name:"Vince Carter"},{name:"Keith Van Horn"},{name:"Kerry Kittles"},
  ]},

  q_nba_spurs_raptors: { clue: "Name an NBA player who played for both the Spurs AND the Raptors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Spurs" }, { fact_type: "played_for_team", fact_value: "Raptors" }], answers: [
    {name:"Kawhi Leonard"},{name:"Danny Green"},{name:"DeMar DeRozan"},
    {name:"Jakob Poeltl"},{name:"Rasual Butler"},{name:"Gary Neal"},
    {name:"Drew Eubanks"},{name:"Goran Dragic"},{name:"Thaddeus Young"},
    {name:"Rudy Gay"},{name:"Matt Bonner"},{name:"Cory Joseph"},
  ]},

  q_nba_heat_celtics: { clue: "Name an NBA player who played for both the Heat AND the Celtics", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Heat" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"LeBron James"},{name:"Ray Allen"},{name:"Shaquille O'Neal"},
    {name:"Eddie House"},{name:"Jae Crowder"},{name:"Gary Payton"},
    {name:"Alonzo Mourning"},{name:"Tim Hardaway"},{name:"Antoine Walker"},
    {name:"Greg Monroe"},{name:"Rasheed Wallace"},{name:"P.J. Brown"},
  ]},

  q_nba_lakers_rockets: { clue: "Name an NBA player who played for both the Lakers AND the Rockets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Lakers" }, { fact_type: "played_for_team", fact_value: "Rockets" }], answers: [
    {name:"Dwight Howard"},{name:"Russell Westbrook"},{name:"Carmelo Anthony"},
    {name:"Robert Horry"},{name:"Steve Francis"},{name:"Rick Fox"},
    {name:"Scottie Pippen"},{name:"Clyde Drexler"},{name:"Trevor Ariza"},
    {name:"Ramon Sessions"},{name:"Vernon Maxwell"},{name:"Dennis Schroder"},
  ]},

  q_nba_warriors_lakers: { clue: "Name an NBA player who played for both the Warriors AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Warriors" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Wilt Chamberlain"},{name:"Rick Barry"},{name:"Chris Mullin"},
    {name:"Robert Parish"},{name:"D'Angelo Russell"},{name:"Nick Young"},
    {name:"Kent Bazemore"},{name:"Jeremy Lin"},{name:"Gary Payton II"},
    {name:"Avery Bradley"},{name:"Matt Barnes"},{name:"Derek Fisher"},
  ]},

  q_nba_bulls_heat: { clue: "Name an NBA player who played for both the Bulls AND the Heat", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Bulls" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"LeBron James"},{name:"Dwyane Wade"},{name:"Jimmy Butler"},
    {name:"Shaquille O'Neal"},{name:"Luol Deng"},{name:"Carlos Boozer"},
    {name:"Chris Bosh"},{name:"Ben Gordon"},{name:"Jamal Crawford"},
    {name:"Kirk Hinrich"},{name:"Taj Gibson"},{name:"P.J. Brown"},
  ]},

  q_nba_sixers_nets: { clue: "Name an NBA player who played for both the 76ers AND the Nets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "76ers" }, { fact_type: "played_for_team", fact_value: "Nets" }], answers: [
    {name:"Julius Erving"},{name:"Allen Iverson"},{name:"Charles Barkley"},
    {name:"Vince Carter"},{name:"Drazen Petrovic"},{name:"Ben Simmons"},
    {name:"James Harden"},{name:"Seth Curry"},{name:"Andre Drummond"},
    {name:"Keith Van Horn"},{name:"Derrick Coleman"},{name:"Kenny Anderson"},
  ]},

  q_nba_celtics_cavaliers: { clue: "Name an NBA player who played for both the Celtics AND the Cavaliers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Celtics" }, { fact_type: "played_for_team", fact_value: "Cavaliers" }], answers: [
    {name:"LeBron James"},{name:"Kyrie Irving"},{name:"Shaquille O'Neal"},
    {name:"Jae Crowder"},{name:"Isaiah Thomas"},{name:"Derrick Rose"},
    {name:"Danny Green"},{name:"Jeff Green"},{name:"Deron Williams"},
    {name:"Mo Williams"},{name:"Andrew Bynum"},{name:"Evan Turner"},
  ]},

  q_nba_lakers_clippers: { clue: "Name an NBA player who played for both the Lakers AND the Clippers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Lakers" }, { fact_type: "played_for_team", fact_value: "Clippers" }], answers: [
    {name:"Lamar Odom"},{name:"Caron Butler"},{name:"Norm Nixon"},
    {name:"Corey Maggette"},{name:"Montrezl Harrell"},{name:"Lou Williams"},
    {name:"Paul George"},{name:"Russell Westbrook"},{name:"Ivica Zubac"},
    {name:"Patrick Beverley"},{name:"Rajon Rondo"},{name:"Matt Barnes"},
  ]},

  q_nba_warriors_thunder: { clue: "Name an NBA player who played for both the Warriors AND the Thunder", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Warriors" }, { fact_type: "played_for_team", fact_value: "Thunder" }], answers: [
    {name:"Kevin Durant"},{name:"Russell Westbrook"},{name:"James Harden"},
    {name:"Jeff Green"},{name:"Andre Roberson"},{name:"Serge Ibaka"},
    {name:"Avery Bradley"},{name:"Gary Payton II"},{name:"Kelly Oubre Jr"},
    {name:"Chris Paul"},{name:"Victor Oladipo"},{name:"Al Horford"},
  ]},

  q_nba_mvp_lakers: { clue: "Name an NBA player who won the MVP award AND played for the Lakers", sport: "NBA", rules: [{ fact_type: "nba_mvp" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"LeBron James"},{name:"Kobe Bryant"},{name:"Shaquille O'Neal"},
    {name:"Magic Johnson"},{name:"Kareem Abdul-Jabbar"},{name:"Wilt Chamberlain"},
    {name:"Karl Malone"},{name:"Steve Nash"},{name:"Bob Pettit"},
    {name:"Jerry West"},{name:"Russell Westbrook"},{name:"Elgin Baylor"},
  ]},

  q_nba_allstar_warriors: { clue: "Name an NBA All-Star who played for the Warriors", sport: "NBA", rules: [{ fact_type: "nba_all_star" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Stephen Curry"},{name:"Kevin Durant"},{name:"Klay Thompson"},
    {name:"Draymond Green"},{name:"Wilt Chamberlain"},{name:"Rick Barry"},
    {name:"Chris Mullin"},{name:"Tim Hardaway"},{name:"Baron Davis"},
    {name:"Andrew Wiggins"},{name:"D'Angelo Russell"},{name:"Mitch Richmond"},
  ]},

  q_nba_champ_heat: { clue: "Name an NBA player who won a championship AND played for the Heat", sport: "NBA", rules: [{ fact_type: "nba_champion" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"LeBron James"},{name:"Dwyane Wade"},{name:"Shaquille O'Neal"},
    {name:"Chris Bosh"},{name:"Ray Allen"},{name:"Gary Payton"},
    {name:"Alonzo Mourning"},{name:"Udonis Haslem"},{name:"Mario Chalmers"},
    {name:"Shane Battier"},{name:"Mike Miller"},{name:"James Jones"},
  ]},

  q_nba_rockets_nets: { clue: "Name an NBA player who played for both the Rockets AND the Nets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Rockets" }, { fact_type: "played_for_team", fact_value: "Nets" }], answers: [
    {name:"James Harden"},{name:"Vince Carter"},{name:"Kenyon Martin"},
    {name:"Jason Kidd"},{name:"Dwight Howard"},{name:"P.J. Tucker"},
    {name:"Victor Oladipo"},{name:"Steve Francis"},{name:"Richard Jefferson"},
    {name:"Eric Gordon"},{name:"Ben McLemore"},{name:"DeAndre Jordan"},
  ]},

  q_nba_sixers_lakers: { clue: "Name an NBA player who played for both the 76ers AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "76ers" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Wilt Chamberlain"},{name:"Allen Iverson"},{name:"Moses Malone"},
    {name:"Charles Barkley"},{name:"Andrew Bynum"},{name:"Dwight Howard"},
    {name:"George McGinnis"},{name:"Steve Mix"},{name:"Chet Walker"},
    {name:"Marc Gasol"},{name:"Tobias Harris"},{name:"Dennis Schroder"},
  ]},

  q_nba_heat_sixers: { clue: "Name an NBA player who played for both the Heat AND the 76ers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Heat" }, { fact_type: "played_for_team", fact_value: "76ers" }], answers: [
    {name:"Jimmy Butler"},{name:"Andre Iguodala"},{name:"Dwyane Wade"},
    {name:"Chris Bosh"},{name:"Keith Van Horn"},{name:"Jerry Stackhouse"},
    {name:"Kyle Lowry"},{name:"P.J. Tucker"},{name:"Tobias Harris"},
    {name:"Danny Green"},{name:"Jahlil Okafor"},{name:"Andre Drummond"},
  ]},

  q_nba_mavs_lakers: { clue: "Name an NBA player who played for both the Mavericks AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Mavericks" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Jason Kidd"},{name:"Lamar Odom"},{name:"Steve Nash"},
    {name:"Dennis Rodman"},{name:"Caron Butler"},{name:"Mark Aguirre"},
    {name:"Derek Harper"},{name:"Erick Dampier"},{name:"Rajon Rondo"},
    {name:"Roy Tarpley"},{name:"Devin Harris"},{name:"Dwight Howard"},
  ]},

  q_nba_thunder_heat: { clue: "Name an NBA player who played for both the Thunder AND the Heat", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Thunder" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"Kevin Durant"},{name:"Russell Westbrook"},{name:"James Harden"},
    {name:"Dion Waiters"},{name:"Victor Oladipo"},{name:"Serge Ibaka"},
    {name:"Andre Roberson"},{name:"Goran Dragic"},{name:"Chris Paul"},
    {name:"Kyle Singler"},{name:"P.J. Tucker"},{name:"Kendrick Perkins"},
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

  q_nba_mavs_heat: { clue: "Name an NBA player who played for both the Mavericks AND the Heat", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Mavericks" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"Shawn Marion"},{name:"Jason Terry"},{name:"Dwyane Wade"},
    {name:"Lamar Odom"},{name:"Tyson Chandler"},{name:"Steve Nash"},
    {name:"Gary Payton"},{name:"Eddie Jones"},{name:"Tim Hardaway"},
    {name:"Erick Dampier"},{name:"Jerry Stackhouse"},{name:"Brendan Haywood"},
  ]},

  q_nba_celtics_sixers: { clue: "Name an NBA player who played for both the Celtics AND the 76ers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Celtics" }, { fact_type: "played_for_team", fact_value: "76ers" }], answers: [
    {name:"Allen Iverson"},{name:"Moses Malone"},{name:"Charles Barkley"},
    {name:"Al Horford"},{name:"Evan Turner"},{name:"Dana Barros"},
    {name:"Rick Fox"},{name:"Terry Rozier"},{name:"Tony Wroten"},
    {name:"Nate Robinson"},{name:"Nate Archibald"},{name:"Bobby Jones"},
  ]},

  q_nba_spurs_lakers: { clue: "Name an NBA player who played for both the Spurs AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Spurs" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"LaMarcus Aldridge"},{name:"DeMar DeRozan"},{name:"Pau Gasol"},
    {name:"Robert Horry"},{name:"Dennis Rodman"},{name:"Caron Butler"},
    {name:"Danny Green"},{name:"Boris Diaw"},{name:"Tracy McGrady"},
    {name:"George Hill"},{name:"Lou Williams"},{name:"Avery Johnson"},
  ]},

  q_nba_rockets_warriors: { clue: "Name an NBA player who played for both the Rockets AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Rockets" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Chris Paul"},{name:"Hakeem Olajuwon"},{name:"Charles Barkley"},
    {name:"Scottie Pippen"},{name:"Clyde Drexler"},{name:"Steve Francis"},
    {name:"Baron Davis"},{name:"Victor Oladipo"},{name:"Eric Gordon"},
    {name:"Jason Richardson"},{name:"Jon Barry"},{name:"Kevin Martin"},
  ]},

  q_nba_suns_mavs: { clue: "Name an NBA player who played for both the Suns AND the Mavericks", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Suns" }, { fact_type: "played_for_team", fact_value: "Mavericks" }], answers: [
    {name:"Steve Nash"},{name:"Jason Kidd"},{name:"Shawn Marion"},
    {name:"Amare Stoudemire"},{name:"Tyson Chandler"},{name:"Goran Dragic"},
    {name:"Devin Booker"},{name:"Leandro Barbosa"},{name:"Michael Finley"},
    {name:"Cedric Ceballos"},{name:"Roy Tarpley"},{name:"Raja Bell"},
  ]},

  q_nba_bulls_cavaliers: { clue: "Name an NBA player who played for both the Bulls AND the Cavaliers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Bulls" }, { fact_type: "played_for_team", fact_value: "Cavaliers" }], answers: [
    {name:"LeBron James"},{name:"Derrick Rose"},{name:"Dwyane Wade"},
    {name:"Carlos Boozer"},{name:"Luol Deng"},{name:"Larry Nance Jr"},
    {name:"Tristan Thompson"},{name:"Ricky Davis"},{name:"Ben Wallace"},
    {name:"Larry Hughes"},{name:"Tyrone Hill"},{name:"John Lucas III"},
  ]},

  q_nba_nuggets_lakers: { clue: "Name an NBA player who played for both the Nuggets AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Nuggets" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Carmelo Anthony"},{name:"Allen Iverson"},{name:"Andre Iguodala"},
    {name:"Dwight Howard"},{name:"Chauncey Billups"},{name:"Kentavious Caldwell-Pope"},
    {name:"JaVale McGee"},{name:"Arron Afflalo"},{name:"Andre Miller"},
    {name:"Earl Clark"},{name:"J.R. Smith"},{name:"Nick Young"},
  ]},

  q_nba_raptors_heat: { clue: "Name an NBA player who played for both the Raptors AND the Heat", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Raptors" }, { fact_type: "played_for_team", fact_value: "Heat" }], answers: [
    {name:"Chris Bosh"},{name:"Vince Carter"},{name:"Goran Dragic"},
    {name:"Kyle Lowry"},{name:"Shawn Marion"},{name:"Jalen Rose"},
    {name:"Alonzo Mourning"},{name:"Donyell Marshall"},{name:"Matt Barnes"},
    {name:"Hedo Turkoglu"},{name:"P.J. Tucker"},{name:"Norman Powell"},
  ]},

  q_nba_pistons_bulls: { clue: "Name an NBA player who played for both the Pistons AND the Bulls", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Pistons" }, { fact_type: "played_for_team", fact_value: "Bulls" }], answers: [
    {name:"Dennis Rodman"},{name:"Ben Wallace"},{name:"Rip Hamilton"},
    {name:"Derrick Rose"},{name:"Isiah Thomas"},{name:"Bill Laimbeer"},
    {name:"Carlos Delfino"},{name:"Carlos Boozer"},{name:"Joakim Noah"},
    {name:"Taj Gibson"},{name:"Tracy McGrady"},{name:"Ben Gordon"},
  ]},

  q_nba_pacers_lakers: { clue: "Name an NBA player who played for both the Pacers AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Pacers" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Ron Artest"},{name:"Jermaine O'Neal"},{name:"Mark Jackson"},
    {name:"Reggie Miller"},{name:"LeBron James"},{name:"Danny Granger"},
    {name:"Roy Hibbert"},{name:"Rik Smits"},{name:"George Hill"},
    {name:"Andrew Bynum"},{name:"Lance Stephenson"},{name:"Dale Davis"},
  ]},

  q_nba_knicks_bulls: { clue: "Name an NBA player who played for both the Knicks AND the Bulls", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Knicks" }, { fact_type: "played_for_team", fact_value: "Bulls" }], answers: [
    {name:"Carmelo Anthony"},{name:"Derrick Rose"},{name:"Charles Oakley"},
    {name:"Tyson Chandler"},{name:"Eddy Curry"},{name:"Jamal Crawford"},
    {name:"Marcus Camby"},{name:"Steve Novak"},{name:"Joakim Noah"},
    {name:"Nate Robinson"},{name:"Tracy McGrady"},{name:"Kurt Thomas"},
  ]},

  q_nba_allstar_knicks: { clue: "Name an NBA All-Star who played for the Knicks", sport: "NBA", rules: [{ fact_type: "nba_all_star" }, { fact_type: "played_for_team", fact_value: "Knicks" }], answers: [
    {name:"Patrick Ewing"},{name:"Carmelo Anthony"},{name:"Walt Frazier"},
    {name:"Willis Reed"},{name:"Bernard King"},{name:"Dave DeBusschere"},
    {name:"Bill Bradley"},{name:"Amare Stoudemire"},{name:"Allan Houston"},
    {name:"Latrell Sprewell"},{name:"Jason Kidd"},{name:"Kristaps Porzingis"},
  ]},

  q_nba_champ_spurs: { clue: "Name an NBA player who won a championship AND played for the Spurs", sport: "NBA", rules: [{ fact_type: "nba_champion" }, { fact_type: "played_for_team", fact_value: "Spurs" }], answers: [
    {name:"Tim Duncan"},{name:"Tony Parker"},{name:"Manu Ginobili"},
    {name:"David Robinson"},{name:"Kawhi Leonard"},{name:"LaMarcus Aldridge"},
    {name:"Boris Diaw"},{name:"Robert Horry"},{name:"Avery Johnson"},
    {name:"Bruce Bowen"},{name:"Danny Green"},{name:"Patty Mills"},
  ]},

  q_nba_blazers_rockets: { clue: "Name an NBA player who played for both the Trail Blazers AND the Rockets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Trail Blazers" }, { fact_type: "played_for_team", fact_value: "Rockets" }], answers: [
    {name:"Clyde Drexler"},{name:"Scottie Pippen"},{name:"LaMarcus Aldridge"},
    {name:"Terry Porter"},{name:"Robert Covington"},{name:"Wesley Matthews"},
    {name:"Kenny Smith"},{name:"Steve Smith"},{name:"Brent Barry"},
    {name:"Vernon Maxwell"},{name:"Jerome Kersey"},{name:"Sam Bowie"},
  ]},

  q_nba_celtics_warriors: { clue: "Name an NBA player who played for both the Celtics AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Celtics" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Robert Parish"},{name:"Gary Payton"},{name:"Wilt Chamberlain"},
    {name:"Chris Mullin"},{name:"Al Horford"},{name:"Rick Barry"},
    {name:"Tom Heinsohn"},{name:"David Lee"},{name:"Andre Iguodala"},
    {name:"Baron Davis"},{name:"Jason Richardson"},{name:"Evan Turner"},
  ]},

  q_nba_hawks_lakers: { clue: "Name an NBA player who played for both the Hawks AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Hawks" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Dwight Howard"},{name:"Pau Gasol"},{name:"Dennis Schroder"},
    {name:"Steve Smith"},{name:"Rasheed Wallace"},{name:"Bob Pettit"},
    {name:"Joe Johnson"},{name:"Dikembe Mutombo"},{name:"Dominique Wilkins"},
    {name:"Rajon Rondo"},{name:"Kent Bazemore"},{name:"Anthony Davis"},
  ]},

  q_nba_scoring_title_celtics: { clue: "Name an NBA player who won a scoring title AND played for the Celtics", sport: "NBA", rules: [{ fact_type: "nba_scoring_title" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"Larry Bird"},{name:"Bob Cousy"},{name:"John Havlicek"},
    {name:"Paul Pierce"},{name:"Kevin McHale"},{name:"Ed Macauley"},
    {name:"Bob Pettit"},{name:"Allen Iverson"},{name:"Dominique Wilkins"},
    {name:"Pete Maravich"},{name:"Nate Archibald"},{name:"Dave Cowens"},
  ]},

  q_nba_dpoy_bulls: { clue: "Name an NBA player who won Defensive Player of the Year AND played for the Bulls", sport: "NBA", rules: [{ fact_type: "nba_dpoy" }, { fact_type: "played_for_team", fact_value: "Bulls" }], answers: [
    {name:"Michael Jordan"},{name:"Dennis Rodman"},{name:"Ben Wallace"},
    {name:"Joakim Noah"},{name:"Scottie Pippen"},{name:"Horace Grant"},
    {name:"Dikembe Mutombo"},{name:"Ron Artest"},{name:"Tyson Chandler"},
    {name:"Dwight Howard"},{name:"Marcus Smart"},{name:"Charles Oakley"},
  ]},

  q_nba_allnba_rockets: { clue: "Name an NBA player who made an All-NBA team AND played for the Rockets", sport: "NBA", rules: [{ fact_type: "nba_all_nba_team" }, { fact_type: "played_for_team", fact_value: "Rockets" }], answers: [
    {name:"Hakeem Olajuwon"},{name:"James Harden"},{name:"Charles Barkley"},
    {name:"Tracy McGrady"},{name:"Yao Ming"},{name:"Clyde Drexler"},
    {name:"Elvin Hayes"},{name:"Moses Malone"},{name:"Scottie Pippen"},
    {name:"Dwight Howard"},{name:"Chris Paul"},{name:"Russell Westbrook"},
  ]},

  q_nba_bucks_nets: { clue: "Name an NBA player who played for both the Bucks AND the Nets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Bucks" }, { fact_type: "played_for_team", fact_value: "Nets" }], answers: [
    {name:"Ray Allen"},{name:"Sam Cassell"},{name:"Jason Terry"},
    {name:"Joe Johnson"},{name:"Kevin Garnett"},{name:"Glenn Robinson"},
    {name:"Tim Thomas"},{name:"Gerald Wallace"},{name:"Jason Kidd"},
    {name:"P.J. Tucker"},{name:"Brook Lopez"},{name:"Giannis Antetokounmpo"},
  ]},

  q_nba_suns_rockets: { clue: "Name an NBA player who played for both the Suns AND the Rockets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Suns" }, { fact_type: "played_for_team", fact_value: "Rockets" }], answers: [
    {name:"Charles Barkley"},{name:"Steve Nash"},{name:"Jason Richardson"},
    {name:"Goran Dragic"},{name:"Chris Paul"},{name:"Kevin Johnson"},
    {name:"Penny Hardaway"},{name:"Trevor Ariza"},{name:"Robert Horry"},
    {name:"Tom Chambers"},{name:"Gerald Green"},{name:"P.J. Tucker"},
  ]},

  q_nba_celtics_heat_champ: { clue: "Name an NBA player who won a championship with both the Celtics AND the Heat", sport: "NBA", rules: [{ fact_type: "nba_champion_celtics" }, { fact_type: "nba_champion_heat" }], answers: [
    {name:"LeBron James"},{name:"Ray Allen"},{name:"Shaquille O'Neal"},
    {name:"Gary Payton"},{name:"Eddie House"},{name:"Rashard Lewis"},
    {name:"James Jones"},{name:"Alonzo Mourning"},{name:"Antoine Walker"},
    {name:"Mike Miller"},{name:"P.J. Brown"},{name:"Jason Williams"},
  ]},

  q_nba_clippers_warriors: { clue: "Name an NBA player who played for both the Clippers AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Clippers" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Chris Paul"},{name:"Andre Iguodala"},{name:"Baron Davis"},
    {name:"Corey Maggette"},{name:"Danny Manning"},{name:"World B. Free"},
    {name:"Monta Ellis"},{name:"DeMarcus Cousins"},{name:"Patrick Beverley"},
    {name:"Shaun Livingston"},{name:"Otto Porter Jr"},{name:"Marreese Speights"},
  ]},

  q_nba_heat_bulls_champ: { clue: "Name an NBA player who won a championship with both the Heat AND the Bulls", sport: "NBA", rules: [{ fact_type: "nba_champion_heat" }, { fact_type: "nba_champion_bulls" }], answers: [
    {name:"LeBron James"},{name:"Dennis Rodman"},{name:"Shaquille O'Neal"},
    {name:"Scottie Pippen"},{name:"Horace Grant"},{name:"B.J. Armstrong"},
    {name:"Steve Kerr"},{name:"Ron Harper"},{name:"James Jones"},
    {name:"Shane Battier"},{name:"Udonis Haslem"},{name:"Norris Cole"},
  ]},

  q_nba_pistons_lakers: { clue: "Name an NBA player who played for both the Pistons AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Pistons" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Dennis Rodman"},{name:"Ben Wallace"},{name:"Bob McAdoo"},
    {name:"Rip Hamilton"},{name:"Chauncey Billups"},{name:"Rasheed Wallace"},
    {name:"Grant Hill"},{name:"Tracy McGrady"},{name:"Adrian Dantley"},
    {name:"Bob Lanier"},{name:"Dave Bing"},{name:"Isiah Thomas"},
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

  q_nba_kings_celtics: { clue: "Name an NBA player who played for both the Kings AND the Celtics", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Kings" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"Oscar Robertson"},{name:"Bob Cousy"},{name:"Bill Russell"},
    {name:"Mitch Richmond"},{name:"Rajon Rondo"},{name:"Isaiah Thomas"},
    {name:"Ed Macauley"},{name:"Peja Stojakovic"},{name:"Terry Rozier"},
    {name:"Sam Lacey"},{name:"Mike Bibby"},{name:"Nate Archibald"},
  ]},

  q_nba_grizzlies_celtics: { clue: "Name an NBA player who played for both the Grizzlies AND the Celtics", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Grizzlies" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"Jeff Green"},{name:"Tony Allen"},{name:"Avery Bradley"},
    {name:"Marcus Smart"},{name:"Enes Kanter"},{name:"Mike Conley"},
    {name:"Shane Battier"},{name:"James Posey"},{name:"Andre Miller"},
    {name:"Jason Williams"},{name:"Mike Miller"},{name:"Brandon Clarke"},
  ]},

  q_nba_magic_lakers: { clue: "Name an NBA player who played for both the Magic AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Magic" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Shaquille O'Neal"},{name:"Dwight Howard"},{name:"Hedo Turkoglu"},
    {name:"Nick Anderson"},{name:"Horace Grant"},{name:"Rafer Alston"},
    {name:"Dennis Scott"},{name:"Arron Afflalo"},{name:"Steve Francis"},
    {name:"JJ Redick"},{name:"Rashard Lewis"},{name:"Brandon Bass"},
  ]},

  q_nba_wizards_cavaliers: { clue: "Name an NBA player who played for both the Wizards AND the Cavaliers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Wizards" }, { fact_type: "played_for_team", fact_value: "Cavaliers" }], answers: [
    {name:"LeBron James"},{name:"Antawn Jamison"},{name:"Larry Hughes"},
    {name:"Daniel Gibson"},{name:"Mo Williams"},{name:"Anderson Varejao"},
    {name:"Gilbert Arenas"},{name:"Brendan Haywood"},{name:"Drew Gooden"},
    {name:"Ricky Davis"},{name:"JaVale McGee"},{name:"Darius Garland"},
  ]},

  q_nba_bucks_suns: { clue: "Name an NBA player who played for both the Bucks AND the Suns", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Bucks" }, { fact_type: "played_for_team", fact_value: "Suns" }], answers: [
    {name:"Giannis Antetokounmpo"},{name:"Vin Baker"},{name:"Michael Redd"},
    {name:"Eric Bledsoe"},{name:"Jrue Holiday"},{name:"P.J. Tucker"},
    {name:"Jeff Sanders"},{name:"Tim Thomas"},{name:"Dan Majerle"},
    {name:"Kevin Johnson"},{name:"Charlie Villanueva"},{name:"Pat Connaughton"},
  ]},

  q_nba_wolves_celtics: { clue: "Name an NBA player who played for both the Timberwolves AND the Celtics", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Timberwolves" }, { fact_type: "played_for_team", fact_value: "Celtics" }], answers: [
    {name:"Kevin Garnett"},{name:"Wally Szczerbiak"},{name:"Sam Cassell"},
    {name:"Ricky Davis"},{name:"Rasheed Wallace"},{name:"Al Jefferson"},
    {name:"Ryan Gomes"},{name:"Gerald Green"},{name:"Evan Turner"},
    {name:"Taj Gibson"},{name:"Jeff Teague"},{name:"Jimmy Butler"},
  ]},

  q_nba_pelicans_lakers: { clue: "Name an NBA player who played for both the Pelicans/Hornets (NO) AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Pelicans" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Anthony Davis"},{name:"Chris Paul"},{name:"Jrue Holiday"},
    {name:"DeMarcus Cousins"},{name:"Rajon Rondo"},{name:"Julius Randle"},
    {name:"Lance Stephenson"},{name:"JaVale McGee"},{name:"Lonzo Ball"},
    {name:"Brandon Ingram"},{name:"Josh Hart"},{name:"Tyson Chandler"},
  ]},

  q_nba_nets_warriors: { clue: "Name an NBA player who played for both the Nets AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Nets" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Kevin Durant"},{name:"D'Angelo Russell"},{name:"Jason Kidd"},
    {name:"Vince Carter"},{name:"Andre Iguodala"},{name:"DeAndre Jordan"},
    {name:"Kenyon Martin"},{name:"Kerry Kittles"},{name:"Keith Van Horn"},
    {name:"Shaun Livingston"},{name:"Andrew Bogut"},{name:"Draymond Green"},
  ]},

  q_nba_sixers_warriors: { clue: "Name an NBA player who played for both the 76ers AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "76ers" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Wilt Chamberlain"},{name:"Allen Iverson"},{name:"Andre Iguodala"},
    {name:"Chris Webber"},{name:"Charles Barkley"},{name:"Moses Malone"},
    {name:"Joe Smith"},{name:"Tim Hardaway"},{name:"Alvin Iverson"},
    {name:"Rick Barry"},{name:"Jeff Mullins"},{name:"Dolph Schayes"},
  ]},

  q_nba_jazz_rockets: { clue: "Name an NBA player who played for both the Jazz AND the Rockets", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Jazz" }, { fact_type: "played_for_team", fact_value: "Rockets" }], answers: [
    {name:"John Stockton"},{name:"Karl Malone"},{name:"Carlos Boozer"},
    {name:"Deron Williams"},{name:"Jeff Hornacek"},{name:"Thurl Bailey"},
    {name:"Matt Harpring"},{name:"Derek Fisher"},{name:"Paul Millsap"},
    {name:"Boris Diaw"},{name:"Trevor Ariza"},{name:"Donovan Mitchell"},
  ]},

  q_nba_hornets_lakers: { clue: "Name an NBA player who played for both the Hornets (CHA) AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Hornets" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Kobe Bryant"},{name:"Vlade Divac"},{name:"Eddie Jones"},
    {name:"Glen Rice"},{name:"Alonzo Mourning"},{name:"Dell Curry"},
    {name:"Nick Young"},{name:"Wesley Johnson"},{name:"Jeremy Lin"},
    {name:"Tony Parker"},{name:"Dwight Howard"},{name:"Lance Stephenson"},
  ]},

  q_nba_champ_celtics_lakers: { clue: "Name an NBA player who won championships with both the Celtics AND the Lakers", sport: "NBA", rules: [{ fact_type: "nba_champion_celtics" }, { fact_type: "nba_champion_lakers" }], answers: [
    {name:"Kareem Abdul-Jabbar"},{name:"Clyde Lovellette"},{name:"Robert Parish"},
    {name:"Gary Payton"},{name:"Danny Ainge"},{name:"Nate Archibald"},
    {name:"Dave Cowens"},{name:"Kevin McHale"},{name:"Rick Fox"},
    {name:"Rajon Rondo"},{name:"Glen Davis"},{name:"Sasha Vujacic"},
  ]},

  q_nba_mvp_no_ring: { clue: "Name an NBA player who won the regular season MVP AND never won a championship", sport: "NBA", rules: [{ fact_type: "nba_mvp" }, { fact_type: "nba_never_won_championship" }], answers: [
    {name:"Charles Barkley"},{name:"Karl Malone"},{name:"Allen Iverson"},
    {name:"Steve Nash"},{name:"Derrick Rose"},{name:"Russell Westbrook"},
    {name:"Bob McAdoo"},{name:"Dave Cowens"},{name:"Bob Pettit"},
    {name:"Wes Unseld"},{name:"Joel Embiid"},{name:"James Harden"},
  ]},

  q_nba_hawks_sixers: { clue: "Name an NBA player who played for both the Hawks AND the 76ers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Hawks" }, { fact_type: "played_for_team", fact_value: "76ers" }], answers: [
    {name:"Dikembe Mutombo"},{name:"Moses Malone"},{name:"Dominique Wilkins"},
    {name:"Joe Johnson"},{name:"Al Horford"},{name:"Dwight Howard"},
    {name:"Shareef Abdur-Rahim"},{name:"Steve Smith"},{name:"Kevin Huerter"},
    {name:"Trae Young"},{name:"Danny Manning"},{name:"Tim Thomas"},
  ]},

  q_nba_wolves_warriors: { clue: "Name an NBA player who played for both the Timberwolves AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Timberwolves" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Kevin Garnett"},{name:"Andrew Wiggins"},{name:"D'Angelo Russell"},
    {name:"Wally Szczerbiak"},{name:"Latrell Sprewell"},{name:"Sam Cassell"},
    {name:"Kevin Love"},{name:"Jeff Teague"},{name:"Ricky Rubio"},
    {name:"Shabazz Muhammad"},{name:"Zach LaVine"},{name:"Stephon Marbury"},
  ]},

  q_nba_blazers_cavaliers: { clue: "Name an NBA player who played for both the Trail Blazers AND the Cavaliers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Trail Blazers" }, { fact_type: "played_for_team", fact_value: "Cavaliers" }], answers: [
    {name:"LeBron James"},{name:"Damon Stoudamire"},{name:"Andre Miller"},
    {name:"Mo Williams"},{name:"Larry Nance Jr"},{name:"Jeff Green"},
    {name:"Iman Shumpert"},{name:"Dwyane Wade"},{name:"Anderson Varejao"},
    {name:"Derrick Rose"},{name:"CJ McCollum"},{name:"Gary Trent Jr"},
  ]},

  q_nba_nuggets_warriors: { clue: "Name an NBA player who played for both the Nuggets AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Nuggets" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Andre Iguodala"},{name:"Allen Iverson"},{name:"Carmelo Anthony"},
    {name:"J.R. Smith"},{name:"Nick Young"},{name:"Andre Miller"},
    {name:"Marcus Camby"},{name:"JaVale McGee"},{name:"Nene"},
    {name:"DeMarcus Cousins"},{name:"Kent Bazemore"},{name:"Gary Harris"},
  ]},

  q_nba_suns_lakers: { clue: "Name an NBA player who played for both the Suns AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Suns" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"Shaquille O'Neal"},{name:"Steve Nash"},{name:"Dwight Howard"},
    {name:"LeBron James"},{name:"Cedric Ceballos"},{name:"Goran Dragic"},
    {name:"Wesley Johnson"},{name:"Nick Young"},{name:"Trevor Ariza"},
    {name:"Tyson Chandler"},{name:"Channing Frye"},{name:"Jared Dudley"},
  ]},

  q_nba_heat_lakers: { clue: "Name an NBA player who played for both the Heat AND the Lakers", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Heat" }, { fact_type: "played_for_team", fact_value: "Lakers" }], answers: [
    {name:"LeBron James"},{name:"Shaquille O'Neal"},{name:"Dwyane Wade"},
    {name:"Lamar Odom"},{name:"Eddie Jones"},{name:"Gary Payton"},
    {name:"Glen Rice"},{name:"Alonzo Mourning"},{name:"Trevor Ariza"},
    {name:"Norris Cole"},{name:"Mario Chalmers"},{name:"James Jones"},
  ]},

  q_nba_spurs_warriors: { clue: "Name an NBA player who played for both the Spurs AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Spurs" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"David Robinson"},{name:"Steve Kerr"},{name:"Boris Diaw"},
    {name:"Stephen Jackson"},{name:"Richard Jefferson"},{name:"DeMarcus Cousins"},
    {name:"Gary Neal"},{name:"Patty Mills"},{name:"Rudy Gay"},
    {name:"Danny Green"},{name:"JaVale McGee"},{name:"Matt Bonner"},
  ]},

  q_nba_thunder_warriors: { clue: "Name an NBA player who played for both the Thunder/SuperSonics AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Thunder" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Kevin Durant"},{name:"Russell Westbrook"},{name:"James Harden"},
    {name:"Gary Payton"},{name:"Andre Roberson"},{name:"Serge Ibaka"},
    {name:"Victor Oladipo"},{name:"Jeff Green"},{name:"Chris Paul"},
    {name:"Kelly Oubre Jr"},{name:"Avery Bradley"},{name:"Gary Payton II"},
  ]},

  q_nba_raptors_warriors: { clue: "Name an NBA player who played for both the Raptors AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Raptors" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Kawhi Leonard"},{name:"Vince Carter"},{name:"Tracy McGrady"},
    {name:"Chris Bosh"},{name:"Pascal Siakam"},{name:"Gary Trent Jr"},
    {name:"Kelly Oubre Jr"},{name:"Matt Barnes"},{name:"Donyell Marshall"},
    {name:"Andre Iguodala"},{name:"Kent Bazemore"},{name:"Chris Boucher"},
  ]},

  q_nba_bulls_warriors: { clue: "Name an NBA player who played for both the Bulls AND the Warriors", sport: "NBA", rules: [{ fact_type: "played_for_team", fact_value: "Bulls" }, { fact_type: "played_for_team", fact_value: "Warriors" }], answers: [
    {name:"Ben Wallace"},{name:"Scottie Pippen"},{name:"Steve Kerr"},
    {name:"Horace Grant"},{name:"Chris Mullin"},{name:"Nate Robinson"},
    {name:"Kelly Oubre Jr"},{name:"Kent Bazemore"},{name:"Andre Iguodala"},
    {name:"Tim Hardaway"},{name:"Otto Porter Jr"},{name:"Zach LaVine"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NBA_BEGINNER = [
  "q_nba_champ_foreign","q_nba_mvp_champ_same_year","q_nba_top5_pick_allstar10",
  "q_nba_50pts_2000s","q_nba_20k_pts_champ","q_nba_lakers_celtics",
  "q_nba_6th_man_champ","q_nba_finals_mvp_1st_round",
  "q_nba_lakers_heat","q_nba_lakers_bulls","q_nba_knicks_nets",
  "q_nba_warriors_cavaliers","q_nba_celtics_nets","q_nba_spurs_raptors",
  "q_nba_heat_celtics","q_nba_lakers_rockets","q_nba_warriors_lakers",
  "q_nba_bulls_heat","q_nba_sixers_nets","q_nba_celtics_cavaliers",
  "q_nba_lakers_clippers","q_nba_warriors_thunder","q_nba_mvp_lakers",
  "q_nba_allstar_warriors","q_nba_champ_heat",
  "q_nba_rockets_nets","q_nba_sixers_lakers","q_nba_heat_sixers",
  "q_nba_mavs_lakers","q_nba_thunder_heat",
];

export const NBA_KNOWLEDGEABLE = [
  "q_nba_triple_dbl_season_champ","q_nba_undrafted_mvp","q_nba_coach_500w_ring",
  "q_nba_scoring_title_assists_title","q_nba_center_20ppg_2bpg",
  "q_nba_acc_college_20ppg_career","q_nba_all_def_20ppg_season",
  "q_nba_point_guard_champ_10assists",
  "q_nba_mavs_heat","q_nba_celtics_sixers","q_nba_spurs_lakers",
  "q_nba_rockets_warriors","q_nba_suns_mavs","q_nba_bulls_cavaliers",
  "q_nba_nuggets_lakers","q_nba_raptors_heat","q_nba_pistons_bulls",
  "q_nba_pacers_lakers","q_nba_knicks_bulls","q_nba_allstar_knicks",
  "q_nba_champ_spurs","q_nba_blazers_rockets","q_nba_celtics_warriors",
  "q_nba_hawks_lakers","q_nba_scoring_title_celtics","q_nba_dpoy_bulls",
  "q_nba_allnba_rockets",
  "q_nba_bucks_nets","q_nba_suns_rockets","q_nba_celtics_heat_champ",
  "q_nba_clippers_warriors","q_nba_heat_bulls_champ","q_nba_pistons_lakers",
];

export const NBA_EXPERT = [
  "q_nba_foreign_born_allstar_champ","q_nba_dpoy_all_nba",
  "q_nba_50pts_and_won_ring","q_nba_scoring_champ_no_ring",
  "q_nba_kings_celtics","q_nba_grizzlies_celtics","q_nba_magic_lakers",
  "q_nba_wizards_cavaliers","q_nba_bucks_suns","q_nba_wolves_celtics",
  "q_nba_pelicans_lakers","q_nba_nets_warriors","q_nba_sixers_warriors",
  "q_nba_jazz_rockets","q_nba_hornets_lakers","q_nba_champ_celtics_lakers",
  "q_nba_mvp_no_ring","q_nba_hawks_sixers","q_nba_wolves_warriors",
  "q_nba_blazers_cavaliers","q_nba_nuggets_warriors","q_nba_suns_lakers",
  "q_nba_heat_lakers","q_nba_spurs_warriors","q_nba_thunder_warriors",
  "q_nba_raptors_warriors","q_nba_bulls_warriors",
];
