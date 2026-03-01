// ─── NHL QUESTIONS ────────────────────────────────────────────────────────────
// Every question has TWO conditions joined by AND.

export const NHL_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_nhl_cup_300goals: { clue: "Name an NHL player who won the Stanley Cup AND scored 300 or more career regular season goals", sport: "NHL", rules: [{ fact_type: "nhl_stanley_cup" }, { fact_type: "nhl_300_career_goals" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Jari Kurri"},
    {name:"Glenn Anderson"},{name:"Mario Lemieux"},{name:"Jaromir Jagr"},
    {name:"Paul Coffey"},{name:"Brett Hull"},{name:"Steve Yzerman"},
    {name:"Nicklas Lidstrom"},{name:"Brendan Shanahan"},{name:"Mats Sundin"},
    {name:"Sergei Fedorov"},{name:"Luc Robitaille"},{name:"Joe Sakic"},
    {name:"Denis Savard"},{name:"Bryan Trottier"},{name:"Mike Bossy"},
    {name:"Guy Lafleur"},{name:"Yvan Cournoyer"},{name:"Phil Esposito"},
    {name:"Frank Mahovlich"},{name:"Jean Beliveau"},{name:"Gordie Howe"},
    {name:"Bob Gainey"},{name:"Peter Forsberg"},{name:"Mike Modano"},
  ]},

  q_nhl_hart_canadian: { clue: "Name an NHL player who won the Hart Trophy (league MVP) AND played for a Canadian team at some point during their career", sport: "NHL", rules: [{ fact_type: "nhl_hart_trophy" }, { fact_type: "nhl_played_canadian_team" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Mario Lemieux"},
    {name:"Gordie Howe"},{name:"Phil Esposito"},{name:"Bobby Clarke"},
    {name:"Steve Yzerman"},{name:"Mats Sundin"},{name:"Joe Sakic"},
    {name:"Guy Lafleur"},{name:"Jean Beliveau"},{name:"Alex Ovechkin"},
    {name:"Evgeni Malkin"},{name:"Sidney Crosby"},{name:"Jarome Iginla"},
    {name:"Nathan MacKinnon"},{name:"Connor McDavid"},{name:"Bobby Hull"},
    {name:"Ted Lindsay"},{name:"Howie Morenz"},{name:"Bill Cowley"},
    {name:"Elmer Lach"},{name:"Toe Blake"},{name:"Max Bentley"},
  ]},

  q_nhl_50goals_cup: { clue: "Name an NHL player who scored 50 or more goals in a single season AND won at least one Stanley Cup during their career", sport: "NHL", rules: [{ fact_type: "nhl_50_goal_season" }, { fact_type: "nhl_stanley_cup" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mario Lemieux"},{name:"Brett Hull"},
    {name:"Mike Bossy"},{name:"Jari Kurri"},{name:"Guy Lafleur"},
    {name:"Mark Messier"},{name:"Steve Yzerman"},{name:"Phil Esposito"},
    {name:"Reggie Leach"},{name:"Yvan Cournoyer"},{name:"Luc Robitaille"},
    {name:"Glenn Anderson"},{name:"Teemu Selanne"},{name:"Peter Bondra"},
    {name:"Cam Neely"},{name:"Rick Middleton"},{name:"Mats Sundin"},
    {name:"Dino Ciccarelli"},{name:"Mike Gartner"},
  ]},

  q_nhl_d_norris_cup: { clue: "Name an NHL defenseman who won the Norris Trophy AND won a Stanley Cup during their career", sport: "NHL", rules: [{ fact_type: "nhl_norris_trophy" }, { fact_type: "nhl_stanley_cup" }], answers: [
    {name:"Bobby Orr"},{name:"Nicklas Lidstrom"},{name:"Doug Harvey"},
    {name:"Paul Coffey"},{name:"Chris Chelios"},{name:"Denis Potvin"},
    {name:"Rob Blake"},{name:"Brian Leetch"},{name:"Larry Robinson"},
    {name:"Ray Bourque"},{name:"Al MacInnis"},{name:"Doug Wilson"},
    {name:"Rod Langway"},{name:"Pierre Pilote"},{name:"Tim Horton"},
    {name:"Scott Stevens"},{name:"Eric Karlsson"},{name:"Victor Hedman"},
    {name:"Shea Weber"},{name:"Duncan Keith"},
  ]},

  q_nhl_500g_foreign: { clue: "Name an NHL player who was born in Europe AND scored 500 or more career regular season goals", sport: "NHL", rules: [{ fact_type: "born_in_europe" }, { fact_type: "nhl_500_career_goals" }], answers: [
    {name:"Jaromir Jagr"},{name:"Mats Sundin"},{name:"Teemu Selanne"},
    {name:"Brendan Shanahan"},{name:"Peter Forsberg"},{name:"Mike Gartner"},
    {name:"Luc Robitaille"},{name:"Jari Kurri"},{name:"Marcel Dionne"},
    {name:"Brett Hull"},{name:"Guy Lafleur"},{name:"Sergei Fedorov"},
    {name:"Alex Ovechkin"},{name:"Nicklas Backstrom"},{name:"Ilya Kovalchuk"},
    {name:"Daniel Sedin"},{name:"Marian Hossa"},{name:"Jarome Iginla"},
    {name:"Miroslav Satan"},{name:"Thomas Vanek"},
  ]},

  q_nhl_goalie_cup_vezina: { clue: "Name an NHL goalie who won both the Vezina Trophy AND the Stanley Cup during their career", sport: "NHL", rules: [{ fact_type: "nhl_vezina_trophy" }, { fact_type: "nhl_stanley_cup" }], answers: [
    {name:"Patrick Roy"},{name:"Martin Brodeur"},{name:"Dominik Hasek"},
    {name:"Ken Dryden"},{name:"Jacques Plante"},{name:"Terry Sawchuk"},
    {name:"Bernie Parent"},{name:"Bill Durnan"},{name:"Turk Broda"},
    {name:"Mike Vernon"},{name:"Ed Belfour"},{name:"Grant Fuhr"},
    {name:"Billy Smith"},{name:"Rogie Vachon"},{name:"Tony Esposito"},
    {name:"Glenn Hall"},{name:"Gump Worsley"},{name:"Corey Crawford"},
  ]},

  q_nhl_oilers_rangers: { clue: "Name an NHL player who played for both the Oilers AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Oilers" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Adam Graves"},
    {name:"Kevin Lowe"},{name:"Jeff Beukeboom"},{name:"Esa Tikkanen"},
    {name:"Glenn Anderson"},{name:"Craig MacTavish"},{name:"Jari Kurri"},
    {name:"Reijo Ruotsalainen"},{name:"Kelly Buchberger"},{name:"Ryan Smyth"},
  ]},

  q_nhl_penguins_capitals: { clue: "Name an NHL player who played for both the Penguins AND the Capitals", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Penguins" }, { fact_type: "played_for_team", fact_value: "Capitals" }], answers: [
    {name:"Jaromir Jagr"},{name:"Sergei Gonchar"},{name:"Matt Niskanen"},
    {name:"Brooks Orpik"},{name:"Darius Kasparaitis"},{name:"Kris Letang"},
    {name:"Robert Lang"},{name:"Jeff Halpern"},{name:"Matt Cooke"},
    {name:"Craig Adams"},{name:"Mike Knuble"},{name:"Marcus Pettersson"},
  ]},

  q_nhl_canadiens_bruins: { clue: "Name an NHL player who played for both the Canadiens AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Canadiens" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Phil Esposito"},{name:"Ken Dryden"},{name:"Guy Lafleur"},
    {name:"Patrick Roy"},{name:"Doug Harvey"},{name:"Gump Worsley"},
    {name:"Dit Clapper"},{name:"Eddie Shore"},{name:"Frank Mahovlich"},
    {name:"Terry O'Reilly"},{name:"Larry Robinson"},{name:"P.K. Subban"},
  ]},

  q_nhl_blackhawks_red_wings: { clue: "Name an NHL player who played for both the Blackhawks AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blackhawks" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Chris Chelios"},{name:"Dominik Hasek"},{name:"Brett Hull"},
    {name:"Ed Belfour"},{name:"Bob Probert"},{name:"Dale Tallon"},
    {name:"Denis Savard"},{name:"Pat Verbeek"},{name:"Marian Hossa"},
    {name:"Patrick Sharp"},{name:"Kris Draper"},{name:"Steve Larmer"},
  ]},

  q_nhl_maple_leafs_canadiens: { clue: "Name an NHL player who played for both the Maple Leafs AND the Canadiens", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Maple Leafs" }, { fact_type: "played_for_team", fact_value: "Canadiens" }], answers: [
    {name:"Frank Mahovlich"},{name:"Doug Gilmour"},{name:"Larry Murphy"},
    {name:"Red Kelly"},{name:"Dickie Moore"},{name:"Bernie Geoffrion"},
    {name:"Jacques Plante"},{name:"Tomas Plekanec"},{name:"Phil Kessel"},
    {name:"Vincent Damphousse"},{name:"Shayne Corson"},{name:"Mats Sundin"},
  ]},

  q_nhl_flyers_rangers: { clue: "Name an NHL player who played for both the Flyers AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Mark Recchi"},{name:"Keith Primeau"},{name:"Eric Lindros"},
    {name:"Mark Howe"},{name:"John LeClair"},{name:"Rick Tocchet"},
    {name:"Rod Brind'Amour"},{name:"Wayne Gretzky"},{name:"Adam Graves"},
    {name:"Kevin Hayes"},{name:"Keith Yandle"},{name:"Ilya Kovalchuk"},
  ]},

  q_nhl_red_wings_avalanche: { clue: "Name an NHL player who played for both the Red Wings AND the Avalanche", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Avalanche" }], answers: [
    {name:"Brendan Shanahan"},{name:"Steve Yzerman"},{name:"Chris Chelios"},
    {name:"Dominik Hasek"},{name:"Darren Helm"},{name:"Ville Leino"},
    {name:"Mike Vernon"},{name:"Claude Lemieux"},{name:"Dino Ciccarelli"},
    {name:"Luc Robitaille"},{name:"Brett Hull"},{name:"Todd Bertuzzi"},
  ]},

  q_nhl_bruins_blackhawks: { clue: "Name an NHL player who played for both the Bruins AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Bruins" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Phil Esposito"},{name:"Bobby Orr"},{name:"Chris Chelios"},
    {name:"Bill Guerin"},{name:"Tyler Seguin"},{name:"Brian Campbell"},
    {name:"Dennis Hull"},{name:"Brandon Saad"},{name:"Johnny Bucyk"},
    {name:"Reggie Leach"},{name:"Eddie Shore"},{name:"Dit Clapper"},
  ]},

  q_nhl_kings_rangers: { clue: "Name an NHL player who played for both the Kings AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Kings" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Wayne Gretzky"},{name:"Luc Robitaille"},{name:"Marcel Dionne"},
    {name:"Bernie Nicholls"},{name:"Rob Blake"},{name:"Mike Richards"},
    {name:"Marian Gaborik"},{name:"Kevin Stevens"},{name:"Rick Tocchet"},
    {name:"Sean Avery"},{name:"Dustin Brown"},{name:"Dion Phaneuf"},
  ]},

  q_nhl_penguins_bruins: { clue: "Name an NHL player who played for both the Penguins AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Penguins" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Jaromir Jagr"},{name:"Phil Kessel"},{name:"Ron Francis"},
    {name:"Rick Middleton"},{name:"Darius Kasparaitis"},{name:"Mark Recchi"},
    {name:"Glen Murray"},{name:"Bill Guerin"},{name:"Sergei Gonchar"},
    {name:"Patrice Bergeron"},{name:"Joe Thornton"},{name:"Reilly Smith"},
  ]},

  q_nhl_devils_rangers: { clue: "Name an NHL player who played for both the Devils AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Devils" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Scott Stevens"},{name:"Bobby Holik"},{name:"P.K. Subban"},
    {name:"Valeri Kamensky"},{name:"Brian Leetch"},{name:"Martin Brodeur"},
    {name:"Claude Lemieux"},{name:"Scott Niedermayer"},{name:"John MacLean"},
    {name:"Brendan Shanahan"},{name:"Kevin Hayes"},{name:"Wayne Simmonds"},
  ]},

  q_nhl_red_wings_maple_leafs: { clue: "Name an NHL player who played for both the Red Wings AND the Maple Leafs", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Maple Leafs" }], answers: [
    {name:"Gordie Howe"},{name:"Red Kelly"},{name:"Terry Sawchuk"},
    {name:"Brendan Shanahan"},{name:"Larry Murphy"},{name:"Mike Babcock"},
    {name:"Borje Salming"},{name:"Bob Baun"},{name:"Marcel Pronovost"},
    {name:"Danny DeKeyser"},{name:"Alex Delvecchio"},{name:"Sid Abel"},
  ]},

  q_nhl_cup_penguins: { clue: "Name an NHL player who won the Stanley Cup AND played for the Penguins", sport: "NHL", rules: [{ fact_type: "nhl_stanley_cup" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Mario Lemieux"},{name:"Sidney Crosby"},{name:"Evgeni Malkin"},
    {name:"Jaromir Jagr"},{name:"Phil Kessel"},{name:"Ron Francis"},
    {name:"Kris Letang"},{name:"Marc-Andre Fleury"},{name:"Tom Barrasso"},
    {name:"Larry Murphy"},{name:"Bryan Trottier"},{name:"Mark Recchi"},
  ]},

  q_nhl_allstar_oilers: { clue: "Name an NHL All-Star who played for the Oilers", sport: "NHL", rules: [{ fact_type: "nhl_all_star" }, { fact_type: "played_for_team", fact_value: "Oilers" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Jari Kurri"},
    {name:"Paul Coffey"},{name:"Glenn Anderson"},{name:"Grant Fuhr"},
    {name:"Connor McDavid"},{name:"Leon Draisaitl"},{name:"Ryan Nugent-Hopkins"},
    {name:"Ryan Smyth"},{name:"Doug Weight"},{name:"Bill Ranford"},
  ]},

  q_nhl_oilers_canucks: { clue: "Name an NHL player who played for both the Oilers AND the Canucks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Oilers" }, { fact_type: "played_for_team", fact_value: "Canucks" }], answers: [
    {name:"Mark Messier"},{name:"Wayne Gretzky"},{name:"Ryan Smyth"},
    {name:"Jason Smith"},{name:"Todd Marchant"},{name:"Mike Comrie"},
    {name:"Jari Kurri"},{name:"Craig MacTavish"},{name:"Esa Tikkanen"},
    {name:"Ryan Nugent-Hopkins"},{name:"Sam Gagner"},{name:"Ales Hemsky"},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_nhl_1000pts_cup: { clue: "Name an NHL player who recorded 1,000 or more career regular season points AND won at least one Stanley Cup", sport: "NHL", rules: [{ fact_type: "nhl_1000_career_points" }, { fact_type: "nhl_stanley_cup" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Jaromir Jagr"},
    {name:"Mario Lemieux"},{name:"Gordie Howe"},{name:"Ron Francis"},
    {name:"Steve Yzerman"},{name:"Joe Sakic"},{name:"Paul Coffey"},
    {name:"Brendan Shanahan"},{name:"Jari Kurri"},{name:"Bryan Trottier"},
    {name:"Guy Lafleur"},{name:"Jean Beliveau"},{name:"Peter Forsberg"},
    {name:"Denis Savard"},{name:"Gilbert Perreault"},{name:"Mike Modano"},
    {name:"Alex Ovechkin"},{name:"Nicklas Backstrom"},{name:"Marian Hossa"},
  ]},

  q_nhl_captain_cup_twice: { clue: "Name an NHL player who served as team captain AND won the Stanley Cup at least twice", sport: "NHL", rules: [{ fact_type: "nhl_team_captain" }, { fact_type: "nhl_2_plus_cups" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mark Messier"},{name:"Mario Lemieux"},
    {name:"Steve Yzerman"},{name:"Joe Sakic"},{name:"Jean Beliveau"},
    {name:"Maurice Richard"},{name:"Denis Potvin"},{name:"Bobby Clarke"},
    {name:"Sidney Crosby"},{name:"Yvan Cournoyer"},{name:"George Armstrong"},
    {name:"Dit Clapper"},{name:"Ted Kennedy"},{name:"Syl Apps"},
    {name:"Jonathan Toews"},{name:"Scott Stevens"},{name:"Bob Gainey"},
  ]},

  q_nhl_playoff_pts_100: { clue: "Name an NHL player with 100 or more career playoff points AND played for a team other than the Edmonton Oilers as their primary team", sport: "NHL", rules: [{ fact_type: "nhl_100_playoff_points" }, { fact_type: "nhl_primary_team_not_oilers" }], answers: [
    {name:"Mario Lemieux"},{name:"Brett Hull"},{name:"Joe Sakic"},
    {name:"Mike Bossy"},{name:"Bryan Trottier"},{name:"Denis Savard"},
    {name:"Bobby Smith"},{name:"Jean Beliveau"},{name:"Steve Yzerman"},
    {name:"Ron Francis"},{name:"John Druce"},{name:"Bernie Geoffrion"},
    {name:"Sidney Crosby"},{name:"Evgeni Malkin"},{name:"Peter Forsberg"},
    {name:"Guy Lafleur"},{name:"Phil Esposito"},{name:"Gordie Howe"},
  ]},

  q_nhl_cup_3plus_different_teams: { clue: "Name an NHL player who won the Stanley Cup with 2 or more different franchises AND played in at least 15 NHL seasons", sport: "NHL", rules: [{ fact_type: "nhl_cup_multiple_teams" }, { fact_type: "nhl_15_plus_seasons" }], answers: [
    {name:"Dino Ciccarelli"},{name:"Mark Recchi"},{name:"Bryan Smolinski"},
    {name:"Claude Lemieux"},{name:"Peter Forsberg"},{name:"Rob Blake"},
    {name:"Joe Nieuwendyk"},{name:"Glen Murray"},{name:"Brian Skrudland"},
    {name:"Patrick Roy"},{name:"Ken Dryden"},{name:"Larry Murphy"},
    {name:"Brendan Shanahan"},{name:"Chris Chelios"},{name:"Ed Belfour"},
    {name:"Luc Robitaille"},{name:"Brett Hull"},{name:"Gary Roberts"},
    {name:"Mike Keane"},{name:"Sylvain Lefebvre"},
  ]},

  q_nhl_100pts_d_season: { clue: "Name an NHL defenseman who scored 100 or more points in a single season AND was named to the All-Star team that season", sport: "NHL", rules: [{ fact_type: "nhl_defenseman_100_point_season" }, { fact_type: "nhl_allstar_same_season" }], answers: [
    {name:"Bobby Orr"},{name:"Paul Coffey"},{name:"Denis Potvin"},
    {name:"Doug Harvey"},{name:"Phil Housley"},{name:"Larry Murphy"},
    {name:"Brad Park"},{name:"Al MacInnis"},{name:"Ray Bourque"},
    {name:"Brian Leetch"},{name:"Kevin Hatcher"},{name:"Chris Chelios"},
    {name:"Pat Quinn"},{name:"Rod Langway"},{name:"Larry Robinson"},
  ]},

  q_nhl_50goals_allstar: { clue: "Name an NHL player who scored 50 or more goals in a season AND was selected as a First Team All-Star that same season", sport: "NHL", rules: [{ fact_type: "nhl_50_goal_season" }, { fact_type: "nhl_first_team_allstar_same_season" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mario Lemieux"},{name:"Brett Hull"},
    {name:"Mike Bossy"},{name:"Phil Esposito"},{name:"Guy Lafleur"},
    {name:"Teemu Selanne"},{name:"Jari Kurri"},{name:"Luc Robitaille"},
    {name:"Marcel Dionne"},{name:"Reggie Leach"},{name:"Steve Yzerman"},
    {name:"Rick Martin"},{name:"Charlie Simmer"},{name:"Blaine Stoughton"},
    {name:"Danny Gare"},{name:"Rick Kehoe"},{name:"Pierre Larouche"},
  ]},

  q_nhl_goalie_3cups: { clue: "Name an NHL goalie who won 3 or more Stanley Cups AND recorded 300 or more regular season wins during their career", sport: "NHL", rules: [{ fact_type: "nhl_goalie_3_cups" }, { fact_type: "nhl_goalie_300_wins" }], answers: [
    {name:"Patrick Roy"},{name:"Martin Brodeur"},{name:"Ken Dryden"},
    {name:"Turk Broda"},{name:"Grant Fuhr"},{name:"Billy Smith"},
    {name:"Gerry Cheevers"},{name:"Glenn Hall"},{name:"Terry Sawchuk"},
    {name:"Gump Worsley"},{name:"Bernie Parent"},{name:"Ed Belfour"},
    {name:"Mike Vernon"},{name:"Corey Crawford"},{name:"Marc-Andre Fleury"},
    {name:"Dominik Hasek"},{name:"Rogie Vachon"},{name:"Tony Esposito"},
  ]},

  q_nhl_russian_cup: { clue: "Name a Russian-born NHL player who won the Stanley Cup AND scored 30 or more goals in a season during their career", sport: "NHL", rules: [{ fact_type: "born_in_russia" }, { fact_type: "nhl_stanley_cup" }, { fact_type: "nhl_30_goal_season" }], answers: [
    {name:"Sergei Fedorov"},{name:"Alex Ovechkin"},{name:"Pavel Datsyuk"},
    {name:"Slava Kozlov"},{name:"Igor Larionov"},{name:"Alexei Zhitnik"},
    {name:"Vladimir Konstantinov"},{name:"Slava Fetisov"},{name:"Valeri Kamensky"},
    {name:"Valeri Zelepukin"},{name:"Alexei Gusarov"},{name:"Evgeni Malkin"},
    {name:"Nicklas Backstrom"},{name:"Ilya Kovalchuk"},{name:"Mikhail Grabovski"},
  ]},

  q_nhl_blackhawks_blues: { clue: "Name an NHL player who played for both the Blackhawks AND the Blues", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blackhawks" }, { fact_type: "played_for_team", fact_value: "Blues" }], answers: [
    {name:"Denis Savard"},{name:"Doug Wilson"},{name:"Chris Chelios"},
    {name:"Brett Hull"},{name:"Patrick Sharp"},{name:"Ed Belfour"},
    {name:"Troy Murray"},{name:"Dale Tallon"},{name:"Steve Larmer"},
    {name:"Doug Gilmour"},{name:"Jeremy Roenick"},{name:"Brian Sutter"},
  ]},

  q_nhl_kings_penguins: { clue: "Name an NHL player who played for both the Kings AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Kings" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Luc Robitaille"},{name:"Rick Tocchet"},{name:"Kevin Stevens"},
    {name:"Larry Murphy"},{name:"Marcel Dionne"},{name:"Jeff Carter"},
    {name:"Mike Richards"},{name:"Rob Scuderi"},{name:"Rob Blake"},
    {name:"Tomas Sandstrom"},{name:"Marian Gaborik"},{name:"Phil Kessel"},
  ]},

  q_nhl_avalanche_red_wings: { clue: "Name an NHL player who played for both the Avalanche AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Avalanche" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Brendan Shanahan"},{name:"Chris Chelios"},{name:"Dominik Hasek"},
    {name:"Claude Lemieux"},{name:"Brett Hull"},{name:"Dino Ciccarelli"},
    {name:"Mike Vernon"},{name:"Luc Robitaille"},{name:"Todd Bertuzzi"},
    {name:"Darren Helm"},{name:"Ville Leino"},{name:"Peter Forsberg"},
  ]},

  q_nhl_capitals_penguins: { clue: "Name an NHL player who played for both the Capitals AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Capitals" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Jaromir Jagr"},{name:"Sergei Gonchar"},{name:"Matt Niskanen"},
    {name:"Brooks Orpik"},{name:"Kris Letang"},{name:"Robert Lang"},
    {name:"Jeff Halpern"},{name:"Matt Cooke"},{name:"Craig Adams"},
    {name:"Mike Knuble"},{name:"Darius Kasparaitis"},{name:"Marcus Pettersson"},
  ]},

  q_nhl_bruins_canadiens: { clue: "Name an NHL player who played for both the Bruins AND the Canadiens", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Bruins" }, { fact_type: "played_for_team", fact_value: "Canadiens" }], answers: [
    {name:"Phil Esposito"},{name:"Ken Dryden"},{name:"Guy Lafleur"},
    {name:"Doug Harvey"},{name:"Eddie Shore"},{name:"Dit Clapper"},
    {name:"Frank Mahovlich"},{name:"Gump Worsley"},{name:"P.K. Subban"},
    {name:"Larry Robinson"},{name:"Terry O'Reilly"},{name:"Patrick Roy"},
  ]},

  q_nhl_sabres_bruins: { clue: "Name an NHL player who played for both the Sabres AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Sabres" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Dominik Hasek"},{name:"Phil Housley"},{name:"Pat LaFontaine"},
    {name:"Daniel Briere"},{name:"Chris Drury"},{name:"Miroslav Satan"},
    {name:"Ryan Miller"},{name:"Tyler Ennis"},{name:"Jochen Hecht"},
    {name:"Taylor Hall"},{name:"Robin Lehner"},{name:"Evander Kane"},
  ]},

  q_nhl_senators_maple_leafs: { clue: "Name an NHL player who played for both the Senators AND the Maple Leafs", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Senators" }, { fact_type: "played_for_team", fact_value: "Maple Leafs" }], answers: [
    {name:"Mats Sundin"},{name:"Daniel Alfredsson"},{name:"Jason Spezza"},
    {name:"Dany Heatley"},{name:"Wade Redden"},{name:"Chris Phillips"},
    {name:"Mike Fisher"},{name:"Matt Carkner"},{name:"Nick Foligno"},
    {name:"Alex Auld"},{name:"Patrick Lalime"},{name:"Nikita Zaitsev"},
  ]},

  q_nhl_flyers_blackhawks: { clue: "Name an NHL player who played for both the Flyers AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Chris Chelios"},{name:"Jeremy Roenick"},{name:"Brian Campbell"},
    {name:"Keith Yandle"},{name:"Mikael Renberg"},{name:"Eric Daze"},
    {name:"Mark Howe"},{name:"John LeClair"},{name:"Bernie Parent"},
    {name:"Simon Gagne"},{name:"Bill Barber"},{name:"Brent Seabrook"},
  ]},

  q_nhl_stars_penguins: { clue: "Name an NHL player who played for both the Stars AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Stars" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Jaromir Jagr"},{name:"Sergei Zubov"},{name:"Mike Modano"},
    {name:"Brett Hull"},{name:"Derian Hatcher"},{name:"Rob Blake"},
    {name:"Jere Lehtinen"},{name:"Jason Arnott"},{name:"Steve Ott"},
    {name:"Brenden Morrow"},{name:"James Neal"},{name:"Tyler Seguin"},
  ]},

  q_nhl_sharks_penguins: { clue: "Name an NHL player who played for both the Sharks AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Sharks" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Joe Thornton"},{name:"Patrick Marleau"},{name:"Evgeni Nabokov"},
    {name:"Bill Guerin"},{name:"Vincent Damphousse"},{name:"Mike Ricci"},
    {name:"Rob Blake"},{name:"Darius Kasparaitis"},{name:"Bryan Rust"},
    {name:"Tomas Hertl"},{name:"Brent Burns"},{name:"Erik Karlsson"},
  ]},

  q_nhl_ducks_kings: { clue: "Name an NHL player who played for both the Ducks AND the Kings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Ducks" }, { fact_type: "played_for_team", fact_value: "Kings" }], answers: [
    {name:"Teemu Selanne"},{name:"Paul Kariya"},{name:"Scott Niedermayer"},
    {name:"Rob Blake"},{name:"Dustin Penner"},{name:"Corey Perry"},
    {name:"Ryan Getzlaf"},{name:"Jeff Carter"},{name:"Drew Doughty"},
    {name:"Jason Blake"},{name:"Trevor Lewis"},{name:"Kevin Bieksa"},
  ]},

  q_nhl_bruins_penguins: { clue: "Name an NHL player who played for both the Bruins AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Bruins" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Jaromir Jagr"},{name:"Phil Kessel"},{name:"Ron Francis"},
    {name:"Mark Recchi"},{name:"Bill Guerin"},{name:"Rick Middleton"},
    {name:"Glen Murray"},{name:"Joe Thornton"},{name:"Sergei Gonchar"},
    {name:"Patrice Bergeron"},{name:"Reilly Smith"},{name:"Darius Kasparaitis"},
  ]},

  q_nhl_oilers_kings: { clue: "Name an NHL player who played for both the Oilers AND the Kings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Oilers" }, { fact_type: "played_for_team", fact_value: "Kings" }], answers: [
    {name:"Wayne Gretzky"},{name:"Jari Kurri"},{name:"Paul Coffey"},
    {name:"Charlie Huddy"},{name:"Marty McSorley"},{name:"Mike Krushelnyski"},
    {name:"Luc Robitaille"},{name:"Teddy Purcell"},{name:"Jeff Petry"},
    {name:"Martin Gelinas"},{name:"Adam Oates"},{name:"Luke Schenn"},
  ]},

  q_nhl_cup_blackhawks: { clue: "Name an NHL player who won the Stanley Cup AND played for the Blackhawks", sport: "NHL", rules: [{ fact_type: "nhl_stanley_cup" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Jonathan Toews"},{name:"Patrick Kane"},{name:"Duncan Keith"},
    {name:"Brent Seabrook"},{name:"Marian Hossa"},{name:"Patrick Sharp"},
    {name:"Brandon Saad"},{name:"Corey Crawford"},{name:"Niklas Hjalmarsson"},
    {name:"Andrew Shaw"},{name:"Dustin Byfuglien"},{name:"Chris Chelios"},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_nhl_100pts_no_cup: { clue: "Name an NHL player who scored 100 or more points in a season AND never won the Stanley Cup", sport: "NHL", rules: [{ fact_type: "nhl_100_point_season" }, { fact_type: "nhl_never_won_cup" }], answers: [
    {name:"Marcel Dionne"},{name:"Mike Gartner"},{name:"Gilbert Perreault"},
    {name:"Dale Hawerchuk"},{name:"Peter Stastny"},{name:"Darryl Sittler"},
    {name:"Mike Rogers"},{name:"Blaine Stoughton"},{name:"Kent Nilsson"},
    {name:"Pat LaFontaine"},{name:"Mike Modano"},{name:"Adam Oates"},
    {name:"Pierre Turgeon"},{name:"Theo Fleury"},{name:"Pierre Larouche"},
    {name:"Bryan Trottier"},{name:"Stan Mikita"},{name:"Jean Ratelle"},
    {name:"Guy Chouinard"},{name:"Rick MacLeish"},
  ]},

  q_nhl_3cups_nonedmonton: { clue: "Name an NHL player who won 3 or more Stanley Cups AND none of them were with the Edmonton Oilers or Montreal Canadiens", sport: "NHL", rules: [{ fact_type: "nhl_3_plus_cups" }, { fact_type: "nhl_cups_not_oilers_canadiens" }], answers: [
    {name:"Ted Kennedy"},{name:"Tim Horton"},{name:"George Armstrong"},
    {name:"Red Kelly"},{name:"Bob Pulford"},{name:"Dave Keon"},
    {name:"Bryan Trottier"},{name:"Denis Potvin"},{name:"Billy Smith"},
    {name:"Mike Bossy"},{name:"Clark Gillies"},{name:"Bob Nystrom"},
    {name:"Stefan Persson"},{name:"Bob Lorimer"},{name:"John Tonelli"},
    {name:"Brent Sutter"},{name:"Patrick Roy"},{name:"Chris Chelios"},
    {name:"Mike Keane"},{name:"Claude Lemieux"},
  ]},

  q_nhl_100pts_foreign_born: { clue: "Name a foreign-born NHL player who recorded 100 or more points in a season AND was named league MVP at some point in their career", sport: "NHL", rules: [{ fact_type: "nhl_foreign_born" }, { fact_type: "nhl_100_point_season" }, { fact_type: "nhl_hart_trophy" }], answers: [
    {name:"Wayne Gretzky"},{name:"Mario Lemieux"},{name:"Jaromir Jagr"},
    {name:"Peter Forsberg"},{name:"Mark Messier"},{name:"Dominik Hasek"},
    {name:"Guy Lafleur"},{name:"Bobby Clarke"},{name:"Gordie Howe"},
    {name:"Jean Beliveau"},{name:"Phil Esposito"},{name:"Nathan MacKinnon"},
    {name:"Connor McDavid"},{name:"Sidney Crosby"},{name:"Evgeni Malkin"},
  ]},

  q_nhl_d_30goals_cup: { clue: "Name an NHL defenseman who scored 30 or more goals in a season AND won a Stanley Cup during their career", sport: "NHL", rules: [{ fact_type: "nhl_defenseman" }, { fact_type: "nhl_30_goal_season" }, { fact_type: "nhl_stanley_cup" }], answers: [
    {name:"Bobby Orr"},{name:"Paul Coffey"},{name:"Denis Potvin"},
    {name:"Doug Harvey"},{name:"Brad Park"},{name:"Phil Housley"},
    {name:"Al MacInnis"},{name:"Ray Bourque"},{name:"Chris Chelios"},
    {name:"Larry Murphy"},{name:"Doug Wilson"},{name:"Kevin Hatcher"},
    {name:"Scott Stevens"},{name:"Duncan Keith"},{name:"Victor Hedman"},
    {name:"Nicklas Lidstrom"},{name:"Sergei Gonchar"},{name:"Brian Leetch"},
  ]},

  q_nhl_canadiens_blackhawks: { clue: "Name an NHL player who played for both the Canadiens AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Canadiens" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Denis Savard"},{name:"Chris Chelios"},{name:"Doug Gilmour"},
    {name:"Jacques Plante"},{name:"Dickie Moore"},{name:"Pierre Pilote"},
    {name:"Brian Campbell"},{name:"Vincent Damphousse"},{name:"Max Pacioretty"},
    {name:"Tomas Fleischmann"},{name:"Andreas Martinsen"},{name:"Dale Tallon"},
  ]},

  q_nhl_blues_red_wings: { clue: "Name an NHL player who played for both the Blues AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blues" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Brett Hull"},{name:"Brendan Shanahan"},{name:"Chris Osgood"},
    {name:"Luc Robitaille"},{name:"Doug Weight"},{name:"Paul MacLean"},
    {name:"Adam Oates"},{name:"Jeff Brown"},{name:"David Backes"},
    {name:"Dino Ciccarelli"},{name:"Pat Verbeek"},{name:"Reed Low"},
  ]},

  q_nhl_flyers_penguins: { clue: "Name an NHL player who played for both the Flyers AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Mark Recchi"},{name:"Rick Tocchet"},{name:"Ron Francis"},
    {name:"Keith Primeau"},{name:"John LeClair"},{name:"Eric Lindros"},
    {name:"Mark Howe"},{name:"Simon Gagne"},{name:"Bill Barber"},
    {name:"Kevin Stevens"},{name:"Larry Murphy"},{name:"Kimmo Timonen"},
  ]},

  q_nhl_islanders_rangers: { clue: "Name an NHL player who played for both the Islanders AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Islanders" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Pat LaFontaine"},{name:"Pierre Turgeon"},{name:"Bryan Trottier"},
    {name:"Mathieu Schneider"},{name:"Mike Bossy"},{name:"Denis Potvin"},
    {name:"Clark Gillies"},{name:"Bob Nystrom"},{name:"Butch Goring"},
    {name:"Anders Lee"},{name:"Travis Zajac"},{name:"Ryan Strome"},
  ]},

  q_nhl_flames_oilers: { clue: "Name an NHL player who played for both the Flames AND the Oilers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flames" }, { fact_type: "played_for_team", fact_value: "Oilers" }], answers: [
    {name:"Grant Fuhr"},{name:"Theo Fleury"},{name:"Jarome Iginla"},
    {name:"Doug Weight"},{name:"Mike Vernon"},{name:"Craig Conroy"},
    {name:"Mark Giordano"},{name:"Alex Tanguay"},{name:"Olli Jokinen"},
    {name:"Devan Dubnyk"},{name:"Sam Bennett"},{name:"Milan Lucic"},
  ]},

  q_nhl_blues_blackhawks: { clue: "Name an NHL player who played for both the Blues AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blues" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Denis Savard"},{name:"Brett Hull"},{name:"Doug Wilson"},
    {name:"Chris Chelios"},{name:"Ed Belfour"},{name:"Patrick Sharp"},
    {name:"Doug Gilmour"},{name:"Jeremy Roenick"},{name:"Steve Larmer"},
    {name:"Troy Murray"},{name:"Brian Sutter"},{name:"Dale Tallon"},
  ]},

  q_nhl_red_wings_rangers: { clue: "Name an NHL player who played for both the Red Wings AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Brendan Shanahan"},{name:"Sergei Fedorov"},{name:"Igor Larionov"},
    {name:"Marian Hossa"},{name:"Dino Ciccarelli"},{name:"Pat Verbeek"},
    {name:"Luc Robitaille"},{name:"Brett Hull"},{name:"Alex Delvecchio"},
    {name:"Brad Richards"},{name:"Keith Yandle"},{name:"Marc Staal"},
  ]},

  q_nhl_maple_leafs_bruins: { clue: "Name an NHL player who played for both the Maple Leafs AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Maple Leafs" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Phil Kessel"},{name:"Mats Sundin"},{name:"Eddie Shack"},
    {name:"Borje Salming"},{name:"Wendel Clark"},{name:"Joe Thornton"},
    {name:"Tyler Seguin"},{name:"Tuukka Rask"},{name:"Tomas Kaberle"},
    {name:"Bryan McCabe"},{name:"Dave Andreychuk"},{name:"Tom Fergus"},
  ]},

  q_nhl_canucks_rangers: { clue: "Name an NHL player who played for both the Canucks AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Canucks" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Mark Messier"},{name:"Pavel Bure"},{name:"Todd Bertuzzi"},
    {name:"Dan Cloutier"},{name:"Roberto Luongo"},{name:"Ryan Kesler"},
    {name:"Henrik Sedin"},{name:"Daniel Sedin"},{name:"Kevin Bieksa"},
    {name:"Keith Ballard"},{name:"Markus Naslund"},{name:"Mats Sundin"},
  ]},

  q_nhl_jets_blackhawks: { clue: "Name an NHL player who played for both the Jets/Thrashers AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Jets" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Dustin Byfuglien"},{name:"Andrew Ladd"},{name:"Marian Hossa"},
    {name:"Bryan Little"},{name:"Tobias Enstrom"},{name:"Evander Kane"},
    {name:"Ondrej Pavelec"},{name:"Blake Wheeler"},{name:"Jim Slater"},
    {name:"Mark Scheifele"},{name:"Patrik Laine"},{name:"Kyle Connor"},
  ]},

  q_nhl_lightning_bruins: { clue: "Name an NHL player who played for both the Lightning AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Lightning" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Vincent Lecavalier"},{name:"Brad Richards"},{name:"Martin St. Louis"},
    {name:"Steven Stamkos"},{name:"Victor Hedman"},{name:"Ryan Callahan"},
    {name:"Brian Rolston"},{name:"Teddy Purcell"},{name:"Ryan Malone"},
    {name:"Dan Boyle"},{name:"Ruslan Fedotenko"},{name:"Ondrej Palat"},
  ]},

  q_nhl_penguins_flyers: { clue: "Name an NHL player who played for both the Penguins AND the Flyers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Penguins" }, { fact_type: "played_for_team", fact_value: "Flyers" }], answers: [
    {name:"Mark Recchi"},{name:"Rick Tocchet"},{name:"Ron Francis"},
    {name:"Keith Primeau"},{name:"Kevin Stevens"},{name:"Larry Murphy"},
    {name:"Eric Lindros"},{name:"John LeClair"},{name:"Mark Howe"},
    {name:"Simon Gagne"},{name:"Bill Barber"},{name:"Kimmo Timonen"},
  ]},

  q_nhl_hurricanes_penguins: { clue: "Name an NHL player who played for both the Hurricanes AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Hurricanes" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Ron Francis"},{name:"Rod Brind'Amour"},{name:"Jordan Staal"},
    {name:"Eric Staal"},{name:"Sergei Samsonov"},{name:"Mark Recchi"},
    {name:"Jeff Skinner"},{name:"Martin Gelinas"},{name:"Cory Stillman"},
    {name:"Matt Cullen"},{name:"Robert Lang"},{name:"Kevin Labanc"},
  ]},

  // ── NEW BATCH 2 — BEGINNER ────────────────────────────────────────────────
  q_nhl_rangers_bruins: { clue: "Name an NHL player who played for both the Rangers AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Rangers" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Phil Esposito"},{name:"Rick Middleton"},{name:"Brad Park"},
    {name:"Martin St. Louis"},{name:"Rick Nash"},{name:"Derek Stepan"},
    {name:"Kevin Hayes"},{name:"Glen Murray"},{name:"Reijo Ruotsalainen"},
    {name:"Mike Krushelnyski"},{name:"Dave Silk"},
  ]},
  q_nhl_red_wings_penguins: { clue: "Name an NHL player who played for both the Red Wings AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Sergei Fedorov"},{name:"Larry Murphy"},{name:"Dino Ciccarelli"},
    {name:"Petr Klima"},{name:"Jim Rutherford"},{name:"Tomas Holmstrom"},
    {name:"Danny Grant"},{name:"Brian Rafalski"},{name:"Alex Delvecchio"},
    {name:"Bob Errey"},{name:"Kevin Stevens"},
  ]},
  q_nhl_canadiens_rangers: { clue: "Name an NHL player who played for both the Canadiens AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Canadiens" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Guy Lafleur"},{name:"Jacques Plante"},{name:"Patrick Roy"},
    {name:"Max Pacioretty"},{name:"Frank Boucher"},{name:"Larry Robinson"},
    {name:"Stephane Richer"},{name:"Pierre Larouche"},{name:"John Ferguson"},
    {name:"Marcel Dionne"},{name:"Tomas Plekanec"},
  ]},
  q_nhl_blackhawks_rangers: { clue: "Name an NHL player who played for both the Blackhawks AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blackhawks" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Artemi Panarin"},{name:"Marian Hossa"},{name:"Brian Leetch"},
    {name:"Phil Esposito"},{name:"Brandon Saad"},{name:"Dominik Hasek"},
    {name:"Jaromir Jagr"},{name:"Patrick Sharp"},{name:"Vinnie Hinostroza"},
    {name:"Michal Rozsival"},
  ]},
  q_nhl_maple_leafs_red_wings: { clue: "Name an NHL player who played for both the Maple Leafs AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Maple Leafs" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Borje Salming"},{name:"Red Kelly"},{name:"Larry Murphy"},
    {name:"Mike Foligno"},{name:"Bob Nevin"},{name:"Wendel Clark"},
    {name:"Daniel Sprong"},{name:"Dominic Moore"},{name:"Mike Komisarek"},
    {name:"Terry Sawchuk"},
  ]},
  q_nhl_oilers_bruins: { clue: "Name an NHL player who played for both the Oilers AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Oilers" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Bill Ranford"},{name:"Dave Semenko"},{name:"Bill Guerin"},
    {name:"Marty McSorley"},{name:"Geoff Courtnall"},{name:"Dave Hunter"},
    {name:"Milan Lucic"},{name:"Dwayne Roloson"},{name:"Lee Fogolin"},
    {name:"Dave Lumley"},
  ]},
  q_nhl_capitals_rangers: { clue: "Name an NHL player who played for both the Capitals AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Capitals" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Mike Gartner"},{name:"Jaromir Jagr"},{name:"Martin Erat"},
    {name:"Anson Carter"},{name:"Jeff Halpern"},{name:"Glen Hanlon"},
    {name:"Nick Jensen"},{name:"Brendan Smith"},{name:"Kevin Shattenkirk"},
    {name:"Matt Niskanen"},
  ]},
  q_nhl_flyers_bruins: { clue: "Name an NHL player who played for both the Flyers AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Reggie Leach"},{name:"Terry O'Reilly"},{name:"Rick Tocchet"},
    {name:"Dave Poulin"},{name:"Brad McCrimmon"},{name:"Mike Knuble"},
    {name:"James van Riemsdyk"},{name:"Phil Kessel"},{name:"Nick Fotiu"},
    {name:"Mark Recchi"},
  ]},
  q_nhl_avalanche_bruins: { clue: "Name an NHL player who played for both the Avalanche AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Avalanche" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Ray Bourque"},{name:"Brian Rolston"},{name:"Cameron Hughes"},
    {name:"Brad Stuart"},{name:"Andre Burakovsky"},{name:"Riley Nash"},
    {name:"Dennis Seidenberg"},{name:"Curtis Leschyshyn"},{name:"Matt Hendricks"},
    {name:"Adam Deadmarsh"},
  ]},

  // ── NEW BATCH 2 — KNOWLEDGEABLE ───────────────────────────────────────────
  q_nhl_maple_leafs_kings: { clue: "Name an NHL player who played for both the Maple Leafs AND the Kings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Maple Leafs" }, { fact_type: "played_for_team", fact_value: "Kings" }], answers: [
    {name:"Mats Sundin"},{name:"Larry Murphy"},{name:"Aki Berg"},
    {name:"Nik Antropov"},{name:"Kyle Clifford"},{name:"Jake Muzzin"},
    {name:"Tomas Kaberle"},{name:"Kris King"},{name:"Carl Grundstrom"},
    {name:"Pierre Engvall"},
  ]},
  q_nhl_blues_penguins: { clue: "Name an NHL player who played for both the Blues AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blues" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Paul Coffey"},{name:"Adam Oates"},{name:"Doug Weight"},
    {name:"Rob Brind'Amour"},{name:"Peter Stastny"},{name:"Scott Young"},
    {name:"Jason Demers"},{name:"Patric Hornqvist"},{name:"Ryan Reaves"},
    {name:"Brayden Schenn"},
  ]},
  q_nhl_red_wings_bruins: { clue: "Name an NHL player who played for both the Red Wings AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Brett Hull"},{name:"Brian Rafalski"},{name:"Mark Recchi"},
    {name:"Adam Oates"},{name:"Frank Brimsek"},{name:"Reggie Lemelin"},
    {name:"Ted Lindsay"},{name:"David Pastrnak"},{name:"Robert Lang"},
    {name:"Dennis Seidenberg"},
  ]},
  q_nhl_canadiens_red_wings: { clue: "Name an NHL player who played for both the Canadiens AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Canadiens" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Igor Larionov"},{name:"Chris Chelios"},{name:"Larry Robinson"},
    {name:"Dominik Hasek"},{name:"Petr Klima"},{name:"Robert Lang"},
    {name:"Tomas Holmstrom"},{name:"Steve Duchesne"},{name:"Todd Bertuzzi"},
    {name:"Mike Ribeiro"},
  ]},
  q_nhl_flyers_red_wings: { clue: "Name an NHL player who played for both the Flyers AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Sergei Fedorov"},{name:"Bob Probert"},{name:"Rick Tocchet"},
    {name:"Dave Poulin"},{name:"Mark Howe"},{name:"Danny Gare"},
    {name:"Danny Briere"},{name:"Jiri Fischer"},{name:"Vaclav Nedomansky"},
    {name:"Brad McCrimmon"},
  ]},
  q_nhl_blackhawks_penguins: { clue: "Name an NHL player who played for both the Blackhawks AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Blackhawks" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Jaromir Jagr"},{name:"Marian Hossa"},{name:"Phil Kessel"},
    {name:"Dominik Hasek"},{name:"Brandon Saad"},{name:"Patrick Sharp"},
    {name:"Michal Rozsival"},{name:"Bryan Bickell"},{name:"Jocelyn Thibault"},
    {name:"Craig Adams"},
  ]},
  q_nhl_norris_bruins: { clue: "Name an NHL player who won the Norris Trophy AND played for the Bruins", sport: "NHL", rules: [{ fact_type: "won_award", fact_value: "Norris Trophy" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Bobby Orr"},{name:"Ray Bourque"},{name:"Zdeno Chara"},
    {name:"Brad Park"},{name:"Eddie Shore"},{name:"Pierre Pilote"},
    {name:"Dit Clapper"},{name:"Charlie McAvoy"},
  ]},
  q_nhl_hart_red_wings: { clue: "Name an NHL player who won the Hart Trophy AND played for the Red Wings", sport: "NHL", rules: [{ fact_type: "won_award", fact_value: "Hart Trophy" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Gordie Howe"},{name:"Sergei Fedorov"},{name:"Ted Lindsay"},
    {name:"Sid Abel"},{name:"Dominik Hasek"},{name:"Chris Chelios"},
    {name:"Brett Hull"},{name:"Mark Howe"},
  ]},

  // ── NEW BATCH 2 — EXPERT ─────────────────────────────────────────────────
  q_nhl_sabres_red_wings: { clue: "Name an NHL player who played for both the Sabres AND the Red Wings", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Sabres" }, { fact_type: "played_for_team", fact_value: "Red Wings" }], answers: [
    {name:"Danny Gare"},{name:"Dale Hawerchuk"},{name:"Dominik Hasek"},
    {name:"Vyacheslav Kozlov"},{name:"Brad May"},{name:"Derek Roy"},
    {name:"Ville Leino"},{name:"Tyler Bertuzzi"},{name:"Henrik Tallinder"},
    {name:"Jhonas Enroth"},
  ]},
  q_nhl_oilers_penguins: { clue: "Name an NHL player who played for both the Oilers AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Oilers" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Paul Coffey"},{name:"Charlie Huddy"},{name:"Kevin Lowe"},
    {name:"Petr Klima"},{name:"Craig Simpson"},{name:"Jeff Beukeboom"},
    {name:"Kevin McClelland"},{name:"Craig MacTavish"},{name:"Dave Hunter"},
    {name:"Jari Kurri"},
  ]},
  q_nhl_stars_blackhawks: { clue: "Name an NHL player who played for both the Stars AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Stars" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Patrick Sharp"},{name:"Marian Hossa"},{name:"Ed Belfour"},
    {name:"Tyler Seguin"},{name:"Jamie Benn"},{name:"Jere Lehtinen"},
    {name:"Steve Ott"},{name:"Brenden Morrow"},{name:"Brian Campbell"},
    {name:"Stephane Robidas"},
  ]},
  q_nhl_flyers_canadiens: { clue: "Name an NHL player who played for both the Flyers AND the Canadiens", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flyers" }, { fact_type: "played_for_team", fact_value: "Canadiens" }], answers: [
    {name:"John LeClair"},{name:"Eric Desjardins"},{name:"Mark Recchi"},
    {name:"Danny Briere"},{name:"Rod Brind'Amour"},{name:"Gilbert Dionne"},
    {name:"Petr Svoboda"},{name:"Chris Chelios"},{name:"Sean Couturier"},
    {name:"Claude Lemieux"},
  ]},
  q_nhl_lightning_penguins: { clue: "Name an NHL player who played for both the Lightning AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Lightning" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Martin St. Louis"},{name:"Darius Kasparaitis"},{name:"Ryan Malone"},
    {name:"Matt Cooke"},{name:"Jason Garrison"},{name:"Jan Hrdina"},
    {name:"Brian Holzinger"},{name:"Alex Killorn"},{name:"Tyler Johnson"},
    {name:"Brayden Point"},
  ]},
  q_nhl_avalanche_rangers: { clue: "Name an NHL player who played for both the Avalanche AND the Rangers", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Avalanche" }, { fact_type: "played_for_team", fact_value: "Rangers" }], answers: [
    {name:"Joe Sakic"},{name:"Chris Drury"},{name:"Theo Fleury"},
    {name:"Adam Deadmarsh"},{name:"Brandon Saad"},{name:"Joey MacDonald"},
    {name:"Matthew Barnaby"},{name:"Steve Valiquette"},{name:"Dale Purinton"},
    {name:"Scott Gomez"},
  ]},
  q_nhl_red_wings_capitals: { clue: "Name an NHL player who played for both the Red Wings AND the Capitals", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Red Wings" }, { fact_type: "played_for_team", fact_value: "Capitals" }], answers: [
    {name:"Sergei Fedorov"},{name:"Robert Lang"},{name:"Mike Green"},
    {name:"Todd Bertuzzi"},{name:"Calle Johansson"},{name:"Kevin Miller"},
    {name:"Dmitri Mironov"},{name:"Pat Peake"},{name:"Matt Niskanen"},
    {name:"Kevin Hatcher"},
  ]},
  q_nhl_devils_penguins: { clue: "Name an NHL player who played for both the Devils AND the Penguins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Devils" }, { fact_type: "played_for_team", fact_value: "Penguins" }], answers: [
    {name:"Petr Sykora"},{name:"Brian Rafalski"},{name:"Bobby Holik"},
    {name:"Darius Kasparaitis"},{name:"Bill Guerin"},{name:"Jason Arnott"},
    {name:"Sergei Brylin"},{name:"Patrik Elias"},{name:"Jamie Langenbrunner"},
    {name:"Matt Cullen"},
  ]},
  q_nhl_senators_bruins: { clue: "Name an NHL player who played for both the Senators AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Senators" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Zdeno Chara"},{name:"Jason Spezza"},{name:"Brad Marsh"},
    {name:"Shean Donovan"},{name:"Brian McGrattan"},{name:"Chris Kelly"},
    {name:"Mike Fisher"},{name:"Antoine Vermette"},{name:"Nick Foligno"},
    {name:"Mark Borowiecki"},
  ]},
  q_nhl_kings_blackhawks: { clue: "Name an NHL player who played for both the Kings AND the Blackhawks", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Kings" }, { fact_type: "played_for_team", fact_value: "Blackhawks" }], answers: [
    {name:"Denis Savard"},{name:"Marcel Dionne"},{name:"Dustin Brown"},
    {name:"Jeff Carter"},{name:"Rob Blake"},{name:"Bob Pulford"},
    {name:"Troy Murray"},{name:"Michal Handzus"},{name:"Olli Jokinen"},
    {name:"Jim Pappin"},
  ]},
  q_nhl_sharks_bruins: { clue: "Name an NHL player who played for both the Sharks AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Sharks" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Joe Thornton"},{name:"Marco Sturm"},{name:"Kyle McLaren"},
    {name:"Jeff Odgers"},{name:"Brad Stuart"},{name:"Brian Boucher"},
    {name:"Nolan Schenn"},{name:"Martin Jones"},{name:"Jeff Hackett"},
    {name:"Glen Murray"},
  ]},
  q_nhl_flames_bruins: { clue: "Name an NHL player who played for both the Flames AND the Bruins", sport: "NHL", rules: [{ fact_type: "played_for_team", fact_value: "Flames" }, { fact_type: "played_for_team", fact_value: "Bruins" }], answers: [
    {name:"Jarome Iginla"},{name:"Joe Nieuwendyk"},{name:"Phil Esposito"},
    {name:"Reggie Lemelin"},{name:"Guy Chouinard"},{name:"Brad McCrimmon"},
    {name:"Eric Nystrom"},{name:"Michael Cammalleri"},{name:"Andrew Ference"},
    {name:"Mark Giordano"},
  ]},
  q_nhl_cup_blues: { clue: "Name an NHL player who won the Stanley Cup AND played for the Blues", sport: "NHL", rules: [{ fact_type: "won_award", fact_value: "Stanley Cup" }, { fact_type: "played_for_team", fact_value: "Blues" }], answers: [
    {name:"Brett Hull"},{name:"Brendan Shanahan"},{name:"Doug Weight"},
    {name:"Adam Oates"},{name:"Scott Stevens"},{name:"Ryan O'Reilly"},
    {name:"Alex Pietrangelo"},{name:"David Perron"},{name:"Vladimir Tarasenko"},
    {name:"Jordan Binnington"},{name:"Pat Maroon"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NHL_BEGINNER = [
  "q_nhl_cup_300goals","q_nhl_hart_canadian",
  "q_nhl_50goals_cup","q_nhl_d_norris_cup",
  "q_nhl_500g_foreign","q_nhl_goalie_cup_vezina",
  "q_nhl_oilers_rangers","q_nhl_penguins_capitals","q_nhl_canadiens_bruins",
  "q_nhl_blackhawks_red_wings","q_nhl_maple_leafs_canadiens","q_nhl_flyers_rangers",
  "q_nhl_red_wings_avalanche","q_nhl_bruins_blackhawks","q_nhl_kings_rangers",
  "q_nhl_penguins_bruins","q_nhl_devils_rangers","q_nhl_red_wings_maple_leafs",
  "q_nhl_cup_penguins","q_nhl_allstar_oilers","q_nhl_oilers_canucks",
  "q_nhl_rangers_bruins","q_nhl_red_wings_penguins","q_nhl_canadiens_rangers",
  "q_nhl_blackhawks_rangers","q_nhl_maple_leafs_red_wings","q_nhl_oilers_bruins",
  "q_nhl_capitals_rangers","q_nhl_flyers_bruins",
  "q_nhl_avalanche_bruins",
];

export const NHL_KNOWLEDGEABLE = [
  "q_nhl_1000pts_cup","q_nhl_captain_cup_twice","q_nhl_playoff_pts_100",
  "q_nhl_cup_3plus_different_teams","q_nhl_100pts_d_season","q_nhl_50goals_allstar",
  "q_nhl_goalie_3cups","q_nhl_russian_cup",
  "q_nhl_blackhawks_blues","q_nhl_kings_penguins","q_nhl_avalanche_red_wings",
  "q_nhl_capitals_penguins","q_nhl_bruins_canadiens","q_nhl_sabres_bruins",
  "q_nhl_senators_maple_leafs","q_nhl_flyers_blackhawks","q_nhl_stars_penguins",
  "q_nhl_sharks_penguins","q_nhl_ducks_kings","q_nhl_bruins_penguins",
  "q_nhl_oilers_kings","q_nhl_cup_blackhawks",
  "q_nhl_maple_leafs_kings","q_nhl_blues_penguins","q_nhl_red_wings_bruins",
  "q_nhl_canadiens_red_wings","q_nhl_flyers_red_wings","q_nhl_blackhawks_penguins",
  "q_nhl_norris_bruins","q_nhl_hart_red_wings",
];

export const NHL_EXPERT = [
  "q_nhl_100pts_no_cup","q_nhl_3cups_nonedmonton",
  "q_nhl_100pts_foreign_born","q_nhl_d_30goals_cup",
  "q_nhl_canadiens_blackhawks","q_nhl_blues_red_wings","q_nhl_flyers_penguins",
  "q_nhl_islanders_rangers","q_nhl_flames_oilers","q_nhl_blues_blackhawks",
  "q_nhl_red_wings_rangers","q_nhl_maple_leafs_bruins","q_nhl_canucks_rangers",
  "q_nhl_jets_blackhawks","q_nhl_lightning_bruins","q_nhl_penguins_flyers",
  "q_nhl_hurricanes_penguins",
  "q_nhl_sabres_red_wings","q_nhl_oilers_penguins","q_nhl_stars_blackhawks",
  "q_nhl_flyers_canadiens","q_nhl_lightning_penguins","q_nhl_avalanche_rangers",
  "q_nhl_red_wings_capitals","q_nhl_devils_penguins","q_nhl_senators_bruins",
  "q_nhl_kings_blackhawks","q_nhl_sharks_bruins","q_nhl_flames_bruins",
  "q_nhl_cup_blues",
];
