// ─── MLB QUESTIONS ────────────────────────────────────────────────────────────

export const MLB_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_mlb_hr: { clue: "Name an MLB player who hit 500 or more career home runs", sport: "MLB", answers: [
    {name:"Barry Bonds",rarity:65},{name:"Hank Aaron",rarity:60},{name:"Babe Ruth",rarity:70},
    {name:"Alex Rodriguez",rarity:45},{name:"Willie Mays",rarity:42},{name:"Ken Griffey Jr",rarity:35},
    {name:"Albert Pujols",rarity:40},{name:"Jim Thome",rarity:18},{name:"Sammy Sosa",rarity:28},
    {name:"Frank Thomas",rarity:20},{name:"David Ortiz",rarity:30},{name:"Manny Ramirez",rarity:22},
    {name:"Mark McGwire",rarity:25},{name:"Reggie Jackson",rarity:15},{name:"Gary Sheffield",rarity:12},
    {name:"Mike Schmidt",rarity:10},{name:"Harmon Killebrew",rarity:7},{name:"Rafael Palmeiro",rarity:8},
    {name:"Eddie Mathews",rarity:5},{name:"Ernie Banks",rarity:9},
  ]},

  q_mlb_batting: { clue: "Name an MLB player who hit .400 or above in a single season since 1900", sport: "MLB", answers: [
    {name:"Ted Williams",rarity:60},{name:"Ty Cobb",rarity:50},{name:"Rogers Hornsby",rarity:45},
    {name:"George Sisler",rarity:20},{name:"Harry Heilmann",rarity:10},{name:"Babe Ruth",rarity:15},
    {name:"Bill Terry",rarity:8},{name:"Jesse Burkett",rarity:5},
  ]},

  q_mlb_3000_hits: { clue: "Name an MLB player with 3,000 or more career hits", sport: "MLB", answers: [
    {name:"Pete Rose",rarity:72},{name:"Ty Cobb",rarity:55},{name:"Hank Aaron",rarity:58},
    {name:"Stan Musial",rarity:40},{name:"Derek Jeter",rarity:65},{name:"Willie Mays",rarity:50},
    {name:"Albert Pujols",rarity:38},{name:"Ichiro Suzuki",rarity:48},{name:"Cal Ripken Jr",rarity:52},
    {name:"Eddie Murray",rarity:25},{name:"Paul Molitor",rarity:22},{name:"Tony Gwynn",rarity:40},
    {name:"George Brett",rarity:32},{name:"Robin Yount",rarity:18},{name:"Dave Winfield",rarity:20},
    {name:"Wade Boggs",rarity:28},{name:"Craig Biggio",rarity:22},{name:"Rod Carew",rarity:20},
    {name:"Rickey Henderson",rarity:25},{name:"Lou Brock",rarity:18},{name:"Adrian Beltre",rarity:20},
    {name:"Rafael Palmeiro",rarity:12},{name:"Miguel Cabrera",rarity:30},{name:"Carl Yastrzemski",rarity:22},
  ]},

  q_mlb_cy_young: { clue: "Name an MLB pitcher who won the Cy Young Award 3 or more times", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:60},{name:"Randy Johnson",rarity:50},{name:"Greg Maddux",rarity:45},
    {name:"Clayton Kershaw",rarity:35},{name:"Pedro Martinez",rarity:30},{name:"Steve Carlton",rarity:25},
    {name:"Tom Seaver",rarity:18},
  ]},

  q_mlb_ws_rings3: { clue: "Name an MLB player who won 3 or more World Series rings as a player", sport: "MLB", answers: [
    {name:"Yogi Berra",rarity:55},{name:"Joe DiMaggio",rarity:52},{name:"Mickey Mantle",rarity:58},
    {name:"Babe Ruth",rarity:60},{name:"Whitey Ford",rarity:28},{name:"Derek Jeter",rarity:48},
    {name:"Roger Maris",rarity:18},{name:"Phil Rizzuto",rarity:12},{name:"Bernie Williams",rarity:20},
    {name:"Andy Pettitte",rarity:22},{name:"Mariano Rivera",rarity:40},{name:"Elston Howard",rarity:8},
    {name:"Hank Bauer",rarity:6},{name:"Gil McDougald",rarity:5},
  ]},

  q_mlb_yankees_ws: { clue: "Name a player who won a World Series with the New York Yankees since 1996", sport: "MLB", answers: [
    {name:"Derek Jeter",rarity:88},{name:"Mariano Rivera",rarity:85},{name:"Bernie Williams",rarity:72},
    {name:"Andy Pettitte",rarity:75},{name:"Jorge Posada",rarity:68},{name:"Paul O'Neill",rarity:55},
    {name:"Tino Martinez",rarity:45},{name:"Scott Brosius",rarity:30},{name:"David Wells",rarity:28},
    {name:"Orlando Hernandez",rarity:20},{name:"Chuck Knoblauch",rarity:22},{name:"David Cone",rarity:30},
    {name:"Roger Clemens",rarity:38},{name:"Alex Rodriguez",rarity:42},{name:"Hideki Matsui",rarity:35},
    {name:"Johnny Damon",rarity:28},{name:"Robinson Cano",rarity:22},{name:"CC Sabathia",rarity:25},
    {name:"Nick Swisher",rarity:15},{name:"Mark Teixeira",rarity:22},
  ]},

  q_mlb_300_wins: { clue: "Name an MLB pitcher with 300 or more career wins", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:60},{name:"Roger Clemens",rarity:50},{name:"Randy Johnson",rarity:48},
    {name:"Greg Maddux",rarity:42},{name:"Tom Seaver",rarity:25},{name:"Steve Carlton",rarity:20},
    {name:"Warren Spahn",rarity:15},{name:"Don Sutton",rarity:12},{name:"Phil Niekro",rarity:8},
    {name:"Gaylord Perry",rarity:7},{name:"Early Wynn",rarity:5},{name:"Kid Nichols",rarity:2},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_mlb_stolen: { clue: "Name an MLB player with 900 or more career stolen bases", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:70},{name:"Lou Brock",rarity:40},{name:"Ty Cobb",rarity:20},
    {name:"Tim Raines",rarity:18},{name:"Vince Coleman",rarity:12},{name:"Billy Hamilton",rarity:15},
    {name:"Arlie Latham",rarity:4},{name:"Eddie Collins",rarity:8},
  ]},

  q_mlb_strikeouts: { clue: "Name an MLB pitcher with 3,500 or more career strikeouts", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Randy Johnson",rarity:55},{name:"Roger Clemens",rarity:45},
    {name:"Pedro Martinez",rarity:28},{name:"Greg Maddux",rarity:25},{name:"Steve Carlton",rarity:30},
    {name:"Bob Gibson",rarity:22},{name:"Walter Johnson",rarity:18},{name:"Tom Seaver",rarity:20},
    {name:"Bert Blyleven",rarity:15},{name:"Curt Schilling",rarity:14},{name:"Don Sutton",rarity:12},
    {name:"Gaylord Perry",rarity:8},{name:"Justin Verlander",rarity:20},
  ]},

  q_mlb_red_sox_ws: { clue: "Name a player who won the World Series with the Boston Red Sox since 2000", sport: "MLB", answers: [
    {name:"David Ortiz",rarity:88},{name:"Pedro Martinez",rarity:72},{name:"Manny Ramirez",rarity:70},
    {name:"Curt Schilling",rarity:62},{name:"Johnny Damon",rarity:55},{name:"Jason Varitek",rarity:45},
    {name:"Dustin Pedroia",rarity:48},{name:"Kevin Youkilis",rarity:38},{name:"Josh Beckett",rarity:42},
    {name:"Jonathan Papelbon",rarity:35},{name:"Kevin Millar",rarity:28},{name:"Tim Wakefield",rarity:22},
    {name:"Jacoby Ellsbury",rarity:32},{name:"Jon Lester",rarity:38},{name:"Mike Lowell",rarity:32},
    {name:"Clay Buchholz",rarity:22},{name:"David Price",rarity:18},{name:"Craig Kimbrel",rarity:20},
    {name:"J.D. Drew",rarity:25},{name:"Xander Bogaerts",rarity:15},
  ]},

  q_mlb_dodgers_ws: { clue: "Name a player who won the World Series with the Los Angeles Dodgers", sport: "MLB", answers: [
    {name:"Clayton Kershaw",rarity:78},{name:"Mookie Betts",rarity:68},{name:"Cody Bellinger",rarity:60},
    {name:"Corey Seager",rarity:52},{name:"Justin Turner",rarity:45},{name:"Walker Buehler",rarity:35},
    {name:"Kenley Jansen",rarity:40},{name:"Kirk Gibson",rarity:62},{name:"Orel Hershiser",rarity:65},
    {name:"Steve Sax",rarity:22},{name:"Fernando Valenzuela",rarity:55},{name:"Pedro Guerrero",rarity:35},
    {name:"Max Muncy",rarity:28},{name:"Chris Taylor",rarity:18},{name:"Julio Urias",rarity:22},
  ]},

  q_mlb_ss_300hr: { clue: "Name an MLB shortstop with 300 or more career home runs", sport: "MLB", answers: [
    {name:"Alex Rodriguez",rarity:65},{name:"Derek Jeter",rarity:35},{name:"Ernie Banks",rarity:30},
    {name:"Cal Ripken Jr",rarity:55},{name:"Barry Larkin",rarity:15},{name:"Miguel Tejada",rarity:12},
    {name:"Nomar Garciaparra",rarity:10},{name:"Alan Trammell",rarity:8},{name:"Robin Yount",rarity:12},
    {name:"Trea Turner",rarity:10},
  ]},

  q_mlb_200hits_5: { clue: "Name an MLB player who had 200 or more hits in 5 or more different seasons", sport: "MLB", answers: [
    {name:"Pete Rose",rarity:55},{name:"Ichiro Suzuki",rarity:70},{name:"Ty Cobb",rarity:42},
    {name:"Wade Boggs",rarity:35},{name:"Derek Jeter",rarity:30},{name:"Rogers Hornsby",rarity:20},
    {name:"Chuck Klein",rarity:8},{name:"Paul Waner",rarity:10},{name:"Lou Gehrig",rarity:25},
    {name:"Al Simmons",rarity:6},{name:"Charlie Gehringer",rarity:5},
  ]},

  q_mlb_perfect_game: { clue: "Name an MLB pitcher who threw a perfect game", sport: "MLB", answers: [
    {name:"Roy Halladay",rarity:48},{name:"Felix Hernandez",rarity:42},{name:"Dallas Braden",rarity:20},
    {name:"Philip Humber",rarity:15},{name:"Matt Cain",rarity:25},{name:"Don Larsen",rarity:52},
    {name:"David Cone",rarity:38},{name:"David Wells",rarity:35},{name:"Dennis Martinez",rarity:28},
    {name:"Kenny Rogers",rarity:22},{name:"Len Barker",rarity:18},{name:"Mike Witt",rarity:15},
    {name:"Tom Browning",rarity:18},{name:"Catfish Hunter",rarity:30},{name:"Jim Bunning",rarity:22},
    {name:"Sandy Koufax",rarity:40},{name:"Randy Johnson",rarity:38},{name:"Mark Buehrle",rarity:28},
  ]},

  q_mlb_manager_2000: { clue: "Name an MLB manager with 2,000 or more career wins", sport: "MLB", answers: [
    {name:"Connie Mack",rarity:30},{name:"John McGraw",rarity:20},{name:"Tony La Russa",rarity:45},
    {name:"Bobby Cox",rarity:38},{name:"Joe Torre",rarity:42},{name:"Sparky Anderson",rarity:28},
    {name:"Dusty Baker",rarity:22},{name:"Bruce Bochy",rarity:18},{name:"Bucky Harris",rarity:5},
    {name:"Joe McCarthy",rarity:10},{name:"Walter Alston",rarity:8},{name:"Leo Durocher",rarity:6},
  ]},

  q_mlb_gold_glove_ss5: { clue: "Name an MLB shortstop who won 5 or more Gold Glove awards", sport: "MLB", answers: [
    {name:"Ozzie Smith",rarity:72},{name:"Omar Vizquel",rarity:45},{name:"Luis Aparicio",rarity:28},
    {name:"Mark Belanger",rarity:12},{name:"Dave Concepcion",rarity:10},{name:"Derek Jeter",rarity:35},
    {name:"Troy Tulowitzki",rarity:20},{name:"Brendan Ryan",rarity:4},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_mlb_triple_crown: { clue: "Name an MLB player who won the Triple Crown since 1950", sport: "MLB", answers: [
    {name:"Miguel Cabrera",rarity:40},{name:"Mickey Mantle",rarity:35},{name:"Carl Yastrzemski",rarity:30},
    {name:"Frank Robinson",rarity:22},
  ]},

  q_mlb_no_hitter: { clue: "Name an MLB pitcher who threw 2 or more career no-hitters", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Sandy Koufax",rarity:40},{name:"Max Scherzer",rarity:22},
    {name:"Justin Verlander",rarity:18},{name:"Bob Feller",rarity:20},{name:"Cy Young",rarity:18},
    {name:"Jim Maloney",rarity:6},{name:"Allie Reynolds",rarity:5},{name:"Virgil Trucks",rarity:5},
    {name:"Larry Corcoran",rarity:4},{name:"Bob Forsch",rarity:4},{name:"Ken Holtzman",rarity:5},
  ]},

  q_mlb_steals100: { clue: "Name an MLB player who stole 100 or more bases in a single season", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:72},{name:"Lou Brock",rarity:45},{name:"Vince Coleman",rarity:40},
    {name:"Maury Wills",rarity:25},
  ]},

  q_mlb_300_300: { clue: "Name an MLB player with 300+ career home runs AND 300+ career stolen bases", sport: "MLB", answers: [
    {name:"Willie Mays",rarity:60},{name:"Barry Bonds",rarity:55},{name:"Andre Dawson",rarity:20},
    {name:"Reggie Sanders",rarity:5},{name:"Steve Finley",rarity:4},{name:"Raul Mondesi",rarity:5},
    {name:"Eric Davis",rarity:6},{name:"Larry Doby",rarity:8},{name:"Chili Davis",rarity:5},
  ]},

  q_mlb_pitcher_20k: { clue: "Name an MLB pitcher who struck out 20 batters in a single game", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:65},{name:"Kerry Wood",rarity:40},{name:"Max Scherzer",rarity:30},
    {name:"Randy Johnson",rarity:15},{name:"Tom Cheney",rarity:5},
  ]},

  q_mlb_cy_consecutive: { clue: "Name an MLB pitcher who won back-to-back Cy Young Awards", sport: "MLB", answers: [
    {name:"Randy Johnson",rarity:55},{name:"Greg Maddux",rarity:50},{name:"Roger Clemens",rarity:48},
    {name:"Clayton Kershaw",rarity:38},{name:"Pedro Martinez",rarity:42},{name:"Tim Lincecum",rarity:22},
    {name:"Gaylord Perry",rarity:8},{name:"Bret Saberhagen",rarity:10},{name:"Denny McLain",rarity:8},
    {name:"Sandy Koufax",rarity:18},{name:"Dwight Gooden",rarity:12},{name:"Zack Greinke",rarity:10},
  ]},

  q_mlb_consecutive_games: { clue: "Name an MLB player who played in 500 or more consecutive games", sport: "MLB", answers: [
    {name:"Cal Ripken Jr",rarity:88},{name:"Lou Gehrig",rarity:78},{name:"Everett Scott",rarity:38},
    {name:"Steve Garvey",rarity:32},{name:"Billy Williams",rarity:28},{name:"Joe Sewell",rarity:22},
    {name:"Stan Musial",rarity:18},{name:"Eddie Yost",rarity:12},{name:"Gus Suhr",rarity:8},
    {name:"Pete Rose",rarity:15},{name:"Dale Murphy",rarity:10},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const MLB_BEGINNER = [
  "q_mlb_hr","q_mlb_batting","q_mlb_3000_hits","q_mlb_cy_young",
  "q_mlb_ws_rings3","q_mlb_yankees_ws","q_mlb_300_wins",
];

export const MLB_KNOWLEDGEABLE = [
  "q_mlb_stolen","q_mlb_strikeouts","q_mlb_red_sox_ws","q_mlb_dodgers_ws",
  "q_mlb_ss_300hr","q_mlb_200hits_5","q_mlb_perfect_game",
  "q_mlb_manager_2000","q_mlb_gold_glove_ss5",
];

export const MLB_EXPERT = [
  "q_mlb_triple_crown","q_mlb_no_hitter","q_mlb_steals100",
  "q_mlb_300_300","q_mlb_pitcher_20k","q_mlb_cy_consecutive",
  "q_mlb_consecutive_games",
];
