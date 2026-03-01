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

  q_mlb_yankees_red_sox: { clue: "Name an MLB player who played for both the Yankees AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Yankees" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Babe Ruth"},{name:"Roger Clemens"},{name:"Wade Boggs"},
    {name:"Johnny Damon"},{name:"Jacoby Ellsbury"},{name:"Kevin Youkilis"},
    {name:"Elston Howard"},{name:"David Cone"},{name:"David Wells"},
    {name:"Sparky Lyle"},{name:"Mike Stanley"},{name:"Jack Clark"},
  ]},

  q_mlb_yankees_mets: { clue: "Name an MLB player who played for both the Yankees AND the Mets", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Yankees" }, { fact_type: "played_for_team", fact_value: "Mets" }], answers: [
    {name:"Darryl Strawberry"},{name:"Dwight Gooden"},{name:"David Cone"},
    {name:"Randy Johnson"},{name:"Todd Zeile"},{name:"Robin Ventura"},
    {name:"Kenny Rogers"},{name:"Jose Reyes"},{name:"Matt Harvey"},
    {name:"Curtis Granderson"},{name:"Rich Hill"},{name:"Nelson Cruz"},
  ]},

  q_mlb_dodgers_giants: { clue: "Name an MLB player who played for both the Dodgers AND the Giants", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Dodgers" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"Juan Marichal"},{name:"Duke Snider"},{name:"Reggie Smith"},
    {name:"Jeff Kent"},{name:"Brian Wilson"},{name:"Matt Kemp"},
    {name:"Shawn Green"},{name:"Kevin Brown"},{name:"Mark Sweeney"},
    {name:"Jason Schmidt"},{name:"Joc Pederson"},{name:"Jimmy Rollins"},
  ]},

  q_mlb_cubs_white_sox: { clue: "Name an MLB player who played for both the Cubs AND the White Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cubs" }, { fact_type: "played_for_team", fact_value: "White Sox" }], answers: [
    {name:"Sammy Sosa"},{name:"Alfonso Soriano"},{name:"Jose Quintana"},
    {name:"Nicholas Castellanos"},{name:"Dave Martinez"},{name:"Steve Stone"},
    {name:"Ron Santo"},{name:"Dick Allen"},{name:"Goose Gossage"},
    {name:"Larry Jackson"},{name:"Jeff Samardzija"},{name:"Jake Arrieta"},
  ]},

  q_mlb_braves_yankees: { clue: "Name an MLB player who played for both the Braves AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Braves" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Andruw Jones"},{name:"Greg Maddux"},{name:"Tom Glavine"},
    {name:"David Justice"},{name:"Kenny Lofton"},{name:"Gary Sheffield"},
    {name:"Denny Neagle"},{name:"Brian McCann"},{name:"Matt Diaz"},
    {name:"Melky Cabrera"},{name:"Russell Martin"},{name:"Cameron Maybin"},
  ]},

  q_mlb_cardinals_cubs: { clue: "Name an MLB player who played for both the Cardinals AND the Cubs", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cardinals" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Lou Brock"},{name:"Bruce Sutter"},{name:"Lee Smith"},
    {name:"Jason Heyward"},{name:"John Lackey"},{name:"Dexter Fowler"},
    {name:"Joe Girardi"},{name:"Todd Zeile"},{name:"Larry Walker"},
    {name:"Kent Bottenfield"},{name:"Matt Holliday"},{name:"Mark DeRosa"},
  ]},

  q_mlb_red_sox_dodgers: { clue: "Name an MLB player who played for both the Red Sox AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Red Sox" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Manny Ramirez"},{name:"Nomar Garciaparra"},{name:"Adrian Gonzalez"},
    {name:"Dave Roberts"},{name:"Derek Lowe"},{name:"Kevin Brown"},
    {name:"Bill Mueller"},{name:"Rich Hill"},{name:"Carl Crawford"},
    {name:"Nick Punto"},{name:"Hanley Ramirez"},{name:"Joe Kelly"},
  ]},

  q_mlb_astros_yankees: { clue: "Name an MLB player who played for both the Astros AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Astros" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Roger Clemens"},{name:"Andy Pettitte"},{name:"Carlos Beltran"},
    {name:"Brian McCann"},{name:"Lance Berkman"},{name:"Roy Oswalt"},
    {name:"Jeff Bagwell"},{name:"Craig Biggio"},{name:"Mike Hampton"},
    {name:"Jose Altuve"},{name:"Justin Verlander"},{name:"Dallas Keuchel"},
  ]},

  q_mlb_giants_dodgers: { clue: "Name an MLB player who played for both the Giants AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Jeff Kent"},{name:"Juan Marichal"},{name:"Duke Snider"},
    {name:"Reggie Smith"},{name:"Brian Wilson"},{name:"Kevin Brown"},
    {name:"Jason Schmidt"},{name:"Matt Kemp"},{name:"Shawn Green"},
    {name:"Joc Pederson"},{name:"Mark Sweeney"},{name:"Jimmy Rollins"},
  ]},

  q_mlb_phillies_yankees: { clue: "Name an MLB player who played for both the Phillies AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Phillies" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Curt Schilling"},{name:"Jim Thome"},{name:"Cliff Lee"},
    {name:"Bobby Abreu"},{name:"Chase Utley"},{name:"Raul Ibanez"},
    {name:"Lance Lynn"},{name:"David Robertson"},{name:"Shane Victorino"},
    {name:"Pedro Martinez"},{name:"Andrew McCutchen"},{name:"Didi Gregorius"},
  ]},

  q_mlb_red_sox_yankees: { clue: "Name an MLB player who played for both the Red Sox AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Red Sox" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Babe Ruth"},{name:"Roger Clemens"},{name:"Wade Boggs"},
    {name:"Johnny Damon"},{name:"Jacoby Ellsbury"},{name:"David Cone"},
    {name:"David Wells"},{name:"Kevin Youkilis"},{name:"Sparky Lyle"},
    {name:"Elston Howard"},{name:"Mike Stanley"},{name:"Jack Clark"},
  ]},

  q_mlb_dodgers_red_sox: { clue: "Name an MLB player who played for both the Dodgers AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Dodgers" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Manny Ramirez"},{name:"Adrian Gonzalez"},{name:"Nomar Garciaparra"},
    {name:"Dave Roberts"},{name:"Derek Lowe"},{name:"Carl Crawford"},
    {name:"Rich Hill"},{name:"Joe Kelly"},{name:"Kevin Brown"},
    {name:"Bill Mueller"},{name:"Hanley Ramirez"},{name:"Nick Punto"},
  ]},

  q_mlb_allstar_cubs: { clue: "Name an MLB All-Star who played for the Cubs", sport: "MLB", rules: [{ fact_type: "mlb_all_star" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Ernie Banks"},{name:"Ryne Sandberg"},{name:"Sammy Sosa"},
    {name:"Greg Maddux"},{name:"Fergie Jenkins"},{name:"Billy Williams"},
    {name:"Ron Santo"},{name:"Andre Dawson"},{name:"Mark Grace"},
    {name:"Kerry Wood"},{name:"Kris Bryant"},{name:"Anthony Rizzo"},
  ]},

  q_mlb_ws_cardinals: { clue: "Name an MLB player who won the World Series AND played for the Cardinals", sport: "MLB", rules: [{ fact_type: "mlb_ws_winner" }, { fact_type: "played_for_team", fact_value: "Cardinals" }], answers: [
    {name:"Albert Pujols"},{name:"Bob Gibson"},{name:"Stan Musial"},
    {name:"Ozzie Smith"},{name:"Mark McGwire"},{name:"Yadier Molina"},
    {name:"Adam Wainwright"},{name:"David Freese"},{name:"Chris Carpenter"},
    {name:"Matt Holliday"},{name:"Jim Edmonds"},{name:"Scott Rolen"},
  ]},

  q_mlb_mvp_yankees: { clue: "Name an MLB player who won the MVP AND played for the Yankees", sport: "MLB", rules: [{ fact_type: "mlb_mvp" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Mickey Mantle"},{name:"Joe DiMaggio"},{name:"Yogi Berra"},
    {name:"Alex Rodriguez"},{name:"Roger Maris"},{name:"Don Mattingly"},
    {name:"Thurman Munson"},{name:"Lou Gehrig"},{name:"Aaron Judge"},
    {name:"Derek Jeter"},{name:"Reggie Jackson"},{name:"Phil Rizzuto"},
  ]},

  q_mlb_cardinals_dodgers: { clue: "Name an MLB player who played for both the Cardinals AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cardinals" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Albert Pujols"},{name:"Matt Holliday"},{name:"Jim Edmonds"},
    {name:"Larry Walker"},{name:"Steve Carlton"},{name:"Mark McGwire"},
    {name:"Jeff Weaver"},{name:"Matt Kemp"},{name:"Juan Uribe"},
    {name:"Joe Kelly"},{name:"Skip Schumaker"},{name:"Orlando Cepeda"},
  ]},

  q_mlb_braves_mets: { clue: "Name an MLB player who played for both the Braves AND the Mets", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Braves" }, { fact_type: "played_for_team", fact_value: "Mets" }], answers: [
    {name:"Tom Glavine"},{name:"Gary Sheffield"},{name:"Greg Maddux"},
    {name:"Fred McGriff"},{name:"Terry Pendleton"},{name:"David Justice"},
    {name:"Brian Jordan"},{name:"Jason Bay"},{name:"Curtis Granderson"},
    {name:"B.J. Upton"},{name:"Kelly Johnson"},{name:"Julio Franco"},
  ]},

  q_mlb_phillies_dodgers: { clue: "Name an MLB player who played for both the Phillies AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Phillies" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Jimmy Rollins"},{name:"Shane Victorino"},{name:"Chase Utley"},
    {name:"Matt Kemp"},{name:"Cody Bellinger"},{name:"Steve Carlton"},
    {name:"Pete Rose"},{name:"Jim Thome"},{name:"Cliff Lee"},
    {name:"Cole Hamels"},{name:"Manny Ramirez"},{name:"David Robertson"},
  ]},

  q_mlb_red_sox_cubs: { clue: "Name an MLB player who played for both the Red Sox AND the Cubs", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Red Sox" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Nomar Garciaparra"},{name:"Jon Lester"},{name:"Bill Buckner"},
    {name:"Manny Ramirez"},{name:"Mark Prior"},{name:"David Ross"},
    {name:"Bill Lee"},{name:"Dennis Eckersley"},{name:"Kyle Schwarber"},
    {name:"Rich Hill"},{name:"Byung-Hyun Kim"},{name:"Kevin Millar"},
  ]},

  q_mlb_giants_red_sox: { clue: "Name an MLB player who played for both the Giants AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Kevin Mitchell"},{name:"Jeff Kent"},{name:"Dave Roberts"},
    {name:"Kevin Youkilis"},{name:"Mike Napoli"},{name:"Orlando Cepeda"},
    {name:"Gaylord Perry"},{name:"Matt Cain"},{name:"Jake Peavy"},
    {name:"Andrew Bailey"},{name:"Eduardo Rodriguez"},{name:"Mike Lowell"},
  ]},

  q_mlb_astros_dodgers: { clue: "Name an MLB player who played for both the Astros AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Astros" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Nolan Ryan"},{name:"Jeff Bagwell"},{name:"Craig Biggio"},
    {name:"Joe Morgan"},{name:"Don Sutton"},{name:"Kevin Brown"},
    {name:"Mike Hampton"},{name:"Carlos Beltran"},{name:"Scott Kazmir"},
    {name:"Rich Hill"},{name:"Manny Ramirez"},{name:"Yordan Alvarez"},
  ]},

  q_mlb_rangers_red_sox: { clue: "Name an MLB player who played for both the Rangers AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Rangers" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Nolan Ryan"},{name:"Nelson Cruz"},{name:"Adrian Beltre"},
    {name:"Mike Napoli"},{name:"Ian Kinsler"},{name:"Alfonso Soriano"},
    {name:"Kevin Brown"},{name:"Kenny Rogers"},{name:"John Wetteland"},
    {name:"Colby Lewis"},{name:"Nathan Eovaldi"},{name:"Derek Holland"},
  ]},

  q_mlb_dodgers_cubs: { clue: "Name an MLB player who played for both the Dodgers AND the Cubs", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Dodgers" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Greg Maddux"},{name:"Andre Dawson"},{name:"Rick Sutcliffe"},
    {name:"Mark Grace"},{name:"Ted Lilly"},{name:"Ryan Theriot"},
    {name:"Rafael Furcal"},{name:"Joe Kelly"},{name:"Ryan Dempster"},
    {name:"Cody Bellinger"},{name:"Joc Pederson"},{name:"Juan Uribe"},
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

  q_mlb_mets_yankees: { clue: "Name an MLB player who played for both the Mets AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Mets" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Darryl Strawberry"},{name:"Dwight Gooden"},{name:"David Cone"},
    {name:"Randy Johnson"},{name:"Robin Ventura"},{name:"Todd Zeile"},
    {name:"Kenny Rogers"},{name:"Jose Reyes"},{name:"Curtis Granderson"},
    {name:"Matt Harvey"},{name:"Rich Hill"},{name:"Nelson Cruz"},
  ]},

  q_mlb_braves_dodgers: { clue: "Name an MLB player who played for both the Braves AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Braves" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Hank Aaron"},{name:"Greg Maddux"},{name:"Gary Sheffield"},
    {name:"Brian Jordan"},{name:"Kevin Brown"},{name:"Kenny Lofton"},
    {name:"Fred McGriff"},{name:"Rafael Furcal"},{name:"Freddie Freeman"},
    {name:"Joc Pederson"},{name:"Adrian Gonzalez"},{name:"Matt Kemp"},
  ]},

  q_mlb_astros_red_sox: { clue: "Name an MLB player who played for both the Astros AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Astros" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Roger Clemens"},{name:"Pedro Martinez"},{name:"Andy Pettitte"},
    {name:"Jeff Bagwell"},{name:"Craig Biggio"},{name:"Lance Berkman"},
    {name:"Bret Saberhagen"},{name:"Chris Sale"},{name:"Nathan Eovaldi"},
    {name:"David Price"},{name:"Mike Hampton"},{name:"Jose Altuve"},
  ]},

  q_mlb_giants_yankees: { clue: "Name an MLB player who played for both the Giants AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Willie Mays"},{name:"Reggie Jackson"},{name:"Dave Winfield"},
    {name:"Bobby Bonds"},{name:"Orlando Cepeda"},{name:"Jeff Kent"},
    {name:"Jack Clark"},{name:"Kevin Brown"},{name:"Gaylord Perry"},
    {name:"Dave Righetti"},{name:"Matt Williams"},{name:"Andrew McCutchen"},
  ]},

  q_mlb_pirates_cubs: { clue: "Name an MLB player who played for both the Pirates AND the Cubs", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Pirates" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Roberto Clemente"},{name:"Ralph Kiner"},{name:"Bill Mazeroski"},
    {name:"Aramis Ramirez"},{name:"Jason Bay"},{name:"Starling Marte"},
    {name:"Jose Bautista"},{name:"Andrew McCutchen"},{name:"Pedro Alvarez"},
    {name:"Matt Garza"},{name:"Sean Rodriguez"},{name:"Freddy Sanchez"},
  ]},

  q_mlb_angels_yankees: { clue: "Name an MLB player who played for both the Angels AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Angels" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Reggie Jackson"},{name:"Nolan Ryan"},{name:"Don Baylor"},
    {name:"Bobby Grich"},{name:"Rod Carew"},{name:"Gary Sheffield"},
    {name:"Vladimir Guerrero"},{name:"Nick Swisher"},{name:"Mark Teixeira"},
    {name:"Albert Pujols"},{name:"Giancarlo Stanton"},{name:"Aaron Hicks"},
  ]},

  q_mlb_reds_dodgers: { clue: "Name an MLB player who played for both the Reds AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Reds" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Frank Robinson"},{name:"Eric Davis"},{name:"Pedro Guerrero"},
    {name:"Dave Parker"},{name:"Ken Griffey Sr"},{name:"Tony Perez"},
    {name:"Tom Seaver"},{name:"Sean Casey"},{name:"Yasiel Puig"},
    {name:"Manny Ramirez"},{name:"Matt Kemp"},{name:"Trevor Bauer"},
  ]},

  q_mlb_phillies_braves: { clue: "Name an MLB player who played for both the Phillies AND the Braves", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Phillies" }, { fact_type: "played_for_team", fact_value: "Braves" }], answers: [
    {name:"Jim Thome"},{name:"Greg Maddux"},{name:"Gary Sheffield"},
    {name:"Pete Rose"},{name:"Steve Carlton"},{name:"Dale Murphy"},
    {name:"Terry Pendleton"},{name:"Fred McGriff"},{name:"Marlon Byrd"},
    {name:"Jeff Francoeur"},{name:"Shane Victorino"},{name:"Matt Stairs"},
  ]},

  q_mlb_mariners_yankees: { clue: "Name an MLB player who played for both the Mariners AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Mariners" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Alex Rodriguez"},{name:"Randy Johnson"},{name:"Ken Griffey Jr"},
    {name:"Jay Buhner"},{name:"Ichiro Suzuki"},{name:"Robinson Cano"},
    {name:"Raul Ibanez"},{name:"Jeff Nelson"},{name:"Paul O'Neill"},
    {name:"Tino Martinez"},{name:"David Cone"},{name:"Sterling Hitchcock"},
  ]},

  q_mlb_allstar_dodgers: { clue: "Name an MLB All-Star who played for the Dodgers", sport: "MLB", rules: [{ fact_type: "mlb_all_star" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Sandy Koufax"},{name:"Clayton Kershaw"},{name:"Don Drysdale"},
    {name:"Duke Snider"},{name:"Mike Piazza"},{name:"Steve Garvey"},
    {name:"Fernando Valenzuela"},{name:"Manny Ramirez"},{name:"Orel Hershiser"},
    {name:"Maury Wills"},{name:"Eric Gagne"},{name:"Mookie Betts"},
  ]},

  q_mlb_ws_red_sox: { clue: "Name an MLB player who won the World Series AND played for the Red Sox", sport: "MLB", rules: [{ fact_type: "mlb_ws_winner" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"David Ortiz"},{name:"Pedro Martinez"},{name:"Manny Ramirez"},
    {name:"Curt Schilling"},{name:"Tim Wakefield"},{name:"Jason Varitek"},
    {name:"Dustin Pedroia"},{name:"Mookie Betts"},{name:"Johnny Damon"},
    {name:"Keith Foulke"},{name:"Kevin Millar"},{name:"Derek Lowe"},
  ]},

  q_mlb_tigers_yankees: { clue: "Name an MLB player who played for both the Tigers AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Tigers" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Hank Greenberg"},{name:"Cecil Fielder"},{name:"Justin Verlander"},
    {name:"Denny McLain"},{name:"David Wells"},{name:"Gary Sheffield"},
    {name:"Curtis Granderson"},{name:"Ivan Rodriguez"},{name:"Victor Martinez"},
    {name:"Miguel Cabrera"},{name:"Placido Polanco"},{name:"Omar Infante"},
  ]},

  q_mlb_cardinals_red_sox: { clue: "Name an MLB player who played for both the Cardinals AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cardinals" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Roger Clemens"},{name:"Pedro Martinez"},{name:"Matt Holliday"},
    {name:"Keith Hernandez"},{name:"Curt Schilling"},{name:"David Price"},
    {name:"Jason Varitek"},{name:"John Lackey"},{name:"Rick Ankiel"},
    {name:"Larry Walker"},{name:"Mark McGwire"},{name:"Jack Clark"},
  ]},

  q_mlb_rangers_yankees: { clue: "Name an MLB player who played for both the Rangers AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Rangers" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Alex Rodriguez"},{name:"Nolan Ryan"},{name:"Kenny Rogers"},
    {name:"David Wells"},{name:"Gary Sheffield"},{name:"Mark Teixeira"},
    {name:"Todd Frazier"},{name:"Lance Lynn"},{name:"Nelson Cruz"},
    {name:"Mike Napoli"},{name:"Ian Kinsler"},{name:"Alfonso Soriano"},
  ]},

  q_mlb_padres_yankees: { clue: "Name an MLB player who played for both the Padres AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Padres" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Dave Winfield"},{name:"Reggie Jackson"},{name:"Goose Gossage"},
    {name:"David Wells"},{name:"Kevin Brown"},{name:"Mark Teixeira"},
    {name:"Greg Vaughn"},{name:"Sterling Hitchcock"},{name:"Rickey Henderson"},
    {name:"Nick Swisher"},{name:"Matt Holliday"},{name:"Tim Wakefield"},
  ]},

  q_mlb_reds_braves: { clue: "Name an MLB player who played for both the Reds AND the Braves", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Reds" }, { fact_type: "played_for_team", fact_value: "Braves" }], answers: [
    {name:"Pete Rose"},{name:"Ken Griffey Sr"},{name:"Dave Parker"},
    {name:"Tony Perez"},{name:"David Justice"},{name:"Greg Maddux"},
    {name:"Fred McGriff"},{name:"Reggie Sanders"},{name:"Deion Sanders"},
    {name:"B.J. Upton"},{name:"Homer Bailey"},{name:"Denny Neagle"},
  ]},

  q_mlb_cardinals_giants: { clue: "Name an MLB player who played for both the Cardinals AND the Giants", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cardinals" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"Orlando Cepeda"},{name:"Willie McGee"},{name:"Ray Lankford"},
    {name:"Matt Morris"},{name:"Jeff Kent"},{name:"Jim Edmonds"},
    {name:"Larry Walker"},{name:"Matt Holliday"},{name:"Todd Zeile"},
    {name:"Mark McGwire"},{name:"Lance Lynn"},{name:"Mike Matheny"},
  ]},

  q_mlb_indians_red_sox: { clue: "Name an MLB player who played for both the Indians/Guardians AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Indians" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Manny Ramirez"},{name:"Jim Thome"},{name:"Kenny Lofton"},
    {name:"David Justice"},{name:"Albert Belle"},{name:"Omar Vizquel"},
    {name:"CC Sabathia"},{name:"Sandy Alomar Jr"},{name:"Andrew Miller"},
    {name:"Travis Hafner"},{name:"Coco Crisp"},{name:"Victor Martinez"},
  ]},

  q_mlb_dodgers_cardinals: { clue: "Name an MLB player who played for both the Dodgers AND the Cardinals", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Dodgers" }, { fact_type: "played_for_team", fact_value: "Cardinals" }], answers: [
    {name:"Albert Pujols"},{name:"Jim Edmonds"},{name:"Matt Holliday"},
    {name:"Steve Carlton"},{name:"Orlando Cepeda"},{name:"Matt Kemp"},
    {name:"Joe Kelly"},{name:"Larry Walker"},{name:"Juan Uribe"},
    {name:"Skip Schumaker"},{name:"Mark McGwire"},{name:"Jeff Weaver"},
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

  q_mlb_indians_yankees: { clue: "Name an MLB player who played for both the Indians/Guardians AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Indians" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"CC Sabathia"},{name:"Manny Ramirez"},{name:"Jim Thome"},
    {name:"Kenny Lofton"},{name:"David Justice"},{name:"Albert Belle"},
    {name:"Nick Swisher"},{name:"Omar Vizquel"},{name:"Travis Hafner"},
    {name:"Roberto Alomar"},{name:"Sandy Alomar Jr"},{name:"Andrew Miller"},
  ]},

  q_mlb_twins_yankees: { clue: "Name an MLB player who played for both the Twins AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Twins" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Rod Carew"},{name:"Kirby Puckett"},{name:"Chuck Knoblauch"},
    {name:"Paul Molitor"},{name:"Johan Santana"},{name:"David Cone"},
    {name:"Kent Hrbek"},{name:"Justin Morneau"},{name:"Torii Hunter"},
    {name:"Joe Mauer"},{name:"Brian Dozier"},{name:"Josh Donaldson"},
  ]},

  q_mlb_padres_red_sox: { clue: "Name an MLB player who played for both the Padres AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Padres" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Dave Winfield"},{name:"Adrian Gonzalez"},{name:"Greg Maddux"},
    {name:"Fred McGriff"},{name:"Jake Peavy"},{name:"Wil Myers"},
    {name:"Eric Hosmer"},{name:"Kevin Brown"},{name:"David Wells"},
    {name:"Craig Kimbrel"},{name:"Matt Clement"},{name:"Trevor Hoffman"},
  ]},

  q_mlb_white_sox_yankees: { clue: "Name an MLB player who played for both the White Sox AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "White Sox" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Goose Gossage"},{name:"Paul Konerko"},{name:"Carlton Fisk"},
    {name:"Roberto Alomar"},{name:"Albert Belle"},{name:"Nick Swisher"},
    {name:"Jose Contreras"},{name:"Kenny Williams"},{name:"Todd Frazier"},
    {name:"Robin Ventura"},{name:"Jack McDowell"},{name:"David Wells"},
  ]},

  q_mlb_phillies_red_sox: { clue: "Name an MLB player who played for both the Phillies AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Phillies" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Curt Schilling"},{name:"Pedro Martinez"},{name:"Pete Rose"},
    {name:"Jim Thome"},{name:"Shane Victorino"},{name:"Kyle Kendrick"},
    {name:"Cole Hamels"},{name:"Cliff Lee"},{name:"Kyle Schwarber"},
    {name:"Aaron Nola"},{name:"Brad Lidge"},{name:"Nick Castellanos"},
  ]},

  q_mlb_royals_braves: { clue: "Name an MLB player who played for both the Royals AND the Braves", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Royals" }, { fact_type: "played_for_team", fact_value: "Braves" }], answers: [
    {name:"David Justice"},{name:"Johnny Damon"},{name:"Jermaine Dye"},
    {name:"David Cone"},{name:"Danny Tartabull"},{name:"Jeff Francoeur"},
    {name:"Jorge Soler"},{name:"Kevin Appier"},{name:"Carlos Beltran"},
    {name:"Melky Cabrera"},{name:"Gregor Blanco"},{name:"Mark Teahen"},
  ]},

  q_mlb_cubs_yankees: { clue: "Name an MLB player who played for both the Cubs AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Cubs" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Alfonso Soriano"},{name:"Aroldis Chapman"},{name:"Ryne Sandberg"},
    {name:"Andre Dawson"},{name:"Mark Grace"},{name:"Sammy Sosa"},
    {name:"Kerry Wood"},{name:"Todd Hundley"},{name:"Anthony Rizzo"},
    {name:"Starlin Castro"},{name:"Jose Quintana"},{name:"Ben Zobrist"},
  ]},

  q_mlb_marlins_yankees: { clue: "Name an MLB player who played for both the Marlins AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Marlins" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Giancarlo Stanton"},{name:"Gary Sheffield"},{name:"Mike Lowell"},
    {name:"AJ Burnett"},{name:"Carl Pavano"},{name:"Starlin Castro"},
    {name:"Mark Teixeira"},{name:"Hanley Ramirez"},{name:"Miguel Cabrera"},
    {name:"Josh Beckett"},{name:"Cliff Floyd"},{name:"Derrek Lee"},
  ]},

  q_mlb_orioles_yankees: { clue: "Name an MLB player who played for both the Orioles AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Orioles" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Frank Robinson"},{name:"Reggie Jackson"},{name:"Roberto Alomar"},
    {name:"David Wells"},{name:"Mike Mussina"},{name:"David Cone"},
    {name:"Scott McGregor"},{name:"Nelson Cruz"},{name:"Brian Roberts"},
    {name:"B.J. Surhoff"},{name:"Zack Britton"},{name:"Adam Jones"},
  ]},

  q_mlb_athletics_red_sox: { clue: "Name an MLB player who played for both the Athletics AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Athletics" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Rickey Henderson"},{name:"Dennis Eckersley"},{name:"Rollie Fingers"},
    {name:"Jim Rice"},{name:"Wade Boggs"},{name:"Josh Reddick"},
    {name:"Coco Crisp"},{name:"Jason Giambi"},{name:"Yoenis Cespedes"},
    {name:"Mark Canha"},{name:"Matt Stairs"},{name:"Jed Lowrie"},
  ]},

  q_mlb_reds_yankees: { clue: "Name an MLB player who played for both the Reds AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Reds" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Pete Rose"},{name:"Reggie Jackson"},{name:"Ken Griffey Sr"},
    {name:"David Cone"},{name:"Paul O'Neill"},{name:"Robinson Cano"},
    {name:"Nick Swisher"},{name:"Todd Frazier"},{name:"Joey Votto"},
    {name:"Aroldis Chapman"},{name:"Sonny Gray"},{name:"Yasiel Puig"},
  ]},

  q_mlb_nationals_dodgers: { clue: "Name an MLB player who played for both the Nationals/Expos AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Nationals" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Pedro Martinez"},{name:"Vladimir Guerrero"},{name:"Max Scherzer"},
    {name:"Andre Dawson"},{name:"Tim Raines"},{name:"Gary Carter"},
    {name:"Howie Kendrick"},{name:"Mark DeRosa"},{name:"Brad Wilkerson"},
    {name:"Bartolo Colon"},{name:"Hanley Ramirez"},{name:"Jose Vizcaino"},
  ]},

  q_mlb_brewers_cardinals: { clue: "Name an MLB player who played for both the Brewers AND the Cardinals", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Brewers" }, { fact_type: "played_for_team", fact_value: "Cardinals" }], answers: [
    {name:"Robin Yount"},{name:"Paul Molitor"},{name:"CC Sabathia"},
    {name:"Teddy Higuera"},{name:"Matt Garza"},{name:"Ryan Braun"},
    {name:"Carlos Gomez"},{name:"Willy Adames"},{name:"Aramis Ramirez"},
    {name:"Mark Reynolds"},{name:"Jim Edmonds"},{name:"Mike Caldwell"},
  ]},

  q_mlb_angels_dodgers: { clue: "Name an MLB player who played for both the Angels AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Angels" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Shohei Ohtani"},{name:"Albert Pujols"},{name:"Don Sutton"},
    {name:"Gary Sheffield"},{name:"Vladimir Guerrero"},{name:"Mark Teixeira"},
    {name:"Joc Pederson"},{name:"Justin Upton"},{name:"Torii Hunter"},
    {name:"Jim Edmonds"},{name:"Mike Trout"},{name:"Joe Blanton"},
  ]},

  q_mlb_mets_red_sox: { clue: "Name an MLB player who played for both the Mets AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Mets" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Pedro Martinez"},{name:"Tom Seaver"},{name:"Nomar Garciaparra"},
    {name:"Billy Wagner"},{name:"Keith Hernandez"},{name:"Mo Vaughn"},
    {name:"David Cone"},{name:"Rich Hill"},{name:"Bartolo Colon"},
    {name:"Curtis Granderson"},{name:"Jose Reyes"},{name:"Bobby Valentine"},
  ]},

  q_mlb_rockies_cardinals: { clue: "Name an MLB player who played for both the Rockies AND the Cardinals", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Rockies" }, { fact_type: "played_for_team", fact_value: "Cardinals" }], answers: [
    {name:"Larry Walker"},{name:"Matt Holliday"},{name:"Todd Helton"},
    {name:"Nolan Arenado"},{name:"Dexter Fowler"},{name:"Mark Reynolds"},
    {name:"Jeff Francis"},{name:"Carlos Gonzalez"},{name:"Troy Tulowitzki"},
    {name:"Ubaldo Jimenez"},{name:"Jason Marquis"},{name:"Jose Reyes"},
  ]},

  q_mlb_marlins_red_sox: { clue: "Name an MLB player who played for both the Marlins AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Marlins" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Josh Beckett"},{name:"Mike Lowell"},{name:"Hanley Ramirez"},
    {name:"Carl Crawford"},{name:"Adrian Gonzalez"},{name:"Kevin Millar"},
    {name:"AJ Burnett"},{name:"Cliff Floyd"},{name:"Derrek Lee"},
    {name:"Mark Kotsay"},{name:"Kyle Barraclough"},{name:"Bret Saberhagen"},
  ]},

  q_mlb_braves_red_sox: { clue: "Name an MLB player who played for both the Braves AND the Red Sox", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Braves" }, { fact_type: "played_for_team", fact_value: "Red Sox" }], answers: [
    {name:"Greg Maddux"},{name:"Tom Glavine"},{name:"John Smoltz"},
    {name:"Chipper Jones"},{name:"David Justice"},{name:"Kenny Lofton"},
    {name:"Gary Sheffield"},{name:"Fred McGriff"},{name:"Brian McCann"},
    {name:"Kevin Millwood"},{name:"Julio Franco"},{name:"Javier Lopez"},
  ]},

  q_mlb_pirates_dodgers: { clue: "Name an MLB player who played for both the Pirates AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Pirates" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Barry Bonds"},{name:"Roberto Clemente"},{name:"Ralph Kiner"},
    {name:"Bobby Bonilla"},{name:"Bill Mazeroski"},{name:"Jason Bay"},
    {name:"Aramis Ramirez"},{name:"Oliver Perez"},{name:"Jose Bautista"},
    {name:"Andrew McCutchen"},{name:"Chris Archer"},{name:"Starling Marte"},
  ]},

  q_mlb_rays_yankees: { clue: "Name an MLB player who played for both the Rays AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Rays" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Wade Boggs"},{name:"Fred McGriff"},{name:"Johnny Damon"},
    {name:"Evan Longoria"},{name:"David Price"},{name:"Matt Garza"},
    {name:"Ben Zobrist"},{name:"Carlos Pena"},{name:"B.J. Upton"},
    {name:"Wil Myers"},{name:"Corey Kluber"},{name:"Aroldis Chapman"},
  ]},

  q_mlb_mets_dodgers: { clue: "Name an MLB player who played for both the Mets AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Mets" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Mike Piazza"},{name:"Pedro Martinez"},{name:"Tom Seaver"},
    {name:"Nolan Ryan"},{name:"Darryl Strawberry"},{name:"Jose Reyes"},
    {name:"Carlos Beltran"},{name:"Curtis Granderson"},{name:"Juan Uribe"},
    {name:"Rich Hill"},{name:"Bartolo Colon"},{name:"Max Scherzer"},
  ]},

  q_mlb_athletics_yankees: { clue: "Name an MLB player who played for both the Athletics AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Athletics" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Reggie Jackson"},{name:"Rickey Henderson"},{name:"Catfish Hunter"},
    {name:"Jason Giambi"},{name:"Rollie Fingers"},{name:"Dave Winfield"},
    {name:"Nick Swisher"},{name:"Sonny Gray"},{name:"Rich Hill"},
    {name:"Matt Holliday"},{name:"Eric Chavez"},{name:"Marcus Semien"},
  ]},

  q_mlb_phillies_mets: { clue: "Name an MLB player who played for both the Phillies AND the Mets", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Phillies" }, { fact_type: "played_for_team", fact_value: "Mets" }], answers: [
    {name:"Pete Rose"},{name:"Lenny Dykstra"},{name:"Tom Seaver"},
    {name:"Keith Hernandez"},{name:"Tug McGraw"},{name:"Carlos Beltran"},
    {name:"Jay Bruce"},{name:"Matt Harvey"},{name:"Daniel Murphy"},
    {name:"Marlon Byrd"},{name:"Aaron Nola"},{name:"Ben Revere"},
  ]},

  q_mlb_reds_cubs: { clue: "Name an MLB player who played for both the Reds AND the Cubs", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Reds" }, { fact_type: "played_for_team", fact_value: "Cubs" }], answers: [
    {name:"Pete Rose"},{name:"Ken Griffey Sr"},{name:"Eric Davis"},
    {name:"Sean Casey"},{name:"Adam Dunn"},{name:"Brandon Phillips"},
    {name:"Aroldis Chapman"},{name:"Deion Sanders"},{name:"George Foster"},
    {name:"Nicholas Castellanos"},{name:"Jose Rijo"},{name:"Danny Jackson"},
  ]},

  q_mlb_braves_giants: { clue: "Name an MLB player who played for both the Braves AND the Giants", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Braves" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"Hank Aaron"},{name:"Greg Maddux"},{name:"Gary Sheffield"},
    {name:"Fred McGriff"},{name:"Andres Galarraga"},{name:"Jeff Francoeur"},
    {name:"Tom Glavine"},{name:"Andruw Jones"},{name:"Kenny Lofton"},
    {name:"B.J. Upton"},{name:"Melky Cabrera"},{name:"Jeff Kent"},
  ]},

  q_mlb_astros_cardinals: { clue: "Name an MLB player who played for both the Astros AND the Cardinals", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Astros" }, { fact_type: "played_for_team", fact_value: "Cardinals" }], answers: [
    {name:"Lance Berkman"},{name:"Jeff Bagwell"},{name:"Craig Biggio"},
    {name:"Roy Oswalt"},{name:"Carlos Beltran"},{name:"Jason Marquis"},
    {name:"Woody Williams"},{name:"Mike Hampton"},{name:"Brad Ausmus"},
    {name:"Jose Altuve"},{name:"Gerrit Cole"},{name:"Dallas Keuchel"},
  ]},

  q_mlb_mariners_dodgers: { clue: "Name an MLB player who played for both the Mariners AND the Dodgers", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Mariners" }, { fact_type: "played_for_team", fact_value: "Dodgers" }], answers: [
    {name:"Ken Griffey Jr"},{name:"Ichiro Suzuki"},{name:"Randy Johnson"},
    {name:"Alex Rodriguez"},{name:"Robinson Cano"},{name:"Adrian Beltre"},
    {name:"Raul Ibanez"},{name:"Jeff Nelson"},{name:"Hideo Nomo"},
    {name:"Freddy Garcia"},{name:"Chris Taylor"},{name:"Jamie Moyer"},
  ]},

  q_mlb_diamondbacks_yankees: { clue: "Name an MLB player who played for both the Diamondbacks AND the Yankees", sport: "MLB", rules: [{ fact_type: "played_for_team", fact_value: "Diamondbacks" }, { fact_type: "played_for_team", fact_value: "Yankees" }], answers: [
    {name:"Randy Johnson"},{name:"Curt Schilling"},{name:"Mark Grace"},
    {name:"Luis Gonzalez"},{name:"Matt Williams"},{name:"Steve Finley"},
    {name:"Jay Bell"},{name:"Orlando Hudson"},{name:"Robbie Ray"},
    {name:"Brandon Webb"},{name:"Eduardo Escobar"},{name:"Nick Ahmed"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const MLB_BEGINNER = [
  "q_mlb_cy_yankees","q_mlb_300hr_300sb","q_mlb_300avg_2500hits",
  "q_mlb_ws_mvp_mvp","q_mlb_cy_dodgers","q_mlb_3000k_300w",
  "q_mlb_ws_ring_red_sox_yankees","q_mlb_500hr_hof",
  "q_mlb_yankees_red_sox","q_mlb_yankees_mets","q_mlb_dodgers_giants",
  "q_mlb_cubs_white_sox","q_mlb_braves_yankees","q_mlb_cardinals_cubs",
  "q_mlb_red_sox_dodgers","q_mlb_astros_yankees","q_mlb_giants_dodgers",
  "q_mlb_phillies_yankees","q_mlb_red_sox_yankees","q_mlb_dodgers_red_sox",
  "q_mlb_allstar_cubs","q_mlb_ws_cardinals","q_mlb_mvp_yankees",
  "q_mlb_cardinals_dodgers","q_mlb_braves_mets","q_mlb_phillies_dodgers",
  "q_mlb_red_sox_cubs","q_mlb_giants_red_sox","q_mlb_astros_dodgers",
  "q_mlb_rangers_red_sox","q_mlb_dodgers_cubs",
];

export const MLB_KNOWLEDGEABLE = [
  "q_mlb_cy_young_red_sox","q_mlb_batting_title_ws","q_mlb_30hr_30sb_ws",
  "q_mlb_no_hitter_ws","q_mlb_ss_allstar_ws","q_mlb_manager_ws_twice",
  "q_mlb_closer_300sv_ws","q_mlb_40hr_dodgers",
  "q_mlb_mets_yankees","q_mlb_braves_dodgers","q_mlb_astros_red_sox",
  "q_mlb_giants_yankees","q_mlb_pirates_cubs","q_mlb_angels_yankees",
  "q_mlb_reds_dodgers","q_mlb_phillies_braves","q_mlb_mariners_yankees",
  "q_mlb_allstar_dodgers","q_mlb_ws_red_sox","q_mlb_tigers_yankees",
  "q_mlb_cardinals_red_sox","q_mlb_rangers_yankees",
  "q_mlb_padres_yankees","q_mlb_reds_braves","q_mlb_cardinals_giants",
  "q_mlb_indians_red_sox","q_mlb_dodgers_cardinals",
];

export const MLB_EXPERT = [
  "q_mlb_pitcher_cg_ws","q_mlb_cy_young_ws_same_year",
  "q_mlb_batting_champ_foreign","q_mlb_sb300_hr200",
  "q_mlb_indians_yankees","q_mlb_twins_yankees","q_mlb_padres_red_sox",
  "q_mlb_white_sox_yankees","q_mlb_phillies_red_sox","q_mlb_royals_braves",
  "q_mlb_cubs_yankees","q_mlb_marlins_yankees","q_mlb_orioles_yankees",
  "q_mlb_athletics_red_sox","q_mlb_reds_yankees","q_mlb_nationals_dodgers",
  "q_mlb_brewers_cardinals","q_mlb_angels_dodgers","q_mlb_mets_red_sox",
  "q_mlb_rockies_cardinals","q_mlb_marlins_red_sox",
  "q_mlb_braves_red_sox","q_mlb_pirates_dodgers","q_mlb_rays_yankees",
  "q_mlb_mets_dodgers","q_mlb_athletics_yankees","q_mlb_phillies_mets",
  "q_mlb_reds_cubs","q_mlb_braves_giants","q_mlb_astros_cardinals",
  "q_mlb_mariners_dodgers","q_mlb_diamondbacks_yankees",
];
