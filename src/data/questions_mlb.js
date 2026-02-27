// ─── MLB QUESTIONS ────────────────────────────────────────────────────────────
// Every question has TWO conditions joined by AND.

export const MLB_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_mlb_cy_yankees: { clue: "Name an MLB pitcher who won the Cy Young Award AND played for the New York Yankees at some point in their career", sport: "MLB", rules: [{ fact_type: "mlb_cy_young" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Roger Clemens"},{name:"Randy Johnson"},{name:"CC Sabathia"},
    {name:"Sparky Lyle"},{name:"Whitey Ford"},{name:"Bob Turley"},
    {name:"Mike Mussina"},{name:"Bob Welch"},{name:"Corey Kluber"},
    {name:"Gerrit Cole"},{name:"David Cone"},{name:"Tom Gordon"},
    {name:"Ron Guidry"},{name:"Denny McLain"},{name:"Pat Hentgen"},
    {name:"Vida Blue"},{name:"Jack McDowell"},
  ]},

  q_mlb_300hr_300sb: { clue: "Name an MLB player with 300 or more career home runs AND 300 or more career stolen bases", sport: "MLB", rules: [{ fact_type: "mlb_300_home_runs" }, { fact_type: "mlb_300_stolen_bases" }], answers: [
    {name:"Willie Mays"},{name:"Barry Bonds"},{name:"Andre Dawson"},
    {name:"Bobby Bonds"},{name:"Reggie Sanders"},{name:"Steve Finley"},
    {name:"Raul Mondesi"},{name:"Eric Davis"},{name:"Larry Doby"},
    {name:"Chili Davis"},{name:"Howard Johnson"},{name:"Ron Gant"},
    {name:"Cesar Cedeno"},{name:"Dale Murphy"},{name:"Henry Rodriguez"},
  ]},

  q_mlb_300avg_2500hits: { clue: "Name an MLB player who batted .300 or higher for their career AND had 2,500 or more career hits", sport: "MLB", rules: [{ fact_type: "mlb_300_career_avg" }, { fact_type: "mlb_2500_career_hits" }], answers: [
    {name:"Pete Rose"},{name:"Ty Cobb"},{name:"Hank Aaron"},
    {name:"Stan Musial"},{name:"Derek Jeter"},{name:"Willie Mays"},
    {name:"Albert Pujols"},{name:"Ichiro Suzuki"},{name:"Cal Ripken Jr"},
    {name:"Paul Molitor"},{name:"Tony Gwynn"},{name:"George Brett"},
    {name:"Robin Yount"},{name:"Rod Carew"},{name:"Rickey Henderson"},
    {name:"Lou Brock"},{name:"Wade Boggs"},{name:"Eddie Murray"},
    {name:"Dave Winfield"},{name:"Craig Biggio"},{name:"Frank Robinson"},
    {name:"Al Simmons"},{name:"Rogers Hornsby"},{name:"Tris Speaker"},
  ]},

  q_mlb_ws_mvp_mvp: { clue: "Name an MLB player who won the World Series MVP AND also won the regular season MVP award during their career", sport: "MLB", rules: [{ fact_type: "mlb_ws_mvp" }, { fact_type: "mlb_mvp" }], answers: [
    {name:"Barry Bonds"},{name:"Mike Schmidt"},{name:"Willie Stargell"},
    {name:"Bob Gibson"},{name:"Sandy Koufax"},{name:"Mickey Mantle"},
    {name:"Yogi Berra"},{name:"Lou Brock"},{name:"Orlando Cepeda"},
    {name:"Hank Aaron"},{name:"Frank Robinson"},{name:"Reggie Jackson"},
    {name:"Dustin Pedroia"},{name:"Manny Ramirez"},{name:"David Ortiz"},
  ]},

  q_mlb_cy_dodgers: { clue: "Name an MLB pitcher who won the Cy Young Award AND played for the Los Angeles Dodgers at some point in their career", sport: "MLB", rules: [{ fact_type: "mlb_cy_young" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Clayton Kershaw"},{name:"Sandy Koufax"},{name:"Don Drysdale"},
    {name:"Orel Hershiser"},{name:"Fernando Valenzuela"},{name:"Mike Marshall"},
    {name:"Pedro Martinez"},{name:"Eric Gagne"},{name:"Brandon Webb"},
    {name:"Randy Johnson"},{name:"Bob Welch"},{name:"Rick Sutcliffe"},
    {name:"Bret Saberhagen"},{name:"Trevor Bauer"},{name:"Walker Buehler"},
  ]},

  q_mlb_3000k_300w: { clue: "Name an MLB pitcher with 3,000 or more career strikeouts AND 300 or more career wins", sport: "MLB", rules: [{ fact_type: "mlb_3000_strikeouts" }, { fact_type: "mlb_300_wins" }], answers: [
    {name:"Nolan Ryan"},{name:"Roger Clemens"},{name:"Randy Johnson"},
    {name:"Greg Maddux"},{name:"Steve Carlton"},{name:"Tom Seaver"},
    {name:"Walter Johnson"},{name:"Bert Blyleven"},{name:"Don Sutton"},
    {name:"Phil Niekro"},{name:"Gaylord Perry"},{name:"Bob Gibson"},
    {name:"Curt Schilling"},{name:"Pedro Martinez"},{name:"Cy Young"},
  ]},

  q_mlb_ws_ring_red_sox_yankees: { clue: "Name an MLB player who won a World Series with the Boston Red Sox AND at some point played for the New York Yankees", sport: "MLB", rules: [{ fact_type: "mlb_ws_winner_red_sox" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Roger Clemens"},{name:"Johnny Damon"},{name:"Wade Boggs"},
    {name:"Pedro Martinez"},{name:"Derek Lowe"},{name:"Keith Foulke"},
    {name:"Curt Schilling"},{name:"Bill Buckner"},{name:"Bucky Dent"},
    {name:"David Price"},{name:"Nathan Eovaldi"},{name:"Manny Ramirez"},
    {name:"Jacoby Ellsbury"},{name:"Nick Punto"},{name:"Adrian Gonzalez"},
  ]},

  q_mlb_500hr_hof: { clue: "Name an MLB player who hit 500 or more career home runs AND was inducted into the Hall of Fame", sport: "MLB", rules: [{ fact_type: "mlb_500_home_runs" }, { fact_type: "mlb_hall_of_fame" }], answers: [
    {name:"Hank Aaron"},{name:"Babe Ruth"},{name:"Willie Mays"},
    {name:"Ken Griffey Jr"},{name:"Jim Thome"},{name:"Ernie Banks"},
    {name:"Mike Schmidt"},{name:"Reggie Jackson"},{name:"Harmon Killebrew"},
    {name:"Eddie Mathews"},{name:"Mel Ott"},{name:"Ted Williams"},
    {name:"Mickey Mantle"},{name:"Jimmie Foxx"},{name:"Willie McCovey"},
    {name:"Frank Robinson"},{name:"Frank Thomas"},{name:"David Ortiz"},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_mlb_cy_young_red_sox: { clue: "Name an MLB pitcher who won the Cy Young Award AND played for the Boston Red Sox at some point in their career", sport: "MLB", rules: [{ fact_type: "mlb_cy_young" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Pedro Martinez"},{name:"Roger Clemens"},{name:"Curt Schilling"},
    {name:"Randy Johnson"},{name:"Derek Lowe"},{name:"Tim Wakefield"},
    {name:"Bret Saberhagen"},{name:"Rick Sutcliffe"},{name:"Bob Welch"},
    {name:"Zack Greinke"},{name:"Cole Hamels"},{name:"Chris Sale"},
    {name:"Jake Peavy"},{name:"Johan Santana"},{name:"David Price"},
    {name:"Roy Halladay"},
  ]},

  q_mlb_batting_title_ws: { clue: "Name an MLB hitter who won a batting title AND won the World Series at some point in their career", sport: "MLB", rules: [{ fact_type: "mlb_batting_title" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Ted Williams"},{name:"Tony Gwynn"},{name:"Wade Boggs"},
    {name:"Rod Carew"},{name:"Pete Rose"},{name:"Mickey Mantle"},
    {name:"Joe DiMaggio"},{name:"Stan Musial"},{name:"Richie Ashburn"},
    {name:"Ferris Fain"},{name:"Carl Yastrzemski"},{name:"George Brett"},
    {name:"Freddie Freeman"},{name:"Albert Pujols"},{name:"Derek Jeter"},
    {name:"Frank Robinson"},{name:"Robinson Cano"},{name:"Don Mattingly"},
    {name:"Jeff Bagwell"},{name:"Paul O'Neill"},
  ]},

  q_mlb_30hr_30sb_ws: { clue: "Name an MLB player who hit 30 or more home runs AND stole 30 or more bases in the same season AND won a World Series during their career", sport: "MLB", rules: [{ fact_type: "mlb_30_30_season" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Willie Mays"},{name:"Barry Bonds"},{name:"Bobby Bonds"},
    {name:"Eric Davis"},{name:"Darryl Strawberry"},{name:"Reggie Sanders"},
    {name:"Larry Walker"},{name:"Ellis Burks"},{name:"Marquis Grissom"},
    {name:"Ron Gant"},{name:"Alfonso Soriano"},{name:"Derek Jeter"},
    {name:"Alex Rodriguez"},{name:"Trot Nixon"},{name:"Vladimir Guerrero"},
  ]},

  q_mlb_no_hitter_ws: { clue: "Name an MLB pitcher who threw a no-hitter AND won a World Series during their career", sport: "MLB", rules: [{ fact_type: "mlb_no_hitter" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Sandy Koufax"},{name:"Nolan Ryan"},{name:"Don Larsen"},
    {name:"Bob Gibson"},{name:"Jim Bunning"},{name:"Catfish Hunter"},
    {name:"Tom Seaver"},{name:"Jim Palmer"},{name:"John Candelaria"},
    {name:"Dennis Martinez"},{name:"Roy Halladay"},{name:"Mike Witt"},
    {name:"David Cone"},{name:"David Wells"},{name:"Mark Buehrle"},
    {name:"Randy Johnson"},{name:"Len Barker"},{name:"Tom Browning"},
    {name:"Bob Forsch"},{name:"Allie Reynolds"},
  ]},

  q_mlb_ss_allstar_ws: { clue: "Name an MLB shortstop who was selected to at least 5 All-Star games AND won a World Series during their career", sport: "MLB", rules: [{ fact_type: "mlb_shortstop_5_allstar" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Derek Jeter"},{name:"Cal Ripken Jr"},{name:"Ernie Banks"},
    {name:"Ozzie Smith"},{name:"Alan Trammell"},{name:"Robin Yount"},
    {name:"Arky Vaughan"},{name:"Lou Boudreau"},{name:"Luke Appling"},
    {name:"Pee Wee Reese"},{name:"Phil Rizzuto"},{name:"Luis Aparicio"},
    {name:"Barry Larkin"},{name:"Alex Rodriguez"},{name:"Nomar Garciaparra"},
  ]},

  q_mlb_manager_ws_twice: { clue: "Name an MLB manager who won 2 or more World Series championships AND won 1,500 or more career regular season games", sport: "MLB", rules: [{ fact_type: "mlb_manager_2_ws" }, { fact_type: "mlb_manager_1500_wins" }], answers: [
    {name:"Joe McCarthy"},{name:"Sparky Anderson"},{name:"Tony La Russa"},
    {name:"Joe Torre"},{name:"Casey Stengel"},{name:"Miller Huggins"},
    {name:"Walter Alston"},{name:"Connie Mack"},{name:"Frank Chance"},
    {name:"Pat Moran"},{name:"Al Lopez"},{name:"Bill McKechnie"},
    {name:"Buck Showalter"},{name:"Bobby Cox"},{name:"Dusty Baker"},
  ]},

  q_mlb_closer_300sv_ws: { clue: "Name an MLB closer who recorded 300 or more career saves AND won a World Series during their career", sport: "MLB", rules: [{ fact_type: "mlb_300_saves" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Mariano Rivera"},{name:"Rollie Fingers"},{name:"Goose Gossage"},
    {name:"Lee Smith"},{name:"John Smoltz"},{name:"Jonathan Papelbon"},
    {name:"Billy Wagner"},{name:"Dennis Eckersley"},{name:"Trevor Hoffman"},
    {name:"Craig Kimbrel"},{name:"Jose Mesa"},{name:"Jeff Shaw"},
    {name:"Tom Henke"},{name:"Jeff Reardon"},{name:"Randy Myers"},
  ]},

  q_mlb_40hr_dodgers: { clue: "Name an MLB hitter who hit 40 or more home runs in a season AND played for the Los Angeles Dodgers at some point in their career", sport: "MLB", rules: [{ fact_type: "mlb_40_hr_season" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Duke Snider"},{name:"Pedro Guerrero"},{name:"Gary Sheffield"},
    {name:"Shawn Green"},{name:"Mike Piazza"},{name:"Cody Bellinger"},
    {name:"Manny Ramirez"},{name:"Matt Kemp"},{name:"Joc Pederson"},
    {name:"Freddie Freeman"},{name:"Edwin Rios"},{name:"Carl Furillo"},
    {name:"Roy Campanella"},{name:"Jim Wynn"},{name:"Frank Howard"},
    {name:"Steve Garvey"},{name:"Reggie Smith"},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_mlb_pitcher_cg_ws: { clue: "Name an MLB pitcher who threw 20 or more complete games in a season AND won a World Series during their career", sport: "MLB", rules: [{ fact_type: "mlb_20_complete_game_season" }, { fact_type: "mlb_ws_winner" }], answers: [
    {name:"Sandy Koufax"},{name:"Bob Gibson"},{name:"Tom Seaver"},
    {name:"Steve Carlton"},{name:"Ferguson Jenkins"},{name:"Catfish Hunter"},
    {name:"Jim Palmer"},{name:"Gaylord Perry"},{name:"Don Sutton"},
    {name:"Phil Niekro"},{name:"Nolan Ryan"},{name:"Warren Spahn"},
    {name:"Juan Marichal"},{name:"Mickey Lolich"},{name:"Vida Blue"},
    {name:"Curt Schilling"},{name:"Roger Clemens"},{name:"Randy Johnson"},
  ]},

  q_mlb_cy_young_ws_same_year: { clue: "Name an MLB pitcher who won the Cy Young Award AND won the World Series in the same year", sport: "MLB", rules: [{ fact_type: "mlb_cy_young" }, { fact_type: "mlb_cy_young_ws_same_year" }], answers: [
    {name:"Sandy Koufax"},{name:"Bob Gibson"},{name:"Randy Johnson"},
    {name:"Roger Clemens"},{name:"Greg Maddux"},{name:"Pedro Martinez"},
    {name:"Orel Hershiser"},{name:"Rick Sutcliffe"},{name:"Ron Guidry"},
    {name:"Vern Law"},{name:"Vernon Gomez"},{name:"Denny McLain"},
    {name:"Mike McCormick"},{name:"Mike Cuellar"},{name:"Jim Perry"},
  ]},

  q_mlb_batting_champ_foreign: { clue: "Name an MLB player born outside the United States who won a batting title AND was inducted into the Hall of Fame", sport: "MLB", rules: [{ fact_type: "born_outside_us" }, { fact_type: "mlb_batting_title" }, { fact_type: "mlb_hall_of_fame" }], answers: [
    {name:"Roberto Clemente"},{name:"Rod Carew"},{name:"Tony Gwynn"},
    {name:"Vladimir Guerrero"},{name:"Ichiro Suzuki"},{name:"Albert Pujols"},
    {name:"Miguel Cabrera"},{name:"Martin Dihigo"},{name:"Lefty O'Doul"},
    {name:"Cesar Cedeno"},{name:"Matty Alou"},{name:"Andres Galarraga"},
    {name:"Jorge Posada"},{name:"Orlando Cepeda"},{name:"Roberto Alomar"},
  ]},

  q_mlb_sb300_hr200: { clue: "Name an MLB player with 300 or more career stolen bases AND 200 or more career home runs", sport: "MLB", rules: [{ fact_type: "mlb_300_stolen_bases" }, { fact_type: "mlb_200_home_runs" }], answers: [
    {name:"Willie Mays"},{name:"Barry Bonds"},{name:"Bobby Bonds"},
    {name:"Andre Dawson"},{name:"Rickey Henderson"},{name:"Larry Walker"},
    {name:"Reggie Sanders"},{name:"Steve Finley"},{name:"Eric Davis"},
    {name:"Craig Biggio"},{name:"Cesar Cedeno"},{name:"Dale Murphy"},
    {name:"Devon White"},{name:"Carlos Beltran"},{name:"Alex Rodriguez"},
    {name:"Alfonso Soriano"},{name:"Gary Sheffield"},{name:"Vladimir Guerrero"},
    {name:"Jim Edmonds"},{name:"Shawn Green"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const MLB_BEGINNER = [
  "q_mlb_cy_yankees","q_mlb_300hr_300sb","q_mlb_300avg_2500hits",
  "q_mlb_ws_mvp_mvp","q_mlb_cy_dodgers","q_mlb_3000k_300w",
  "q_mlb_ws_ring_red_sox_yankees","q_mlb_500hr_hof",
];

export const MLB_KNOWLEDGEABLE = [
  "q_mlb_cy_young_red_sox","q_mlb_batting_title_ws","q_mlb_30hr_30sb_ws",
  "q_mlb_no_hitter_ws","q_mlb_ss_allstar_ws","q_mlb_manager_ws_twice",
  "q_mlb_closer_300sv_ws","q_mlb_40hr_dodgers",
];

export const MLB_EXPERT = [
  "q_mlb_pitcher_cg_ws","q_mlb_cy_young_ws_same_year",
  "q_mlb_batting_champ_foreign","q_mlb_sb300_hr200",
];
