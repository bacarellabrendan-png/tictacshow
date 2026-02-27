// ─── SOCCER QUESTIONS ─────────────────────────────────────────────────────────
// Every question has TWO conditions joined by AND.

export const SOCCER_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_soccer_ucl_prem: { clue: "Name a player who won the UEFA Champions League AND also won the Premier League during their career", sport: "Soccer", rules: [{ fact_type: "ucl_winner" }, { fact_type: "premier_league_winner" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Didier Drogba"},{name:"N'Golo Kante"},
    {name:"Thibaut Courtois"},{name:"Eden Hazard"},{name:"Ashley Cole"},
    {name:"Peter Schmeichel"},{name:"Roy Keane"},{name:"Ryan Giggs"},
    {name:"David Beckham"},{name:"Paul Scholes"},{name:"Andy Cole"},
    {name:"Steve McMahon"},{name:"Michael Laudrup"},{name:"Clarence Seedorf"},
    {name:"Phil Neville"},{name:"Gary Neville"},{name:"Dwight Yorke"},
    {name:"Teddy Sheringham"},{name:"Dennis Irwin"},{name:"Nicky Butt"},
    {name:"Mo Salah"},{name:"Virgil van Dijk"},{name:"Andrew Robertson"},
  ]},

  q_soccer_ballon_wc: { clue: "Name a player who won the Ballon d'Or AND won the FIFA World Cup during their career", sport: "Soccer", rules: [{ fact_type: "ballon_dor" }, { fact_type: "world_cup_winner" }], answers: [
    {name:"Zinedine Zidane"},{name:"Ronaldo Nazario"},{name:"Ronaldinho"},
    {name:"Lothar Matthaus"},{name:"Roberto Baggio"},{name:"Michel Platini"},
    {name:"Franz Beckenbauer"},{name:"Johan Cruyff"},{name:"Gerd Muller"},
    {name:"Sepp Maier"},{name:"Berti Vogts"},{name:"Jurgen Klinsmann"},
    {name:"Karl-Heinz Rummenigge"},{name:"Kylian Mbappe"},{name:"Antoine Griezmann"},
    {name:"Lionel Messi"},{name:"Roger Milla"},{name:"Gerd Muller"},
    {name:"Lev Yashin"},{name:"Mario Kempes"},{name:"Paolo Rossi"},
  ]},

  q_soccer_prem_la_liga: { clue: "Name a player who played in both the Premier League AND La Liga during their career", sport: "Soccer", rules: [{ fact_type: "played_in_premier_league" }, { fact_type: "played_in_la_liga" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"David Beckham"},{name:"Thierry Henry"},
    {name:"Fernando Torres"},{name:"Cesc Fabregas"},{name:"Gareth Bale"},
    {name:"Luka Modric"},{name:"Mesut Ozil"},{name:"Hector Bellerin"},
    {name:"Angel Di Maria"},{name:"Alvaro Morata"},{name:"Diego Costa"},
    {name:"Pedro"},{name:"Santi Cazorla"},{name:"Michu"},
    {name:"David Villa"},{name:"Emmanuel Petit"},{name:"Nicolas Anelka"},
    {name:"Marc Overmars"},{name:"Nolberto Solano"},{name:"Jordi Cruyff"},
    {name:"Luis Garcia"},{name:"Xabi Alonso"},{name:"Javi Martinez"},
  ]},

  q_soccer_ucl_50goals_non_spanish: { clue: "Name a player who scored 50 or more UEFA Champions League goals AND played for a non-Spanish club at some point during their career", sport: "Soccer", rules: [{ fact_type: "ucl_50_goals" }, { fact_type: "played_for_non_spanish_club" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Karim Benzema"},{name:"Lionel Messi"},
    {name:"Robert Lewandowski"},{name:"Ruud van Nistelrooy"},{name:"Eusebio"},
    {name:"Andriy Shevchenko"},{name:"Gerd Muller"},{name:"Mo Salah"},
    {name:"Raul"},{name:"Filippo Inzaghi"},{name:"Didier Drogba"},
    {name:"Neymar"},{name:"Kylian Mbappe"},{name:"Thomas Muller"},
    {name:"Sergio Aguero"},{name:"Zlatan Ibrahimovic"},{name:"Lamine Yamal"},
  ]},

  q_soccer_wc_ucl: { clue: "Name a player who won both the FIFA World Cup AND the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "world_cup_winner" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Zinedine Zidane"},{name:"Ronaldo Nazario"},{name:"Roberto Carlos"},
    {name:"Cafu"},{name:"Ronaldinho"},{name:"Kylian Mbappe"},
    {name:"Raphael Varane"},{name:"N'Golo Kante"},{name:"Didier Drogba"},
    {name:"Lothar Matthaus"},{name:"Karl-Heinz Rummenigge"},{name:"Gerd Muller"},
    {name:"Franz Beckenbauer"},{name:"Luka Modric"},{name:"Toni Kroos"},
    {name:"Marcelo"},{name:"Sergio Ramos"},{name:"Iker Casillas"},
    {name:"Xabi Alonso"},{name:"Fernando Torres"},{name:"Andres Iniesta"},
    {name:"David Villa"},{name:"Xavi"},{name:"Gerard Pique"},
  ]},

  q_soccer_pl_title_ucl: { clue: "Name a player who won the Premier League title AND the UEFA Champions League with the same English club", sport: "Soccer", rules: [{ fact_type: "premier_league_winner" }, { fact_type: "ucl_winner_english_club" }], answers: [
    {name:"Peter Schmeichel"},{name:"Roy Keane"},{name:"Gary Neville"},
    {name:"Phil Neville"},{name:"Jaap Stam"},{name:"Nicky Butt"},
    {name:"Dennis Irwin"},{name:"Andy Cole"},{name:"Dwight Yorke"},
    {name:"Ole Gunnar Solskjaer"},{name:"Teddy Sheringham"},{name:"David Beckham"},
    {name:"Paul Scholes"},{name:"Ryan Giggs"},{name:"Ronny Johnsen"},
    {name:"Jesper Blomqvist"},{name:"Raimond van der Gouw"},
  ]},

  q_soccer_200goals_pl: { clue: "Name a player who scored 200 or more combined goals in all competitions for Premier League clubs AND won the Premier League at some point", sport: "Soccer", rules: [{ fact_type: "soccer_200_goals_pl_clubs" }, { fact_type: "premier_league_winner" }], answers: [
    {name:"Alan Shearer"},{name:"Wayne Rooney"},{name:"Andrew Cole"},
    {name:"Thierry Henry"},{name:"Frank Lampard"},{name:"Robbie Fowler"},
    {name:"Michael Owen"},{name:"Jimmy Floyd Hasselbaink"},{name:"Sergio Aguero"},
    {name:"Harry Kane"},{name:"Mo Salah"},{name:"Didier Drogba"},
    {name:"Ole Gunnar Solskjaer"},{name:"Nicolas Anelka"},{name:"Les Ferdinand"},
    {name:"Emile Heskey"},{name:"Peter Crouch"},{name:"Marcus Rashford"},
    {name:"Jamie Vardy"},{name:"Son Heung-min"},{name:"Jermain Defoe"},
  ]},

  q_soccer_wc_and_cl_winner: { clue: "Name a player who won the FIFA World Cup AND scored a goal in a UEFA Champions League final during their career", sport: "Soccer", rules: [{ fact_type: "world_cup_winner" }, { fact_type: "scored_in_ucl_final" }], answers: [
    {name:"Zinedine Zidane"},{name:"Ronaldo Nazario"},{name:"Roberto Carlos"},
    {name:"Cafu"},{name:"Neymar"},{name:"Kylian Mbappe"},
    {name:"Raphael Varane"},{name:"Gerd Muller"},{name:"Franz Beckenbauer"},
    {name:"Lothar Matthaus"},{name:"Andres Iniesta"},{name:"Ivan Rakitic"},
    {name:"Angel Di Maria"},{name:"Lionel Messi"},{name:"Sergio Ramos"},
    {name:"Luca Toni"},{name:"Mario Gotze"},{name:"Thomas Muller"},
    {name:"Toni Kroos"},{name:"Mario Mandzukic"},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_soccer_pl_german: { clue: "Name a German player who won the Premier League AND also won the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "german_player" }, { fact_type: "premier_league_winner" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Mesut Ozil"},{name:"Per Mertesacker"},{name:"Lukas Podolski"},
    {name:"Bastian Schweinsteiger"},{name:"Mario Gotze"},{name:"Toni Kroos"},
    {name:"Sami Khedira"},{name:"Christoph Metzelder"},{name:"Thomas Muller"},
    {name:"Arjen Robben"},{name:"Franck Ribery"},{name:"Robert Lewandowski"},
    {name:"Manuel Neuer"},{name:"Mats Hummels"},{name:"Jerome Boateng"},
  ]},

  q_soccer_serie_a_ucl: { clue: "Name a player who won the Serie A title AND the UEFA Champions League with an Italian club", sport: "Soccer", rules: [{ fact_type: "serie_a_winner" }, { fact_type: "ucl_winner_italian_club" }], answers: [
    {name:"Paolo Maldini"},{name:"Franco Baresi"},{name:"Alessandro Costacurta"},
    {name:"Demetrio Albertini"},{name:"Zvonimir Boban"},{name:"Gennaro Gattuso"},
    {name:"Andrea Pirlo"},{name:"Filippo Inzaghi"},{name:"Andriy Shevchenko"},
    {name:"Clarence Seedorf"},{name:"Rui Costa"},{name:"Kaka"},
    {name:"Cafu"},{name:"Alessandro Nesta"},{name:"Rivaldo"},
    {name:"George Weah"},{name:"Dejan Savicevic"},{name:"Marcel Desailly"},
    {name:"Fabio Capello"},{name:"Franco Baresi"},
  ]},

  q_soccer_bundesliga_ucl: { clue: "Name a player who won the Bundesliga AND the UEFA Champions League with a German club", sport: "Soccer", rules: [{ fact_type: "bundesliga_winner" }, { fact_type: "ucl_winner_german_club" }], answers: [
    {name:"Thomas Muller"},{name:"Robert Lewandowski"},{name:"Manuel Neuer"},
    {name:"Arjen Robben"},{name:"Franck Ribery"},{name:"Jerome Boateng"},
    {name:"Mats Hummels"},{name:"Bastian Schweinsteiger"},{name:"Philipp Lahm"},
    {name:"Oliver Kahn"},{name:"Ottmar Hitzfeld"},{name:"Mehmet Scholl"},
    {name:"Effenberg"},{name:"Mario Gomez"},{name:"Giovane Elber"},
    {name:"Lothar Matthaus"},{name:"Stefan Effenberg"},{name:"Luca Toni"},
    {name:"Niko Kovac"},{name:"Bixente Lizarazu"},
  ]},

  q_soccer_ligue1_ucl: { clue: "Name a player who won Ligue 1 AND the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "ligue_1_winner" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Kylian Mbappe"},{name:"Neymar"},{name:"Zlatan Ibrahimovic"},
    {name:"Edinson Cavani"},{name:"Angel Di Maria"},{name:"Thiago Silva"},
    {name:"Maxwell"},{name:"Lucas Moura"},{name:"Marquinhos"},
    {name:"Dani Alves"},{name:"Andres Iniesta"},{name:"Xavi"},
    {name:"Ludovic Giuly"},{name:"Ronaldinho"},{name:"Samuel Eto'o"},
    {name:"Thierry Henry"},{name:"Patrick Vieira"},{name:"Robert Pires"},
    {name:"Emmanuel Petit"},{name:"David Ginola"},
  ]},

  q_soccer_spain_both_clubs: { clue: "Name a player who played for both Real Madrid AND Barcelona at some point in their career", sport: "Soccer", rules: [{ fact_type: "played_for_real_madrid" }, { fact_type: "played_for_barcelona" }], answers: [
    {name:"Luis Figo"},{name:"Ronaldo Nazario"},{name:"Michael Laudrup"},
    {name:"Bernd Schuster"},{name:"Samuel Eto'o"},{name:"Ivan de la Pena"},
    {name:"Emmanuel Petit"},{name:"Marc Overmars"},{name:"Patrick Kluivert"},
    {name:"Rivaldo"},{name:"Luis Enrique"},{name:"Hristo Stoichkov"},
    {name:"Zlatan Ibrahimovic"},{name:"Carlos Puyol"},{name:"Rafa Marquez"},
    {name:"Angel Zubieta"},{name:"Jose Maria Gutierrez"},
  ]},

  q_soccer_wc_final_scorer_ucl: { clue: "Name a player who scored in a FIFA World Cup final AND won the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "wc_final_scorer" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Zinedine Zidane"},{name:"Ronaldo Nazario"},{name:"Gerd Muller"},
    {name:"Andres Iniesta"},{name:"Johan Cruyff"},{name:"Marco van Basten"},
    {name:"Karl-Heinz Rummenigge"},{name:"Neymar"},{name:"Ivan Rakitic"},
    {name:"Lionel Messi"},{name:"Angel Di Maria"},{name:"Kylian Mbappe"},
    {name:"Franz Beckenbauer"},{name:"Paul Breitner"},{name:"Rudi Voller"},
    {name:"Lothar Matthaus"},{name:"Roberto Carlos"},{name:"Cafu"},
    {name:"Ronaldinho"},{name:"Rivaldo"},
  ]},

  q_soccer_100cl_non_madrid: { clue: "Name a player who scored 100 or more goals in all UEFA competitions AND played for a club other than Real Madrid for the majority of their career", sport: "Soccer", rules: [{ fact_type: "soccer_100_uefa_goals" }, { fact_type: "primary_team_not_real_madrid" }], answers: [
    {name:"Lionel Messi"},{name:"Robert Lewandowski"},{name:"Ruud van Nistelrooy"},
    {name:"Filippo Inzaghi"},{name:"Andriy Shevchenko"},{name:"Raul"},
    {name:"Didier Drogba"},{name:"Fernando Morientes"},{name:"Henrik Larsson"},
    {name:"Mo Salah"},{name:"Eusebio"},{name:"Gerd Muller"},
    {name:"Kylian Mbappe"},{name:"Neymar"},{name:"Thomas Muller"},
    {name:"Sergio Aguero"},{name:"Zlatan Ibrahimovic"},
  ]},

  q_soccer_int_50goals_ucl: { clue: "Name a player who scored 50 or more international goals for their country AND also won the UEFA Champions League", sport: "Soccer", rules: [{ fact_type: "international_50_goals" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Lionel Messi"},{name:"Didier Drogba"},
    {name:"Zlatan Ibrahimovic"},{name:"Robert Lewandowski"},{name:"Raul"},
    {name:"Fernando Torres"},{name:"David Villa"},{name:"Toni Kroos"},
    {name:"Thomas Muller"},{name:"Andres Iniesta"},{name:"Xavi"},
    {name:"Cafu"},{name:"Roberto Carlos"},{name:"Franz Beckenbauer"},
    {name:"Jurgen Klinsmann"},{name:"Lothar Matthaus"},{name:"Mo Salah"},
  ]},

  q_soccer_golden_boot_ucl: { clue: "Name a player who won a domestic top league Golden Boot (top scorer) in England, Spain, Germany, France, or Italy AND also won the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "domestic_golden_boot" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Lionel Messi"},{name:"Karim Benzema"},
    {name:"Robert Lewandowski"},{name:"Thierry Henry"},{name:"Alan Shearer"},
    {name:"Ruud van Nistelrooy"},{name:"Gerd Muller"},{name:"Ronaldo Nazario"},
    {name:"Fernando Torres"},{name:"Filippo Inzaghi"},{name:"David Villa"},
    {name:"Andriy Shevchenko"},{name:"Thomas Muller"},{name:"Erling Haaland"},
    {name:"Kylian Mbappe"},{name:"Edinson Cavani"},{name:"Mario Gomez"},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_soccer_invincibles_foreign: { clue: "Name a player from Arsenal's unbeaten 2003-04 Premier League season AND who was born outside the United Kingdom", sport: "Soccer", rules: [{ fact_type: "arsenal_invincibles_2004" }, { fact_type: "born_outside_uk" }], answers: [
    {name:"Thierry Henry"},{name:"Patrick Vieira"},{name:"Robert Pires"},
    {name:"Freddie Ljungberg"},{name:"Jose Antonio Reyes"},{name:"Edu"},
    {name:"Gilberto Silva"},{name:"Lauren"},{name:"Kolo Toure"},
    {name:"Dennis Bergkamp"},{name:"Nwankwo Kanu"},{name:"Sylvain Wiltord"},
    {name:"Pascal Cygan"},{name:"Giovanni van Bronckhorst"},{name:"Jeremie Aliadiere"},
    {name:"Remi Garde"},{name:"Jens Lehmann"},{name:"Gavin Hoyte"},
  ]},

  q_soccer_wc_hat_trick: { clue: "Name a player who scored a hat trick in a FIFA World Cup match AND also won the UEFA Champions League during their career", sport: "Soccer", rules: [{ fact_type: "wc_hat_trick" }, { fact_type: "ucl_winner" }], answers: [
    {name:"Ronaldo Nazario"},{name:"Zinedine Zidane"},{name:"Gabriel Batistuta"},
    {name:"Gerd Muller"},{name:"Eusebio"},{name:"Juan Alberto Schiaffino"},
    {name:"Ivan Moreno"},{name:"Luca Toni"},{name:"Thomas Muller"},
    {name:"Miroslav Klose"},{name:"Pele"},{name:"Geoff Hurst"},
    {name:"Jurgen Klinsmann"},{name:"Robert Lewandowski"},{name:"Kylian Mbappe"},
  ]},

  q_soccer_manager_league_ucl: { clue: "Name a manager who won the UEFA Champions League AND a domestic league title in two different countries during their managerial career", sport: "Soccer", rules: [{ fact_type: "manager_ucl_winner" }, { fact_type: "manager_league_titles_2_countries" }], answers: [
    {name:"Jose Mourinho"},{name:"Pep Guardiola"},{name:"Carlo Ancelotti"},
    {name:"Johan Cruyff"},{name:"Ottmar Hitzfeld"},{name:"Ernst Happel"},
    {name:"Helenio Herrera"},{name:"Bobby Robson"},{name:"Vicente del Bosque"},
    {name:"Fabio Capello"},{name:"Luis Aragones"},{name:"Zico"},
    {name:"Marcello Lippi"},{name:"Luiz Felipe Scolari"},{name:"Jorge Jesus"},
    {name:"Giovanni Trapattoni"},{name:"Arrigo Sacchi"},{name:"Nevio Scala"},
    {name:"Bora Milutinovic"},{name:"Claudio Ranieri"},
  ]},

  q_soccer_pl_golden_boot_wc: { clue: "Name a player who won the Premier League Golden Boot AND represented their country at a World Cup while playing in the Premier League", sport: "Soccer", rules: [{ fact_type: "pl_golden_boot" }, { fact_type: "represented_country_wc_while_pl" }], answers: [
    {name:"Alan Shearer"},{name:"Thierry Henry"},{name:"Michael Owen"},
    {name:"Robin van Persie"},{name:"Mo Salah"},{name:"Harry Kane"},
    {name:"Sergio Aguero"},{name:"Didier Drogba"},{name:"Robbie Fowler"},
    {name:"Andrew Cole"},{name:"Nicolas Anelka"},{name:"Jimmy Floyd Hasselbaink"},
    {name:"Kevin Phillips"},{name:"Son Heung-min"},{name:"Sadio Mane"},
    {name:"Jamie Vardy"},{name:"Luis Suarez"},{name:"Edin Dzeko"},
    {name:"Dion Dublin"},{name:"Les Ferdinand"},
  ]},

  q_soccer_ucl_final_two_clubs: { clue: "Name a player who appeared in the UEFA Champions League final representing two different clubs AND won at least one of those finals", sport: "Soccer", rules: [{ fact_type: "ucl_final_two_clubs" }, { fact_type: "ucl_final_winner" }], answers: [
    {name:"Clarence Seedorf"},{name:"Samuel Eto'o"},{name:"Raul"},
    {name:"Thierry Henry"},{name:"Eric Abidal"},{name:"Claude Makelele"},
    {name:"David Beckham"},{name:"Roy Keane"},{name:"Nicolas Anelka"},
    {name:"Michael Owen"},{name:"Peter Schmeichel"},{name:"Didier Drogba"},
    {name:"Arjen Robben"},{name:"Frank Ribery"},{name:"Zlatan Ibrahimovic"},
    {name:"Neymar"},{name:"Rivaldo"},{name:"Patrick Kluivert"},
    {name:"Ronaldo Nazario"},{name:"Luis Figo"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const SOCCER_BEGINNER = [
  "q_soccer_ucl_prem","q_soccer_ballon_wc","q_soccer_prem_la_liga",
  "q_soccer_ucl_50goals_non_spanish","q_soccer_wc_ucl","q_soccer_pl_title_ucl",
  "q_soccer_200goals_pl","q_soccer_wc_and_cl_winner",
];

export const SOCCER_KNOWLEDGEABLE = [
  "q_soccer_pl_german","q_soccer_serie_a_ucl","q_soccer_bundesliga_ucl",
  "q_soccer_ligue1_ucl","q_soccer_spain_both_clubs","q_soccer_wc_final_scorer_ucl",
  "q_soccer_100cl_non_madrid","q_soccer_int_50goals_ucl","q_soccer_golden_boot_ucl",
];

export const SOCCER_EXPERT = [
  "q_soccer_invincibles_foreign","q_soccer_wc_hat_trick","q_soccer_manager_league_ucl",
  "q_soccer_pl_golden_boot_wc","q_soccer_ucl_final_two_clubs",
];
