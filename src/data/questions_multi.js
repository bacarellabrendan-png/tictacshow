// ─── COLLEGE SPORTS, GOLF, TENNIS, BOXING, OLYMPICS, MULTI-SPORT ─────────────

export const MULTI_POOLS = {

  // ── COLLEGE SPORTS ──────────────────────────────────────────────────────────

  q_college_bball_ncaa: { clue: "Name a college basketball program that has won 3 or more NCAA Championships", sport: "NCAA", answers: [
    {name:"UCLA",rarity:72},{name:"Kentucky",rarity:65},{name:"Duke",rarity:62},
    {name:"North Carolina",rarity:58},{name:"Kansas",rarity:45},{name:"Indiana",rarity:30},
    {name:"Connecticut",rarity:35},{name:"Villanova",rarity:22},{name:"Louisville",rarity:18},
    {name:"Michigan State",rarity:15},{name:"Cincinnati",rarity:8},{name:"Florida",rarity:12},
  ]},

  q_college_fb_titles: { clue: "Name a college football program with 5 or more claimed national championships", sport: "NCAA", answers: [
    {name:"Alabama",rarity:78},{name:"Ohio State",rarity:55},{name:"Notre Dame",rarity:62},
    {name:"Oklahoma",rarity:50},{name:"Nebraska",rarity:40},{name:"USC",rarity:42},
    {name:"Michigan",rarity:35},{name:"Texas",rarity:28},{name:"Pittsburgh",rarity:15},
    {name:"Georgia Tech",rarity:8},{name:"Penn State",rarity:18},{name:"Florida State",rarity:22},
    {name:"LSU",rarity:25},{name:"Minnesota",rarity:10},
  ]},

  q_college_duke_bball: { clue: "Name a player who won the NCAA basketball championship with Duke University", sport: "NCAA", answers: [
    {name:"Christian Laettner",rarity:80},{name:"Bobby Hurley",rarity:72},{name:"Grant Hill",rarity:78},
    {name:"Shane Battier",rarity:68},{name:"Jason Williams",rarity:62},{name:"Mike Dunleavy Jr",rarity:45},
    {name:"Carlos Boozer",rarity:42},{name:"Jahlil Okafor",rarity:65},{name:"Justise Winslow",rarity:52},
    {name:"Kyrie Irving",rarity:60},{name:"Kyle Singler",rarity:38},{name:"Tyus Jones",rarity:42},
    {name:"Grayson Allen",rarity:35},{name:"Nolan Smith",rarity:22},{name:"Jon Scheyer",rarity:15},
  ]},

  q_college_sec_heisman: { clue: "Name a player who won the Heisman Trophy while playing in the SEC", sport: "NCAA", answers: [
    {name:"Herschel Walker",rarity:52},{name:"Bo Jackson",rarity:62},{name:"Pat Sullivan",rarity:12},
    {name:"Danny Wuerffel",rarity:28},{name:"Tim Tebow",rarity:70},{name:"Mark Ingram",rarity:45},
    {name:"Cam Newton",rarity:55},{name:"Johnny Manziel",rarity:58},{name:"Derrick Henry",rarity:48},
    {name:"Devonta Smith",rarity:42},{name:"Bryce Young",rarity:38},{name:"Jay Barker",rarity:5},
  ]},

  q_college_alabama_nfl: { clue: "Name a player who played college football at Alabama AND was selected in the NFL Draft first round", sport: "NCAA", answers: [
    {name:"Julio Jones",rarity:62},{name:"Mark Ingram",rarity:42},{name:"Trent Richardson",rarity:35},
    {name:"Dont'a Hightower",rarity:38},{name:"Ha Ha Clinton-Dix",rarity:28},{name:"Amari Cooper",rarity:55},
    {name:"Derrick Henry",rarity:50},{name:"Calvin Ridley",rarity:45},{name:"Minkah Fitzpatrick",rarity:42},
    {name:"Quinnen Williams",rarity:38},{name:"Tua Tagovailoa",rarity:55},{name:"Henry Ruggs III",rarity:38},
    {name:"Jerry Jeudy",rarity:40},{name:"Xavier McKinney",rarity:20},{name:"Mac Jones",rarity:38},
    {name:"Patrick Surtain II",rarity:30},{name:"Najee Harris",rarity:38},{name:"Jaylen Waddle",rarity:42},
    {name:"DeVonta Smith",rarity:42},{name:"Jonah Williams",rarity:15},{name:"Ozzie Newsome",rarity:35},
    {name:"Cornelius Bennett",rarity:28},
  ]},

  q_college_kansas_nba: { clue: "Name a player who played college basketball at the University of Kansas AND was a top-10 NBA Draft pick", sport: "NCAA", answers: [
    {name:"Wilt Chamberlain",rarity:72},{name:"Danny Manning",rarity:48},{name:"Paul Pierce",rarity:62},
    {name:"Andrew Wiggins",rarity:68},{name:"Joel Embiid",rarity:65},{name:"Josh Jackson",rarity:35},
    {name:"Ben McLemore",rarity:28},{name:"Nick Collison",rarity:22},{name:"Kirk Hinrich",rarity:25},
    {name:"Christian Braun",rarity:15},{name:"Ochai Agbaji",rarity:18},
  ]},

  q_heisman_hof: { clue: "Name a Heisman Trophy winner who was also inducted into the Pro Football Hall of Fame", sport: "NCAA", answers: [
    {name:"Barry Sanders",rarity:55},{name:"Marcus Allen",rarity:30},{name:"O.J. Simpson",rarity:22},
    {name:"Roger Staubach",rarity:20},{name:"Tony Dorsett",rarity:18},{name:"Earl Campbell",rarity:15},
    {name:"Tim Brown",rarity:9},{name:"Paul Hornung",rarity:8},{name:"Doak Walker",rarity:4},
    {name:"Vic Janowicz",rarity:1},
  ]},

  q_college_ncaa_coaches: { clue: "Name a college basketball head coach who has won 3 or more NCAA national championships", sport: "NCAA", answers: [
    {name:"John Wooden",rarity:68},{name:"Mike Krzyzewski",rarity:72},{name:"Adolph Rupp",rarity:42},
    {name:"Bob Knight",rarity:38},
  ]},

  // ── GOLF ──────────────────────────────────────────────────────────────────────

  q_golf_majors3: { clue: "Name a golfer who has won 3 or more major championships", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:88},{name:"Jack Nicklaus",rarity:80},{name:"Arnold Palmer",rarity:60},
    {name:"Gary Player",rarity:45},{name:"Ben Hogan",rarity:42},{name:"Phil Mickelson",rarity:55},
    {name:"Tom Watson",rarity:38},{name:"Nick Faldo",rarity:32},{name:"Sam Snead",rarity:28},
    {name:"Walter Hagen",rarity:18},{name:"Gene Sarazen",rarity:15},{name:"Seve Ballesteros",rarity:22},
    {name:"Lee Trevino",rarity:20},{name:"Rory McIlroy",rarity:35},{name:"Jordan Spieth",rarity:25},
    {name:"Vijay Singh",rarity:18},{name:"Ernie Els",rarity:16},{name:"Greg Norman",rarity:12},
  ]},

  q_golf_masters2: { clue: "Name a golfer who has won the Masters Tournament 2 or more times", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:88},{name:"Jack Nicklaus",rarity:82},{name:"Arnold Palmer",rarity:62},
    {name:"Gary Player",rarity:42},{name:"Phil Mickelson",rarity:55},{name:"Nick Faldo",rarity:30},
    {name:"Seve Ballesteros",rarity:22},{name:"Bernhard Langer",rarity:12},{name:"Ben Hogan",rarity:18},
    {name:"Byron Nelson",rarity:8},{name:"Jimmy Demaret",rarity:5},{name:"Sam Snead",rarity:15},
    {name:"Jose Maria Olazabal",rarity:10},{name:"Bubba Watson",rarity:20},
  ]},

  q_golf_us_open2: { clue: "Name a golfer who has won the US Open 2 or more times", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:82},{name:"Jack Nicklaus",rarity:72},{name:"Ben Hogan",rarity:40},
    {name:"Bobby Jones",rarity:25},{name:"Hale Irwin",rarity:18},{name:"Andy North",rarity:6},
    {name:"Curtis Strange",rarity:10},{name:"Lee Janzen",rarity:8},{name:"Ernie Els",rarity:15},
    {name:"Payne Stewart",rarity:12},{name:"Brooks Koepka",rarity:28},{name:"Retief Goosen",rarity:7},
    {name:"Cary Middlecoff",rarity:5},{name:"Ralph Guldahl",rarity:4},
  ]},

  q_golf_career_slam: { clue: "Name a golfer who completed the career Grand Slam (won all 4 major championships)", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:82},{name:"Jack Nicklaus",rarity:75},{name:"Gary Player",rarity:40},
    {name:"Gene Sarazen",rarity:18},{name:"Ben Hogan",rarity:25},{name:"Phil Mickelson",rarity:35},
  ]},

  q_golf_major_40: { clue: "Name a PGA Tour golfer who won a major championship after turning 40", sport: "Golf", answers: [
    {name:"Phil Mickelson",rarity:55},{name:"Jack Nicklaus",rarity:60},{name:"Gary Player",rarity:35},
    {name:"Tom Watson",rarity:30},{name:"Hale Irwin",rarity:20},{name:"Ben Hogan",rarity:15},
    {name:"Julius Boros",rarity:6},{name:"Lee Trevino",rarity:12},{name:"Raymond Floyd",rarity:8},
    {name:"Mark O'Meara",rarity:10},
  ]},

  // ── TENNIS ──────────────────────────────────────────────────────────────────

  q_tennis_slams10: { clue: "Name a tennis player who has won 10 or more Grand Slam singles titles", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:78},{name:"Rafael Nadal",rarity:80},{name:"Roger Federer",rarity:82},
    {name:"Serena Williams",rarity:68},{name:"Steffi Graf",rarity:45},{name:"Pete Sampras",rarity:42},
    {name:"Chris Evert",rarity:28},{name:"Martina Navratilova",rarity:25},{name:"Margaret Court",rarity:20},
    {name:"Billie Jean King",rarity:18},{name:"Rod Laver",rarity:22},{name:"Bjorn Borg",rarity:30},
  ]},

  q_tennis_wimbledon5: { clue: "Name a tennis player who has won 5 or more Wimbledon singles titles", sport: "Tennis", answers: [
    {name:"Roger Federer",rarity:80},{name:"Pete Sampras",rarity:62},{name:"Novak Djokovic",rarity:70},
    {name:"Bjorn Borg",rarity:45},{name:"John McEnroe",rarity:30},{name:"Boris Becker",rarity:22},
    {name:"Martina Navratilova",rarity:28},{name:"Steffi Graf",rarity:38},{name:"Serena Williams",rarity:58},
    {name:"Venus Williams",rarity:35},{name:"Helen Wills Moody",rarity:10},{name:"Billie Jean King",rarity:18},
  ]},

  q_tennis_career_slam: { clue: "Name a tennis player who completed the career Grand Slam (won all 4 majors)", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:72},{name:"Rafael Nadal",rarity:70},{name:"Roger Federer",rarity:75},
    {name:"Serena Williams",rarity:65},{name:"Steffi Graf",rarity:42},{name:"Andre Agassi",rarity:38},
    {name:"Rod Laver",rarity:28},{name:"Roy Emerson",rarity:10},{name:"Fred Perry",rarity:12},
    {name:"Don Budge",rarity:8},{name:"Maria Sharapova",rarity:22},{name:"Martina Navratilova",rarity:30},
    {name:"Chris Evert",rarity:25},{name:"Doris Hart",rarity:5},{name:"Margaret Court",rarity:18},
  ]},

  q_tennis_french_open3: { clue: "Name a tennis player who has won the French Open 3 or more times", sport: "Tennis", answers: [
    {name:"Rafael Nadal",rarity:88},{name:"Novak Djokovic",rarity:55},{name:"Bjorn Borg",rarity:35},
    {name:"Chris Evert",rarity:30},{name:"Steffi Graf",rarity:38},{name:"Monica Seles",rarity:20},
    {name:"Martina Navratilova",rarity:12},{name:"Serena Williams",rarity:40},{name:"Justine Henin",rarity:18},
    {name:"Arantxa Sanchez Vicario",rarity:8},{name:"Ivan Lendl",rarity:15},{name:"Mats Wilander",rarity:10},
    {name:"Jim Courier",rarity:10},{name:"Roger Federer",rarity:20},
  ]},

  q_tennis_us_open4: { clue: "Name a tennis player who has won the US Open 4 or more times", sport: "Tennis", answers: [
    {name:"Roger Federer",rarity:65},{name:"Pete Sampras",rarity:55},{name:"Novak Djokovic",rarity:58},
    {name:"Serena Williams",rarity:60},{name:"Steffi Graf",rarity:40},{name:"Chris Evert",rarity:30},
    {name:"Jimmy Connors",rarity:28},{name:"John McEnroe",rarity:25},{name:"Ivan Lendl",rarity:20},
    {name:"Martina Navratilova",rarity:18},{name:"Margaret Court",rarity:12},{name:"Bill Tilden",rarity:6},
  ]},

  q_tennis_australian_open5: { clue: "Name a tennis player who has won the Australian Open 5 or more times", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:72},{name:"Roger Federer",rarity:60},{name:"Roy Emerson",rarity:8},
    {name:"Rafael Nadal",rarity:30},{name:"Andre Agassi",rarity:20},{name:"Ken Rosewall",rarity:6},
    {name:"Serena Williams",rarity:42},{name:"Steffi Graf",rarity:22},{name:"Martina Navratilova",rarity:12},
    {name:"Monica Seles",rarity:10},{name:"Margaret Court",rarity:18},
  ]},

  // ── BOXING ──────────────────────────────────────────────────────────────────

  q_boxing_hw_champ: { clue: "Name a boxer who held a world heavyweight championship", sport: "Boxing", answers: [
    {name:"Muhammad Ali",rarity:85},{name:"Mike Tyson",rarity:80},{name:"Joe Louis",rarity:50},
    {name:"Floyd Mayweather",rarity:45},{name:"Lennox Lewis",rarity:38},{name:"Evander Holyfield",rarity:42},
    {name:"George Foreman",rarity:55},{name:"Sonny Liston",rarity:28},{name:"Rocky Marciano",rarity:35},
    {name:"Joe Frazier",rarity:40},{name:"Larry Holmes",rarity:25},{name:"Wladimir Klitschko",rarity:28},
    {name:"Anthony Joshua",rarity:32},{name:"Deontay Wilder",rarity:22},{name:"Tyson Fury",rarity:30},
    {name:"Jack Dempsey",rarity:18},{name:"Joe Walcott",rarity:8},{name:"Riddick Bowe",rarity:12},
  ]},

  q_boxing_3weights: { clue: "Name a boxer who has won world titles in 3 or more different weight classes", sport: "Boxing", answers: [
    {name:"Manny Pacquiao",rarity:72},{name:"Oscar De La Hoya",rarity:55},{name:"Sugar Ray Leonard",rarity:42},
    {name:"Thomas Hearns",rarity:25},{name:"Roberto Duran",rarity:20},{name:"Floyd Mayweather",rarity:50},
    {name:"Roy Jones Jr",rarity:35},{name:"Canelo Alvarez",rarity:45},{name:"Terence Crawford",rarity:28},
    {name:"Marvin Hagler",rarity:15},{name:"Pernell Whitaker",rarity:8},{name:"Henry Armstrong",rarity:5},
  ]},

  // ── OLYMPICS ──────────────────────────────────────────────────────────────────

  q_olympics_swim_gold: { clue: "Name an Olympic swimmer who won 5 or more gold medals across their career", sport: "Olympics", answers: [
    {name:"Michael Phelps",rarity:88},{name:"Mark Spitz",rarity:55},{name:"Matt Biondi",rarity:20},
    {name:"Ian Thorpe",rarity:18},{name:"Ryan Lochte",rarity:22},{name:"Katie Ledecky",rarity:38},
    {name:"Janet Evans",rarity:12},{name:"Caeleb Dressel",rarity:15},{name:"Amy Van Dyken",rarity:8},
  ]},

  q_olympics_5games: { clue: "Name an Olympic athlete who competed in 5 or more Olympic Games", sport: "Olympics", answers: [
    {name:"Usain Bolt",rarity:55},{name:"Michael Phelps",rarity:65},{name:"Carl Lewis",rarity:40},
    {name:"Aleksandr Karelin",rarity:10},{name:"Ian Millar",rarity:5},{name:"Birgit Fischer",rarity:6},
  ]},

  // ── MULTI-SPORT ──────────────────────────────────────────────────────────────

  q_two_decades: { clue: "Name an athlete who won a league MVP award in two different decades", sport: "Multi", answers: [
    {name:"LeBron James",rarity:45},{name:"Tom Brady",rarity:30},{name:"Peyton Manning",rarity:25},
    {name:"Barry Bonds",rarity:20},{name:"Brett Favre",rarity:18},{name:"Roger Clemens",rarity:12},
    {name:"Steve Nash",rarity:10},{name:"Kareem Abdul-Jabbar",rarity:35},
  ]},

  q_multisport_pro: { clue: "Name an athlete who played professionally in two different major North American sports leagues", sport: "Multi", answers: [
    {name:"Bo Jackson",rarity:75},{name:"Deion Sanders",rarity:70},{name:"Jim Thorpe",rarity:30},
    {name:"Danny Ainge",rarity:25},{name:"Dave DeBusschere",rarity:12},{name:"Ron Reed",rarity:6},
    {name:"Mark Hendrickson",rarity:5},{name:"Dick Groat",rarity:4},{name:"Gene Conley",rarity:6},
    {name:"Steve Hamilton",rarity:4},
  ]},

  q_soccer_ballon_dor_old: { clue: "Name a soccer player who has won the Ballon d'Or award multiple times (legacy version)", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Cristiano Ronaldo",rarity:82},{name:"Michel Platini",rarity:22},
    {name:"Johan Cruyff",rarity:18},{name:"Marco van Basten",rarity:15},{name:"Ronaldo Nazario",rarity:25},
    {name:"Ronaldinho",rarity:20},{name:"Kevin Keegan",rarity:8},{name:"Karl-Heinz Rummenigge",rarity:5},
    {name:"Alfredo Di Stefano",rarity:10},
  ]},

  q_mls_cup3: { clue: "Name an MLS club that has won 3 or more MLS Cup championships", sport: "MLS", answers: [
    {name:"LA Galaxy",rarity:68},{name:"DC United",rarity:40},{name:"San Jose Earthquakes",rarity:22},
    {name:"Columbus Crew",rarity:18},{name:"Colorado Rapids",rarity:8},{name:"Portland Timbers",rarity:12},
    {name:"Sporting Kansas City",rarity:15},{name:"Seattle Sounders",rarity:25},
  ]},

  q_soccer_intl_goals_legacy: { clue: "Name a male soccer player with 80 or more international goals", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:82},{name:"Lionel Messi",rarity:78},{name:"Ali Daei",rarity:12},
    {name:"Romelu Lukaku",rarity:20},{name:"Robert Lewandowski",rarity:25},{name:"Kylian Mbappe",rarity:45},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const MULTI_BEGINNER = [
  "q_college_bball_ncaa","q_college_fb_titles","q_golf_majors3",
  "q_tennis_slams10","q_boxing_hw_champ",
];

export const MULTI_KNOWLEDGEABLE = [
  "q_college_duke_bball","q_college_sec_heisman","q_college_alabama_nfl",
  "q_college_kansas_nba","q_golf_masters2","q_golf_us_open2",
  "q_tennis_wimbledon5","q_tennis_career_slam","q_tennis_french_open3",
  "q_tennis_us_open4","q_boxing_3weights","q_olympics_swim_gold",
  "q_two_decades","q_mls_cup3",
];

export const MULTI_EXPERT = [
  "q_heisman_hof","q_college_ncaa_coaches","q_golf_career_slam","q_golf_major_40",
  "q_tennis_australian_open5","q_olympics_5games","q_multisport_pro",
];

// College sport pool specifically
export const COLLEGE_POOL = [
  "q_college_bball_ncaa","q_college_fb_titles","q_college_duke_bball",
  "q_college_sec_heisman","q_college_alabama_nfl","q_college_kansas_nba",
  "q_heisman_hof","q_college_ncaa_coaches",
];
