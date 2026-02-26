// ─── NBA QUESTIONS ────────────────────────────────────────────────────────────
// rarity = % of players likely to give this answer (lower = rarer = wins the square)

export const NBA_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_nba_champ: { clue: "Name an NBA player who won 5 or more championships", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:72},{name:"Magic Johnson",rarity:58},{name:"Kareem Abdul-Jabbar",rarity:45},
    {name:"LeBron James",rarity:38},{name:"Kobe Bryant",rarity:35},{name:"Scottie Pippen",rarity:28},
    {name:"Bill Russell",rarity:22},{name:"Robert Horry",rarity:14},{name:"John Havlicek",rarity:9},
    {name:"Ron Harper",rarity:8},{name:"John Salley",rarity:5},{name:"Sam Jones",rarity:4},
  ]},

  q_nba_50pts: { clue: "Name an NBA player who scored 50+ points in a game multiple times", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:65},{name:"Michael Jordan",rarity:55},{name:"Kobe Bryant",rarity:50},
    {name:"LeBron James",rarity:18},{name:"Elgin Baylor",rarity:20},{name:"Rick Barry",rarity:12},
    {name:"Kevin Durant",rarity:15},{name:"James Harden",rarity:14},{name:"Damian Lillard",rarity:8},
    {name:"Devin Booker",rarity:7},{name:"David Thompson",rarity:5},
  ]},

  q_nba_mvp_multiple: { clue: "Name an NBA player who won 3 or more regular season MVP awards", sport: "NBA", answers: [
    {name:"Kareem Abdul-Jabbar",rarity:60},{name:"Michael Jordan",rarity:72},{name:"LeBron James",rarity:68},
    {name:"Bill Russell",rarity:28},{name:"Wilt Chamberlain",rarity:42},{name:"Moses Malone",rarity:22},
    {name:"Larry Bird",rarity:38},{name:"Magic Johnson",rarity:35},
  ]},

  q_nba_points_20k: { clue: "Name an NBA player who scored 25,000 or more career points", sport: "NBA", answers: [
    {name:"LeBron James",rarity:82},{name:"Kareem Abdul-Jabbar",rarity:70},{name:"Karl Malone",rarity:55},
    {name:"Kobe Bryant",rarity:75},{name:"Michael Jordan",rarity:78},{name:"Dirk Nowitzki",rarity:55},
    {name:"Wilt Chamberlain",rarity:60},{name:"Shaquille O'Neal",rarity:62},{name:"Moses Malone",rarity:28},
    {name:"Elvin Hayes",rarity:20},{name:"Hakeem Olajuwon",rarity:38},{name:"Oscar Robertson",rarity:30},
    {name:"Dominique Wilkins",rarity:22},{name:"Tim Duncan",rarity:42},{name:"Kevin Durant",rarity:50},
    {name:"Paul Pierce",rarity:25},{name:"Reggie Miller",rarity:22},{name:"Patrick Ewing",rarity:30},
  ]},

  q_nba_all_time_scoring: { clue: "Name a player in the NBA all-time top 10 career scoring list", sport: "NBA", answers: [
    {name:"LeBron James",rarity:88},{name:"Kareem Abdul-Jabbar",rarity:80},{name:"Karl Malone",rarity:68},
    {name:"Kobe Bryant",rarity:82},{name:"Michael Jordan",rarity:85},{name:"Dirk Nowitzki",rarity:62},
    {name:"Wilt Chamberlain",rarity:65},{name:"Shaquille O'Neal",rarity:72},{name:"Moses Malone",rarity:40},
    {name:"Elvin Hayes",rarity:28},{name:"Kevin Durant",rarity:55},
  ]},

  q_nba_lakers_champ: { clue: "Name a player who won an NBA championship with the Los Angeles Lakers", sport: "NBA", answers: [
    {name:"Magic Johnson",rarity:82},{name:"Kareem Abdul-Jabbar",rarity:75},{name:"Kobe Bryant",rarity:90},
    {name:"Shaquille O'Neal",rarity:85},{name:"LeBron James",rarity:72},{name:"James Worthy",rarity:48},
    {name:"Anthony Davis",rarity:58},{name:"Derek Fisher",rarity:32},{name:"Pau Gasol",rarity:48},
    {name:"Lamar Odom",rarity:30},{name:"Robert Horry",rarity:22},{name:"AC Green",rarity:18},
    {name:"Byron Scott",rarity:16},{name:"Michael Cooper",rarity:14},{name:"Norm Nixon",rarity:8},
    {name:"Kurt Rambis",rarity:6},{name:"Jamaal Wilkes",rarity:10},{name:"Rajon Rondo",rarity:18},
    {name:"Alex Caruso",rarity:12},{name:"Kyle Kuzma",rarity:15},{name:"Dwight Howard",rarity:20},
    {name:"Danny Green",rarity:14},{name:"Mychal Thompson",rarity:8},{name:"Bob McAdoo",rarity:8},
  ]},

  q_nba_bulls_champ: { clue: "Name a player who won an NBA championship with the Chicago Bulls", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:95},{name:"Scottie Pippen",rarity:82},{name:"Dennis Rodman",rarity:68},
    {name:"Steve Kerr",rarity:48},{name:"Toni Kukoc",rarity:38},{name:"Horace Grant",rarity:32},
    {name:"John Paxson",rarity:26},{name:"Bill Cartwright",rarity:16},{name:"BJ Armstrong",rarity:18},
    {name:"Luc Longley",rarity:14},{name:"Ron Harper",rarity:22},{name:"Will Perdue",rarity:5},
    {name:"Jud Buechler",rarity:4},{name:"Craig Hodges",rarity:6},{name:"Scott Williams",rarity:5},
    {name:"Stacey King",rarity:4},
  ]},

  q_nba_heat_champ: { clue: "Name a player who won an NBA championship with the Miami Heat", sport: "NBA", answers: [
    {name:"Dwyane Wade",rarity:88},{name:"LeBron James",rarity:78},{name:"Chris Bosh",rarity:65},
    {name:"Shaquille O'Neal",rarity:62},{name:"Ray Allen",rarity:50},{name:"Alonzo Mourning",rarity:38},
    {name:"Gary Payton",rarity:32},{name:"Udonis Haslem",rarity:25},{name:"Shane Battier",rarity:18},
    {name:"Mario Chalmers",rarity:22},{name:"Antoine Walker",rarity:15},{name:"James Posey",rarity:12},
    {name:"Jason Williams",rarity:10},{name:"Chris Andersen",rarity:8},{name:"Mike Miller",rarity:12},
    {name:"Joel Anthony",rarity:5},{name:"Damon Jones",rarity:6},
  ]},

  q_nba_mvp_and_champ: { clue: "Name an NBA player who won both the regular season MVP award AND an NBA championship during their career", sport: "NBA", answers: [
    {name:"LeBron James",rarity:88},{name:"Michael Jordan",rarity:90},{name:"Magic Johnson",rarity:80},
    {name:"Larry Bird",rarity:75},{name:"Kareem Abdul-Jabbar",rarity:72},{name:"Shaquille O'Neal",rarity:68},
    {name:"Tim Duncan",rarity:58},{name:"Moses Malone",rarity:45},{name:"Hakeem Olajuwon",rarity:48},
    {name:"Dirk Nowitzki",rarity:55},{name:"Stephen Curry",rarity:62},{name:"Bill Russell",rarity:40},
    {name:"Giannis Antetokounmpo",rarity:52},{name:"Nikola Jokic",rarity:42},{name:"Bob Pettit",rarity:20},
    {name:"Willis Reed",rarity:22},{name:"Dave Cowens",rarity:15},
  ]},

  q_nba_warriors_champ: { clue: "Name a player who won an NBA championship with the Golden State Warriors (2015–2022)", sport: "NBA", answers: [
    {name:"Stephen Curry",rarity:92},{name:"Kevin Durant",rarity:80},{name:"Klay Thompson",rarity:82},
    {name:"Draymond Green",rarity:78},{name:"Andre Iguodala",rarity:55},{name:"Andrew Wiggins",rarity:38},
    {name:"Jordan Poole",rarity:25},{name:"Kevon Looney",rarity:20},{name:"Harrison Barnes",rarity:30},
    {name:"Andrew Bogut",rarity:22},{name:"Shaun Livingston",rarity:28},{name:"Gary Payton II",rarity:18},
    {name:"Leandro Barbosa",rarity:10},{name:"Festus Ezeli",rarity:8},{name:"Otto Porter Jr",rarity:12},
    {name:"Juan Toscano-Anderson",rarity:6},{name:"Moses Moody",rarity:8},{name:"Jonathan Kuminga",rarity:10},
    {name:"Donte DiVincenzo",rarity:12},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_nba_scoring: { clue: "Name an NBA player who won the scoring title 3 or more times", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:70},{name:"Wilt Chamberlain",rarity:55},{name:"Allen Iverson",rarity:30},
    {name:"Kevin Durant",rarity:25},{name:"James Harden",rarity:20},{name:"George Gervin",rarity:20},
    {name:"Bob McAdoo",rarity:10},{name:"Neil Johnston",rarity:4},
  ]},

  q_nba_rebounds_10k: { clue: "Name an NBA player with 10,000 or more career rebounds", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:62},{name:"Bill Russell",rarity:55},{name:"Kareem Abdul-Jabbar",rarity:48},
    {name:"Elvin Hayes",rarity:22},{name:"Moses Malone",rarity:25},{name:"Tim Duncan",rarity:40},
    {name:"Karl Malone",rarity:35},{name:"Robert Parish",rarity:18},{name:"Nate Thurmond",rarity:12},
    {name:"Walt Bellamy",rarity:8},{name:"Kevin Garnett",rarity:38},{name:"Dwight Howard",rarity:32},
    {name:"Shaquille O'Neal",rarity:42},{name:"Dennis Rodman",rarity:30},{name:"Buck Williams",rarity:8},
  ]},

  q_nba_career_assists: { clue: "Name an NBA player among the all-time top 5 career assists leaders", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:55},{name:"Steve Nash",rarity:45},
    {name:"Mark Jackson",rarity:22},{name:"Magic Johnson",rarity:60},
  ]},

  q_nba_assists: { clue: "Name an NBA player who averaged 10 or more assists per game for a full season", sport: "NBA", answers: [
    {name:"Magic Johnson",rarity:60},{name:"John Stockton",rarity:55},{name:"Isiah Thomas",rarity:35},
    {name:"Chris Paul",rarity:30},{name:"Jason Kidd",rarity:25},{name:"Kevin Porter",rarity:10},
    {name:"Guy Rodgers",rarity:4},{name:"Norm Nixon",rarity:6},{name:"Kevin Johnson",rarity:8},
    {name:"Tim Hardaway",rarity:7},{name:"Mark Jackson",rarity:12},
  ]},

  q_nba_steals_2k: { clue: "Name an NBA player with 2,000 or more career steals", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:50},{name:"Michael Jordan",rarity:58},
    {name:"Gary Payton",rarity:35},{name:"Maurice Cheeks",rarity:18},{name:"Chris Paul",rarity:30},
    {name:"Scottie Pippen",rarity:25},{name:"Alvin Robertson",rarity:8},{name:"Karl Malone",rarity:15},
    {name:"Mookie Blaylock",rarity:6},
  ]},

  q_nba_triple_doubles50: { clue: "Name an NBA player with 50 or more career triple-doubles", sport: "NBA", answers: [
    {name:"Russell Westbrook",rarity:72},{name:"Magic Johnson",rarity:60},{name:"Jason Kidd",rarity:42},
    {name:"LeBron James",rarity:55},{name:"Oscar Robertson",rarity:35},{name:"Rajon Rondo",rarity:20},
    {name:"Draymond Green",rarity:18},{name:"Fat Lever",rarity:6},{name:"Wilt Chamberlain",rarity:22},
    {name:"Nikola Jokic",rarity:38},{name:"James Harden",rarity:25},
  ]},

  q_nba_spurs_champ: { clue: "Name a player who won an NBA championship with the San Antonio Spurs", sport: "NBA", answers: [
    {name:"Tim Duncan",rarity:88},{name:"Tony Parker",rarity:75},{name:"Manu Ginobili",rarity:70},
    {name:"David Robinson",rarity:60},{name:"Kawhi Leonard",rarity:55},{name:"Robert Horry",rarity:28},
    {name:"Avery Johnson",rarity:30},{name:"Sean Elliott",rarity:22},{name:"Steve Kerr",rarity:38},
    {name:"Bruce Bowen",rarity:22},{name:"Danny Green",rarity:28},{name:"Boris Diaw",rarity:22},
    {name:"Patty Mills",rarity:18},{name:"Marco Belinelli",rarity:15},{name:"Tiago Splitter",rarity:10},
    {name:"Mario Elie",rarity:15},{name:"Stephen Jackson",rarity:18},{name:"Michael Finley",rarity:14},
  ]},

  q_nba_celtics_champ: { clue: "Name a player who won an NBA championship with the Boston Celtics since 2000", sport: "NBA", answers: [
    {name:"Kevin Garnett",rarity:75},{name:"Paul Pierce",rarity:72},{name:"Ray Allen",rarity:68},
    {name:"Rajon Rondo",rarity:52},{name:"Jayson Tatum",rarity:58},{name:"Jaylen Brown",rarity:55},
    {name:"Jrue Holiday",rarity:35},{name:"Al Horford",rarity:28},{name:"Marcus Smart",rarity:32},
    {name:"Derrick White",rarity:22},{name:"Robert Williams III",rarity:18},{name:"Kristaps Porzingis",rarity:25},
    {name:"Sam Hauser",rarity:10},{name:"Payton Pritchard",rarity:12},{name:"Leon Powe",rarity:8},
    {name:"Glen Davis",rarity:8},{name:"Kendrick Perkins",rarity:15},{name:"Tony Allen",rarity:12},
    {name:"P.J. Brown",rarity:5},{name:"Eddie House",rarity:6},
  ]},

  q_nba_first_pick: { clue: "Name a player who was selected #1 overall in the NBA Draft", sport: "NBA", answers: [
    {name:"LeBron James",rarity:88},{name:"Anthony Davis",rarity:72},{name:"Shaquille O'Neal",rarity:82},
    {name:"Tim Duncan",rarity:75},{name:"Allen Iverson",rarity:70},{name:"Patrick Ewing",rarity:65},
    {name:"Hakeem Olajuwon",rarity:68},{name:"Kyrie Irving",rarity:60},{name:"Zion Williamson",rarity:52},
    {name:"Derrick Rose",rarity:50},{name:"Blake Griffin",rarity:58},{name:"John Wall",rarity:48},
    {name:"Andrea Bargnani",rarity:28},{name:"Greg Oden",rarity:32},{name:"Kwame Brown",rarity:38},
    {name:"Kenyon Martin",rarity:16},{name:"Elton Brand",rarity:18},{name:"Chris Webber",rarity:40},
    {name:"Larry Johnson",rarity:26},{name:"Magic Johnson",rarity:78},{name:"David Robinson",rarity:58},
  ]},

  q_nba_30ppg_season: { clue: "Name an NBA player who averaged 30+ points per game in a regular season", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:75},{name:"Michael Jordan",rarity:80},{name:"Kobe Bryant",rarity:55},
    {name:"LeBron James",rarity:38},{name:"James Harden",rarity:48},{name:"Kevin Durant",rarity:42},
    {name:"Rick Barry",rarity:30},{name:"Elgin Baylor",rarity:40},{name:"Oscar Robertson",rarity:35},
    {name:"Pete Maravich",rarity:28},{name:"Allen Iverson",rarity:38},{name:"Dirk Nowitzki",rarity:22},
    {name:"Tracy McGrady",rarity:25},{name:"George Gervin",rarity:24},{name:"David Thompson",rarity:12},
    {name:"Bob McAdoo",rarity:15},{name:"Dominique Wilkins",rarity:18},{name:"Dwyane Wade",rarity:20},
    {name:"Joel Embiid",rarity:22},{name:"Giannis Antetokounmpo",rarity:18},
  ]},

  q_nba_steals_career: { clue: "Name an NBA player among the all-time top 5 career steals leaders", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:52},{name:"Michael Jordan",rarity:58},
    {name:"Gary Payton",rarity:35},{name:"Maurice Cheeks",rarity:18},
  ]},

  q_nba_finals_mvp_notable: { clue: "Name an NBA Finals MVP who played for the team that lost the series", sport: "NBA", answers: [
    {name:"Jerry West",rarity:35},{name:"Chauncey Billups",rarity:45},{name:"Andre Iguodala",rarity:40},
    {name:"Kawhi Leonard",rarity:50},{name:"Giannis Antetokounmpo",rarity:42},{name:"Tony Parker",rarity:35},
    {name:"Dirk Nowitzki",rarity:48},{name:"Dwyane Wade",rarity:52},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_nba_bust: { clue: "Name an NBA player drafted top-5 overall who never made an All-Star game", sport: "NBA", answers: [
    {name:"Kwame Brown",rarity:40},{name:"Anthony Bennett",rarity:35},{name:"Michael Olowokandi",rarity:22},
    {name:"Andrea Bargnani",rarity:20},{name:"Hasheem Thabeet",rarity:18},{name:"Adam Morrison",rarity:12},
    {name:"Marvin Williams",rarity:10},{name:"Olden Polynice",rarity:5},{name:"Jonathan Bender",rarity:4},
    {name:"Pervis Ellison",rarity:3},{name:"Joe Smith",rarity:8},{name:"Stromile Swift",rarity:4},
  ]},

  q_nba_dpoy: { clue: "Name an NBA player who won Defensive Player of the Year 3 or more times", sport: "NBA", answers: [
    {name:"Dikembe Mutombo",rarity:50},{name:"Dwight Howard",rarity:45},{name:"Ben Wallace",rarity:40},
    {name:"Rudy Gobert",rarity:35},{name:"Mark Eaton",rarity:15},{name:"Sidney Moncrief",rarity:10},
    {name:"Alonzo Mourning",rarity:18},
  ]},

  q_nba_60pts: { clue: "Name an NBA player who scored 60 or more points in a single game (post-1975)", sport: "NBA", answers: [
    {name:"Kobe Bryant",rarity:72},{name:"Devin Booker",rarity:30},{name:"David Thompson",rarity:10},
    {name:"David Robinson",rarity:20},{name:"Michael Jordan",rarity:55},{name:"James Harden",rarity:25},
    {name:"LeBron James",rarity:22},{name:"Donovan Mitchell",rarity:15},{name:"Luka Doncic",rarity:18},
    {name:"Giannis Antetokounmpo",rarity:12},{name:"Damian Lillard",rarity:14},{name:"Carmelo Anthony",rarity:20},
    {name:"Karl-Anthony Towns",rarity:8},{name:"Kemba Walker",rarity:10},
  ]},

  q_nba_score_rebound: { clue: "Name an NBA player who led the league in both scoring AND rebounding in the same season", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:75},{name:"Bob Pettit",rarity:20},{name:"Neil Johnston",rarity:8},
    {name:"Kevin Garnett",rarity:15},{name:"Giannis Antetokounmpo",rarity:12},
  ]},

  q_nba_triple_double_season: { clue: "Name an NBA player who averaged a triple-double for an entire season", sport: "NBA", answers: [
    {name:"Russell Westbrook",rarity:72},{name:"Oscar Robertson",rarity:40},{name:"Nikola Jokic",rarity:30},
    {name:"LeBron James",rarity:12},
  ]},

  q_nba_undrafted_star: { clue: "Name an NBA player who went undrafted but was named to at least 3 All-Star teams", sport: "NBA", answers: [
    {name:"Ben Wallace",rarity:62},{name:"Brad Miller",rarity:10},{name:"Udonis Haslem",rarity:8},
    {name:"Fred VanVleet",rarity:15},{name:"Jose Calderon",rarity:6},
  ]},

  q_nba_oldest_youngest: { clue: "Name an NBA player who was selected to the All-Star game at age 19 or younger", sport: "NBA", answers: [
    {name:"LeBron James",rarity:70},{name:"Kobe Bryant",rarity:65},{name:"Kevin Garnett",rarity:35},
    {name:"Dwight Howard",rarity:28},{name:"Jermaine O'Neal",rarity:10},{name:"Zion Williamson",rarity:20},
    {name:"Luka Doncic",rarity:15},
  ]},

  q_nba_block_leaders: { clue: "Name an NBA player among the all-time top 5 career blocks leaders", sport: "NBA", answers: [
    {name:"Hakeem Olajuwon",rarity:62},{name:"Dikembe Mutombo",rarity:55},{name:"Kareem Abdul-Jabbar",rarity:45},
    {name:"Mark Eaton",rarity:18},{name:"Tim Duncan",rarity:38},{name:"David Robinson",rarity:30},
    {name:"Patrick Ewing",rarity:25},{name:"Tree Rollins",rarity:6},{name:"Robert Parish",rarity:10},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NBA_BEGINNER = [
  "q_nba_champ","q_nba_50pts","q_nba_mvp_multiple","q_nba_points_20k",
  "q_nba_all_time_scoring","q_nba_lakers_champ","q_nba_bulls_champ",
  "q_nba_heat_champ","q_nba_mvp_and_champ","q_nba_warriors_champ",
];

export const NBA_KNOWLEDGEABLE = [
  "q_nba_scoring","q_nba_rebounds_10k","q_nba_career_assists","q_nba_assists",
  "q_nba_steals_2k","q_nba_triple_doubles50","q_nba_spurs_champ","q_nba_celtics_champ",
  "q_nba_first_pick","q_nba_30ppg_season","q_nba_steals_career","q_nba_finals_mvp_notable",
];

export const NBA_EXPERT = [
  "q_nba_bust","q_nba_dpoy","q_nba_60pts","q_nba_score_rebound",
  "q_nba_triple_double_season","q_nba_undrafted_star","q_nba_oldest_youngest",
  "q_nba_block_leaders",
];
