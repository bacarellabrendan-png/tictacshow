// ─── EUROPEAN SOCCER & CHAMPIONS LEAGUE QUESTIONS ────────────────────────────
// Covers: Premier League, La Liga, Bundesliga, Serie A, Ligue 1, Champions League,
//         FIFA World Cup, and international soccer legends.

export const SOCCER_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_soccer_ucl_3wins: { clue: "Name a player who has won the UEFA Champions League 3 or more times as a player", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:88},{name:"Luka Modric",rarity:72},{name:"Marcelo",rarity:68},
    {name:"Toni Kroos",rarity:65},{name:"Dani Carvajal",rarity:60},{name:"Nacho",rarity:40},
    {name:"Karim Benzema",rarity:82},{name:"Sergio Ramos",rarity:75},{name:"Raphael Varane",rarity:62},
    {name:"Gareth Bale",rarity:55},{name:"Casemiro",rarity:48},{name:"Isco",rarity:38},
    {name:"Lucas Vazquez",rarity:30},{name:"Keylor Navas",rarity:28},{name:"Iker Casillas",rarity:50},
    {name:"Roberto Carlos",rarity:45},{name:"Paolo Maldini",rarity:72},{name:"Clarence Seedorf",rarity:58},
    {name:"Lionel Messi",rarity:88},{name:"Xavi",rarity:72},{name:"Andres Iniesta",rarity:70},
    {name:"Dani Alves",rarity:55},{name:"Gerard Pique",rarity:62},{name:"Carles Puyol",rarity:45},
    {name:"Xabi Alonso",rarity:42},{name:"Gennaro Gattuso",rarity:32},{name:"Andrea Pirlo",rarity:45},
    {name:"Alessandro Costacurta",rarity:35},{name:"Filippo Inzaghi",rarity:38},
  ]},

  q_soccer_ballon_dor: { clue: "Name a soccer player who has won the Ballon d'Or award multiple times", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Cristiano Ronaldo",rarity:82},{name:"Michel Platini",rarity:22},
    {name:"Johan Cruyff",rarity:18},{name:"Marco van Basten",rarity:15},{name:"Ronaldo Nazario",rarity:25},
    {name:"Ronaldinho",rarity:20},{name:"Kevin Keegan",rarity:8},{name:"Karl-Heinz Rummenigge",rarity:5},
    {name:"Alfredo Di Stefano",rarity:10},
  ]},

  q_soccer_ucl: { clue: "Name a soccer club that has won the UEFA Champions League 5 or more times", sport: "Soccer", answers: [
    {name:"Real Madrid",rarity:82},{name:"AC Milan",rarity:55},{name:"Bayern Munich",rarity:60},
    {name:"Liverpool",rarity:52},{name:"Ajax",rarity:28},{name:"Barcelona",rarity:58},
    {name:"Juventus",rarity:20},{name:"Benfica",rarity:8},{name:"Inter Milan",rarity:15},
    {name:"Nottingham Forest",rarity:5},
  ]},

  q_soccer_intl_goals: { clue: "Name a male soccer player with 80 or more international goals", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:82},{name:"Lionel Messi",rarity:78},{name:"Ali Daei",rarity:12},
    {name:"Romelu Lukaku",rarity:20},{name:"Robert Lewandowski",rarity:25},{name:"Sunil Chhetri",rarity:5},
    {name:"Didier Drogba",rarity:15},{name:"Kylian Mbappe",rarity:45},
  ]},

  q_soccer_ballon_dor5: { clue: "Name a soccer player who has won the Ballon d'Or 5 or more times", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Cristiano Ronaldo",rarity:82},
  ]},

  q_soccer_prem_top_scorer: { clue: "Name a player in the Premier League's all-time top 5 goalscorers", sport: "Soccer", answers: [
    {name:"Alan Shearer",rarity:82},{name:"Wayne Rooney",rarity:78},{name:"Andrew Cole",rarity:55},
    {name:"Frank Lampard",rarity:62},{name:"Thierry Henry",rarity:72},{name:"Harry Kane",rarity:68},
  ]},

  q_soccer_real_madrid_ucl: { clue: "Name a player who won the Champions League with Real Madrid", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:88},{name:"Zinedine Zidane",rarity:75},{name:"Karim Benzema",rarity:82},
    {name:"Sergio Ramos",rarity:72},{name:"Luka Modric",rarity:68},{name:"Roberto Carlos",rarity:55},
    {name:"Raul",rarity:50},{name:"Iker Casillas",rarity:45},{name:"Marcelo",rarity:48},
    {name:"Toni Kroos",rarity:58},{name:"Casemiro",rarity:42},{name:"Raphael Varane",rarity:55},
    {name:"Gareth Bale",rarity:40},{name:"Fernando Morientes",rarity:25},{name:"Fernando Hierro",rarity:30},
    {name:"Clarence Seedorf",rarity:22},{name:"Michel Salgado",rarity:15},{name:"Guti",rarity:18},
    {name:"Steve McManaman",rarity:20},{name:"Ivan Zamorano",rarity:10},
  ]},

  q_soccer_barca_ucl: { clue: "Name a player who won the Champions League with Barcelona", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Xavi",rarity:75},{name:"Andres Iniesta",rarity:72},
    {name:"Gerard Pique",rarity:65},{name:"Carles Puyol",rarity:55},{name:"Dani Alves",rarity:52},
    {name:"Victor Valdes",rarity:28},{name:"Samuel Eto'o",rarity:55},{name:"Ronaldinho",rarity:70},
    {name:"Thierry Henry",rarity:50},{name:"Zlatan Ibrahimovic",rarity:40},{name:"David Villa",rarity:38},
    {name:"Cesc Fabregas",rarity:42},{name:"Pedro",rarity:32},{name:"Sergi Busquets",rarity:45},
    {name:"Eric Abidal",rarity:22},{name:"Henrik Larsson",rarity:18},{name:"Patrick Kluivert",rarity:20},
    {name:"Luis Enrique",rarity:15},{name:"Ronald Koeman",rarity:22},
  ]},

  q_soccer_world_cup_winner: { clue: "Name a player who won the FIFA World Cup since 1990", sport: "Soccer", answers: [
    {name:"Ronaldo Nazario",rarity:75},{name:"Ronaldinho",rarity:50},{name:"Rivaldo",rarity:48},
    {name:"Roberto Carlos",rarity:52},{name:"Cafu",rarity:40},{name:"Zinedine Zidane",rarity:72},
    {name:"Thierry Henry",rarity:68},{name:"Marcel Desailly",rarity:32},{name:"Lillian Thuram",rarity:22},
    {name:"Laurent Blanc",rarity:20},{name:"Emmanuel Petit",rarity:18},{name:"Youri Djorkaeff",rarity:15},
    {name:"Kylian Mbappe",rarity:62},{name:"Antoine Griezmann",rarity:55},{name:"N'Golo Kante",rarity:48},
    {name:"Paul Pogba",rarity:38},{name:"Hugo Lloris",rarity:35},{name:"Raphael Varane",rarity:40},
    {name:"Lothar Matthaus",rarity:28},{name:"Jurgen Klinsmann",rarity:22},{name:"Miroslav Klose",rarity:35},
    {name:"Thomas Muller",rarity:42},{name:"Manuel Neuer",rarity:45},{name:"Philipp Lahm",rarity:30},
    {name:"Mesut Ozil",rarity:38},{name:"Mario Gotze",rarity:32},{name:"Lionel Messi",rarity:78},
    {name:"Angel Di Maria",rarity:45},{name:"Lautaro Martinez",rarity:35},
  ]},

  q_soccer_ucl_100_goals: { clue: "Name a player who scored 100 or more goals in the UEFA Champions League", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:88},{name:"Lionel Messi",rarity:85},{name:"Karim Benzema",rarity:72},
    {name:"Robert Lewandowski",rarity:55},{name:"Raul",rarity:45},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_soccer_man_utd_treble: { clue: "Name a player who was part of Manchester United's 1999 treble-winning squad", sport: "Soccer", answers: [
    {name:"David Beckham",rarity:80},{name:"Roy Keane",rarity:72},{name:"Andy Cole",rarity:65},
    {name:"Dwight Yorke",rarity:68},{name:"Peter Schmeichel",rarity:75},{name:"Gary Neville",rarity:60},
    {name:"Ryan Giggs",rarity:78},{name:"Paul Scholes",rarity:70},{name:"Jaap Stam",rarity:52},
    {name:"Ole Gunnar Solskjaer",rarity:58},{name:"Denis Irwin",rarity:42},{name:"Teddy Sheringham",rarity:48},
    {name:"Ronny Johnsen",rarity:22},{name:"Nicky Butt",rarity:35},{name:"Phil Neville",rarity:30},
    {name:"Jesper Blomqvist",rarity:12},{name:"Henning Berg",rarity:10},
  ]},

  q_soccer_barca_treble: { clue: "Name a player who was part of Barcelona's 2009 or 2015 treble-winning squad", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:88},{name:"Xavi",rarity:75},{name:"Andres Iniesta",rarity:72},
    {name:"Gerard Pique",rarity:65},{name:"Carles Puyol",rarity:55},{name:"Dani Alves",rarity:52},
    {name:"Samuel Eto'o",rarity:55},{name:"Thierry Henry",rarity:48},{name:"Zlatan Ibrahimovic",rarity:40},
    {name:"Sergio Busquets",rarity:45},{name:"Neymar",rarity:70},{name:"Luis Suarez",rarity:68},
    {name:"Pedro",rarity:32},{name:"Javier Mascherano",rarity:35},{name:"Jeremy Mathieu",rarity:10},
    {name:"Jordi Alba",rarity:38},{name:"Marc-Andre ter Stegen",rarity:42},
  ]},

  q_soccer_germany_wc: { clue: "Name a player who won the FIFA World Cup with Germany", sport: "Soccer", answers: [
    {name:"Miroslav Klose",rarity:62},{name:"Thomas Muller",rarity:70},{name:"Manuel Neuer",rarity:68},
    {name:"Philipp Lahm",rarity:58},{name:"Mesut Ozil",rarity:55},{name:"Mario Gotze",rarity:50},
    {name:"Toni Kroos",rarity:52},{name:"Per Mertesacker",rarity:32},{name:"Bastian Schweinsteiger",rarity:45},
    {name:"Jurgen Klinsmann",rarity:38},{name:"Lothar Matthaus",rarity:42},{name:"Franz Beckenbauer",rarity:55},
    {name:"Gerd Muller",rarity:48},{name:"Sepp Maier",rarity:22},{name:"Berti Vogts",rarity:15},
    {name:"Karl-Heinz Rummenigge",rarity:28},{name:"Rudi Voller",rarity:22},
  ]},

  q_soccer_france_wc: { clue: "Name a player who won the FIFA World Cup with France (1998 or 2018)", sport: "Soccer", answers: [
    {name:"Zinedine Zidane",rarity:82},{name:"Thierry Henry",rarity:78},{name:"Kylian Mbappe",rarity:72},
    {name:"Antoine Griezmann",rarity:65},{name:"N'Golo Kante",rarity:58},{name:"Paul Pogba",rarity:55},
    {name:"Hugo Lloris",rarity:48},{name:"Raphael Varane",rarity:45},{name:"Marcel Desailly",rarity:35},
    {name:"Lillian Thuram",rarity:28},{name:"Laurent Blanc",rarity:25},{name:"Emmanuel Petit",rarity:22},
    {name:"Youri Djorkaeff",rarity:18},{name:"Robert Pires",rarity:32},{name:"Didier Deschamps",rarity:30},
    {name:"Patrick Vieira",rarity:42},{name:"David Trezeguet",rarity:38},{name:"Lassana Diarra",rarity:10},
  ]},

  q_soccer_prem_100goals: { clue: "Name a player who scored 100 or more Premier League goals", sport: "Soccer", answers: [
    {name:"Alan Shearer",rarity:88},{name:"Wayne Rooney",rarity:82},{name:"Andrew Cole",rarity:65},
    {name:"Frank Lampard",rarity:72},{name:"Thierry Henry",rarity:78},{name:"Harry Kane",rarity:75},
    {name:"Robbie Fowler",rarity:55},{name:"Michael Owen",rarity:62},{name:"Jermain Defoe",rarity:48},
    {name:"Nicolas Anelka",rarity:42},{name:"Sergio Aguero",rarity:70},{name:"Les Ferdinand",rarity:38},
    {name:"Teddy Sheringham",rarity:32},{name:"Jimmy Floyd Hasselbaink",rarity:35},{name:"Dion Dublin",rarity:22},
    {name:"Ole Gunnar Solskjaer",rarity:28},{name:"Marcus Rashford",rarity:30},{name:"Jamie Vardy",rarity:42},
    {name:"Didier Drogba",rarity:58},{name:"Dennis Bergkamp",rarity:50},{name:"Emile Heskey",rarity:18},
    {name:"Peter Crouch",rarity:20},{name:"Mo Salah",rarity:62},{name:"Son Heung-min",rarity:38},
    {name:"Romelu Lukaku",rarity:35},
  ]},

  q_soccer_man_city_champ: { clue: "Name a player who won the Premier League with Manchester City since 2012", sport: "Soccer", answers: [
    {name:"Kevin De Bruyne",rarity:80},{name:"Sergio Aguero",rarity:78},{name:"Raheem Sterling",rarity:68},
    {name:"Vincent Kompany",rarity:65},{name:"David Silva",rarity:72},{name:"Leroy Sane",rarity:52},
    {name:"Bernardo Silva",rarity:55},{name:"Ilkay Gundogan",rarity:48},{name:"Ederson",rarity:42},
    {name:"John Stones",rarity:38},{name:"Kyle Walker",rarity:40},{name:"Riyad Mahrez",rarity:45},
    {name:"Erling Haaland",rarity:58},{name:"Phil Foden",rarity:55},{name:"Rodri",rarity:48},
    {name:"Fernandinho",rarity:35},{name:"Pablo Zabaleta",rarity:22},{name:"Yaya Toure",rarity:42},
    {name:"Edin Dzeko",rarity:28},{name:"Carlos Tevez",rarity:38},{name:"Nicolas Otamendi",rarity:18},
  ]},

  q_soccer_chelsea_champ: { clue: "Name a player who won the Premier League with Chelsea", sport: "Soccer", answers: [
    {name:"Frank Lampard",rarity:75},{name:"John Terry",rarity:72},{name:"Didier Drogba",rarity:70},
    {name:"Claude Makelele",rarity:50},{name:"Ashley Cole",rarity:55},{name:"Petr Cech",rarity:65},
    {name:"William Gallas",rarity:28},{name:"Eidur Gudjohnsen",rarity:35},{name:"Joe Cole",rarity:38},
    {name:"Michael Essien",rarity:42},{name:"Ricardo Carvalho",rarity:32},{name:"Arjen Robben",rarity:45},
    {name:"Eden Hazard",rarity:68},{name:"Cesc Fabregas",rarity:48},{name:"Diego Costa",rarity:55},
    {name:"N'Golo Kante",rarity:58},{name:"Thibaut Courtois",rarity:52},{name:"Gary Cahill",rarity:30},
    {name:"Cesar Azpilicueta",rarity:25},{name:"Victor Moses",rarity:18},
  ]},

  q_soccer_liverpool_champ: { clue: "Name a player who won the Premier League OR the Champions League with Liverpool since 2000", sport: "Soccer", answers: [
    {name:"Steven Gerrard",rarity:80},{name:"Mo Salah",rarity:75},{name:"Virgil van Dijk",rarity:70},
    {name:"Sadio Mane",rarity:65},{name:"Roberto Firmino",rarity:60},{name:"Alisson Becker",rarity:55},
    {name:"Trent Alexander-Arnold",rarity:50},{name:"Andy Robertson",rarity:48},{name:"Jordan Henderson",rarity:45},
    {name:"Xabi Alonso",rarity:55},{name:"Jamie Carragher",rarity:45},{name:"Sami Hyypia",rarity:28},
    {name:"Emile Heskey",rarity:22},{name:"Dietmar Hamann",rarity:20},{name:"Robbie Fowler",rarity:35},
    {name:"Michael Owen",rarity:42},{name:"Fabio Aurelio",rarity:8},{name:"Vladimir Smicer",rarity:10},
    {name:"Djibril Cisse",rarity:15},{name:"Luis Garcia",rarity:25},{name:"Jerzy Dudek",rarity:18},
    {name:"Divock Origi",rarity:22},{name:"Georginio Wijnaldum",rarity:28},{name:"Fabinho",rarity:32},
    {name:"Luis Suarez",rarity:60},{name:"Fernando Torres",rarity:48},
  ]},

  q_soccer_bundesliga_scorer: { clue: "Name a player who has scored 30 or more Bundesliga goals in a single season", sport: "Soccer", answers: [
    {name:"Robert Lewandowski",rarity:82},{name:"Gerd Muller",rarity:68},{name:"Erling Haaland",rarity:72},
    {name:"Dieter Muller",rarity:18},{name:"Klaus Fischer",rarity:15},{name:"Jupp Heynckes",rarity:10},
    {name:"Thomas Muller",rarity:35},{name:"Pierre-Emerick Aubameyang",rarity:38},
  ]},

  q_soccer_golden_boot_prem: { clue: "Name a player who won the Premier League Golden Boot (top scorer) 3 or more times", sport: "Soccer", answers: [
    {name:"Alan Shearer",rarity:75},{name:"Thierry Henry",rarity:70},{name:"Mo Salah",rarity:65},
    {name:"Harry Kane",rarity:60},{name:"Andrew Cole",rarity:40},{name:"Robin van Persie",rarity:45},
    {name:"Kevin Phillips",rarity:22},{name:"Robbie Fowler",rarity:30},{name:"Michael Owen",rarity:35},
    {name:"Didier Drogba",rarity:42},{name:"Nicolas Anelka",rarity:25},
  ]},

  q_soccer_juventus_serie_a: { clue: "Name a player who won Serie A with Juventus in the 2010s run of 9 consecutive titles", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:82},{name:"Paulo Dybala",rarity:68},{name:"Giorgio Chiellini",rarity:62},
    {name:"Leonardo Bonucci",rarity:58},{name:"Andrea Pirlo",rarity:55},{name:"Gonzalo Higuain",rarity:52},
    {name:"Miralem Pjanic",rarity:42},{name:"Juan Cuadrado",rarity:35},{name:"Blaise Matuidi",rarity:32},
    {name:"Sami Khedira",rarity:28},{name:"Claudio Marchisio",rarity:38},{name:"Stephan Lichtsteiner",rarity:22},
    {name:"Arturo Vidal",rarity:45},{name:"Carlos Tevez",rarity:48},{name:"Roberto Pereyra",rarity:12},
    {name:"Fernando Llorente",rarity:15},{name:"Kingsley Coman",rarity:18},{name:"Mario Mandzukic",rarity:30},
    {name:"Medhi Benatia",rarity:15},{name:"Benedikt Howedes",rarity:8},
  ]},

  q_soccer_psg_star: { clue: "Name a player who scored 50 or more goals for Paris Saint-Germain", sport: "Soccer", answers: [
    {name:"Kylian Mbappe",rarity:82},{name:"Neymar",rarity:78},{name:"Zlatan Ibrahimovic",rarity:72},
    {name:"Edinson Cavani",rarity:68},{name:"Angel Di Maria",rarity:48},{name:"Marquinhos",rarity:30},
    {name:"Mauro Icardi",rarity:25},{name:"Lucas Moura",rarity:22},{name:"Javier Pastore",rarity:15},
    {name:"Ronaldinho",rarity:38},
  ]},

  q_soccer_man_utd_and_rival: { clue: "Name a player who played for both Manchester United AND Liverpool during their career", sport: "Soccer", answers: [
    {name:"Paul Ince",rarity:52},{name:"Michael Owen",rarity:55},{name:"Mark Hughes",rarity:35},
    {name:"Peter Beardsley",rarity:22},{name:"Phil Chisnall",rarity:5},{name:"Jordi Cruyff",rarity:12},
    {name:"Robbie Fowler",rarity:30},{name:"Nick Barmby",rarity:18},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_soccer_arsenal_invincibles: { clue: "Name a player from Arsenal's unbeaten 2003-04 Premier League season", sport: "Soccer", answers: [
    {name:"Thierry Henry",rarity:75},{name:"Patrick Vieira",rarity:70},{name:"Robert Pires",rarity:62},
    {name:"Ashley Cole",rarity:55},{name:"Sol Campbell",rarity:52},{name:"Gilberto Silva",rarity:38},
    {name:"Freddie Ljungberg",rarity:42},{name:"Dennis Bergkamp",rarity:60},{name:"Lauren",rarity:22},
    {name:"Kolo Toure",rarity:28},{name:"Jens Lehmann",rarity:45},{name:"Jose Antonio Reyes",rarity:18},
    {name:"Edu",rarity:12},{name:"Ray Parlour",rarity:15},{name:"Pascal Cygan",rarity:5},
    {name:"Nwankwo Kanu",rarity:8},{name:"Sylvain Wiltord",rarity:12},
  ]},

  q_soccer_both_madrid: { clue: "Name a player who has played for both Real Madrid AND Barcelona during their career", sport: "Soccer", answers: [
    {name:"Luis Figo",rarity:72},{name:"Michael Laudrup",rarity:48},{name:"Ronaldo Nazario",rarity:65},
    {name:"Bernd Schuster",rarity:28},{name:"Samuel Eto'o",rarity:35},{name:"Ivan de la Pena",rarity:8},
    {name:"Emmanuel Petit",rarity:10},{name:"Marc Overmars",rarity:15},{name:"Patrick Kluivert",rarity:20},
  ]},

  q_soccer_ucl_final_scorer: { clue: "Name a player who scored in a UEFA Champions League final", sport: "Soccer", answers: [
    {name:"Cristiano Ronaldo",rarity:80},{name:"Lionel Messi",rarity:75},{name:"Arjen Robben",rarity:55},
    {name:"Gareth Bale",rarity:60},{name:"Sergio Ramos",rarity:52},{name:"Andriy Shevchenko",rarity:45},
    {name:"Didier Drogba",rarity:62},{name:"Gerd Muller",rarity:28},{name:"Johan Cruyff",rarity:22},
    {name:"Marco van Basten",rarity:38},{name:"Ruud van Nistelrooy",rarity:30},{name:"Carlos Puyol",rarity:15},
    {name:"Neymar",rarity:48},{name:"Ivan Rakitic",rarity:32},{name:"Mario Mandzukic",rarity:22},
    {name:"Dejan Lovren",rarity:12},{name:"Mo Salah",rarity:42},{name:"Divock Origi",rarity:18},
    {name:"Sadio Mane",rarity:38},{name:"Vinicius Jr",rarity:42},{name:"Karim Benzema",rarity:72},
  ]},

  q_soccer_wc_top_scorer: { clue: "Name a player in the top 5 all-time FIFA World Cup scoring list", sport: "Soccer", answers: [
    {name:"Miroslav Klose",rarity:38},{name:"Ronaldo Nazario",rarity:42},{name:"Gerd Muller",rarity:22},
    {name:"Lionel Messi",rarity:55},{name:"Just Fontaine",rarity:8},{name:"Pele",rarity:35},
    {name:"Kylian Mbappe",rarity:20},{name:"Sandor Kocsis",rarity:5},
  ]},

  q_soccer_4worldcups: { clue: "Name a soccer player who appeared in 4 or more FIFA World Cups", sport: "Soccer", answers: [
    {name:"Lionel Messi",rarity:72},{name:"Cristiano Ronaldo",rarity:68},{name:"Lothar Matthaus",rarity:20},
    {name:"Antonio Carbajal",rarity:8},{name:"Rafael Marquez",rarity:10},{name:"Andres Guardado",rarity:8},
    {name:"Grzegorz Lato",rarity:5},{name:"Sepp Maier",rarity:6},{name:"Uwe Seeler",rarity:8},
  ]},

  q_soccer_golden_boot_epl: { clue: "Name a player who has won the Premier League Golden Boot at least twice", sport: "Soccer", answers: [
    {name:"Alan Shearer",rarity:75},{name:"Thierry Henry",rarity:72},{name:"Mo Salah",rarity:68},
    {name:"Harry Kane",rarity:65},{name:"Andrew Cole",rarity:42},{name:"Robin van Persie",rarity:48},
    {name:"Robbie Fowler",rarity:32},{name:"Michael Owen",rarity:38},{name:"Didier Drogba",rarity:45},
    {name:"Nicolas Anelka",rarity:28},{name:"Emile Heskey",rarity:10},{name:"Kevin Phillips",rarity:20},
    {name:"Sergio Aguero",rarity:55},{name:"Son Heung-min",rarity:38},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const SOCCER_BEGINNER = [
  "q_soccer_ucl_3wins","q_soccer_ballon_dor","q_soccer_ucl","q_soccer_intl_goals",
  "q_soccer_ballon_dor5","q_soccer_prem_top_scorer","q_soccer_real_madrid_ucl",
  "q_soccer_barca_ucl","q_soccer_world_cup_winner","q_soccer_ucl_100_goals",
];

export const SOCCER_KNOWLEDGEABLE = [
  "q_soccer_man_utd_treble","q_soccer_barca_treble","q_soccer_germany_wc",
  "q_soccer_france_wc","q_soccer_prem_100goals","q_soccer_man_city_champ",
  "q_soccer_chelsea_champ","q_soccer_liverpool_champ","q_soccer_bundesliga_scorer",
  "q_soccer_golden_boot_prem","q_soccer_juventus_serie_a","q_soccer_psg_star",
  "q_soccer_man_utd_and_rival",
];

export const SOCCER_EXPERT = [
  "q_soccer_arsenal_invincibles","q_soccer_both_madrid","q_soccer_ucl_final_scorer",
  "q_soccer_wc_top_scorer","q_soccer_4worldcups","q_soccer_golden_boot_epl",
];
