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

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NHL_BEGINNER = [
  "q_nhl_cup_300goals","q_nhl_hart_canadian",
  "q_nhl_50goals_cup","q_nhl_d_norris_cup",
  "q_nhl_500g_foreign","q_nhl_goalie_cup_vezina",
];

export const NHL_KNOWLEDGEABLE = [
  "q_nhl_1000pts_cup","q_nhl_captain_cup_twice","q_nhl_playoff_pts_100",
  "q_nhl_cup_3plus_different_teams","q_nhl_100pts_d_season","q_nhl_50goals_allstar",
  "q_nhl_goalie_3cups","q_nhl_russian_cup",
];

export const NHL_EXPERT = [
  "q_nhl_100pts_no_cup","q_nhl_3cups_nonedmonton",
  "q_nhl_100pts_foreign_born","q_nhl_d_30goals_cup",
];
