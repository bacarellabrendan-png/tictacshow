// ─── ANSWER POOLS ────────────────────────────────────────────────────────────
// rarity = % of players likely to give this answer (lower = rarer = wins the square)
export const ANSWER_POOLS = {

  // ══════════════════════════════════════════════════════════════════
  // BEGINNER — any sports fan should know these
  // ══════════════════════════════════════════════════════════════════

  q_nba_champ: { clue: "Name an NBA player who won 5 or more championships", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:72},{name:"Magic Johnson",rarity:58},{name:"Kareem Abdul-Jabbar",rarity:45},
    {name:"LeBron James",rarity:38},{name:"Kobe Bryant",rarity:35},{name:"Scottie Pippen",rarity:28},
    {name:"Bill Russell",rarity:22},{name:"Robert Horry",rarity:14},{name:"John Havlicek",rarity:9},
    {name:"Ron Harper",rarity:8},{name:"John Salley",rarity:5},{name:"Sam Jones",rarity:4},
  ]},

  q_nfl_sb_qb: { clue: "Name an NFL quarterback who has won a Super Bowl", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:88},{name:"Joe Montana",rarity:72},{name:"Peyton Manning",rarity:65},
    {name:"Patrick Mahomes",rarity:60},{name:"Terry Bradshaw",rarity:50},{name:"John Elway",rarity:48},
    {name:"Aaron Rodgers",rarity:45},{name:"Troy Aikman",rarity:42},{name:"Eli Manning",rarity:55},
    {name:"Ben Roethlisberger",rarity:38},{name:"Phil Simms",rarity:18},{name:"Doug Williams",rarity:12},
    {name:"Jim McMahon",rarity:14},{name:"Trent Dilfer",rarity:10},{name:"Nick Foles",rarity:20},
    {name:"Mark Rypien",rarity:8},{name:"Brad Johnson",rarity:9},{name:"Jeff Hostetler",rarity:6},
  ]},

  q_mlb_hr: { clue: "Name an MLB player who hit 500 or more career home runs", sport: "MLB", answers: [
    {name:"Barry Bonds",rarity:65},{name:"Hank Aaron",rarity:60},{name:"Babe Ruth",rarity:70},
    {name:"Alex Rodriguez",rarity:45},{name:"Willie Mays",rarity:42},{name:"Ken Griffey Jr",rarity:35},
    {name:"Albert Pujols",rarity:40},{name:"Jim Thome",rarity:18},{name:"Sammy Sosa",rarity:28},
    {name:"Frank Thomas",rarity:20},{name:"David Ortiz",rarity:30},{name:"Manny Ramirez",rarity:22},
    {name:"Mark McGwire",rarity:25},{name:"Reggie Jackson",rarity:15},{name:"Gary Sheffield",rarity:12},
    {name:"Mike Schmidt",rarity:10},{name:"Harmon Killebrew",rarity:7},{name:"Rafael Palmeiro",rarity:8},
    {name:"Eddie Mathews",rarity:5},{name:"Ernie Banks",rarity:9},
  ]},

  q_nba_50pts: { clue: "Name an NBA player who scored 50+ points in a game multiple times", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:65},{name:"Michael Jordan",rarity:55},{name:"Kobe Bryant",rarity:50},
    {name:"LeBron James",rarity:18},{name:"Elgin Baylor",rarity:20},{name:"Rick Barry",rarity:12},
    {name:"Kevin Durant",rarity:15},{name:"James Harden",rarity:14},{name:"Damian Lillard",rarity:8},
    {name:"Devin Booker",rarity:7},{name:"David Thompson",rarity:5},
  ]},

  q_nfl_rushing: { clue: "Name an NFL player who rushed for 1,500+ yards in a single season", sport: "NFL", answers: [
    {name:"Barry Sanders",rarity:60},{name:"Eric Dickerson",rarity:55},{name:"Adrian Peterson",rarity:50},
    {name:"LaDainian Tomlinson",rarity:45},{name:"Emmitt Smith",rarity:35},{name:"Derrick Henry",rarity:32},
    {name:"Chris Johnson",rarity:30},{name:"O.J. Simpson",rarity:28},{name:"Jamal Lewis",rarity:25},
    {name:"Earl Campbell",rarity:18},{name:"Barry Foster",rarity:12},{name:"Marshall Faulk",rarity:22},
    {name:"Clinton Portis",rarity:10},{name:"Shaun Alexander",rarity:15},{name:"Jamal Anderson",rarity:8},
  ]},

  q_mlb_batting: { clue: "Name an MLB player who hit .400 or above in a single season since 1900", sport: "MLB", answers: [
    {name:"Ted Williams",rarity:60},{name:"Ty Cobb",rarity:50},{name:"Rogers Hornsby",rarity:45},
    {name:"George Sisler",rarity:20},{name:"Harry Heilmann",rarity:10},{name:"Babe Ruth",rarity:15},
    {name:"Bill Terry",rarity:8},{name:"Jesse Burkett",rarity:5},
  ]},

  q_nba_scoring: { clue: "Name an NBA player who won the scoring title 3 or more times", sport: "NBA", answers: [
    {name:"Michael Jordan",rarity:70},{name:"Wilt Chamberlain",rarity:55},{name:"Allen Iverson",rarity:30},
    {name:"Kevin Durant",rarity:25},{name:"James Harden",rarity:20},{name:"George Gervin",rarity:20},
    {name:"Bob McAdoo",rarity:10},{name:"Neil Johnston",rarity:4},
  ]},

  q_nfl_sb_mvp: { clue: "Name an NFL player who won Super Bowl MVP more than once", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:75},{name:"Joe Montana",rarity:55},{name:"Eli Manning",rarity:35},
    {name:"Terry Bradshaw",rarity:30},{name:"Bart Starr",rarity:20},
  ]},

  q_mlb_cy_young: { clue: "Name an MLB pitcher who won the Cy Young Award 3 or more times", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:60},{name:"Randy Johnson",rarity:50},{name:"Greg Maddux",rarity:45},
    {name:"Clayton Kershaw",rarity:35},{name:"Pedro Martinez",rarity:30},{name:"Steve Carlton",rarity:25},
    {name:"Tom Seaver",rarity:18},
  ]},

  q_nba_mvp_multiple: { clue: "Name an NBA player who won 3 or more regular season MVP awards", sport: "NBA", answers: [
    {name:"Kareem Abdul-Jabbar",rarity:60},{name:"Michael Jordan",rarity:72},{name:"LeBron James",rarity:68},
    {name:"Bill Russell",rarity:28},{name:"Wilt Chamberlain",rarity:42},{name:"Moses Malone",rarity:22},
    {name:"Larry Bird",rarity:38},{name:"Magic Johnson",rarity:35},
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

  q_tennis_slams10: { clue: "Name a tennis player who has won 10 or more Grand Slam singles titles", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:78},{name:"Rafael Nadal",rarity:80},{name:"Roger Federer",rarity:82},
    {name:"Serena Williams",rarity:68},{name:"Steffi Graf",rarity:45},{name:"Pete Sampras",rarity:42},
    {name:"Chris Evert",rarity:28},{name:"Martina Navratilova",rarity:25},{name:"Margaret Court",rarity:20},
    {name:"Billie Jean King",rarity:18},{name:"Rod Laver",rarity:22},{name:"Bjorn Borg",rarity:30},
  ]},

  q_golf_majors3: { clue: "Name a golfer who has won 3 or more major championships", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:88},{name:"Jack Nicklaus",rarity:80},{name:"Arnold Palmer",rarity:60},
    {name:"Gary Player",rarity:45},{name:"Ben Hogan",rarity:42},{name:"Phil Mickelson",rarity:55},
    {name:"Tom Watson",rarity:38},{name:"Nick Faldo",rarity:32},{name:"Sam Snead",rarity:28},
    {name:"Walter Hagen",rarity:18},{name:"Gene Sarazen",rarity:15},{name:"Seve Ballesteros",rarity:22},
    {name:"Lee Trevino",rarity:20},{name:"Rory McIlroy",rarity:35},{name:"Jordan Spieth",rarity:25},
    {name:"Vijay Singh",rarity:18},{name:"Ernie Els",rarity:16},{name:"Greg Norman",rarity:12},
  ]},

  q_nfl_td_receiving: { clue: "Name an NFL player with 100 or more career receiving touchdowns", sport: "NFL", answers: [
    {name:"Jerry Rice",rarity:82},{name:"Randy Moss",rarity:65},{name:"Terrell Owens",rarity:60},
    {name:"Cris Carter",rarity:35},{name:"Marvin Harrison",rarity:40},{name:"Larry Fitzgerald",rarity:45},
    {name:"Antonio Gates",rarity:30},{name:"Tony Gonzalez",rarity:38},{name:"Tim Brown",rarity:22},
    {name:"Steve Largent",rarity:15},
  ]},

  q_nba_points_20k: { clue: "Name an NBA player who scored 25,000 or more career points", sport: "NBA", answers: [
    {name:"LeBron James",rarity:82},{name:"Kareem Abdul-Jabbar",rarity:70},{name:"Karl Malone",rarity:55},
    {name:"Kobe Bryant",rarity:75},{name:"Michael Jordan",rarity:78},{name:"Dirk Nowitzki",rarity:55},
    {name:"Wilt Chamberlain",rarity:60},{name:"Shaquille O'Neal",rarity:62},{name:"Moses Malone",rarity:28},
    {name:"Elvin Hayes",rarity:20},{name:"Hakeem Olajuwon",rarity:38},{name:"Oscar Robertson",rarity:30},
    {name:"Dominique Wilkins",rarity:22},{name:"Tim Duncan",rarity:42},{name:"Kevin Durant",rarity:50},
    {name:"Paul Pierce",rarity:25},{name:"Reggie Miller",rarity:22},{name:"Patrick Ewing",rarity:30},
  ]},

  q_boxing_hw_champ: { clue: "Name a boxer who held a world heavyweight championship", sport: "Boxing", answers: [
    {name:"Muhammad Ali",rarity:85},{name:"Mike Tyson",rarity:80},{name:"Joe Louis",rarity:50},
    {name:"Floyd Mayweather",rarity:45},{name:"Lennox Lewis",rarity:38},{name:"Evander Holyfield",rarity:42},
    {name:"George Foreman",rarity:55},{name:"Sonny Liston",rarity:28},{name:"Rocky Marciano",rarity:35},
    {name:"Joe Frazier",rarity:40},{name:"Larry Holmes",rarity:25},{name:"Wladimir Klitschko",rarity:28},
    {name:"Anthony Joshua",rarity:32},{name:"Deontay Wilder",rarity:22},{name:"Tyson Fury",rarity:30},
    {name:"Jack Dempsey",rarity:18},{name:"Joe Walcott",rarity:8},{name:"Riddick Bowe",rarity:12},
  ]},

  q_soccer_ballon_dor: { clue: "Name a soccer player who has won the Ballon d'Or award multiple times", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Cristiano Ronaldo",rarity:82},{name:"Michel Platini",rarity:22},
    {name:"Johan Cruyff",rarity:18},{name:"Marco van Basten",rarity:15},{name:"Ronaldo Nazario",rarity:25},
    {name:"Ronaldinho",rarity:20},{name:"Kevin Keegan",rarity:8},{name:"Karl-Heinz Rummenigge",rarity:5},
    {name:"Alfredo Di Stefano",rarity:10},
  ]},

  q_nfl_qb_tds: { clue: "Name an NFL quarterback with 400 or more career passing touchdowns", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:85},{name:"Peyton Manning",rarity:75},{name:"Drew Brees",rarity:60},
    {name:"Brett Favre",rarity:65},{name:"Aaron Rodgers",rarity:55},{name:"Philip Rivers",rarity:30},
    {name:"Dan Marino",rarity:45},{name:"Patrick Mahomes",rarity:40},{name:"Ben Roethlisberger",rarity:28},
    {name:"Eli Manning",rarity:22},{name:"Matt Ryan",rarity:15},
  ]},

  q_college_bball_ncaa: { clue: "Name a college basketball program that has won 3 or more NCAA Championships", sport: "NCAA", answers: [
    {name:"UCLA",rarity:72},{name:"Kentucky",rarity:65},{name:"Duke",rarity:62},
    {name:"North Carolina",rarity:58},{name:"Kansas",rarity:45},{name:"Indiana",rarity:30},
    {name:"Connecticut",rarity:35},{name:"Villanova",rarity:22},{name:"Louisville",rarity:18},
    {name:"Michigan State",rarity:15},{name:"Cincinnati",rarity:8},{name:"Florida",rarity:12},
  ]},

  q_nba_rebounds_10k: { clue: "Name an NBA player with 10,000 or more career rebounds", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:62},{name:"Bill Russell",rarity:55},{name:"Kareem Abdul-Jabbar",rarity:48},
    {name:"Elvin Hayes",rarity:22},{name:"Moses Malone",rarity:25},{name:"Tim Duncan",rarity:40},
    {name:"Karl Malone",rarity:35},{name:"Robert Parish",rarity:18},{name:"Nate Thurmond",rarity:12},
    {name:"Walt Bellamy",rarity:8},{name:"Kevin Garnett",rarity:38},{name:"Dwight Howard",rarity:32},
    {name:"Shaquille O'Neal",rarity:42},{name:"Dennis Rodman",rarity:30},{name:"Buck Williams",rarity:8},
  ]},

  q_nfl_teams_5sb: { clue: "Name an NFL franchise that has won 5 or more Super Bowls", sport: "NFL", answers: [
    {name:"New England Patriots",rarity:78},{name:"Pittsburgh Steelers",rarity:72},
    {name:"San Francisco 49ers",rarity:60},{name:"Dallas Cowboys",rarity:65},
  ]},

  q_mlb_ws_rings3: { clue: "Name an MLB player who won 3 or more World Series rings as a player", sport: "MLB", answers: [
    {name:"Yogi Berra",rarity:55},{name:"Joe DiMaggio",rarity:52},{name:"Mickey Mantle",rarity:58},
    {name:"Babe Ruth",rarity:60},{name:"Whitey Ford",rarity:28},{name:"Derek Jeter",rarity:48},
    {name:"Roger Maris",rarity:18},{name:"Phil Rizzuto",rarity:12},{name:"Bernie Williams",rarity:20},
    {name:"Andy Pettitte",rarity:22},{name:"Mariano Rivera",rarity:40},{name:"Elston Howard",rarity:8},
    {name:"Hank Bauer",rarity:6},{name:"Gil McDougald",rarity:5},
  ]},

  q_tennis_wimbledon5: { clue: "Name a tennis player who has won 5 or more Wimbledon singles titles", sport: "Tennis", answers: [
    {name:"Roger Federer",rarity:80},{name:"Pete Sampras",rarity:62},{name:"Novak Djokovic",rarity:70},
    {name:"Bjorn Borg",rarity:45},{name:"John McEnroe",rarity:30},{name:"Boris Becker",rarity:22},
    {name:"Martina Navratilova",rarity:28},{name:"Steffi Graf",rarity:38},{name:"Serena Williams",rarity:58},
    {name:"Venus Williams",rarity:35},{name:"Helen Wills Moody",rarity:10},{name:"Billie Jean King",rarity:18},
  ]},

  q_nhl_teams_5cup: { clue: "Name an NHL franchise that has won 5 or more Stanley Cups", sport: "NHL", answers: [
    {name:"Montreal Canadiens",rarity:72},{name:"Toronto Maple Leafs",rarity:58},{name:"Detroit Red Wings",rarity:55},
    {name:"Boston Bruins",rarity:48},{name:"Chicago Blackhawks",rarity:45},{name:"Edmonton Oilers",rarity:42},
    {name:"Pittsburgh Penguins",rarity:40},{name:"New York Islanders",rarity:28},{name:"New York Rangers",rarity:30},
  ]},

  q_golf_masters2: { clue: "Name a golfer who has won the Masters Tournament 2 or more times", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:88},{name:"Jack Nicklaus",rarity:82},{name:"Arnold Palmer",rarity:62},
    {name:"Gary Player",rarity:42},{name:"Phil Mickelson",rarity:55},{name:"Nick Faldo",rarity:30},
    {name:"Seve Ballesteros",rarity:22},{name:"Bernhard Langer",rarity:12},{name:"Ben Hogan",rarity:18},
    {name:"Byron Nelson",rarity:8},{name:"Jimmy Demaret",rarity:5},{name:"Sam Snead",rarity:15},
    {name:"Jose Maria Olazabal",rarity:10},{name:"Bubba Watson",rarity:20},
  ]},

  q_nfl_rush_td100: { clue: "Name an NFL player with 100 or more career rushing touchdowns", sport: "NFL", answers: [
    {name:"Emmitt Smith",rarity:70},{name:"LaDainian Tomlinson",rarity:65},{name:"Marcus Allen",rarity:40},
    {name:"Walter Payton",rarity:60},{name:"Jim Brown",rarity:52},{name:"Jerome Bettis",rarity:35},
    {name:"Barry Sanders",rarity:55},{name:"Marshall Faulk",rarity:38},{name:"Franco Harris",rarity:28},
    {name:"Eric Dickerson",rarity:32},{name:"John Riggins",rarity:18},{name:"Shaun Alexander",rarity:15},
    {name:"Corey Dillon",rarity:10},{name:"Adrian Peterson",rarity:42},{name:"Derrick Henry",rarity:25},
  ]},

  q_soccer_intl_goals: { clue: "Name a male soccer player with 80 or more international goals", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:82},{name:"Lionel Messi",rarity:78},{name:"Ali Daei",rarity:12},
    {name:"Romelu Lukaku",rarity:20},{name:"Ferran Torres",rarity:8},{name:"Robert Lewandowski",rarity:25},
    {name:"Sunil Chhetri",rarity:5},{name:"Didier Drogba",rarity:15},
  ]},

  q_college_fb_titles: { clue: "Name a college football program with 5 or more claimed national championships", sport: "NCAA", answers: [
    {name:"Alabama",rarity:78},{name:"Ohio State",rarity:55},{name:"Notre Dame",rarity:62},
    {name:"Oklahoma",rarity:50},{name:"Nebraska",rarity:40},{name:"USC",rarity:42},
    {name:"Michigan",rarity:35},{name:"Texas",rarity:28},{name:"Pittsburgh",rarity:15},
    {name:"Georgia Tech",rarity:8},{name:"Penn State",rarity:18},{name:"Florida State",rarity:22},
    {name:"LSU",rarity:25},{name:"Minnesota",rarity:10},
  ]},

  q_nba_career_assists: { clue: "Name an NBA player among the all-time top 5 career assists leaders", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:55},{name:"Steve Nash",rarity:45},
    {name:"Mark Jackson",rarity:22},{name:"Magic Johnson",rarity:60},
  ]},

  q_nfl_hall_qb: { clue: "Name an NFL quarterback inducted into the Pro Football Hall of Fame", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:82},{name:"Joe Montana",rarity:75},{name:"Peyton Manning",rarity:72},
    {name:"Dan Marino",rarity:65},{name:"Brett Favre",rarity:60},{name:"John Elway",rarity:58},
    {name:"Troy Aikman",rarity:45},{name:"Terry Bradshaw",rarity:50},{name:"Roger Staubach",rarity:40},
    {name:"Johnny Unitas",rarity:35},{name:"Bart Starr",rarity:25},{name:"Fran Tarkenton",rarity:18},
    {name:"Jim Kelly",rarity:20},{name:"Steve Young",rarity:30},{name:"Warren Moon",rarity:22},
    {name:"Len Dawson",rarity:12},{name:"Bob Griese",rarity:10},{name:"Ken Stabler",rarity:15},
  ]},

  q_nba_steals_career: { clue: "Name an NBA player among the all-time top 5 career steals leaders", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:52},{name:"Michael Jordan",rarity:58},
    {name:"Gary Payton",rarity:35},{name:"Maurice Cheeks",rarity:18},
  ]},

  q_soccer_ucl: { clue: "Name a soccer club that has won the UEFA Champions League 5 or more times", sport: "Soccer", answers: [
    {name:"Real Madrid",rarity:82},{name:"AC Milan",rarity:55},{name:"Bayern Munich",rarity:60},
    {name:"Liverpool",rarity:52},{name:"Ajax",rarity:28},{name:"Barcelona",rarity:58},
    {name:"Juventus",rarity:20},{name:"Benfica",rarity:8},{name:"Inter Milan",rarity:15},
    {name:"Nottingham Forest",rarity:5},
  ]},

  q_nhl_hart3: { clue: "Name an NHL player who won the Hart Trophy (league MVP) 3 or more times", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Gordie Howe",rarity:50},{name:"Eddie Shore",rarity:12},
    {name:"Mario Lemieux",rarity:45},{name:"Bobby Clarke",rarity:15},{name:"Howie Morenz",rarity:8},
    {name:"Bill Cowley",rarity:5},
  ]},

  // ══════════════════════════════════════════════════════════════════
  // KNOWLEDGEABLE — for the dedicated sports fan
  // ══════════════════════════════════════════════════════════════════

  q_nhl_goals: { clue: "Name an NHL player who scored 700 or more career goals", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Gordie Howe",rarity:45},{name:"Jaromir Jagr",rarity:35},
    {name:"Brett Hull",rarity:28},{name:"Marcel Dionne",rarity:8},{name:"Phil Esposito",rarity:12},
    {name:"Mike Gartner",rarity:6},
  ]},

  q_300_wins: { clue: "Name an MLB pitcher with 300 or more career wins", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:60},{name:"Roger Clemens",rarity:50},{name:"Randy Johnson",rarity:48},
    {name:"Greg Maddux",rarity:42},{name:"Tom Seaver",rarity:25},{name:"Steve Carlton",rarity:20},
    {name:"Warren Spahn",rarity:15},{name:"Don Sutton",rarity:12},{name:"Phil Niekro",rarity:8},
    {name:"Gaylord Perry",rarity:7},{name:"Early Wynn",rarity:5},{name:"Kid Nichols",rarity:2},
  ]},

  q_nhl_50goals: { clue: "Name an NHL player who scored 50 or more goals in a single season", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:75},{name:"Mario Lemieux",rarity:55},{name:"Brett Hull",rarity:40},
    {name:"Mike Bossy",rarity:25},{name:"Steve Yzerman",rarity:20},{name:"Teemu Selanne",rarity:18},
    {name:"Phil Esposito",rarity:18},{name:"Marcel Dionne",rarity:15},{name:"Guy Lafleur",rarity:14},
    {name:"Jaromir Jagr",rarity:12},{name:"Jari Kurri",rarity:10},{name:"Luc Robitaille",rarity:8},
    {name:"Reggie Leach",rarity:5},{name:"Blaine Stoughton",rarity:4},{name:"Danny Gare",rarity:4},
  ]},

  q_two_decades: { clue: "Name an athlete who won a league MVP award in two different decades", sport: "Multi", answers: [
    {name:"LeBron James",rarity:45},{name:"Tom Brady",rarity:30},{name:"Peyton Manning",rarity:25},
    {name:"Barry Bonds",rarity:20},{name:"Brett Favre",rarity:18},{name:"Roger Clemens",rarity:12},
    {name:"Steve Nash",rarity:10},{name:"Kareem Abdul-Jabbar",rarity:35},
  ]},

  q_mlb_stolen: { clue: "Name an MLB player with 900 or more career stolen bases", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:70},{name:"Lou Brock",rarity:40},{name:"Ty Cobb",rarity:20},
    {name:"Tim Raines",rarity:18},{name:"Vince Coleman",rarity:12},{name:"Billy Hamilton",rarity:15},
    {name:"Arlie Latham",rarity:4},{name:"Eddie Collins",rarity:8},
  ]},

  q_nba_assists: { clue: "Name an NBA player who averaged 10 or more assists per game for a full season", sport: "NBA", answers: [
    {name:"Magic Johnson",rarity:60},{name:"John Stockton",rarity:55},{name:"Isiah Thomas",rarity:35},
    {name:"Chris Paul",rarity:30},{name:"Jason Kidd",rarity:25},{name:"Kevin Porter",rarity:10},
    {name:"Guy Rodgers",rarity:4},{name:"Norm Nixon",rarity:6},{name:"Kevin Johnson",rarity:8},
    {name:"Tim Hardaway",rarity:7},{name:"Mark Jackson",rarity:12},
  ]},

  q_nfl_receiving: { clue: "Name an NFL wide receiver or tight end with 1,000 or more career receptions", sport: "NFL", answers: [
    {name:"Jerry Rice",rarity:55},{name:"Larry Fitzgerald",rarity:40},{name:"Tony Gonzalez",rarity:35},
    {name:"Terrell Owens",rarity:30},{name:"Randy Moss",rarity:28},{name:"Jason Witten",rarity:25},
    {name:"Marvin Harrison",rarity:20},{name:"Andre Johnson",rarity:16},{name:"Wes Welker",rarity:12},
    {name:"Tim Brown",rarity:15},{name:"Reggie Wayne",rarity:14},{name:"Isaac Bruce",rarity:10},
    {name:"Roddy White",rarity:6},{name:"Anquan Boldin",rarity:8},
  ]},

  q_nhl_points: { clue: "Name an NHL player with 1,700 or more career points", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:80},{name:"Mario Lemieux",rarity:55},{name:"Gordie Howe",rarity:45},
    {name:"Mark Messier",rarity:35},{name:"Jaromir Jagr",rarity:30},{name:"Steve Yzerman",rarity:25},
    {name:"Phil Esposito",rarity:18},{name:"Ray Bourque",rarity:15},{name:"Ron Francis",rarity:20},
    {name:"Marcel Dionne",rarity:12},
  ]},

  q_mlb_strikeouts: { clue: "Name an MLB pitcher with 3,500 or more career strikeouts", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Randy Johnson",rarity:55},{name:"Roger Clemens",rarity:45},
    {name:"Pedro Martinez",rarity:28},{name:"Greg Maddux",rarity:25},{name:"Steve Carlton",rarity:30},
    {name:"Bob Gibson",rarity:22},{name:"Walter Johnson",rarity:18},{name:"Tom Seaver",rarity:20},
    {name:"Bert Blyleven",rarity:15},{name:"Curt Schilling",rarity:14},{name:"Don Sutton",rarity:12},
    {name:"Gaylord Perry",rarity:8},{name:"Justin Verlander",rarity:20},
  ]},

  q_nba_steals_2k: { clue: "Name an NBA player with 2,000 or more career steals", sport: "NBA", answers: [
    {name:"John Stockton",rarity:62},{name:"Jason Kidd",rarity:50},{name:"Michael Jordan",rarity:58},
    {name:"Gary Payton",rarity:35},{name:"Maurice Cheeks",rarity:18},{name:"Chris Paul",rarity:30},
    {name:"Scottie Pippen",rarity:25},{name:"Alvin Robertson",rarity:8},{name:"Karl Malone",rarity:15},
    {name:"Mookie Blaylock",rarity:6},
  ]},

  q_nfl_probowl10: { clue: "Name an NFL player selected to 10 or more Pro Bowls", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:72},{name:"Jerry Rice",rarity:65},{name:"Peyton Manning",rarity:60},
    {name:"Bruce Matthews",rarity:20},{name:"Merlin Olsen",rarity:15},{name:"Tony Gonzalez",rarity:35},
    {name:"Ray Lewis",rarity:42},{name:"Larry Allen",rarity:12},{name:"Reggie White",rarity:38},
    {name:"Junior Seau",rarity:25},{name:"LaDainian Tomlinson",rarity:45},{name:"Rob Gronkowski",rarity:30},
    {name:"Patrick Mahomes",rarity:28},{name:"Aaron Donald",rarity:32},
  ]},

  q_nfl_coach_150w: { clue: "Name an NFL head coach with 150 or more regular season wins", sport: "NFL", answers: [
    {name:"Bill Belichick",rarity:75},{name:"Don Shula",rarity:55},{name:"George Halas",rarity:30},
    {name:"Tom Landry",rarity:40},{name:"Curly Lambeau",rarity:18},{name:"Chuck Noll",rarity:28},
    {name:"Dan Reeves",rarity:12},{name:"Chuck Knox",rarity:10},{name:"Mike Shanahan",rarity:20},
    {name:"Andy Reid",rarity:45},{name:"Mike Tomlin",rarity:30},{name:"Tony Dungy",rarity:25},
    {name:"Marty Schottenheimer",rarity:15},
  ]},

  q_golf_us_open2: { clue: "Name a golfer who has won the US Open 2 or more times", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:82},{name:"Jack Nicklaus",rarity:72},{name:"Ben Hogan",rarity:40},
    {name:"Bobby Jones",rarity:25},{name:"Hale Irwin",rarity:18},{name:"Andy North",rarity:6},
    {name:"Curtis Strange",rarity:10},{name:"Lee Janzen",rarity:8},{name:"Ernie Els",rarity:15},
    {name:"Payne Stewart",rarity:12},{name:"Brooks Koepka",rarity:28},{name:"Retief Goosen",rarity:7},
    {name:"Cary Middlecoff",rarity:5},{name:"Ralph Guldahl",rarity:4},
  ]},

  q_tennis_career_slam: { clue: "Name a tennis player who completed the career Grand Slam (won all 4 majors)", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:72},{name:"Rafael Nadal",rarity:70},{name:"Roger Federer",rarity:75},
    {name:"Serena Williams",rarity:65},{name:"Steffi Graf",rarity:42},{name:"Andre Agassi",rarity:38},
    {name:"Rod Laver",rarity:28},{name:"Roy Emerson",rarity:10},{name:"Fred Perry",rarity:12},
    {name:"Don Budge",rarity:8},{name:"Maria Sharapova",rarity:22},{name:"Martina Navratilova",rarity:30},
    {name:"Chris Evert",rarity:25},{name:"Doris Hart",rarity:5},{name:"Shirley Fry",rarity:4},
    {name:"Margaret Court",rarity:18},
  ]},

  q_nhl_goalie_400w: { clue: "Name an NHL goalie with 400 or more career wins", sport: "NHL", answers: [
    {name:"Martin Brodeur",rarity:72},{name:"Patrick Roy",rarity:68},{name:"Marc-Andre Fleury",rarity:40},
    {name:"Roberto Luongo",rarity:28},{name:"Henrik Lundqvist",rarity:35},{name:"Curtis Joseph",rarity:18},
    {name:"Terry Sawchuk",rarity:20},{name:"Ed Belfour",rarity:22},{name:"Grant Fuhr",rarity:12},
    {name:"Mike Vernon",rarity:8},
  ]},

  q_mlb_ss_300hr: { clue: "Name an MLB shortstop with 300 or more career home runs", sport: "MLB", answers: [
    {name:"Alex Rodriguez",rarity:65},{name:"Derek Jeter",rarity:35},{name:"Ernie Banks",rarity:30},
    {name:"Cal Ripken Jr",rarity:55},{name:"Barry Larkin",rarity:15},{name:"Miguel Tejada",rarity:12},
    {name:"Nomar Garciaparra",rarity:10},{name:"Alan Trammell",rarity:8},{name:"Robin Yount",rarity:12},
    {name:"Jim Fregosi",rarity:4},{name:"Trea Turner",rarity:10},
  ]},

  q_nfl_qb_heisman: { clue: "Name an NFL quarterback who won the Heisman Trophy in college", sport: "NFL", answers: [
    {name:"Lamar Jackson",rarity:55},{name:"Cam Newton",rarity:50},{name:"Tim Tebow",rarity:62},
    {name:"Robert Griffin III",rarity:40},{name:"Marcus Mariota",rarity:35},{name:"Kyler Murray",rarity:45},
    {name:"Sam Bradford",rarity:30},{name:"Joe Burrow",rarity:42},{name:"Johnny Manziel",rarity:48},
    {name:"Jameis Winston",rarity:38},{name:"Bryce Young",rarity:28},{name:"Roger Staubach",rarity:18},
    {name:"Doug Flutie",rarity:10},{name:"Ty Detmer",rarity:6},
  ]},

  q_boxing_3weights: { clue: "Name a boxer who has won world titles in 3 or more different weight classes", sport: "Boxing", answers: [
    {name:"Manny Pacquiao",rarity:72},{name:"Oscar De La Hoya",rarity:55},{name:"Sugar Ray Leonard",rarity:42},
    {name:"Thomas Hearns",rarity:25},{name:"Roberto Duran",rarity:20},{name:"Floyd Mayweather",rarity:50},
    {name:"Roy Jones Jr",rarity:35},{name:"Canelo Alvarez",rarity:45},{name:"Ryan Garcia",rarity:10},
    {name:"Terence Crawford",rarity:28},{name:"Marvin Hagler",rarity:15},{name:"Ernie Terrell",rarity:4},
    {name:"Pernell Whitaker",rarity:8},{name:"Henry Armstrong",rarity:5},
  ]},

  q_mlb_200hits_5: { clue: "Name an MLB player who had 200 or more hits in 5 or more different seasons", sport: "MLB", answers: [
    {name:"Pete Rose",rarity:55},{name:"Ichiro Suzuki",rarity:70},{name:"Ty Cobb",rarity:42},
    {name:"Wade Boggs",rarity:35},{name:"Derek Jeter",rarity:30},{name:"Rogers Hornsby",rarity:20},
    {name:"Chuck Klein",rarity:8},{name:"Paul Waner",rarity:10},{name:"Lou Gehrig",rarity:25},
    {name:"Al Simmons",rarity:6},{name:"Charlie Gehringer",rarity:5},
  ]},

  q_mlb_manager_2000: { clue: "Name an MLB manager with 2,000 or more career wins", sport: "MLB", answers: [
    {name:"Connie Mack",rarity:30},{name:"John McGraw",rarity:20},{name:"Tony La Russa",rarity:45},
    {name:"Bobby Cox",rarity:38},{name:"Joe Torre",rarity:42},{name:"Sparky Anderson",rarity:28},
    {name:"Dusty Baker",rarity:22},{name:"Bruce Bochy",rarity:18},{name:"Bucky Harris",rarity:5},
    {name:"Joe McCarthy",rarity:10},{name:"Walter Alston",rarity:8},{name:"Leo Durocher",rarity:6},
  ]},

  q_mls_cup3: { clue: "Name an MLS club that has won 3 or more MLS Cup championships", sport: "MLS", answers: [
    {name:"LA Galaxy",rarity:68},{name:"DC United",rarity:40},{name:"San Jose Earthquakes",rarity:22},
    {name:"Columbus Crew",rarity:18},{name:"Colorado Rapids",rarity:8},{name:"Portland Timbers",rarity:12},
    {name:"Sporting Kansas City",rarity:15},{name:"Seattle Sounders",rarity:25},
  ]},

  q_nhl_vezina3: { clue: "Name an NHL goalie who won the Vezina Trophy 3 or more times", sport: "NHL", answers: [
    {name:"Dominik Hasek",rarity:60},{name:"Martin Brodeur",rarity:55},{name:"Patrick Roy",rarity:52},
    {name:"Ken Dryden",rarity:28},{name:"Bill Durnan",rarity:8},{name:"Jacques Plante",rarity:18},
    {name:"Tiny Thompson",rarity:6},{name:"Terry Sawchuk",rarity:15},{name:"Glenn Hall",rarity:10},
    {name:"Tony Esposito",rarity:12},{name:"Bernie Parent",rarity:8},{name:"Pekka Rinne",rarity:12},
    {name:"Marc-Andre Fleury",rarity:15},
  ]},

  q_tennis_french_open3: { clue: "Name a tennis player who has won the French Open 3 or more times", sport: "Tennis", answers: [
    {name:"Rafael Nadal",rarity:88},{name:"Novak Djokovic",rarity:55},{name:"Bjorn Borg",rarity:35},
    {name:"Chris Evert",rarity:30},{name:"Steffi Graf",rarity:38},{name:"Monica Seles",rarity:20},
    {name:"Martina Navratilova",rarity:12},{name:"Serena Williams",rarity:40},{name:"Justine Henin",rarity:18},
    {name:"Arantxa Sanchez Vicario",rarity:8},{name:"Ivan Lendl",rarity:15},{name:"Mats Wilander",rarity:10},
    {name:"Jim Courier",rarity:10},{name:"Roger Federer",rarity:20},
  ]},

  q_nfl_100sacks: { clue: "Name an NFL player with 100 or more career sacks", sport: "NFL", answers: [
    {name:"Bruce Smith",rarity:55},{name:"Reggie White",rarity:62},{name:"Kevin Greene",rarity:30},
    {name:"Julius Peppers",rarity:35},{name:"Chris Doleman",rarity:18},{name:"Michael Strahan",rarity:42},
    {name:"Jason Taylor",rarity:22},{name:"Dwight Freeney",rarity:25},{name:"DeMarcus Ware",rarity:28},
    {name:"Jared Allen",rarity:20},{name:"Lawrence Taylor",rarity:40},{name:"John Randle",rarity:15},
    {name:"Richard Dent",rarity:10},{name:"Derrick Thomas",rarity:22},{name:"Cameron Jordan",rarity:12},
    {name:"Aaron Donald",rarity:30},{name:"Chandler Jones",rarity:15},
  ]},

  q_tennis_us_open4: { clue: "Name a tennis player who has won the US Open 4 or more times", sport: "Tennis", answers: [
    {name:"Roger Federer",rarity:65},{name:"Pete Sampras",rarity:55},{name:"Novak Djokovic",rarity:58},
    {name:"Serena Williams",rarity:60},{name:"Steffi Graf",rarity:40},{name:"Chris Evert",rarity:30},
    {name:"Jimmy Connors",rarity:28},{name:"John McEnroe",rarity:25},{name:"Ivan Lendl",rarity:20},
    {name:"Martina Navratilova",rarity:18},{name:"Margaret Court",rarity:12},{name:"Molla Mallory",rarity:4},
    {name:"Bill Tilden",rarity:6},{name:"Richard Sears",rarity:3},
  ]},

  q_mlb_gold_glove_ss5: { clue: "Name an MLB shortstop who won 5 or more Gold Glove awards", sport: "MLB", answers: [
    {name:"Ozzie Smith",rarity:72},{name:"Omar Vizquel",rarity:45},{name:"Luis Aparicio",rarity:28},
    {name:"Mark Belanger",rarity:12},{name:"Dave Concepcion",rarity:10},{name:"Derek Jeter",rarity:35},
    {name:"Troy Tulowitzki",rarity:20},{name:"Rafael Furcal",rarity:6},{name:"Brendan Ryan",rarity:4},
  ]},

  q_olympics_swim_gold: { clue: "Name an Olympic swimmer who won 5 or more gold medals across their career", sport: "Olympics", answers: [
    {name:"Michael Phelps",rarity:88},{name:"Mark Spitz",rarity:55},{name:"Matt Biondi",rarity:20},
    {name:"Ian Thorpe",rarity:18},{name:"Ryan Lochte",rarity:22},{name:"Katie Ledecky",rarity:38},
    {name:"Janet Evans",rarity:12},{name:"Kristin Otto",rarity:6},{name:"Pieter van den Hoogenband",rarity:5},
    {name:"Amy Van Dyken",rarity:8},{name:"Caeleb Dressel",rarity:15},{name:"Penny Oleksiak",rarity:5},
  ]},

  q_nba_triple_doubles50: { clue: "Name an NBA player with 50 or more career triple-doubles", sport: "NBA", answers: [
    {name:"Russell Westbrook",rarity:72},{name:"Magic Johnson",rarity:60},{name:"Jason Kidd",rarity:42},
    {name:"LeBron James",rarity:55},{name:"Oscar Robertson",rarity:35},{name:"Rajon Rondo",rarity:20},
    {name:"Draymond Green",rarity:18},{name:"Fat Lever",rarity:6},{name:"Wilt Chamberlain",rarity:22},
    {name:"Nikola Jokic",rarity:38},{name:"James Harden",rarity:25},
  ]},

  q_nba_finals_mvp_notable: { clue: "Name an NBA player who won Finals MVP while being eliminated from future rounds", sport: "NBA", answers: [
    {name:"Jerry West",rarity:35},{name:"Chauncey Billups",rarity:45},{name:"Andre Iguodala",rarity:40},
    {name:"Kawhi Leonard",rarity:50},{name:"Giannis Antetokounmpo",rarity:42},{name:"Tony Parker",rarity:35},
    {name:"Dirk Nowitzki",rarity:48},{name:"Dwyane Wade",rarity:52},
  ]},

  q_nhl_defenseman_20g: { clue: "Name an NHL defenseman who scored 20 or more goals in 5 or more different seasons", sport: "NHL", answers: [
    {name:"Bobby Orr",rarity:72},{name:"Denis Potvin",rarity:38},{name:"Paul Coffey",rarity:45},
    {name:"Ray Bourque",rarity:40},{name:"Phil Housley",rarity:18},{name:"Al MacInnis",rarity:22},
    {name:"Larry Robinson",rarity:10},{name:"Brad Park",rarity:12},{name:"Doug Wilson",rarity:8},
  ]},

  // ══════════════════════════════════════════════════════════════════
  // EXPERT — deep cuts, SportsCenter every night
  // ══════════════════════════════════════════════════════════════════

  q_heisman_hof: { clue: "Name a Heisman Trophy winner who was also inducted into the Pro Football Hall of Fame", sport: "NFL/NCAA", answers: [
    {name:"Barry Sanders",rarity:55},{name:"Marcus Allen",rarity:30},{name:"O.J. Simpson",rarity:22},
    {name:"Roger Staubach",rarity:20},{name:"Tony Dorsett",rarity:18},{name:"Earl Campbell",rarity:15},
    {name:"Tim Brown",rarity:9},{name:"Paul Hornung",rarity:8},{name:"Doak Walker",rarity:4},
    {name:"Vic Janowicz",rarity:1},
  ]},

  q_nba_bust: { clue: "Name an NBA player drafted top-5 overall who never made an All-Star game", sport: "NBA", answers: [
    {name:"Kwame Brown",rarity:40},{name:"Anthony Bennett",rarity:35},{name:"Michael Olowokandi",rarity:22},
    {name:"Andrea Bargnani",rarity:20},{name:"Hasheem Thabeet",rarity:18},{name:"Adam Morrison",rarity:12},
    {name:"Marvin Williams",rarity:10},{name:"Olden Polynice",rarity:5},{name:"Jonathan Bender",rarity:4},
    {name:"Pervis Ellison",rarity:3},{name:"Joe Smith",rarity:8},{name:"Stromile Swift",rarity:4},
  ]},

  q_nfl_defensive: { clue: "Name an NFL player who won Defensive Player of the Year more than twice", sport: "NFL", answers: [
    {name:"Lawrence Taylor",rarity:45},{name:"Aaron Donald",rarity:30},{name:"Reggie White",rarity:35},
    {name:"Bruce Smith",rarity:25},{name:"Deion Sanders",rarity:20},{name:"Rod Woodson",rarity:12},
    {name:"Micah Parsons",rarity:10},{name:"T.J. Watt",rarity:22},
  ]},

  q_mlb_triple_crown: { clue: "Name an MLB player who won the Triple Crown since 1950", sport: "MLB", answers: [
    {name:"Miguel Cabrera",rarity:40},{name:"Mickey Mantle",rarity:35},{name:"Carl Yastrzemski",rarity:30},
    {name:"Frank Robinson",rarity:22},
  ]},

  q_nba_dpoy: { clue: "Name an NBA player who won Defensive Player of the Year 3 or more times", sport: "NBA", answers: [
    {name:"Dikembe Mutombo",rarity:50},{name:"Dwight Howard",rarity:45},{name:"Ben Wallace",rarity:40},
    {name:"Rudy Gobert",rarity:35},{name:"Mark Eaton",rarity:15},{name:"Sidney Moncrief",rarity:10},
    {name:"Alonzo Mourning",rarity:18},
  ]},

  q_nhl_cup_foreign: { clue: "Name a European-born NHL player who won 3 or more Stanley Cups", sport: "NHL", answers: [
    {name:"Peter Forsberg",rarity:45},{name:"Nicklas Lidstrom",rarity:35},{name:"Jari Kurri",rarity:20},
    {name:"Tomas Holmstrom",rarity:12},{name:"Esa Tikkanen",rarity:8},{name:"Vladimir Konstantinov",rarity:6},
    {name:"Zigmund Palffy",rarity:4},{name:"Tomas Kaberle",rarity:5},
  ]},

  q_mlb_no_hitter: { clue: "Name an MLB pitcher who threw 2 or more career no-hitters", sport: "MLB", answers: [
    {name:"Nolan Ryan",rarity:70},{name:"Sandy Koufax",rarity:40},{name:"Max Scherzer",rarity:22},
    {name:"Justin Verlander",rarity:18},{name:"Bob Feller",rarity:20},{name:"Cy Young",rarity:18},
    {name:"Jim Maloney",rarity:6},{name:"Allie Reynolds",rarity:5},{name:"Virgil Trucks",rarity:5},
    {name:"Larry Corcoran",rarity:4},{name:"Bob Forsch",rarity:4},{name:"Ken Holtzman",rarity:5},
  ]},

  q_nfl_coach_rings: { clue: "Name an NFL head coach who won 3 or more Super Bowls", sport: "NFL", answers: [
    {name:"Bill Belichick",rarity:70},{name:"Chuck Noll",rarity:30},{name:"Joe Gibbs",rarity:22},
    {name:"Bill Walsh",rarity:20},{name:"Vince Lombardi",rarity:18},{name:"Tom Landry",rarity:12},
  ]},

  q_nba_60pts: { clue: "Name an NBA player who scored 60 or more points in a single game (post-1975)", sport: "NBA", answers: [
    {name:"Kobe Bryant",rarity:72},{name:"Devin Booker",rarity:30},{name:"David Thompson",rarity:10},
    {name:"David Robinson",rarity:20},{name:"Michael Jordan",rarity:55},{name:"James Harden",rarity:25},
    {name:"LeBron James",rarity:22},{name:"Donovan Mitchell",rarity:15},{name:"Luka Doncic",rarity:18},
    {name:"Giannis Antetokounmpo",rarity:12},{name:"Damian Lillard",rarity:14},{name:"Carmelo Anthony",rarity:20},
    {name:"Karl-Anthony Towns",rarity:8},{name:"Kemba Walker",rarity:10},
  ]},

  q_mlb_steals100: { clue: "Name an MLB player who stole 100 or more bases in a single season", sport: "MLB", answers: [
    {name:"Rickey Henderson",rarity:72},{name:"Lou Brock",rarity:45},{name:"Vince Coleman",rarity:40},
    {name:"Maury Wills",rarity:25},
  ]},

  q_nba_score_rebound: { clue: "Name an NBA player who led the league in both scoring and rebounding in the same season", sport: "NBA", answers: [
    {name:"Wilt Chamberlain",rarity:75},{name:"Bob Pettit",rarity:20},{name:"Neil Johnston",rarity:8},
    {name:"Kevin Garnett",rarity:15},{name:"Giannis Antetokounmpo",rarity:12},
  ]},

  q_nhl_20streak: { clue: "Name an NHL player who scored a goal in 20 or more consecutive games", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:78},{name:"Mario Lemieux",rarity:45},{name:"Mike Bossy",rarity:25},
    {name:"Charlie Simmer",rarity:6},{name:"Punch Broadbent",rarity:4},{name:"Harry Broadbent",rarity:3},
    {name:"Guy Lafleur",rarity:12},{name:"Joe Malone",rarity:4},{name:"Nels Stewart",rarity:3},
    {name:"Cy Denneny",rarity:3},{name:"Pavel Bure",rarity:10},
  ]},

  q_soccer_4worldcups: { clue: "Name a soccer player who appeared in 4 or more FIFA World Cups", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:72},{name:"Cristiano Ronaldo",rarity:68},{name:"Lothar Matthaus",rarity:20},
    {name:"Antonio Carbajal",rarity:8},{name:"Rafael Marquez",rarity:10},{name:"Andres Guardado",rarity:8},
    {name:"Grzegorz Lato",rarity:5},{name:"Sepp Maier",rarity:6},{name:"Uwe Seeler",rarity:8},
    {name:"Youri Djorkaeff",rarity:5},{name:"Hassan El-Shaarawy",rarity:3},{name:"Mohammed Al-Deayea",rarity:3},
  ]},

  q_olympics_5games: { clue: "Name an Olympic athlete who competed in 5 or more Olympic Games", sport: "Olympics", answers: [
    {name:"Usain Bolt",rarity:55},{name:"Michael Phelps",rarity:65},{name:"Carl Lewis",rarity:40},
    {name:"Aleksandr Karelin",rarity:10},{name:"Ian Millar",rarity:5},{name:"Nino Salukvadze",rarity:3},
    {name:"Aladar Gerevich",rarity:4},{name:"Birgit Fischer",rarity:6},{name:"Jaqueline Mourão",rarity:2},
    {name:"Lesley Thompson-Willie",rarity:3},{name:"Laura Wilkinson",rarity:2},
  ]},

  q_golf_career_slam: { clue: "Name a golfer who completed the career Grand Slam (won all 4 major championships)", sport: "Golf", answers: [
    {name:"Tiger Woods",rarity:82},{name:"Jack Nicklaus",rarity:75},{name:"Gary Player",rarity:40},
    {name:"Gene Sarazen",rarity:18},{name:"Ben Hogan",rarity:25},{name:"Phil Mickelson",rarity:35},
  ]},

  q_mlb_pitcher_20k: { clue: "Name an MLB pitcher who struck out 20 batters in a single game", sport: "MLB", answers: [
    {name:"Roger Clemens",rarity:65},{name:"Kerry Wood",rarity:40},{name:"Max Scherzer",rarity:30},
    {name:"Randy Johnson",rarity:15},{name:"Tom Cheney",rarity:5},
  ]},

  q_nba_undrafted_star: { clue: "Name an NBA player who went undrafted but was named to at least 3 All-Star teams", sport: "NBA", answers: [
    {name:"Ben Wallace",rarity:62},{name:"Brad Miller",rarity:10},{name:"Udonis Haslem",rarity:8},
    {name:"Devean George",rarity:3},{name:"Avery Bradley",rarity:4},{name:"Bobby Portis",rarity:4},
    {name:"Fred VanVleet",rarity:15},{name:"Jose Calderon",rarity:6},
  ]},

  q_nfl_sb4_player: { clue: "Name an NFL player who appeared in 4 or more Super Bowls", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:78},{name:"Mike Lodish",rarity:6},{name:"Larry Brown",rarity:8},
    {name:"Cornelius Bennett",rarity:10},{name:"Mark Kelso",rarity:5},{name:"Jim Kelly",rarity:45},
    {name:"Don Beebe",rarity:8},{name:"Darryl Talley",rarity:6},{name:"Bruce Smith",rarity:35},
    {name:"Andre Reed",rarity:30},{name:"Thurman Thomas",rarity:40},{name:"Marv Levy",rarity:3},
    {name:"Charles Haley",rarity:22},{name:"Emmitt Smith",rarity:32},{name:"Troy Aikman",rarity:30},
  ]},

  q_nhl_5goals_game: { clue: "Name an NHL player who scored 5 goals in a single regular season game", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:70},{name:"Mario Lemieux",rarity:55},{name:"Darryl Sittler",rarity:18},
    {name:"Red Berenson",rarity:8},{name:"Bryan Trottier",rarity:10},{name:"Mark Pavelich",rarity:5},
    {name:"Joe Malone",rarity:6},{name:"Cy Denneny",rarity:3},{name:"Newsy Lalonde",rarity:3},
    {name:"Mats Sundin",rarity:8},{name:"Sergei Fedorov",rarity:10},
  ]},

  q_mlb_cycles: { clue: "Name an MLB player who hit for the natural cycle (single, double, triple, HR in order)", sport: "MLB", answers: [
    {name:"Bengie Molina",rarity:6},{name:"Carlos Gonzalez",rarity:8},{name:"Babe Herman",rarity:5},
    {name:"Ty Cobb",rarity:15},{name:"George Burns",rarity:4},{name:"Bob Watson",rarity:5},
    {name:"Cesar Cedeno",rarity:4},
  ]},

  q_nfl_100sacks_expert: { clue: "Name an NFL defensive end or linebacker with exactly 100 to 120 career sacks", sport: "NFL", answers: [
    {name:"Reggie White",rarity:55},{name:"Michael Strahan",rarity:40},{name:"DeMarcus Ware",rarity:28},
    {name:"Jared Allen",rarity:20},{name:"John Randle",rarity:15},{name:"Jason Taylor",rarity:18},
    {name:"Richard Dent",rarity:10},{name:"Derrick Thomas",rarity:22},{name:"Kevin Greene",rarity:25},
  ]},

  q_mlb_300_300: { clue: "Name an MLB player with 300+ career home runs AND 300+ career stolen bases", sport: "MLB", answers: [
    {name:"Willie Mays",rarity:60},{name:"Barry Bonds",rarity:55},{name:"Andre Dawson",rarity:20},
    {name:"Reggie Sanders",rarity:5},{name:"Steve Finley",rarity:4},{name:"Raul Mondesi",rarity:5},
    {name:"Eric Davis",rarity:6},{name:"Larry Doby",rarity:8},{name:"Chili Davis",rarity:5},
  ]},

  q_nba_triple_double_season: { clue: "Name an NBA player who averaged a triple-double for an entire season", sport: "NBA", answers: [
    {name:"Russell Westbrook",rarity:72},{name:"Oscar Robertson",rarity:40},{name:"Nikola Jokic",rarity:30},
    {name:"LeBron James",rarity:12},
  ]},

  q_nfl_qb_100wins: { clue: "Name an NFL quarterback with 100 or more regular season wins as a starter", sport: "NFL", answers: [
    {name:"Tom Brady",rarity:82},{name:"Peyton Manning",rarity:70},{name:"Brett Favre",rarity:62},
    {name:"Ben Roethlisberger",rarity:45},{name:"John Elway",rarity:48},{name:"Dan Marino",rarity:52},
    {name:"Aaron Rodgers",rarity:50},{name:"Philip Rivers",rarity:35},{name:"Drew Brees",rarity:55},
    {name:"Matt Ryan",rarity:25},{name:"Joe Montana",rarity:42},{name:"Steve Young",rarity:22},
    {name:"Eli Manning",rarity:30},{name:"Troy Aikman",rarity:28},{name:"Tony Romo",rarity:20},
    {name:"Patrick Mahomes",rarity:40},
  ]},

  q_golf_major_40: { clue: "Name a PGA Tour golfer who won a major championship after turning 40", sport: "Golf", answers: [
    {name:"Phil Mickelson",rarity:55},{name:"Jack Nicklaus",rarity:60},{name:"Gary Player",rarity:35},
    {name:"Tom Watson",rarity:30},{name:"Hale Irwin",rarity:20},{name:"Ben Hogan",rarity:15},
    {name:"Julius Boros",rarity:6},{name:"Lee Trevino",rarity:12},{name:"Raymond Floyd",rarity:8},
    {name:"Mark O'Meara",rarity:10},
  ]},

  q_nhl_playoff_50goals: { clue: "Name an NHL player who scored 50 or more career playoff goals", sport: "NHL", answers: [
    {name:"Wayne Gretzky",rarity:75},{name:"Mark Messier",rarity:45},{name:"Jari Kurri",rarity:25},
    {name:"Glenn Anderson",rarity:12},{name:"Mike Bossy",rarity:22},{name:"Dino Ciccarelli",rarity:10},
    {name:"Mario Lemieux",rarity:55},{name:"Brendan Shanahan",rarity:15},{name:"Brett Hull",rarity:30},
    {name:"Jean Beliveau",rarity:20},{name:"Maurice Richard",rarity:18},
  ]},

  q_soccer_wc_top_scorer: { clue: "Name a player in the top 5 all-time World Cup scoring list", sport: "Soccer", answers: [
    {name:"Miroslav Klose",rarity:38},{name:"Ronaldo Nazario",rarity:42},{name:"Gerd Muller",rarity:22},
    {name:"Lionel Messi",rarity:55},{name:"Just Fontaine",rarity:8},{name:"Pelé",rarity:35},
    {name:"Kylian Mbappe",rarity:20},{name:"Sandor Kocsis",rarity:5},{name:"Helmut Rahn",rarity:4},
  ]},

  q_nba_oldest_youngest: { clue: "Name an NBA player who was selected to the All-Star game at age 19 or younger", sport: "NBA", answers: [
    {name:"LeBron James",rarity:70},{name:"Kobe Bryant",rarity:65},{name:"Kevin Garnett",rarity:35},
    {name:"Dwight Howard",rarity:28},{name:"Jermaine O'Neal",rarity:10},{name:"Zion Williamson",rarity:20},
    {name:"Luka Doncic",rarity:15},
  ]},

  q_mlb_cy_consecutive: { clue: "Name an MLB pitcher who won back-to-back Cy Young Awards", sport: "MLB", answers: [
    {name:"Randy Johnson",rarity:55},{name:"Greg Maddux",rarity:50},{name:"Roger Clemens",rarity:48},
    {name:"Clayton Kershaw",rarity:38},{name:"Pedro Martinez",rarity:42},{name:"Tim Lincecum",rarity:22},
    {name:"Gaylord Perry",rarity:8},{name:"Bret Saberhagen",rarity:10},{name:"Denny McLain",rarity:8},
    {name:"Vida Blue",rarity:6},{name:"Tom Seaver",rarity:12},{name:"Jim Lonborg",rarity:4},
    {name:"Sandy Koufax",rarity:18},{name:"Dwight Gooden",rarity:12},{name:"Zack Greinke",rarity:10},
  ]},

  q_tennis_australian_open5: { clue: "Name a tennis player who has won the Australian Open 5 or more times", sport: "Tennis", answers: [
    {name:"Novak Djokovic",rarity:72},{name:"Roger Federer",rarity:60},{name:"Roy Emerson",rarity:8},
    {name:"Rafael Nadal",rarity:30},{name:"Andre Agassi",rarity:20},{name:"Ken Rosewall",rarity:6},
    {name:"Serena Williams",rarity:42},{name:"Steffi Graf",rarity:22},{name:"Martina Navratilova",rarity:12},
    {name:"Monica Seles",rarity:10},{name:"Daniil Medvedev",rarity:8},{name:"Margaret Court",rarity:18},
  ]},

  q_multisport_pro: { clue: "Name an athlete who played professionally in two different major North American sports leagues", sport: "Multi", answers: [
    {name:"Bo Jackson",rarity:75},{name:"Deion Sanders",rarity:70},{name:"Jim Thorpe",rarity:30},
    {name:"Danny Ainge",rarity:25},{name:"Dave DeBusschere",rarity:12},{name:"Ron Reed",rarity:6},
    {name:"Mark Hendrickson",rarity:5},{name:"Dick Groat",rarity:4},{name:"Gene Conley",rarity:6},
    {name:"Steve Hamilton",rarity:4},{name:"Tim Stoddard",rarity:3},{name:"Garfield Heard",rarity:3},
  ]},

  q_nba_block_leaders: { clue: "Name an NBA player among the all-time top 5 career blocks leaders", sport: "NBA", answers: [
    {name:"Hakeem Olajuwon",rarity:62},{name:"Dikembe Mutombo",rarity:55},{name:"Kareem Abdul-Jabbar",rarity:45},
    {name:"Mark Eaton",rarity:18},{name:"Tim Duncan",rarity:38},{name:"David Robinson",rarity:30},
    {name:"Patrick Ewing",rarity:25},{name:"Tree Rollins",rarity:6},{name:"Robert Parish",rarity:10},
  ]},

};

// ─── DIFFICULTY POOLS ────────────────────────────────────────────────────────
// Each pool has 30+ questions; buildPuzzle randomly draws 9 per game so
// no two games feel the same.
export const QUESTION_BANK = {
  beginner: [
    "q_nba_champ","q_nfl_sb_qb","q_mlb_hr","q_nba_50pts","q_nfl_rushing",
    "q_mlb_batting","q_nba_scoring","q_nfl_sb_mvp","q_mlb_cy_young",
    "q_nba_mvp_multiple","q_mlb_3000_hits","q_tennis_slams10","q_golf_majors3",
    "q_nfl_td_receiving","q_nba_points_20k","q_boxing_hw_champ","q_soccer_ballon_dor",
    "q_nfl_qb_tds","q_college_bball_ncaa","q_nba_rebounds_10k","q_nfl_teams_5sb",
    "q_mlb_ws_rings3","q_tennis_wimbledon5","q_nhl_teams_5cup","q_golf_masters2",
    "q_nfl_rush_td100","q_soccer_intl_goals","q_college_fb_titles","q_nba_career_assists",
    "q_nfl_hall_qb","q_nba_steals_career","q_soccer_ucl","q_nhl_hart3",
  ],
  knowledgeable: [
    "q_nhl_goals","q_300_wins","q_nhl_50goals","q_two_decades","q_mlb_stolen",
    "q_nba_assists","q_nfl_receiving","q_nhl_points","q_mlb_strikeouts",
    "q_nba_steals_2k","q_nfl_probowl10","q_nfl_coach_150w","q_golf_us_open2",
    "q_tennis_career_slam","q_nhl_goalie_400w","q_mlb_ss_300hr","q_nfl_qb_heisman",
    "q_boxing_3weights","q_mlb_200hits_5","q_mlb_manager_2000","q_mls_cup3",
    "q_nhl_vezina3","q_tennis_french_open3","q_nfl_100sacks","q_tennis_us_open4",
    "q_mlb_gold_glove_ss5","q_olympics_swim_gold","q_nba_triple_doubles50",
    "q_nba_finals_mvp_notable","q_nhl_defenseman_20g","q_mlb_manager_2000",
  ],
  expert: [
    "q_heisman_hof","q_nba_bust","q_nfl_defensive","q_mlb_triple_crown","q_nba_dpoy",
    "q_nhl_cup_foreign","q_mlb_no_hitter","q_nfl_coach_rings","q_nba_60pts",
    "q_mlb_steals100","q_nba_score_rebound","q_nhl_20streak","q_soccer_4worldcups",
    "q_olympics_5games","q_golf_career_slam","q_mlb_pitcher_20k","q_nba_undrafted_star",
    "q_nfl_sb4_player","q_nhl_5goals_game","q_mlb_cycles","q_mlb_300_300",
    "q_nba_triple_double_season","q_nfl_qb_100wins","q_golf_major_40",
    "q_nhl_playoff_50goals","q_soccer_wc_top_scorer","q_nba_oldest_youngest",
    "q_mlb_cy_consecutive","q_tennis_australian_open5","q_multisport_pro",
    "q_nba_block_leaders","q_two_decades",
  ],
};

export const DIFFICULTY_META = {
  beginner:      { label: "BEGINNER",      sublabel: "The basics — any sports fan should know these", color: "#4ECDC4" },
  knowledgeable: { label: "KNOWLEDGEABLE", sublabel: "For the dedicated sports fan",                  color: "#F7B731" },
  expert:        { label: "EXPERT",        sublabel: "Deep cuts. SportsCenter every night.",           color: "#FC5C65" },
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────

/** Shuffle the pool and return 9 random questions for a new game. */
export function buildPuzzle(difficulty) {
  const bank = [...QUESTION_BANK[difficulty]];
  for (let i = bank.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bank[i], bank[j]] = [bank[j], bank[i]];
  }
  return bank.slice(0, 9).map(k => ({ questionKey: k }));
}

/** Normalize a string for fuzzy answer matching. */
export function normalizeStr(s) {
  return s.toLowerCase()
    .replace(/-/g, " ").replace(/\./g, "")
    .replace(/[^a-z0-9\s]/g, "").replace(/\s+/g, " ").trim();
}

/** Return the matching answer object, or null if the guess isn't valid. */
export function matchAnswer(guess, questionKey) {
  const pool = ANSWER_POOLS[questionKey];
  if (!pool) return null;
  const g = normalizeStr(guess);
  for (const answer of pool.answers) {
    if (normalizeStr(answer.name) === g) return answer;
  }
  return null;
}

/** Flat, deduplicated, sorted list of every name — used for autocomplete. */
export const ATHLETE_INDEX = (() => {
  const seen = {}, list = [];
  Object.values(ANSWER_POOLS).forEach(pool =>
    pool.answers.forEach(a => {
      if (!seen[a.name]) { seen[a.name] = true; list.push(a.name); }
    })
  );
  return list.sort((a, b) => a.localeCompare(b));
})();
