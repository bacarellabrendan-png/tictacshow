// ─── COLLEGE SPORTS, GOLF, TENNIS, BOXING, OLYMPICS, MULTI-SPORT ─────────────
// Every question has TWO conditions joined by AND.

export const MULTI_POOLS = {

  // ── COLLEGE SPORTS ──────────────────────────────────────────────────────────

  q_college_ncaa_nba_allstar: { clue: "Name a college basketball player who won the NCAA championship AND became an NBA All-Star", sport: "NCAA", rules: [{ fact_type: "ncaa_champion" }, { fact_type: "nba_allstar" }], answers: [
    {name:"Magic Johnson"},{name:"Michael Jordan"},{name:"Bill Walton"},
    {name:"Kareem Abdul-Jabbar"},{name:"James Worthy"},{name:"Larry Bird"},
    {name:"Grant Hill"},{name:"Isiah Thomas"},{name:"Bob Lanier"},
    {name:"Elvin Hayes"},{name:"Jo Jo White"},{name:"Phil Ford"},
    {name:"Clyde Drexler"},{name:"Hakeem Olajuwon"},{name:"Patrick Ewing"},
    {name:"Christian Laettner"},{name:"Shane Battier"},{name:"Danny Manning"},
    {name:"Bill Bradley"},{name:"Jerry Lucas"},{name:"Oscar Robertson"},
    {name:"Gail Goodrich"},{name:"Luke Jackson"},{name:"Jimmy Walker"},
  ]},

  q_college_heisman_sb_1st_round: { clue: "Name a Heisman Trophy winner who was drafted in the NFL first round AND won a Super Bowl during their career", sport: "NCAA", rules: [{ fact_type: "heisman_trophy" }, { fact_type: "nfl_first_round_pick" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Marcus Allen"},{name:"Barry Sanders"},{name:"Tony Dorsett"},
    {name:"Earl Campbell"},{name:"Roger Staubach"},{name:"O.J. Simpson"},
    {name:"Sam Bradford"},{name:"Cam Newton"},{name:"Eddie George"},
    {name:"Rashaan Salaam"},{name:"Ricky Bell"},{name:"Billy Sims"},
    {name:"George Rogers"},{name:"Doug Flutie"},{name:"Chuck Long"},
    {name:"Lamar Jackson"},{name:"Kyler Murray"},{name:"Joe Burrow"},
    {name:"Marcus Mariota"},{name:"Jameis Winston"},{name:"Derrick Henry"},
    {name:"Jordan Howard"},
  ]},

  q_college_duke_nba_allstar: { clue: "Name a player who won the NCAA championship with Duke AND was selected to at least one NBA All-Star game", sport: "NCAA", rules: [{ fact_type: "duke_ncaa_champion" }, { fact_type: "nba_allstar" }], answers: [
    {name:"Grant Hill"},{name:"Kyrie Irving"},{name:"Elton Brand"},
    {name:"Christian Laettner"},{name:"Danny Ferry"},{name:"Mike Dunleavy Jr"},
    {name:"Carlos Boozer"},{name:"Jay Williams"},{name:"Bobby Hurley"},
    {name:"Thomas Hill"},{name:"Brian Davis"},{name:"Antonio Lang"},
    {name:"Jahlil Okafor"},{name:"Justise Winslow"},{name:"Tyus Jones"},
  ]},

  q_college_heisman_sec: { clue: "Name a player who won the Heisman Trophy while playing in the SEC AND was selected to at least one Pro Bowl or All-Pro during their NFL career", sport: "NCAA", rules: [{ fact_type: "heisman_trophy_sec" }, { fact_type: "nfl_pro_bowl_or_all_pro" }], answers: [
    {name:"Herschel Walker"},{name:"Bo Jackson"},{name:"Tim Tebow"},
    {name:"Mark Ingram"},{name:"Cam Newton"},{name:"Derrick Henry"},
    {name:"Danny Wuerffel"},{name:"Reggie Bush"},{name:"Devonta Smith"},
    {name:"Lamar Jackson"},{name:"Pat Sullivan"},{name:"Jay Barker"},
    {name:"Earl Campbell"},{name:"George Rogers"},{name:"Joe Burrow"},
    {name:"Bryce Young"},{name:"Johnny Manziel"},
  ]},

  // ── GOLF ──────────────────────────────────────────────────────────────────────

  q_golf_3majors_masters: { clue: "Name a golfer who won 3 or more major championships AND won The Masters at least once", sport: "Golf", rules: [{ fact_type: "golf_3_plus_majors" }, { fact_type: "golf_masters_winner" }], answers: [
    {name:"Tiger Woods"},{name:"Jack Nicklaus"},{name:"Arnold Palmer"},
    {name:"Gary Player"},{name:"Ben Hogan"},{name:"Phil Mickelson"},
    {name:"Nick Faldo"},{name:"Seve Ballesteros"},{name:"Sam Snead"},
    {name:"Tom Watson"},{name:"Gene Sarazen"},{name:"Vijay Singh"},
    {name:"Bernhard Langer"},{name:"Sandy Lyle"},{name:"Ian Woosnam"},
    {name:"Fred Couples"},{name:"Bubba Watson"},{name:"Charl Schwartzel"},
    {name:"Jordan Spieth"},{name:"Rory McIlroy"},{name:"Jose Maria Olazabal"},
  ]},

  q_golf_career_slam_top10: { clue: "Name a golfer who won at least 3 different major championships AND won The Masters Tournament", sport: "Golf", rules: [{ fact_type: "golf_3_diff_majors" }, { fact_type: "golf_masters_winner" }], answers: [
    {name:"Tiger Woods"},{name:"Jack Nicklaus"},{name:"Arnold Palmer"},
    {name:"Gary Player"},{name:"Ben Hogan"},{name:"Phil Mickelson"},
    {name:"Nick Faldo"},{name:"Seve Ballesteros"},{name:"Sam Snead"},
    {name:"Tom Watson"},{name:"Gene Sarazen"},{name:"Vijay Singh"},
    {name:"Bernhard Langer"},{name:"Sandy Lyle"},{name:"Ian Woosnam"},
    {name:"Jose Maria Olazabal"},{name:"Bubba Watson"},{name:"Jordan Spieth"},
    {name:"Rory McIlroy"},{name:"Dustin Johnson"},
  ]},

  q_golf_us_open_masters: { clue: "Name a golfer who won both the US Open AND The Masters in their career", sport: "Golf", rules: [{ fact_type: "golf_us_open_winner" }, { fact_type: "golf_masters_winner" }], answers: [
    {name:"Tiger Woods"},{name:"Jack Nicklaus"},{name:"Arnold Palmer"},
    {name:"Ben Hogan"},{name:"Gary Player"},{name:"Gene Sarazen"},
    {name:"Sam Snead"},{name:"Phil Mickelson"},{name:"Rory McIlroy"},
    {name:"Tom Watson"},{name:"Seve Ballesteros"},{name:"Nick Faldo"},
    {name:"Craig Stadler"},{name:"Fuzzy Zoeller"},{name:"Jose Maria Olazabal"},
  ]},

  q_golf_ryder_cup_major: { clue: "Name a golfer who won at least 2 major championships AND represented their country at the Ryder Cup (or Presidents Cup)", sport: "Golf", rules: [{ fact_type: "golf_2_plus_majors" }, { fact_type: "golf_ryder_cup" }], answers: [
    {name:"Tiger Woods"},{name:"Jack Nicklaus"},{name:"Arnold Palmer"},
    {name:"Gary Player"},{name:"Ben Hogan"},{name:"Phil Mickelson"},
    {name:"Tom Watson"},{name:"Nick Faldo"},{name:"Seve Ballesteros"},
    {name:"Bernhard Langer"},{name:"Lee Trevino"},{name:"Rory McIlroy"},
    {name:"Jordan Spieth"},{name:"Vijay Singh"},{name:"Ernie Els"},
    {name:"Colin Montgomerie"},{name:"Sergio Garcia"},{name:"Ian Woosnam"},
    {name:"Sandy Lyle"},{name:"Nick Price"},{name:"Mark Calcavecchia"},
  ]},

  // ── TENNIS ──────────────────────────────────────────────────────────────────

  q_tennis_3diff_slams_no1: { clue: "Name a tennis player who won 3 or more different Grand Slam tournaments AND held the world number 1 ranking during their career", sport: "Tennis", rules: [{ fact_type: "tennis_3_diff_slams" }, { fact_type: "tennis_world_no1" }], answers: [
    {name:"Novak Djokovic"},{name:"Rafael Nadal"},{name:"Roger Federer"},
    {name:"Serena Williams"},{name:"Steffi Graf"},{name:"Pete Sampras"},
    {name:"Martina Navratilova"},{name:"Chris Evert"},{name:"Margaret Court"},
    {name:"Andre Agassi"},{name:"Rod Laver"},{name:"Billie Jean King"},
    {name:"Jim Connors"},{name:"Ivan Lendl"},{name:"John McEnroe"},
    {name:"Monica Seles"},{name:"Maria Sharapova"},{name:"Andy Murray"},
    {name:"Ashleigh Barty"},{name:"Iga Swiatek"},
  ]},

  q_tennis_career_slam_no1: { clue: "Name a tennis player who completed the career Grand Slam (won all 4 majors) AND held the world number 1 ranking", sport: "Tennis", rules: [{ fact_type: "tennis_career_slam" }, { fact_type: "tennis_world_no1" }], answers: [
    {name:"Novak Djokovic"},{name:"Rafael Nadal"},{name:"Roger Federer"},
    {name:"Serena Williams"},{name:"Steffi Graf"},{name:"Andre Agassi"},
    {name:"Rod Laver"},{name:"Jimmy Connors"},{name:"Martina Navratilova"},
    {name:"Chris Evert"},{name:"Margaret Court"},{name:"Maria Sharapova"},
    {name:"Monica Seles"},{name:"Pete Sampras"},{name:"Jim Courier"},
  ]},

  q_tennis_wimbledon_french: { clue: "Name a tennis player who won both Wimbledon AND the French Open in the same calendar year", sport: "Tennis", rules: [{ fact_type: "tennis_wimbledon_french_same_year" }], answers: [
    {name:"Rafael Nadal"},{name:"Roger Federer"},{name:"Bjorn Borg"},
    {name:"Novak Djokovic"},{name:"Serena Williams"},{name:"Steffi Graf"},
    {name:"Rod Laver"},{name:"Chris Evert"},{name:"Martina Navratilova"},
    {name:"Margaret Court"},{name:"Maria Sharapova"},{name:"Justine Henin"},
    {name:"Pete Sampras"},{name:"Andre Agassi"},{name:"Ivan Lendl"},
  ]},

  q_tennis_10slams_no1: { clue: "Name a tennis player who won 10 or more Grand Slam singles titles AND held the world number 1 ranking for at least 100 weeks", sport: "Tennis", rules: [{ fact_type: "tennis_10_plus_slams" }, { fact_type: "tennis_100_weeks_no1" }], answers: [
    {name:"Novak Djokovic"},{name:"Rafael Nadal"},{name:"Roger Federer"},
    {name:"Serena Williams"},{name:"Steffi Graf"},{name:"Pete Sampras"},
    {name:"Martina Navratilova"},{name:"Chris Evert"},{name:"Margaret Court"},
    {name:"Billie Jean King"},{name:"Jimmy Connors"},{name:"John McEnroe"},
    {name:"Ivan Lendl"},{name:"Monica Seles"},{name:"Iga Swiatek"},
    {name:"Ashleigh Barty"},{name:"Andy Murray"},
  ]},

  // ── BOXING ──────────────────────────────────────────────────────────────────

  q_boxing_hw_champ_multiple: { clue: "Name a boxer who won a world heavyweight championship AND held the title for more than 2 years (combined)", sport: "Boxing", rules: [{ fact_type: "boxing_hw_champion" }, { fact_type: "boxing_hw_title_2_plus_years" }], answers: [
    {name:"Muhammad Ali"},{name:"Mike Tyson"},{name:"Joe Louis"},
    {name:"Rocky Marciano"},{name:"Larry Holmes"},{name:"Wladimir Klitschko"},
    {name:"Lennox Lewis"},{name:"Evander Holyfield"},{name:"George Foreman"},
    {name:"Joe Frazier"},{name:"Floyd Patterson"},{name:"Jack Dempsey"},
    {name:"Max Schmeling"},{name:"Sonny Liston"},{name:"Riddick Bowe"},
    {name:"Anthony Joshua"},{name:"Tyson Fury"},{name:"Deontay Wilder"},
    {name:"Tommy Burns"},{name:"Ezzard Charles"},
  ]},

  q_boxing_world_champ_olympic: { clue: "Name a boxer who won a world championship in professional boxing AND won an Olympic boxing medal (any color)", sport: "Boxing", rules: [{ fact_type: "boxing_world_champion" }, { fact_type: "olympic_boxing_medal" }], answers: [
    {name:"Muhammad Ali"},{name:"Floyd Mayweather"},{name:"Oscar De La Hoya"},
    {name:"Sugar Ray Leonard"},{name:"George Foreman"},{name:"Evander Holyfield"},
    {name:"Lennox Lewis"},{name:"Joe Frazier"},{name:"Pernell Whitaker"},
    {name:"Roy Jones Jr"},{name:"Anthony Joshua"},{name:"Wladimir Klitschko"},
    {name:"Vitali Klitschko"},{name:"Vasyl Lomachenko"},{name:"Andre Ward"},
    {name:"Guillermo Rigondeaux"},{name:"Terence Crawford"},{name:"Naoya Inoue"},
    {name:"Andy Ruiz Jr"},{name:"Riddick Bowe"},
  ]},

  // ── OLYMPICS ──────────────────────────────────────────────────────────────────

  q_olympics_10gold_individual: { clue: "Name an Olympic athlete who won 5 or more individual gold medals AND competed in at least 2 different Olympic Games", sport: "Olympics", rules: [{ fact_type: "olympic_5_plus_individual_golds" }, { fact_type: "olympic_2_plus_games" }], answers: [
    {name:"Michael Phelps"},{name:"Mark Spitz"},{name:"Carl Lewis"},
    {name:"Usain Bolt"},{name:"Paavo Nurmi"},{name:"Nadia Comaneci"},
    {name:"Sawao Kato"},{name:"Eric Heiden"},{name:"Katie Ledecky"},
    {name:"Caeleb Dressel"},{name:"Simone Biles"},{name:"Larisa Latynina"},
    {name:"Allyson Felix"},{name:"Janet Evans"},{name:"Matt Biondi"},
  ]},

  q_olympics_summer_winter: { clue: "Name an athlete who competed in both the Summer Olympics AND the Winter Olympics", sport: "Olympics", rules: [{ fact_type: "competed_summer_olympics" }, { fact_type: "competed_winter_olympics" }], answers: [
    {name:"Deion Sanders"},{name:"Bo Jackson"},{name:"Jim Thorpe"},
    {name:"Clara Hughes"},{name:"Christa Rothenburger"},{name:"Lauryn Williams"},
    {name:"Lolo Jones"},{name:"Jocelyne Larocque"},{name:"Hayley Wickenheiser"},
    {name:"Eddie Eagan"},{name:"Stella Walsh"},{name:"Myriam Bedard"},
    {name:"Mike Wiesenfeldner"},{name:"Gillis Grafstrom"},{name:"Jacob Tullin Thams"},
  ]},

  // ── MULTI-SPORT ──────────────────────────────────────────────────────────────

  q_multi_two_leagues_allstar: { clue: "Name an athlete who played professionally in two different major North American sports leagues AND was named to an All-Star or Pro Bowl in at least one", sport: "Multi", rules: [{ fact_type: "played_two_major_leagues" }, { fact_type: "allstar_or_pro_bowl" }], answers: [
    {name:"Bo Jackson"},{name:"Deion Sanders"},{name:"Jim Thorpe"},
    {name:"Danny Ainge"},{name:"Dave DeBusschere"},{name:"Ron Reed"},
    {name:"Chuck Connors"},{name:"Gene Conley"},{name:"Steve Hamilton"},
    {name:"Jackie Robinson"},{name:"Brian Jordan"},{name:"D.J. Dozier"},
    {name:"John Elway"},{name:"Michael Jordan"},{name:"Jim Brown"},
    {name:"Herschel Walker"},{name:"Russell Wilson"},{name:"Kyler Murray"},
  ]},

  q_multi_hof_two_sports: { clue: "Name an athlete who was inducted into a professional Hall of Fame AND was also a professional or Olympic champion in a completely different sport", sport: "Multi", rules: [{ fact_type: "professional_hall_of_fame" }, { fact_type: "champion_different_sport" }], answers: [
    {name:"Bo Jackson"},{name:"Deion Sanders"},{name:"Jim Thorpe"},
    {name:"Jackie Robinson"},{name:"Babe Didrikson Zaharias"},{name:"Dave DeBusschere"},
    {name:"Danny Ainge"},{name:"Bob Hayes"},{name:"Rafer Johnson"},
    {name:"Jim Brown"},{name:"Carl Lewis"},{name:"Chuck Connors"},
    {name:"George Halas"},{name:"Ernie Nevers"},{name:"Paddy Driscoll"},
    {name:"Bullet Bill Dudley"},{name:"Johnny Blood"},{name:"Bronko Nagurski"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const MULTI_BEGINNER = [
  "q_college_ncaa_nba_allstar","q_college_heisman_sb_1st_round",
  "q_golf_3majors_masters","q_tennis_career_slam_no1",
  "q_boxing_hw_champ_multiple",
];

export const MULTI_KNOWLEDGEABLE = [
  "q_college_duke_nba_allstar","q_college_heisman_sec",
  "q_golf_career_slam_top10","q_golf_us_open_masters","q_golf_ryder_cup_major",
  "q_tennis_3diff_slams_no1","q_tennis_wimbledon_french","q_tennis_10slams_no1",
  "q_boxing_world_champ_olympic","q_olympics_10gold_individual",
  "q_multi_two_leagues_allstar",
];

export const MULTI_EXPERT = [
  "q_olympics_summer_winter","q_multi_hof_two_sports",
];

// College sport pool specifically
export const COLLEGE_POOL = [
  "q_college_ncaa_nba_allstar","q_college_heisman_sb_1st_round",
  "q_college_duke_nba_allstar","q_college_heisman_sec",
];
