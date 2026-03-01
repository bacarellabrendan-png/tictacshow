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

  // ── NEW — BEGINNER (Team + Team) ──────────────────────────────────────────
  q_soccer_real_madrid_juventus: { clue: "Name a player who played for both Real Madrid AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Real Madrid" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Zinedine Zidane"},{name:"Luis Figo"},
    {name:"Fabio Cannavaro"},{name:"Gonzalo Higuain"},{name:"Alvaro Morata"},
    {name:"Sami Khedira"},{name:"Emerson"},{name:"Edgar Davids"},
    {name:"Luca Toni"},{name:"Antonio Cassano"},
  ]},
  q_soccer_barcelona_psg: { clue: "Name a player who played for both Barcelona AND Paris Saint-Germain", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Barcelona" }, { fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }], answers: [
    {name:"Neymar"},{name:"Lionel Messi"},{name:"Ronaldinho"},
    {name:"Dani Alves"},{name:"Xavi Simons"},{name:"Rafinha"},
    {name:"Maxwell"},{name:"Ludovic Giuly"},{name:"Sergi Roberto"},
    {name:"Mauro Icardi"},{name:"Leandro Paredes"},
  ]},
  q_soccer_manchester_united_real_madrid: { clue: "Name a player who played for both Manchester United AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"David Beckham"},{name:"Cristiano Ronaldo"},{name:"Ruud van Nistelrooy"},
    {name:"Gabriel Heinze"},{name:"Casemiro"},{name:"Angel Di Maria"},
    {name:"Javier Hernandez"},{name:"Michael Owen"},{name:"Raphael Varane"},
    {name:"Edwin van der Sar"},
  ]},
  q_soccer_liverpool_real_madrid: { clue: "Name a player who played for both Liverpool AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Xabi Alonso"},{name:"Michael Owen"},{name:"Steve McManaman"},
    {name:"Fernando Torres"},{name:"Nicolas Anelka"},{name:"Nuri Sahin"},
    {name:"Jerzy Dudek"},{name:"Antonio Nunez"},{name:"Alvaro Arbeloa"},
  ]},
  q_soccer_chelsea_real_madrid: { clue: "Name a player who played for both Chelsea AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Eden Hazard"},{name:"Claude Makelele"},{name:"Thibaut Courtois"},
    {name:"Fernando Torres"},{name:"Michael Essien"},{name:"Mateo Kovacic"},
    {name:"Ricardo Carvalho"},{name:"Arjen Robben"},{name:"Eidur Gudjohnsen"},
    {name:"Alvaro Morata"},
  ]},
  q_soccer_ac_milan_juventus: { clue: "Name a player who played for both AC Milan AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "AC Milan" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Andrea Pirlo"},{name:"Gonzalo Higuain"},{name:"Zlatan Ibrahimovic"},
    {name:"Alessandro Del Piero"},{name:"Filippo Inzaghi"},{name:"Leonardo Bonucci"},
    {name:"Patrick Vieira"},{name:"Gianluigi Buffon"},{name:"Clarence Seedorf"},
    {name:"Luca Toni"},{name:"Christian Vieri"},
  ]},
  q_soccer_bayern_munich_real_madrid: { clue: "Name a player who played for both Bayern Munich AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Bayern Munich" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Toni Kroos"},{name:"Arjen Robben"},{name:"James Rodriguez"},
    {name:"Xabi Alonso"},{name:"Michael Ballack"},{name:"Ze Roberto"},
    {name:"Alvaro Odriozola"},{name:"David Alaba"},{name:"Bernat"},
  ]},
  q_soccer_inter_milan_juventus: { clue: "Name a player who played for both Inter Milan AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Inter Milan" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Zlatan Ibrahimovic"},{name:"Roberto Baggio"},{name:"Patrick Vieira"},
    {name:"Edgar Davids"},{name:"Alvaro Morata"},{name:"Arturo Vidal"},
    {name:"Christian Vieri"},{name:"Andrea Pirlo"},{name:"Ronaldo Nazario"},
    {name:"Hernan Crespo"},{name:"Luis Figo"},
  ]},
  q_soccer_manchester_city_barcelona: { clue: "Name a player who played for both Manchester City AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester City" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Sergio Aguero"},{name:"Yaya Toure"},{name:"Eric Garcia"},
    {name:"Ferran Torres"},{name:"Claudio Bravo"},{name:"Joao Cancelo"},
    {name:"Ilkay Gundogan"},{name:"Marc-Andre ter Stegen"},{name:"Roque Santa Cruz"},
  ]},
  q_soccer_arsenal_barcelona: { clue: "Name a player who played for both Arsenal AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Thierry Henry"},{name:"Cesc Fabregas"},{name:"Marc Overmars"},
    {name:"Emmanuel Petit"},{name:"Alexander Hleb"},{name:"Giovanni van Bronckhorst"},
    {name:"Alex Song"},{name:"Thomas Vermaelen"},{name:"Alexis Sanchez"},
    {name:"Pierre-Emerick Aubameyang"},
  ]},
  q_soccer_tottenham_real_madrid: { clue: "Name a player who played for both Tottenham AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Tottenham" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Gareth Bale"},{name:"Luka Modric"},{name:"Rafael van der Vaart"},
    {name:"Emmanuel Adebayor"},{name:"Robbie Keane"},{name:"Jonathan Woodgate"},
    {name:"Pedro Mendes"},{name:"Sergio Reguilon"},
  ]},
  q_soccer_liverpool_barcelona: { clue: "Name a player who played for both Liverpool AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Luis Suarez"},{name:"Javier Mascherano"},{name:"Philippe Coutinho"},
    {name:"Michael Owen"},{name:"Gary Lineker"},{name:"Mark Hughes"},
    {name:"Patrick Kluivert"},{name:"Thiago Alcantara"},{name:"Bolo Zenden"},
  ]},
  q_soccer_manchester_united_juventus: { clue: "Name a player who played for both Manchester United AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Cristiano Ronaldo"},{name:"Paul Pogba"},{name:"Patrice Evra"},
    {name:"David Beckham"},{name:"Edwin van der Sar"},{name:"Andy Cole"},
    {name:"Edgar Davids"},{name:"Teddy Sheringham"},{name:"Federico Chiesa"},
    {name:"Angel Di Maria"},
  ]},
  q_soccer_chelsea_ac_milan: { clue: "Name a player who played for both Chelsea AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Andriy Shevchenko"},{name:"Ruben Loftus-Cheek"},{name:"Fikayo Tomori"},
    {name:"Olivier Giroud"},{name:"Ricardo Carvalho"},{name:"Tiemoue Bakayoko"},
    {name:"George Weah"},{name:"Hernan Crespo"},{name:"Marcel Desailly"},
    {name:"Fernando Torres"},
  ]},

  // ── NEW — KNOWLEDGEABLE (Team + Team) ─────────────────────────────────────
  q_soccer_real_madrid_ac_milan: { clue: "Name a player who played for both Real Madrid AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Real Madrid" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Kaka"},{name:"David Beckham"},{name:"Ronaldo Nazario"},
    {name:"Clarence Seedorf"},{name:"Fabio Cannavaro"},{name:"Robinho"},
    {name:"Theo Hernandez"},{name:"Brahim Diaz"},{name:"Huntelaar"},
  ]},
  q_soccer_barcelona_bayern_munich: { clue: "Name a player who played for both Barcelona AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Barcelona" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Robert Lewandowski"},{name:"Philippe Coutinho"},{name:"Arturo Vidal"},
    {name:"Thiago Alcantara"},{name:"Eric Maxim Choupo-Moting"},{name:"Douglas Costa"},
    {name:"Javier Martinez"},{name:"Bernd Schuster"},{name:"Mark Hughes"},
  ]},
  q_soccer_manchester_united_inter_milan: { clue: "Name a player who played for both Manchester United AND Inter Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Inter Milan" }], answers: [
    {name:"Romelu Lukaku"},{name:"Alexis Sanchez"},{name:"Ashley Young"},
    {name:"Nemanja Vidic"},{name:"Henrikh Mkhitaryan"},{name:"Paul Ince"},
    {name:"Laurent Blanc"},{name:"Diego Forlan"},{name:"Andy Cole"},
    {name:"Matteo Darmian"},
  ]},
  q_soccer_psg_real_madrid: { clue: "Name a player who played for both Paris Saint-Germain AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Kylian Mbappe"},{name:"Angel Di Maria"},{name:"David Beckham"},
    {name:"Sergio Ramos"},{name:"Keylor Navas"},{name:"Achraf Hakimi"},
    {name:"Lassana Diarra"},{name:"Nicolas Anelka"},{name:"Jese Rodriguez"},
  ]},
  q_soccer_liverpool_chelsea: { clue: "Name a player who played for both Liverpool AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"Fernando Torres"},{name:"Daniel Sturridge"},{name:"Nicolas Anelka"},
    {name:"Raul Meireles"},{name:"Joe Cole"},{name:"Yossi Benayoun"},
    {name:"Albert Riera"},{name:"Victor Moses"},{name:"Emre Can"},
    {name:"Fabinho"},
  ]},
  q_soccer_atletico_madrid_barcelona: { clue: "Name a player who played for both Atletico Madrid AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Atletico Madrid" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Luis Suarez"},{name:"Antoine Griezmann"},{name:"David Villa"},
    {name:"Arda Turan"},{name:"Filipe Luis"},{name:"Alexis Sanchez"},
    {name:"Zlatan Ibrahimovic"},{name:"Fernando Torres"},{name:"Simao"},
  ]},
  q_soccer_borussia_dortmund_bayern_munich: { clue: "Name a player who played for both Borussia Dortmund AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Borussia Dortmund" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Robert Lewandowski"},{name:"Mario Gotze"},{name:"Mats Hummels"},
    {name:"Emre Can"},{name:"Thomas Delaney"},{name:"Niklas Sule"},
    {name:"Manuel Akanji"},{name:"Sebastian Kehl"},{name:"Andre Schurrle"},
  ]},
  q_soccer_chelsea_bayern_munich: { clue: "Name a player who played for both Chelsea AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Arjen Robben"},{name:"Michael Ballack"},{name:"Arturo Vidal"},
    {name:"Jorginho"},{name:"Claudio Pizarro"},{name:"Ze Roberto"},
    {name:"Callum Hudson-Odoi"},{name:"Mario Gomez"},{name:"Robert Lewandowski"},
  ]},
  q_soccer_real_madrid_manchester_city: { clue: "Name a player who played for both Real Madrid AND Manchester City", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Real Madrid" }, { fact_type: "played_for_team", fact_value: "Manchester City" }], answers: [
    {name:"Robinho"},{name:"Emmanuel Adebayor"},{name:"Nicolas Anelka"},
    {name:"Alvaro Negredo"},{name:"Edin Dzeko"},{name:"Joao Cancelo"},
    {name:"David Alaba"},{name:"Brahim Diaz"},{name:"Danilo"},
  ]},
  q_soccer_psg_juventus: { clue: "Name a player who played for both Paris Saint-Germain AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Gianluigi Buffon"},{name:"Zlatan Ibrahimovic"},{name:"Moise Kean"},
    {name:"Dani Alves"},{name:"Blaise Matuidi"},{name:"Adrien Rabiot"},
    {name:"Leandro Paredes"},{name:"Angel Di Maria"},{name:"Kingsley Coman"},
  ]},
  q_soccer_liverpool_manchester_city: { clue: "Name a player who played for both Liverpool AND Manchester City", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Manchester City" }], answers: [
    {name:"Raheem Sterling"},{name:"James Milner"},{name:"Nicolas Anelka"},
    {name:"Robbie Fowler"},{name:"Steve McManaman"},{name:"Albert Riera"},
    {name:"Dietmar Hamann"},{name:"Craig Bellamy"},{name:"Daniel Sturridge"},
  ]},
  q_soccer_chelsea_atletico_madrid: { clue: "Name a player who played for both Chelsea AND Atletico Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "Atletico Madrid" }], answers: [
    {name:"Diego Costa"},{name:"Fernando Torres"},{name:"Thibaut Courtois"},
    {name:"Filipe Luis"},{name:"Alvaro Morata"},{name:"Radamel Falcao"},
    {name:"Hernan Crespo"},{name:"Joao Felix"},{name:"Saul Niguez"},
  ]},
  q_soccer_cup_real_madrid: { clue: "Name a player who won the FIFA World Cup AND played for Real Madrid", sport: "Soccer", rules: [{ fact_type: "won_award", fact_value: "FIFA World Cup" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Zinedine Zidane"},{name:"Roberto Carlos"},{name:"Ronaldo Nazario"},
    {name:"Kylian Mbappe"},{name:"Raphael Varane"},{name:"Toni Kroos"},
    {name:"Sergio Ramos"},{name:"Iker Casillas"},{name:"Xabi Alonso"},
    {name:"Fabio Cannavaro"},{name:"Karim Benzema"},
  ]},

  // ── NEW — EXPERT (Team + Team) ────────────────────────────────────────────
  q_soccer_inter_milan_real_madrid: { clue: "Name a player who played for both Inter Milan AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Inter Milan" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Ronaldo Nazario"},{name:"Luis Figo"},{name:"Samuel Eto'o"},
    {name:"Roberto Carlos"},{name:"Christian Vieri"},{name:"Wesley Sneijder"},
    {name:"Walter Samuel"},{name:"Fabio Cannavaro"},{name:"Clarence Seedorf"},
    {name:"Achraf Hakimi"},
  ]},
  q_soccer_ac_milan_psg: { clue: "Name a player who played for both AC Milan AND Paris Saint-Germain", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "AC Milan" }, { fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }], answers: [
    {name:"Zlatan Ibrahimovic"},{name:"Ronaldinho"},{name:"David Beckham"},
    {name:"Thiago Silva"},{name:"George Weah"},{name:"Gianluigi Donnarumma"},
    {name:"Leonardo"},{name:"Djamel Mesbah"},{name:"Rai"},
  ]},
  q_soccer_manchester_united_ac_milan: { clue: "Name a player who played for both Manchester United AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"David Beckham"},{name:"Zlatan Ibrahimovic"},{name:"Diogo Dalot"},
    {name:"Mark Hughes"},{name:"Ralph Milne"},{name:"Ray Wilkins"},
    {name:"Jaap Stam"},{name:"Clarence Seedorf"},{name:"Robinho"},
  ]},
  q_soccer_arsenal_real_madrid: { clue: "Name a player who played for both Arsenal AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Mesut Ozil"},{name:"Emmanuel Adebayor"},{name:"Nicolas Anelka"},
    {name:"Jose Antonio Reyes"},{name:"Julio Baptista"},{name:"Santi Cazorla"},
    {name:"Nacho Monreal"},{name:"Martin Odegaard"},{name:"Dani Ceballos"},
  ]},
  q_soccer_juventus_bayern_munich: { clue: "Name a player who played for both Juventus AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Juventus" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Arturo Vidal"},{name:"Douglas Costa"},{name:"Kingsley Coman"},
    {name:"Medhi Benatia"},{name:"Luca Toni"},{name:"Ciro Ferrara"},
    {name:"Stefan Lichtsteiner"},{name:"Miralem Pjanic"},{name:"Emre Can"},
  ]},
  q_soccer_chelsea_juventus: { clue: "Name a player who played for both Chelsea AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Gonzalo Higuain"},{name:"Juan Cuadrado"},{name:"Alvaro Morata"},
    {name:"Miralem Pjanic"},{name:"Emerson Palmieri"},{name:"Gianluca Vialli"},
    {name:"Denis Zakaria"},{name:"Didier Deschamps"},{name:"Patrick Vieira"},
  ]},
  q_soccer_atletico_madrid_ac_milan: { clue: "Name a player who played for both Atletico Madrid AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Atletico Madrid" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Fernando Torres"},{name:"Kaka"},{name:"Diego Costa"},
    {name:"Mario Mandzukic"},{name:"Alessio Cerci"},{name:"Gonzalo Higuain"},
    {name:"Santiago Solari"},{name:"Christian Vieri"},{name:"Filippo Inzaghi"},
  ]},
  q_soccer_manchester_united_psg: { clue: "Name a player who played for both Manchester United AND Paris Saint-Germain", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }], answers: [
    {name:"David Beckham"},{name:"Angel Di Maria"},{name:"Zlatan Ibrahimovic"},
    {name:"Edinson Cavani"},{name:"Ander Herrera"},{name:"Rafael"},
    {name:"Sergio Romero"},{name:"Eric Bailly"},{name:"Marcos Rojo"},
  ]},
  q_soccer_napoli_psg: { clue: "Name a player who played for both Napoli AND Paris Saint-Germain", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Napoli" }, { fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }], answers: [
    {name:"Edinson Cavani"},{name:"Ezequiel Lavezzi"},{name:"Fabian Ruiz"},
    {name:"Allan"},{name:"Marek Hamsik"},{name:"Jorginho"},
    {name:"Dries Mertens"},{name:"Kim Min-jae"},{name:"Keylor Navas"},
  ]},
  q_soccer_liverpool_juventus: { clue: "Name a player who played for both Liverpool AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Emre Can"},{name:"Ian Rush"},{name:"Arthur Melo"},
    {name:"Alberto Aquilani"},{name:"Michael Owen"},{name:"Christian Ziege"},
    {name:"Igor Tudor"},{name:"Liam Brady"},{name:"Craig Johnston"},
  ]},
  q_soccer_dortmund_real_madrid: { clue: "Name a player who played for both Borussia Dortmund AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Borussia Dortmund" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Jude Bellingham"},{name:"Nuri Sahin"},{name:"Achraf Hakimi"},
    {name:"Raphael Guerreiro"},{name:"Reinier"},{name:"Andre Schurrle"},
    {name:"Shinji Kagawa"},{name:"Ilkay Gundogan"},{name:"Thomas Delaney"},
  ]},
  q_soccer_arsenal_inter_milan: { clue: "Name a player who played for both Arsenal AND Inter Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Inter Milan" }], answers: [
    {name:"Patrick Vieira"},{name:"Alexis Sanchez"},{name:"Robin van Persie"},
    {name:"Henrikh Mkhitaryan"},{name:"Lukas Podolski"},{name:"Emmanuel Adebayor"},
    {name:"Thierry Henry"},{name:"Nicolas Anelka"},{name:"Mikael Silvestre"},
  ]},
  q_soccer_manchester_city_juventus: { clue: "Name a player who played for both Manchester City AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester City" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Carlos Tevez"},{name:"Joao Cancelo"},{name:"Danilo"},
    {name:"Edin Dzeko"},{name:"Patrick Vieira"},{name:"Alvaro Morata"},
    {name:"Felipe Melo"},{name:"Nolito"},{name:"Martin Caceres"},
  ]},
  q_soccer_tottenham_inter_milan: { clue: "Name a player who played for both Tottenham AND Inter Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Tottenham" }, { fact_type: "played_for_team", fact_value: "Inter Milan" }], answers: [
    {name:"Christian Eriksen"},{name:"Ivan Perisic"},{name:"Dejan Kulusevski"},
    {name:"Moussa Sissoko"},{name:"Davinson Sanchez"},{name:"Giovani Lo Celso"},
    {name:"Kevin-Prince Boateng"},{name:"Nacer Chadli"},{name:"Stevan Jovetic"},
  ]},
  q_soccer_liverpool_bayern_munich: { clue: "Name a player who played for both Liverpool AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Xabi Alonso"},{name:"Thiago Alcantara"},{name:"Sadio Mane"},
    {name:"Coutinho"},{name:"Christian Ziege"},{name:"Markus Babbel"},
    {name:"Dietmar Hamann"},{name:"Sean Dundee"},{name:"Karl-Heinz Riedle"},
  ]},
  q_soccer_chelsea_psg: { clue: "Name a player who played for both Chelsea AND Paris Saint-Germain", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Chelsea" }, { fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }], answers: [
    {name:"Thiago Silva"},{name:"David Luiz"},{name:"Edinson Cavani"},
    {name:"Marquinhos"},{name:"Nicolas Anelka"},{name:"Claude Makelele"},
    {name:"George Weah"},{name:"Hernan Crespo"},{name:"Mateo Kovacic"},
  ]},

  // ── NEW BATCH 3 ───────────────────────────────────────────────────────────
  q_soccer_barcelona_ac_milan: { clue: "Name a player who played for both Barcelona AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Barcelona" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Ronaldinho"},{name:"Zlatan Ibrahimovic"},{name:"Rivaldo"},
    {name:"Edgar Davids"},{name:"Kaka"},{name:"Marc Bartra"},
    {name:"Kevin-Prince Boateng"},{name:"Maxi Lopez"},{name:"Luca Toni"},
  ]},
  q_soccer_arsenal_chelsea: { clue: "Name a player who played for both Arsenal AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"Cesc Fabregas"},{name:"Olivier Giroud"},{name:"Petr Cech"},
    {name:"Ashley Cole"},{name:"David Luiz"},{name:"William Gallas"},
    {name:"Emmanuel Petit"},{name:"Nicolas Anelka"},{name:"Willian"},
  ]},
  q_soccer_manchester_united_chelsea: { clue: "Name a player who played for both Manchester United AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"Juan Mata"},{name:"Nemanja Matic"},{name:"Mark Hughes"},
    {name:"Radamel Falcao"},{name:"Samuel Eto'o"},{name:"Michael Ballack"},
    {name:"Ray Wilkins"},{name:"Romelu Lukaku"},{name:"Jadon Sancho"},
  ]},
  q_soccer_porto_real_madrid: { clue: "Name a player who played for both Porto AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Porto" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Pepe"},{name:"Ricardo Carvalho"},{name:"Deco"},
    {name:"Casemiro"},{name:"Eder Militao"},{name:"Danilo"},
    {name:"James Rodriguez"},{name:"Falcao"},{name:"Fabio Coentrao"},
  ]},
  q_soccer_inter_milan_ac_milan: { clue: "Name a player who played for both Inter Milan AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Inter Milan" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Zlatan Ibrahimovic"},{name:"Andrea Pirlo"},{name:"Ronaldo Nazario"},
    {name:"Clarence Seedorf"},{name:"Roberto Baggio"},{name:"Christian Vieri"},
    {name:"Edgar Davids"},{name:"Hernan Crespo"},{name:"Hakan Calhanoglu"},
    {name:"Mario Balotelli"},
  ]},
  q_soccer_barcelona_chelsea: { clue: "Name a player who played for both Barcelona AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Barcelona" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"Cesc Fabregas"},{name:"Pedro"},{name:"Alexis Sanchez"},
    {name:"Samuel Eto'o"},{name:"Eidur Gudjohnsen"},{name:"Deco"},
    {name:"Marc Cucurella"},{name:"Pierre-Emerick Aubameyang"},{name:"Olivier Giroud"},
  ]},
  q_soccer_benfica_real_madrid: { clue: "Name a player who played for both Benfica AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Benfica" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Angel Di Maria"},{name:"Fabio Coentrao"},{name:"Ozil"},
    {name:"David Luiz"},{name:"Axel Witsel"},{name:"Nemanja Matic"},
    {name:"Julio Cesar"},{name:"Carlos Marchena"},{name:"Lazar Markovic"},
  ]},
  q_soccer_manchester_united_liverpool: { clue: "Name a player who played for both Manchester United AND Liverpool", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester United" }, { fact_type: "played_for_team", fact_value: "Liverpool" }], answers: [
    {name:"Michael Owen"},{name:"Peter Beardsley"},{name:"Paul Ince"},
    {name:"Phil Chisnall"},{name:"John Gidman"},{name:"Ted MacDougall"},
    {name:"Allenby Chilton"},{name:"Thomas McNulty"},{name:"Jack Warner"},
  ]},
  q_soccer_valencia_barcelona: { clue: "Name a player who played for both Valencia AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Valencia" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"David Villa"},{name:"Jordi Alba"},{name:"Paco Alcacer"},
    {name:"Munir El Haddadi"},{name:"Denis Suarez"},{name:"Martin Montoya"},
    {name:"Simao"},{name:"Gary Neville"},{name:"Claudio Bravo"},
  ]},
  q_soccer_ballon_barcelona: { clue: "Name a player who won the Ballon d'Or AND played for Barcelona", sport: "Soccer", rules: [{ fact_type: "won_award", fact_value: "Ballon d'Or" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Lionel Messi"},{name:"Ronaldinho"},{name:"Rivaldo"},
    {name:"Hristo Stoichkov"},{name:"Johan Cruyff"},{name:"Luis Figo"},
    {name:"Michael Laudrup"},{name:"Neymar"},{name:"Robert Lewandowski"},
  ]},
  q_soccer_tottenham_manchester_united: { clue: "Name a player who played for both Tottenham AND Manchester United", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Tottenham" }, { fact_type: "played_for_team", fact_value: "Manchester United" }], answers: [
    {name:"Michael Carrick"},{name:"Teddy Sheringham"},{name:"Dimitar Berbatov"},
    {name:"Steve Perryman"},{name:"Ray Clemence"},{name:"Les Ferdinand"},
    {name:"Garth Crooks"},{name:"Eric Djemba-Djemba"},{name:"Kleber"},
  ]},
  q_soccer_atletico_madrid_real_madrid: { clue: "Name a player who played for both Atletico Madrid AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Atletico Madrid" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Thibaut Courtois"},{name:"Hugo Sanchez"},{name:"Fernando Torres"},
    {name:"Luis Aragones"},{name:"Raul"},{name:"Bernd Schuster"},
    {name:"Jimmy Floyd Hasselbaink"},{name:"Sergio Aguero"},{name:"Marcos Llorente"},
  ]},
  q_soccer_arsenal_manchester_city: { clue: "Name a player who played for both Arsenal AND Manchester City", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Manchester City" }], answers: [
    {name:"Emmanuel Adebayor"},{name:"Samir Nasri"},{name:"Gael Clichy"},
    {name:"Bacary Sagna"},{name:"Kolo Toure"},{name:"Patrick Vieira"},
    {name:"Nicolas Anelka"},{name:"Oleksandr Zinchenko"},{name:"Raheem Sterling"},
  ]},
  q_soccer_liverpool_ac_milan: { clue: "Name a player who played for both Liverpool AND AC Milan", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Liverpool" }, { fact_type: "played_for_team", fact_value: "AC Milan" }], answers: [
    {name:"Mario Balotelli"},{name:"Divock Origi"},{name:"Alberto Aquilani"},
    {name:"Christian Ziege"},{name:"Andriy Shevchenko"},{name:"Suso"},
    {name:"Robbie Fowler"},{name:"Mark Hughes"},{name:"Ray Kennedy"},
  ]},
  q_soccer_psg_bayern_munich: { clue: "Name a player who played for both Paris Saint-Germain AND Bayern Munich", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Paris Saint-Germain" }, { fact_type: "played_for_team", fact_value: "Bayern Munich" }], answers: [
    {name:"Kingsley Coman"},{name:"Eric Maxim Choupo-Moting"},{name:"Juan Bernat"},
    {name:"Jerome Boateng"},{name:"Lucas Hernandez"},{name:"Nordi Mukiele"},
    {name:"Julian Draxler"},{name:"Corentin Tolisso"},{name:"Edouard Cisse"},
  ]},
  q_soccer_dortmund_barcelona: { clue: "Name a player who played for both Borussia Dortmund AND Barcelona", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Borussia Dortmund" }, { fact_type: "played_for_team", fact_value: "Barcelona" }], answers: [
    {name:"Ousmane Dembele"},{name:"Marc Bartra"},{name:"Pierre-Emerick Aubameyang"},
    {name:"Robert Lewandowski"},{name:"Alexander Isak"},{name:"Paco Alcacer"},
    {name:"Martin Braithwaite"},{name:"Kevin-Prince Boateng"},{name:"Emre Mor"},
  ]},
  q_soccer_roma_juventus: { clue: "Name a player who played for both Roma AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Roma" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Miralem Pjanic"},{name:"Leonardo Bonucci"},{name:"Mehdi Benatia"},
    {name:"Gonzalo Higuain"},{name:"Wojciech Szczesny"},{name:"Mattia De Sciglio"},
    {name:"Patrick Vieira"},{name:"Fabio Capello"},{name:"Zbigniew Boniek"},
  ]},
  q_soccer_real_madrid_roma: { clue: "Name a player who played for both Real Madrid AND Roma", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Real Madrid" }, { fact_type: "played_for_team", fact_value: "Roma" }], answers: [
    {name:"Antonio Cassano"},{name:"Walter Samuel"},{name:"Santiago Solari"},
    {name:"Steve McManaman"},{name:"Emerson"},{name:"Jonathan Woodgate"},
    {name:"Borja Mayoral"},{name:"Carles Perez"},{name:"Luca Pellegrini"},
  ]},
  q_soccer_barcelona_juventus: { clue: "Name a player who played for both Barcelona AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Barcelona" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Dani Alves"},{name:"Arthur Melo"},{name:"Miralem Pjanic"},
    {name:"Lilian Thuram"},{name:"Edgar Davids"},{name:"Thierry Henry"},
    {name:"Gianluca Zambrotta"},{name:"Patrick Kluivert"},{name:"Luis Suarez"},
  ]},
  q_soccer_manchester_city_chelsea: { clue: "Name a player who played for both Manchester City AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Manchester City" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"Frank Lampard"},{name:"Shaun Wright-Phillips"},{name:"Wayne Bridge"},
    {name:"Daniel Sturridge"},{name:"Raheem Sterling"},{name:"Nicolas Anelka"},
    {name:"Cole Palmer"},{name:"Joao Cancelo"},{name:"Mateo Kovacic"},
  ]},
  q_soccer_atletico_madrid_liverpool: { clue: "Name a player who played for both Atletico Madrid AND Liverpool", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Atletico Madrid" }, { fact_type: "played_for_team", fact_value: "Liverpool" }], answers: [
    {name:"Fernando Torres"},{name:"Luis Suarez"},{name:"Luis Garcia"},
    {name:"Albert Riera"},{name:"Fabio Borini"},{name:"Maxi Rodriguez"},
    {name:"Javier Mascherano"},{name:"Emre Can"},{name:"Diego Forlan"},
  ]},
  q_soccer_napoli_juventus: { clue: "Name a player who played for both Napoli AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Napoli" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Gonzalo Higuain"},{name:"Marek Hamsik"},{name:"Fabio Cannavaro"},
    {name:"Fabio Quagliarella"},{name:"Simone Verdi"},{name:"Emanuele Giaccherini"},
    {name:"Mirko Vucinic"},{name:"Christian Maggio"},{name:"Maurizio Domizzi"},
  ]},
  q_soccer_arsenal_juventus: { clue: "Name a player who played for both Arsenal AND Juventus", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Arsenal" }, { fact_type: "played_for_team", fact_value: "Juventus" }], answers: [
    {name:"Thierry Henry"},{name:"Patrick Vieira"},{name:"Liam Brady"},
    {name:"David Platt"},{name:"Wojciech Szczesny"},{name:"Nicolas Anelka"},
    {name:"Aaron Ramsey"},{name:"Arthur Melo"},{name:"Alexis Sanchez"},
  ]},
  q_soccer_sevilla_real_madrid: { clue: "Name a player who played for both Sevilla AND Real Madrid", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Sevilla" }, { fact_type: "played_for_team", fact_value: "Real Madrid" }], answers: [
    {name:"Sergio Ramos"},{name:"Jesus Navas"},{name:"Ivan Rakitic"},
    {name:"Alvaro Negredo"},{name:"Federico Fazio"},{name:"Alberto Moreno"},
    {name:"Diego Perotti"},{name:"Daniel Alves"},{name:"Julio Baptista"},
  ]},
  q_soccer_tottenham_chelsea: { clue: "Name a player who played for both Tottenham AND Chelsea", sport: "Soccer", rules: [{ fact_type: "played_for_team", fact_value: "Tottenham" }, { fact_type: "played_for_team", fact_value: "Chelsea" }], answers: [
    {name:"William Gallas"},{name:"Gus Poyet"},{name:"Carlton Cole"},
    {name:"Jimmy Greaves"},{name:"Pat Jennings"},{name:"Graham Roberts"},
    {name:"Bobby Smith"},{name:"Terry Venables"},{name:"Scott Parker"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const SOCCER_BEGINNER = [
  "q_soccer_ucl_prem","q_soccer_ballon_wc","q_soccer_prem_la_liga",
  "q_soccer_ucl_50goals_non_spanish","q_soccer_wc_ucl","q_soccer_pl_title_ucl",
  "q_soccer_200goals_pl","q_soccer_wc_and_cl_winner",
  "q_soccer_real_madrid_juventus","q_soccer_barcelona_psg",
  "q_soccer_manchester_united_real_madrid","q_soccer_liverpool_real_madrid",
  "q_soccer_chelsea_real_madrid","q_soccer_ac_milan_juventus",
  "q_soccer_bayern_munich_real_madrid","q_soccer_inter_milan_juventus",
  "q_soccer_manchester_city_barcelona","q_soccer_arsenal_barcelona",
  "q_soccer_tottenham_real_madrid","q_soccer_liverpool_barcelona",
  "q_soccer_manchester_united_juventus","q_soccer_chelsea_ac_milan",
  "q_soccer_inter_milan_ac_milan","q_soccer_arsenal_chelsea",
  "q_soccer_manchester_united_chelsea","q_soccer_manchester_united_liverpool",
  "q_soccer_ballon_barcelona","q_soccer_atletico_madrid_real_madrid",
  "q_soccer_arsenal_manchester_city","q_soccer_tottenham_chelsea",
];

export const SOCCER_KNOWLEDGEABLE = [
  "q_soccer_pl_german","q_soccer_serie_a_ucl","q_soccer_bundesliga_ucl",
  "q_soccer_ligue1_ucl","q_soccer_spain_both_clubs","q_soccer_wc_final_scorer_ucl",
  "q_soccer_100cl_non_madrid","q_soccer_int_50goals_ucl","q_soccer_golden_boot_ucl",
  "q_soccer_real_madrid_ac_milan","q_soccer_barcelona_bayern_munich",
  "q_soccer_manchester_united_inter_milan","q_soccer_psg_real_madrid",
  "q_soccer_liverpool_chelsea","q_soccer_atletico_madrid_barcelona",
  "q_soccer_borussia_dortmund_bayern_munich","q_soccer_chelsea_bayern_munich",
  "q_soccer_real_madrid_manchester_city","q_soccer_psg_juventus",
  "q_soccer_liverpool_manchester_city","q_soccer_chelsea_atletico_madrid",
  "q_soccer_cup_real_madrid","q_soccer_barcelona_ac_milan",
  "q_soccer_tottenham_manchester_united","q_soccer_liverpool_ac_milan",
  "q_soccer_psg_bayern_munich","q_soccer_dortmund_barcelona",
  "q_soccer_manchester_city_chelsea","q_soccer_atletico_madrid_liverpool",
  "q_soccer_napoli_juventus",
];

export const SOCCER_EXPERT = [
  "q_soccer_invincibles_foreign","q_soccer_wc_hat_trick","q_soccer_manager_league_ucl",
  "q_soccer_pl_golden_boot_wc","q_soccer_ucl_final_two_clubs",
  "q_soccer_inter_milan_real_madrid","q_soccer_ac_milan_psg",
  "q_soccer_manchester_united_ac_milan","q_soccer_arsenal_real_madrid",
  "q_soccer_juventus_bayern_munich","q_soccer_chelsea_juventus",
  "q_soccer_atletico_madrid_ac_milan","q_soccer_manchester_united_psg",
  "q_soccer_napoli_psg","q_soccer_liverpool_juventus",
  "q_soccer_dortmund_real_madrid","q_soccer_arsenal_inter_milan",
  "q_soccer_manchester_city_juventus","q_soccer_tottenham_inter_milan",
  "q_soccer_liverpool_bayern_munich","q_soccer_chelsea_psg",
  "q_soccer_benfica_real_madrid","q_soccer_porto_real_madrid",
  "q_soccer_roma_juventus","q_soccer_valencia_barcelona",
  "q_soccer_real_madrid_roma","q_soccer_barcelona_juventus",
  "q_soccer_arsenal_juventus","q_soccer_sevilla_real_madrid",
  "q_soccer_barcelona_chelsea",
];
