// ─── NFL QUESTIONS ────────────────────────────────────────────────────────────
// Every question has TWO conditions joined by AND.

export const NFL_POOLS = {

  // ── BEGINNER ─────────────────────────────────────────────────────────────────

  q_nfl_qb_sb_300td: { clue: "Name an NFL quarterback who won a Super Bowl AND threw 300 or more career touchdown passes", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_winner" }, { fact_type: "nfl_300_career_td_passes" }], answers: [
    {name:"Tom Brady"},{name:"Peyton Manning"},{name:"Joe Montana"},
    {name:"Brett Favre"},{name:"Aaron Rodgers"},{name:"Ben Roethlisberger"},
    {name:"Terry Bradshaw"},{name:"John Elway"},{name:"Troy Aikman"},
    {name:"Steve Young"},{name:"Roger Staubach"},{name:"Eli Manning"},
    {name:"Patrick Mahomes"},{name:"Drew Brees"},{name:"Trent Dilfer"},
    {name:"Brad Johnson"},{name:"Len Dawson"},{name:"Bart Starr"},
  ]},

  q_nfl_rb_10k_probowl: { clue: "Name an NFL running back who rushed for 10,000 or more career yards AND was selected to the Pro Bowl", sport: "NFL", rules: [{ fact_type: "nfl_10000_rush_yards" }, { fact_type: "nfl_pro_bowl" }], answers: [
    {name:"Emmitt Smith"},{name:"Barry Sanders"},{name:"Walter Payton"},
    {name:"LaDainian Tomlinson"},{name:"Eric Dickerson"},{name:"Marcus Allen"},
    {name:"Franco Harris"},{name:"Jerome Bettis"},{name:"Curtis Martin"},
    {name:"Marshall Faulk"},{name:"John Riggins"},{name:"O.J. Simpson"},
    {name:"Adrian Peterson"},{name:"Edgerrin James"},{name:"Shaun Alexander"},
    {name:"Fred Taylor"},{name:"Corey Dillon"},{name:"Ricky Watters"},
  ]},

  q_nfl_sb_undrafted: { clue: "Name an NFL player who won a Super Bowl AND went undrafted out of college", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_winner" }, { fact_type: "nfl_undrafted" }], answers: [
    {name:"James Harrison"},{name:"Victor Cruz"},{name:"Jeff Saturday"},
    {name:"Wes Welker"},{name:"Warren Moon"},{name:"Tony Romo"},
    {name:"Kurt Warner"},{name:"Antonio Gates"},{name:"Willie Roaf"},
    {name:"London Fletcher"},{name:"Arian Foster"},{name:"LeGarrette Blount"},
    {name:"Malcolm Butler"},{name:"David Tyree"},{name:"Pat McAfee"},
    {name:"Corey Clement"},{name:"Jordy Nelson"},{name:"Danny Woodhead"},
  ]},

  q_nfl_wr_800rec_sb: { clue: "Name an NFL wide receiver who caught 800 or more career passes AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_800_receptions" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Jerry Rice"},{name:"Larry Fitzgerald"},{name:"Isaac Bruce"},
    {name:"Rod Smith"},{name:"Hines Ward"},{name:"Torry Holt"},
    {name:"Troy Brown"},{name:"Charlie Joiner"},{name:"Wes Welker"},
    {name:"Julian Edelman"},{name:"Danny Amendola"},{name:"David Givens"},
    {name:"Kevin Dyson"},{name:"Ricky Proehl"},{name:"Dedric Ward"},
    {name:"Brandon Lloyd"},{name:"James Thrash"},{name:"John Taylor"},
    {name:"Tom Rathman"},{name:"Deion Branch"},
  ]},

  q_nfl_rb_sb_1st_round: { clue: "Name an NFL running back who won a Super Bowl AND was drafted in the first round", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_winner" }, { fact_type: "nfl_first_round_pick" }], answers: [
    {name:"Emmitt Smith"},{name:"Franco Harris"},{name:"Marcus Allen"},
    {name:"Marshall Faulk"},{name:"Jerome Bettis"},{name:"Ricky Watters"},
    {name:"Roger Craig"},{name:"Daryl Johnston"},{name:"Jamal Anderson"},
    {name:"Clinton Portis"},{name:"Mike Alstott"},{name:"Thomas Jones"},
    {name:"Carnell Williams"},{name:"Larry Csonka"},{name:"Mercury Morris"},
    {name:"Jim Kiick"},{name:"Najee Harris"},{name:"Tony Pollard"},
    {name:"Clyde Edwards-Helaire"},{name:"Isiah Pacheco"},
  ]},

  q_nfl_steelers_sb_probowl: { clue: "Name a player who won a Super Bowl with the Pittsburgh Steelers AND was selected to at least one Pro Bowl", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_steelers" }, { fact_type: "nfl_pro_bowl" }], answers: [
    {name:"Terry Bradshaw"},{name:"Franco Harris"},{name:"Lynn Swann"},
    {name:"John Stallworth"},{name:"Jack Lambert"},{name:"Jack Ham"},
    {name:"Mean Joe Greene"},{name:"Mel Blount"},{name:"Mike Webster"},
    {name:"Ben Roethlisberger"},{name:"Hines Ward"},{name:"Troy Polamalu"},
    {name:"Alan Faneca"},{name:"Heath Miller"},{name:"James Harrison"},
    {name:"Santonio Holmes"},{name:"Joey Porter"},{name:"Levon Kirkland"},
    {name:"Carnell Lake"},{name:"Rod Woodson"},
  ]},

  q_nfl_hall_of_fame_sb: { clue: "Name an NFL wide receiver who was inducted into the Hall of Fame AND won at least one Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_hall_of_fame_wr" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Jerry Rice"},{name:"Lynn Swann"},{name:"John Stallworth"},
    {name:"Charlie Joiner"},{name:"Steve Largent"},{name:"Don Maynard"},
    {name:"Fred Biletnikoff"},{name:"Paul Warfield"},{name:"Gary Collins"},
    {name:"Cliff Branch"},{name:"Drew Pearson"},{name:"Michael Irvin"},
    {name:"Tim Brown"},{name:"Andre Rison"},{name:"Santana Moss"},
  ]},

  q_nfl_qb_superbowl_heisman: { clue: "Name an NFL quarterback who won the Heisman Trophy in college AND started at least one Super Bowl", sport: "NFL", rules: [{ fact_type: "heisman_trophy" }, { fact_type: "nfl_qb_started_super_bowl" }], answers: [
    {name:"Lamar Jackson"},{name:"Cam Newton"},{name:"Marcus Mariota"},
    {name:"Kyler Murray"},{name:"Sam Bradford"},{name:"Joe Burrow"},
    {name:"Robert Griffin III"},{name:"Jameis Winston"},{name:"Roger Staubach"},
    {name:"Doug Flutie"},{name:"Vinny Testaverde"},{name:"Steve Spurrier"},
    {name:"Gary Beban"},{name:"Terry Baker"},{name:"Ty Detmer"},
    {name:"Jim Plunkett"},{name:"Billy Kilmer"},{name:"John Huarte"},
  ]},

  q_nfl_cowboys_49ers: { clue: "Name an NFL player who played for both the Cowboys AND the 49ers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cowboys" }, { fact_type: "played_for_team", fact_value: "49ers" }], answers: [
    {name:"Deion Sanders"},{name:"Charles Haley"},{name:"Terrell Owens"},
    {name:"Tony Romo"},{name:"Everson Walls"},{name:"Ken Norton Jr"},
    {name:"Dez Bryant"},{name:"DeMarco Murray"},{name:"Roy Williams"},
    {name:"Jay Novacek"},{name:"Danny White"},{name:"Ed Jones"},
  ]},

  q_nfl_patriots_broncos: { clue: "Name an NFL player who played for both the Patriots AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Patriots" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Wes Welker"},{name:"Aqib Talib"},{name:"Brandon Marshall"},
    {name:"Danny Amendola"},{name:"Adam Vinatieri"},{name:"Willie McGinest"},
    {name:"Brandon Lloyd"},{name:"Kyle Van Noy"},{name:"Damien Harris"},
    {name:"Ty Law"},{name:"Mike Vrabel"},{name:"Brandon Stokley"},
  ]},

  q_nfl_packers_vikings: { clue: "Name an NFL player who played for both the Packers AND the Vikings", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Packers" }, { fact_type: "played_for_team", fact_value: "Vikings" }], answers: [
    {name:"Brett Favre"},{name:"Darren Sharper"},{name:"Ryan Longwell"},
    {name:"Greg Jennings"},{name:"Jim McMahon"},{name:"Doug Pederson"},
    {name:"Randall Cunningham"},{name:"Za'Darius Smith"},{name:"Adrian Peterson"},
    {name:"Antonio Freeman"},{name:"Robert Smith"},{name:"Ahmad Rashad"},
  ]},

  q_nfl_giants_eagles: { clue: "Name an NFL player who played for both the Giants AND the Eagles", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Eagles" }], answers: [
    {name:"Michael Strahan"},{name:"Plaxico Buress"},{name:"Brandon Graham"},
    {name:"Jason Pierre-Paul"},{name:"DeSean Jackson"},{name:"Jake Elliott"},
    {name:"Corey Webster"},{name:"Kerry Collins"},{name:"Darius Slay"},
    {name:"James Bradberry"},{name:"Brandon Boykin"},{name:"Matt Dodge"},
  ]},

  q_nfl_steelers_patriots: { clue: "Name an NFL player who played for both the Steelers AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Steelers" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"James Harrison"},{name:"LeGarrette Blount"},{name:"Mike Vrabel"},
    {name:"Darrelle Revis"},{name:"DeAngelo Williams"},{name:"Joe Haden"},
    {name:"Mike Mitchell"},{name:"Chris Hoke"},{name:"Antonio Brown"},
    {name:"Minkah Fitzpatrick"},{name:"Ty Law"},{name:"Chad Brown"},
  ]},

  q_nfl_chiefs_raiders: { clue: "Name an NFL player who played for both the Chiefs AND the Raiders", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Chiefs" }, { fact_type: "played_for_team", fact_value: "Raiders" }], answers: [
    {name:"Marcus Allen"},{name:"Rich Gannon"},{name:"Derrick Thomas"},
    {name:"Dave Casper"},{name:"Rod Woodson"},{name:"Warren Moon"},
    {name:"Jerry Rice"},{name:"Keyshawn Johnson"},{name:"Lamar Hunt"},
    {name:"Thomas Jones"},{name:"Zach Ertz"},{name:"Tyreek Hill"},
  ]},

  q_nfl_seahawks_broncos: { clue: "Name an NFL player who played for both the Seahawks AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Seahawks" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Russell Wilson"},{name:"Jerry Rice"},{name:"Steve Largent"},
    {name:"Matt Hasselbeck"},{name:"Brian Bosworth"},{name:"Kenny Easley"},
    {name:"Marshawn Lynch"},{name:"Percy Harvin"},{name:"Brandon Marshall"},
    {name:"Aqib Talib"},{name:"Bobby Wagner"},{name:"Jamal Adams"},
  ]},

  q_nfl_cowboys_eagles: { clue: "Name an NFL player who played for both the Cowboys AND the Eagles", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cowboys" }, { fact_type: "played_for_team", fact_value: "Eagles" }], answers: [
    {name:"Terrell Owens"},{name:"DeMarco Murray"},{name:"Jason Peters"},
    {name:"Miles Austin"},{name:"Randall Cunningham"},{name:"Roy Williams"},
    {name:"Tony Romo"},{name:"Danny Amendola"},{name:"Byron Jones"},
    {name:"Robert Quinn"},{name:"Sam Bradford"},{name:"Herschel Walker"},
  ]},

  q_nfl_bears_packers: { clue: "Name an NFL player who played for both the Bears AND the Packers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bears" }, { fact_type: "played_for_team", fact_value: "Packers" }], answers: [
    {name:"Julius Peppers"},{name:"Jim McMahon"},{name:"Desmond Howard"},
    {name:"Martellus Bennett"},{name:"Mike Brown"},{name:"Doug Atkins"},
    {name:"Jim Flanigan"},{name:"Al Harris"},{name:"Willie Davis"},
    {name:"Travis Williams"},{name:"Bryan Bulaga"},{name:"Jon Bostic"},
  ]},

  q_nfl_ravens_49ers: { clue: "Name an NFL player who played for both the Ravens AND the 49ers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Ravens" }, { fact_type: "played_for_team", fact_value: "49ers" }], answers: [
    {name:"Frank Gore"},{name:"Anquan Boldin"},{name:"Steve McNair"},
    {name:"Rod Woodson"},{name:"Trent Dilfer"},{name:"Deion Sanders"},
    {name:"Brandon Stokley"},{name:"Michael Crabtree"},{name:"Elvis Dumervil"},
    {name:"Calais Campbell"},{name:"Jimmy Smith"},{name:"Chris McAlister"},
  ]},

  q_nfl_broncos_colts: { clue: "Name an NFL player who played for both the Broncos AND the Colts", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Broncos" }, { fact_type: "played_for_team", fact_value: "Colts" }], answers: [
    {name:"Peyton Manning"},{name:"John Elway"},{name:"Eric Decker"},
    {name:"Marvin Harrison"},{name:"Edgerrin James"},{name:"Brandon Stokley"},
    {name:"Adam Vinatieri"},{name:"Aqib Talib"},{name:"Frank Gore"},
    {name:"T.Y. Hilton"},{name:"Andre Johnson"},{name:"Dwight Freeney"},
  ]},

  q_nfl_patriots_buccaneers: { clue: "Name an NFL player who played for both the Patriots AND the Buccaneers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Patriots" }, { fact_type: "played_for_team", fact_value: "Buccaneers" }], answers: [
    {name:"Tom Brady"},{name:"Rob Gronkowski"},{name:"Antonio Brown"},
    {name:"Darrelle Revis"},{name:"LeGarrette Blount"},{name:"Shaq Mason"},
    {name:"Leonard Fournette"},{name:"Richard Sherman"},{name:"Ndamukong Suh"},
    {name:"Lavonte David"},{name:"Cameron Brate"},{name:"Ryan Jensen"},
  ]},

  q_nfl_cowboys_steelers: { clue: "Name an NFL player who played for both the Cowboys AND the Steelers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cowboys" }, { fact_type: "played_for_team", fact_value: "Steelers" }], answers: [
    {name:"Deion Sanders"},{name:"Emmitt Smith"},{name:"Larry Brown"},
    {name:"Thomas Jones"},{name:"Rod Woodson"},{name:"Kevin Greene"},
    {name:"Greg Lloyd"},{name:"DeMarco Murray"},{name:"James Washington"},
    {name:"Brent Alexander"},{name:"Steven Nelson"},{name:"James Harrison"},
  ]},

  q_nfl_sb_mvp_team: { clue: "Name an NFL player who won Super Bowl MVP AND played for the Cowboys", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_mvp" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Troy Aikman"},{name:"Emmitt Smith"},{name:"Larry Brown"},
    {name:"Chuck Howley"},{name:"Roger Staubach"},{name:"Harvey Martin"},
    {name:"Randy White"},{name:"Michael Irvin"},{name:"Jay Novacek"},
    {name:"Daryl Johnston"},{name:"Deion Sanders"},{name:"Tony Dorsett"},
  ]},

  q_nfl_ravens_steelers: { clue: "Name an NFL player who played for both the Ravens AND the Steelers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Ravens" }, { fact_type: "played_for_team", fact_value: "Steelers" }], answers: [
    {name:"Rod Woodson"},{name:"Le'Veon Bell"},{name:"Joe Haden"},
    {name:"James Harrison"},{name:"Terrell Suggs"},{name:"Mike Mitchell"},
    {name:"Chris McAlister"},{name:"Steve McNair"},{name:"Elvis Dumervil"},
    {name:"Mike Wallace"},{name:"Emmanuel Sanders"},{name:"Ryan Clark"},
  ]},

  q_nfl_49ers_cowboys: { clue: "Name an NFL player who played for both the 49ers AND the Cowboys", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "49ers" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Deion Sanders"},{name:"Charles Haley"},{name:"Terrell Owens"},
    {name:"Ken Norton Jr"},{name:"Everson Walls"},{name:"Jay Novacek"},
    {name:"Ed Jones"},{name:"Danny White"},{name:"Roy Williams"},
    {name:"DeMarco Murray"},{name:"Dez Bryant"},{name:"Tony Romo"},
  ]},

  q_nfl_chiefs_broncos: { clue: "Name an NFL player who played for both the Chiefs AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Chiefs" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Neil Smith"},{name:"Tony Gonzalez"},{name:"Jamaal Charles"},
    {name:"Marcus Allen"},{name:"Derrick Thomas"},{name:"Elvis Dumervil"},
    {name:"Mike Anderson"},{name:"Ashley Lelie"},{name:"Eddie Kennison"},
    {name:"Dwayne Bowe"},{name:"Frank Clark"},{name:"Melvin Gordon"},
  ]},

  q_nfl_packers_bears: { clue: "Name an NFL player who played for both the Packers AND the Bears", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Packers" }, { fact_type: "played_for_team", fact_value: "Bears" }], answers: [
    {name:"Julius Peppers"},{name:"Jim McMahon"},{name:"Desmond Howard"},
    {name:"Doug Atkins"},{name:"Willie Davis"},{name:"Martellus Bennett"},
    {name:"Mike Brown"},{name:"Al Harris"},{name:"Bryan Bulaga"},
    {name:"Jim Flanigan"},{name:"Travis Williams"},{name:"Jon Bostic"},
  ]},

  q_nfl_eagles_giants: { clue: "Name an NFL player who played for both the Eagles AND the Giants", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Eagles" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"DeSean Jackson"},{name:"Jason Pierre-Paul"},{name:"Brandon Graham"},
    {name:"Darius Slay"},{name:"James Bradberry"},{name:"Plaxico Buress"},
    {name:"Kerry Collins"},{name:"Matt Dodge"},{name:"Corey Webster"},
    {name:"Michael Strahan"},{name:"Sam Bradford"},{name:"Brandon Boykin"},
  ]},

  q_nfl_patriots_colts: { clue: "Name an NFL player who played for both the Patriots AND the Colts", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Patriots" }, { fact_type: "played_for_team", fact_value: "Colts" }], answers: [
    {name:"Adam Vinatieri"},{name:"Deion Branch"},{name:"Darrelle Revis"},
    {name:"Reggie Wayne"},{name:"Dwight Freeney"},{name:"Andre Johnson"},
    {name:"Jeff Saturday"},{name:"Corey Dillon"},{name:"Ahmad Bradshaw"},
    {name:"Art Monk"},{name:"Brandon Stokley"},{name:"Marvin Harrison"},
  ]},

  q_nfl_dolphins_49ers: { clue: "Name an NFL player who played for both the Dolphins AND the 49ers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Dolphins" }, { fact_type: "played_for_team", fact_value: "49ers" }], answers: [
    {name:"Frank Gore"},{name:"Wes Welker"},{name:"Brandon Marshall"},
    {name:"Mike Wallace"},{name:"Danny Amendola"},{name:"Ted Ginn Jr"},
    {name:"Carlos Hyde"},{name:"Brent Grimes"},{name:"Ndamukong Suh"},
    {name:"Jay Cutler"},{name:"Reshad Jones"},{name:"Patrick Surtain"},
  ]},

  q_nfl_steelers_broncos: { clue: "Name an NFL player who played for both the Steelers AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Steelers" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Emmanuel Sanders"},{name:"DeMarcus Ware"},{name:"James Harrison"},
    {name:"Rod Woodson"},{name:"Mike Wallace"},{name:"Aqib Talib"},
    {name:"Mark Bruener"},{name:"Deshea Townsend"},{name:"Von Miller"},
    {name:"Joe Haden"},{name:"Ryan Clark"},{name:"Najee Harris"},
  ]},

  q_nfl_seahawks_49ers: { clue: "Name an NFL player who played for both the Seahawks AND the 49ers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Seahawks" }, { fact_type: "played_for_team", fact_value: "49ers" }], answers: [
    {name:"Richard Sherman"},{name:"Jerry Rice"},{name:"Steve Young"},
    {name:"Brandon Browner"},{name:"Frank Clark"},{name:"Carlos Hyde"},
    {name:"Shaun Alexander"},{name:"Jeff Garcia"},{name:"Cortez Kennedy"},
    {name:"Bobby Wagner"},{name:"Dee Ford"},{name:"Jamal Adams"},
  ]},

  // ── KNOWLEDGEABLE ─────────────────────────────────────────────────────────────

  q_nfl_de_lb_100sacks_sb: { clue: "Name an NFL defensive player who recorded 100 or more career sacks AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_100_career_sacks" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Reggie White"},{name:"Bruce Smith"},{name:"Charles Haley"},
    {name:"Lawrence Taylor"},{name:"Richard Dent"},{name:"Derrick Thomas"},
    {name:"Kevin Greene"},{name:"Michael Strahan"},{name:"DeMarcus Ware"},
    {name:"Dwight Freeney"},{name:"Aaron Donald"},{name:"Julius Peppers"},
    {name:"Willie McGinest"},{name:"Chris Long"},{name:"Chandler Jones"},
    {name:"Myles Garrett"},
  ]},

  q_nfl_qb_300td_sb: { clue: "Name an NFL quarterback who threw 300 or more career touchdown passes AND won at least one Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_300_career_td_passes" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Tom Brady"},{name:"Peyton Manning"},{name:"Brett Favre"},
    {name:"Aaron Rodgers"},{name:"Drew Brees"},{name:"Ben Roethlisberger"},
    {name:"Patrick Mahomes"},{name:"Joe Montana"},{name:"Steve Young"},
    {name:"John Elway"},{name:"Terry Bradshaw"},{name:"Troy Aikman"},
    {name:"Roger Staubach"},{name:"Bart Starr"},{name:"Eli Manning"},
    {name:"Jalen Hurts"},{name:"Matthew Stafford"},{name:"Nick Foles"},
  ]},

  q_nfl_coach_sb_150w: { clue: "Name an NFL head coach who won a Super Bowl AND had 100 or more regular season wins in their career", sport: "NFL", rules: [{ fact_type: "nfl_super_bowl_winning_coach" }, { fact_type: "nfl_coach_100_wins" }], answers: [
    {name:"Bill Belichick"},{name:"Don Shula"},{name:"Tom Landry"},
    {name:"Chuck Noll"},{name:"Bill Walsh"},{name:"Joe Gibbs"},
    {name:"Andy Reid"},{name:"Mike Shanahan"},{name:"Tony Dungy"},
    {name:"Mike Tomlin"},{name:"John Madden"},{name:"Vince Lombardi"},
    {name:"Chuck Knox"},{name:"Hank Stram"},{name:"Don McCafferty"},
    {name:"John Harbaugh"},{name:"Pete Carroll"},{name:"Sean Payton"},
    {name:"Jon Gruden"},{name:"Mike McCarthy"},
  ]},

  q_nfl_te_probowl5_sb: { clue: "Name an NFL tight end who was selected to 5 or more Pro Bowls AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_5_plus_pro_bowls" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Rob Gronkowski"},{name:"Tony Gonzalez"},{name:"Antonio Gates"},
    {name:"Shannon Sharpe"},{name:"Mike Ditka"},{name:"John Mackey"},
    {name:"Dave Casper"},{name:"Raymond Chester"},{name:"Charlie Sanders"},
    {name:"Fred Dean"},{name:"Jay Novacek"},{name:"Mark Bavaro"},
    {name:"Brent Jones"},{name:"Keith Jackson"},{name:"Ben Coates"},
  ]},

  q_nfl_rb_14td_sb: { clue: "Name an NFL running back who scored 14 or more rushing touchdowns in a season AND won a Super Bowl during their career", sport: "NFL", rules: [{ fact_type: "nfl_14_rushing_td_season" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Emmitt Smith"},{name:"Marcus Allen"},{name:"LaDainian Tomlinson"},
    {name:"Marshall Faulk"},{name:"Shaun Alexander"},{name:"Terrell Davis"},
    {name:"Larry Csonka"},{name:"Chuck Foreman"},{name:"Roger Craig"},
    {name:"John Riggins"},{name:"Mike Alstott"},{name:"James White"},
    {name:"Leroy Kelly"},{name:"Tom Matte"},{name:"Don Perkins"},
    {name:"Clyde Edwards-Helaire"},{name:"Isiah Pacheco"},
  ]},

  q_nfl_cb_int50_sb: { clue: "Name an NFL cornerback or safety who recorded 50 or more career interceptions AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_50_career_interceptions" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Mel Blount"},{name:"Ronnie Lott"},{name:"Rod Woodson"},
    {name:"Deion Sanders"},{name:"Darren Sharper"},{name:"Ty Law"},
    {name:"Lem Barney"},{name:"Dick LeBeau"},{name:"Pat Fischer"},
    {name:"Larry Wilson"},{name:"Mike Haynes"},{name:"Eric Allen"},
    {name:"Aeneas Williams"},{name:"Emmitt Thomas"},{name:"Ken Houston"},
  ]},

  q_nfl_wr_1000_rec_sb: { clue: "Name an NFL wide receiver or tight end who caught 1,000 or more career passes AND won at least one Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_1000_receptions" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Jerry Rice"},{name:"Larry Fitzgerald"},{name:"Isaac Bruce"},
    {name:"Hines Ward"},{name:"Wes Welker"},{name:"Julian Edelman"},
    {name:"Reggie Wayne"},{name:"Andre Johnson"},{name:"Torry Holt"},
    {name:"Tim Brown"},{name:"Rod Smith"},{name:"Charlie Joiner"},
    {name:"Marvin Harrison"},{name:"Rob Gronkowski"},{name:"Jason Witten"},
    {name:"Tony Gonzalez"},{name:"Shannon Sharpe"},
  ]},

  q_nfl_edge_dpoy_sb: { clue: "Name an NFL defensive end or outside linebacker who won Defensive Player of the Year AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_dpoy" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Lawrence Taylor"},{name:"Reggie White"},{name:"Bruce Smith"},
    {name:"Dwight Freeney"},{name:"Aaron Donald"},{name:"Richard Dent"},
    {name:"Chris Doleman"},{name:"Michael Strahan"},{name:"Kevin Greene"},
    {name:"Jevon Kearse"},{name:"Derrick Thomas"},{name:"Von Miller"},
    {name:"DeMarcus Ware"},{name:"Micah Parsons"},{name:"T.J. Watt"},
  ]},

  q_nfl_49ers_raiders: { clue: "Name an NFL player who played for both the 49ers AND the Raiders", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "49ers" }, { fact_type: "played_for_team", fact_value: "Raiders" }], answers: [
    {name:"Jerry Rice"},{name:"Ronnie Lott"},{name:"Charles Woodson"},
    {name:"Richard Sherman"},{name:"Randy Moss"},{name:"Bill Romanowski"},
    {name:"Jim Plunkett"},{name:"Rod Woodson"},{name:"Tim Brown"},
    {name:"Napoleon Kaufman"},{name:"Charlie Garner"},{name:"Jeff Garcia"},
  ]},

  q_nfl_eagles_patriots: { clue: "Name an NFL player who played for both the Eagles AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Eagles" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Asante Samuel"},{name:"Corey Dillon"},{name:"Chris Long"},
    {name:"LeGarrette Blount"},{name:"Patrick Chung"},{name:"Malcolm Jenkins"},
    {name:"Mike Vrabel"},{name:"Devon Still"},{name:"Duce Staley"},
    {name:"Bryan Westbrook"},{name:"Trent Cole"},{name:"Jason Avant"},
  ]},

  q_nfl_dolphins_bears: { clue: "Name an NFL player who played for both the Dolphins AND the Bears", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Dolphins" }, { fact_type: "played_for_team", fact_value: "Bears" }], answers: [
    {name:"Jay Cutler"},{name:"Brandon Marshall"},{name:"Ricky Williams"},
    {name:"Dan Hampton"},{name:"Alonzo Spellman"},{name:"Ted Ginn Jr"},
    {name:"Reshad Jones"},{name:"Lamar Thomas"},{name:"Mike Ditka"},
    {name:"Jim Langer"},{name:"Bob Griese"},{name:"Larry Csonka"},
  ]},

  q_nfl_giants_chargers: { clue: "Name an NFL player who played for both the Giants AND the Chargers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Chargers" }], answers: [
    {name:"Eli Manning"},{name:"Philip Rivers"},{name:"LaDainian Tomlinson"},
    {name:"Drew Brees"},{name:"Ron Mix"},{name:"Harry Carson"},
    {name:"Plaxico Buress"},{name:"Michael Strahan"},{name:"Osi Umenyiora"},
    {name:"Jason Pierre-Paul"},{name:"Antonio Cromartie"},{name:"Brandon Jacobs"},
  ]},

  q_nfl_broncos_packers: { clue: "Name an NFL player who played for both the Broncos AND the Packers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Broncos" }, { fact_type: "played_for_team", fact_value: "Packers" }], answers: [
    {name:"Brett Favre"},{name:"Shannon Sharpe"},{name:"Ted Thompson"},
    {name:"Eddie Royal"},{name:"Craig Morton"},{name:"Julius Peppers"},
    {name:"Casey Hayward"},{name:"Howard Griffith"},{name:"Gary Zimmerman"},
    {name:"Brian Griese"},{name:"Mike Anderson"},{name:"Tony Carter"},
  ]},

  q_nfl_saints_chargers: { clue: "Name an NFL player who played for both the Saints AND the Chargers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Saints" }, { fact_type: "played_for_team", fact_value: "Chargers" }], answers: [
    {name:"Drew Brees"},{name:"LaDainian Tomlinson"},{name:"Junior Seau"},
    {name:"Darren Sproles"},{name:"Marques Colston"},{name:"Danny Woodhead"},
    {name:"Philip Rivers"},{name:"Keenan McCardell"},{name:"Doug Flutie"},
    {name:"Aaron Brooks"},{name:"Tyrell Williams"},{name:"Travis Benjamin"},
  ]},

  q_nfl_rams_patriots: { clue: "Name an NFL player who played for both the Rams AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Rams" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Marshall Faulk"},{name:"Kurt Warner"},{name:"Torry Holt"},
    {name:"Isaac Bruce"},{name:"Aqib Talib"},{name:"Brandin Cooks"},
    {name:"Danny Amendola"},{name:"Sony Michel"},{name:"Jared Goff"},
    {name:"Stephon Gilmore"},{name:"Ndamukong Suh"},{name:"Dante Scarnecchia"},
  ]},

  q_nfl_vikings_packers: { clue: "Name an NFL player who played for both the Vikings AND the Packers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Vikings" }, { fact_type: "played_for_team", fact_value: "Packers" }], answers: [
    {name:"Brett Favre"},{name:"Darren Sharper"},{name:"Greg Jennings"},
    {name:"Randall Cunningham"},{name:"Ryan Longwell"},{name:"Doug Pederson"},
    {name:"Jim McMahon"},{name:"Za'Darius Smith"},{name:"Adrian Peterson"},
    {name:"Ahmad Rashad"},{name:"Robert Smith"},{name:"Fran Tarkenton"},
  ]},

  q_nfl_colts_patriots: { clue: "Name an NFL player who played for both the Colts AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Colts" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Adam Vinatieri"},{name:"Deion Branch"},{name:"Reggie Wayne"},
    {name:"Dwight Freeney"},{name:"Marvin Harrison"},{name:"Jeff Saturday"},
    {name:"Darrelle Revis"},{name:"Andre Johnson"},{name:"Ahmad Bradshaw"},
    {name:"Corey Dillon"},{name:"Brandon Stokley"},{name:"Art Monk"},
  ]},

  q_nfl_jaguars_steelers: { clue: "Name an NFL player who played for both the Jaguars AND the Steelers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Jaguars" }, { fact_type: "played_for_team", fact_value: "Steelers" }], answers: [
    {name:"James Harrison"},{name:"Leonard Fournette"},{name:"Fred Taylor"},
    {name:"Jimmy Smith"},{name:"Keenan McCardell"},{name:"Rashean Mathis"},
    {name:"Aaron Jones"},{name:"Allen Robinson"},{name:"Calais Campbell"},
    {name:"Myles Jack"},{name:"Chris Ivory"},{name:"Will Blackmon"},
  ]},

  q_nfl_eagles_cowboys: { clue: "Name an NFL player who played for both the Eagles AND the Cowboys", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Eagles" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Terrell Owens"},{name:"DeMarco Murray"},{name:"Jason Peters"},
    {name:"Randall Cunningham"},{name:"Roy Williams"},{name:"Danny Amendola"},
    {name:"Miles Austin"},{name:"Sam Bradford"},{name:"Byron Jones"},
    {name:"Herschel Walker"},{name:"Keith Byars"},{name:"Nate Newton"},
  ]},

  q_nfl_texans_seahawks: { clue: "Name an NFL player who played for both the Texans AND the Seahawks", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Texans" }, { fact_type: "played_for_team", fact_value: "Seahawks" }], answers: [
    {name:"Jadeveon Clowney"},{name:"Duane Brown"},{name:"Carlos Hyde"},
    {name:"Jacob Martin"},{name:"Benardrick McKinney"},{name:"D.J. Reader"},
    {name:"Brandon Brooks"},{name:"Arian Foster"},{name:"Andre Johnson"},
    {name:"Brock Osweiler"},{name:"Ed Reed"},{name:"Matt Schaub"},
  ]},

  q_nfl_cowboys_giants: { clue: "Name an NFL player who played for both the Cowboys AND the Giants", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cowboys" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"Michael Strahan"},{name:"Plaxico Buress"},{name:"Jason Pierre-Paul"},
    {name:"Brandon Jacobs"},{name:"Amani Toomer"},{name:"Kerry Collins"},
    {name:"Ron Dayne"},{name:"Tiki Barber"},{name:"Everson Walls"},
    {name:"Danny White"},{name:"Sam Huff"},{name:"Frank Gifford"},
  ]},

  q_nfl_allpro_bears: { clue: "Name an NFL player who was named All-Pro AND played for the Bears", sport: "NFL", rules: [{ fact_type: "nfl_all_pro" }, { fact_type: "played_for_team", fact_value: "Bears" }], answers: [
    {name:"Walter Payton"},{name:"Dick Butkus"},{name:"Mike Singletary"},
    {name:"Devin Hester"},{name:"Brian Urlacher"},{name:"Lance Briggs"},
    {name:"Charles Tillman"},{name:"Gale Sayers"},{name:"Jay Hilgenberg"},
    {name:"Julius Peppers"},{name:"Richard Dent"},{name:"Khalil Mack"},
  ]},

  q_nfl_probowl_chiefs: { clue: "Name an NFL player who was selected to the Pro Bowl AND played for the Chiefs", sport: "NFL", rules: [{ fact_type: "nfl_pro_bowl" }, { fact_type: "played_for_team", fact_value: "Chiefs" }], answers: [
    {name:"Patrick Mahomes"},{name:"Travis Kelce"},{name:"Tyreek Hill"},
    {name:"Tony Gonzalez"},{name:"Derrick Thomas"},{name:"Jamaal Charles"},
    {name:"Priest Holmes"},{name:"Marcus Allen"},{name:"Chris Jones"},
    {name:"Neil Smith"},{name:"Will Shields"},{name:"Trent Green"},
  ]},

  q_nfl_chargers_broncos: { clue: "Name an NFL player who played for both the Chargers AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Chargers" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Jay Cutler"},{name:"Elvis Dumervil"},{name:"Shannon Sharpe"},
    {name:"John Lynch"},{name:"Antonio Gates"},{name:"LaDainian Tomlinson"},
    {name:"Junior Seau"},{name:"DeMarcus Ware"},{name:"Von Miller"},
    {name:"Danny Woodhead"},{name:"Ryan Mathews"},{name:"Eddie Royal"},
  ]},

  q_nfl_packers_raiders: { clue: "Name an NFL player who played for both the Packers AND the Raiders", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Packers" }, { fact_type: "played_for_team", fact_value: "Raiders" }], answers: [
    {name:"Charles Woodson"},{name:"Jordy Nelson"},{name:"James Jones"},
    {name:"Reggie McKenzie"},{name:"Davante Adams"},{name:"Ha Ha Clinton-Dix"},
    {name:"Eddie Lacy"},{name:"Randall Cobb"},{name:"Tim Brown"},
    {name:"Willie Brown"},{name:"Desmond Howard"},{name:"Don Hutson"},
  ]},

  q_nfl_chiefs_eagles: { clue: "Name an NFL player who played for both the Chiefs AND the Eagles", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Chiefs" }, { fact_type: "played_for_team", fact_value: "Eagles" }], answers: [
    {name:"Andy Reid"},{name:"LeSean McCoy"},{name:"Michael Vick"},
    {name:"DeSean Jackson"},{name:"Tyreek Hill"},{name:"Travis Kelce"},
    {name:"Jeremy Maclin"},{name:"Duce Staley"},{name:"Brian Westbrook"},
    {name:"DeMarco Murray"},{name:"Fletcher Cox"},{name:"Brandon Flowers"},
  ]},

  q_nfl_seahawks_raiders: { clue: "Name an NFL player who played for both the Seahawks AND the Raiders", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Seahawks" }, { fact_type: "played_for_team", fact_value: "Raiders" }], answers: [
    {name:"Marshawn Lynch"},{name:"Jerry Rice"},{name:"Bo Jackson"},
    {name:"Richard Sherman"},{name:"Brandon Browner"},{name:"Charles Woodson"},
    {name:"Nnamdi Asomugha"},{name:"Michael Bennett"},{name:"Cliff Avril"},
    {name:"Doug Baldwin"},{name:"Bobby Wagner"},{name:"Josh Gordon"},
  ]},

  q_nfl_cowboys_broncos: { clue: "Name an NFL player who played for both the Cowboys AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cowboys" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"DeMarcus Ware"},{name:"Emmitt Smith"},{name:"Tony Dorsett"},
    {name:"Aqib Talib"},{name:"Brandon Marshall"},{name:"Randall Cunningham"},
    {name:"Craig Morton"},{name:"Danny White"},{name:"Von Miller"},
    {name:"Ed Jones"},{name:"Danny Trevathan"},{name:"Emmanuel Sanders"},
  ]},

  q_nfl_panthers_bears: { clue: "Name an NFL player who played for both the Panthers AND the Bears", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Panthers" }, { fact_type: "played_for_team", fact_value: "Bears" }], answers: [
    {name:"Julius Peppers"},{name:"Jared Allen"},{name:"Greg Olsen"},
    {name:"Muhsin Muhammad"},{name:"Steve Smith"},{name:"Cam Newton"},
    {name:"Thomas Davis"},{name:"Charles Johnson"},{name:"DeAngelo Williams"},
    {name:"Brandon LaFell"},{name:"Robby Anderson"},{name:"Ted Ginn Jr"},
  ]},

  q_nfl_steelers_ravens: { clue: "Name an NFL player who played for both the Steelers AND the Ravens", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Steelers" }, { fact_type: "played_for_team", fact_value: "Ravens" }], answers: [
    {name:"Rod Woodson"},{name:"Le'Veon Bell"},{name:"Joe Haden"},
    {name:"James Harrison"},{name:"Terrell Suggs"},{name:"Mike Mitchell"},
    {name:"Mike Wallace"},{name:"Emmanuel Sanders"},{name:"Ryan Clark"},
    {name:"Elvis Dumervil"},{name:"Chris McAlister"},{name:"Steve McNair"},
  ]},

  // ── EXPERT ───────────────────────────────────────────────────────────────────

  q_nfl_k_200pts_sb: { clue: "Name an NFL kicker who scored 200 or more career points AND won a Super Bowl", sport: "NFL", rules: [{ fact_type: "nfl_kicker_200_career_points" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Adam Vinatieri"},{name:"Mike Vanderjagt"},{name:"John Carney"},
    {name:"Gary Anderson"},{name:"Morten Andersen"},{name:"Jason Hanson"},
    {name:"Matt Stover"},{name:"Jan Stenerud"},{name:"Lou Groza"},
    {name:"Nick Lowery"},{name:"Pat Leahy"},{name:"Steve Christie"},
    {name:"Chris Jacke"},{name:"Ryan Succop"},{name:"Harrison Butker"},
    {name:"Robbie Gould"},{name:"Stephen Gostkowski"},{name:"Justin Tucker"},
    {name:"Billy Cundiff"},{name:"Mike Nugent"},
  ]},

  q_nfl_qb_4000yd_sb: { clue: "Name an NFL quarterback who threw for 4,000 or more passing yards in a single season AND won a Super Bowl at any point in their career", sport: "NFL", rules: [{ fact_type: "nfl_4000_pass_yard_season" }, { fact_type: "nfl_super_bowl_winner" }], answers: [
    {name:"Tom Brady"},{name:"Peyton Manning"},{name:"Drew Brees"},
    {name:"Ben Roethlisberger"},{name:"Aaron Rodgers"},{name:"Patrick Mahomes"},
    {name:"Matthew Stafford"},{name:"Eli Manning"},{name:"Joe Montana"},
    {name:"Steve Young"},{name:"John Elway"},{name:"Roger Staubach"},
    {name:"Troy Aikman"},{name:"Jalen Hurts"},{name:"Nick Foles"},
    {name:"Brad Johnson"},{name:"Trent Dilfer"},{name:"Jeff Hostetler"},
  ]},

  q_nfl_hof_no_sb: { clue: "Name an NFL quarterback who was inducted into the Pro Football Hall of Fame AND never won a Super Bowl during their career", sport: "NFL", rules: [{ fact_type: "nfl_hall_of_fame_qb" }, { fact_type: "nfl_never_won_super_bowl" }], answers: [
    {name:"Dan Marino"},{name:"Warren Moon"},{name:"Fran Tarkenton"},
    {name:"Jim Kelly"},{name:"Boomer Esiason"},{name:"Phil Simms"},
    {name:"Steve McNair"},{name:"Ron Jaworski"},{name:"Ken Anderson"},
    {name:"Bernie Kosar"},{name:"Jim Hart"},{name:"Sonny Jurgensen"},
    {name:"Norm Snead"},{name:"Y.A. Tittle"},{name:"Bobby Layne"},
  ]},

  q_nfl_rb_2000yd_probowl: { clue: "Name an NFL running back who rushed for 2,000 or more yards in a single season AND was selected to the Pro Bowl that same year", sport: "NFL", rules: [{ fact_type: "nfl_2000_rush_yard_season" }, { fact_type: "nfl_pro_bowl" }], answers: [
    {name:"Eric Dickerson"},{name:"Barry Sanders"},{name:"Adrian Peterson"},
    {name:"Jamal Lewis"},{name:"Chris Johnson"},{name:"O.J. Simpson"},
    {name:"Terrell Davis"},{name:"Barry Foster"},{name:"Tiki Barber"},
    {name:"Jamal Anderson"},{name:"Edgerrin James"},{name:"LaDainian Tomlinson"},
    {name:"Marshall Faulk"},{name:"Clinton Portis"},{name:"Shaun Alexander"},
    {name:"Ricky Williams"},{name:"Derrick Henry"},
  ]},

  q_nfl_saints_cowboys: { clue: "Name an NFL player who played for both the Saints AND the Cowboys", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Saints" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Herschel Walker"},{name:"Terrell Owens"},{name:"Ricky Williams"},
    {name:"Joe Horn"},{name:"Deuce McAllister"},{name:"Malcolm Jenkins"},
    {name:"Dez Bryant"},{name:"Jaylon Smith"},{name:"Alvin Kamara"},
    {name:"Darren Sproles"},{name:"Cameron Jordan"},{name:"Emmanuel Sanders"},
  ]},

  q_nfl_bengals_cowboys: { clue: "Name an NFL player who played for both the Bengals AND the Cowboys", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bengals" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Terrell Owens"},{name:"Chad Johnson"},{name:"Carlos Dunlap"},
    {name:"Geno Atkins"},{name:"A.J. Green"},{name:"Andy Dalton"},
    {name:"Anthony Munoz"},{name:"Corey Dillon"},{name:"Isaac Curtis"},
    {name:"Deion Sanders"},{name:"Leon Hall"},{name:"Tee Higgins"},
  ]},

  q_nfl_lions_patriots: { clue: "Name an NFL player who played for both the Lions AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Lions" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Kyle Van Noy"},{name:"Danny Amendola"},{name:"Golden Tate"},
    {name:"Michael Roberts"},{name:"Reggie Bush"},{name:"Joique Bell"},
    {name:"Ndamukong Suh"},{name:"Glover Quin"},{name:"Darius Slay"},
    {name:"Quandre Diggs"},{name:"Jack Campbell"},{name:"Tyrell Williams"},
  ]},

  q_nfl_falcons_patriots: { clue: "Name an NFL player who played for both the Falcons AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Falcons" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Michael Vick"},{name:"Julio Jones"},{name:"Mohamed Sanu"},
    {name:"Deion Sanders"},{name:"Andre Roberts"},{name:"Roddy White"},
    {name:"Tony Gonzalez"},{name:"Vic Beasley"},{name:"Grady Jarrett"},
    {name:"Matt Schaub"},{name:"Chris Chandler"},{name:"Kyle Pitts"},
  ]},

  q_nfl_titans_ravens: { clue: "Name an NFL player who played for both the Titans AND the Ravens", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Titans" }, { fact_type: "played_for_team", fact_value: "Ravens" }], answers: [
    {name:"Steve McNair"},{name:"Derrick Mason"},{name:"Eddie George"},
    {name:"Chris Johnson"},{name:"Derrick Henry"},{name:"Jevon Kearse"},
    {name:"Frank Wycheck"},{name:"Samari Rolle"},{name:"Kyle Brady"},
    {name:"Justin Forsett"},{name:"Matt Birk"},{name:"Ryan Tannehill"},
  ]},

  q_nfl_cardinals_steelers: { clue: "Name an NFL player who played for both the Cardinals AND the Steelers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Cardinals" }, { fact_type: "played_for_team", fact_value: "Steelers" }], answers: [
    {name:"Emmitt Smith"},{name:"Anquan Boldin"},{name:"Edgerrin James"},
    {name:"Adrian Wilson"},{name:"Larry Fitzgerald"},{name:"Patrick Peterson"},
    {name:"Antonio Brown"},{name:"James Harrison"},{name:"Bryant McFadden"},
    {name:"Clark Haggans"},{name:"Kurt Warner"},{name:"Max Starks"},
  ]},

  q_nfl_bills_cowboys: { clue: "Name an NFL player who played for both the Bills AND the Cowboys", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bills" }, { fact_type: "played_for_team", fact_value: "Cowboys" }], answers: [
    {name:"Terrell Owens"},{name:"Drew Bledsoe"},{name:"Jason Peters"},
    {name:"Nate Clements"},{name:"Antoine Winfield"},{name:"Stevie Johnson"},
    {name:"Sam Adams"},{name:"Robert Royal"},{name:"Ryan Fitzpatrick"},
    {name:"EJ Manuel"},{name:"Stephon Gilmore"},{name:"Micah Hyde"},
  ]},

  q_nfl_dolphins_patriots: { clue: "Name an NFL player who played for both the Dolphins AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Dolphins" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Wes Welker"},{name:"Brandon Marshall"},{name:"Danny Amendola"},
    {name:"Ndamukong Suh"},{name:"Mike Wallace"},{name:"Ted Ginn Jr"},
    {name:"Chad Johnson"},{name:"A.J. Duhe"},{name:"Bryan Cox"},
    {name:"Patrick Surtain"},{name:"Sam Madison"},{name:"Reshad Jones"},
  ]},

  q_nfl_giants_patriots: { clue: "Name an NFL player who played for both the Giants AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Giants" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Jason Pierre-Paul"},{name:"Plaxico Buress"},{name:"Brandon Jacobs"},
    {name:"Dion Lewis"},{name:"Danny Amendola"},{name:"Mark Ingram"},
    {name:"David Tyree"},{name:"Corey Webster"},{name:"Jabrill Peppers"},
    {name:"James Bradberry"},{name:"Saquon Barkley"},{name:"Kenny Golladay"},
  ]},

  q_nfl_bears_saints: { clue: "Name an NFL player who played for both the Bears AND the Saints", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bears" }, { fact_type: "played_for_team", fact_value: "Saints" }], answers: [
    {name:"Devin Hester"},{name:"Julius Peppers"},{name:"Marques Colston"},
    {name:"Lance Briggs"},{name:"Charles Tillman"},{name:"Khalil Mack"},
    {name:"Jimmy Graham"},{name:"Alshon Jeffery"},{name:"Jay Cutler"},
    {name:"Greg Olsen"},{name:"Martellus Bennett"},{name:"Jared Allen"},
  ]},

  q_nfl_vikings_seahawks: { clue: "Name an NFL player who played for both the Vikings AND the Seahawks", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Vikings" }, { fact_type: "played_for_team", fact_value: "Seahawks" }], answers: [
    {name:"Cris Carter"},{name:"Percy Harvin"},{name:"Jared Allen"},
    {name:"John Randle"},{name:"Daunte Culpepper"},{name:"Adrian Peterson"},
    {name:"Shaun Alexander"},{name:"Bobby Wagner"},{name:"Steve Hutchinson"},
    {name:"Matt Birk"},{name:"Mack Strong"},{name:"Anthony Barr"},
  ]},

  q_nfl_broncos_raiders: { clue: "Name an NFL player who played for both the Broncos AND the Raiders", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Broncos" }, { fact_type: "played_for_team", fact_value: "Raiders" }], answers: [
    {name:"Aqib Talib"},{name:"DeMarcus Ware"},{name:"Shannon Sharpe"},
    {name:"Rod Smith"},{name:"Brandon Marshall"},{name:"Elvis Dumervil"},
    {name:"Mike Anderson"},{name:"Craig Morton"},{name:"Lyle Alzado"},
    {name:"Bill Romanowski"},{name:"Rich Gannon"},{name:"Marcus Allen"},
  ]},

  q_nfl_panthers_patriots: { clue: "Name an NFL player who played for both the Panthers AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Panthers" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Greg Olsen"},{name:"Steve Smith"},{name:"Julius Peppers"},
    {name:"Cam Newton"},{name:"Stephon Gilmore"},{name:"Ted Ginn Jr"},
    {name:"Thomas Davis"},{name:"Muhsin Muhammad"},{name:"DeAngelo Williams"},
    {name:"Kyle Love"},{name:"Brandon LaFell"},{name:"Jonathan Jones"},
  ]},

  q_nfl_texans_chiefs: { clue: "Name an NFL player who played for both the Texans AND the Chiefs", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Texans" }, { fact_type: "played_for_team", fact_value: "Chiefs" }], answers: [
    {name:"DeAndre Hopkins"},{name:"J.J. Watt"},{name:"Deshaun Watson"},
    {name:"Carlos Hyde"},{name:"Benardrick McKinney"},{name:"Will Fuller"},
    {name:"D.J. Reader"},{name:"Andre Johnson"},{name:"Arian Foster"},
    {name:"Matt Schaub"},{name:"Kareem Jackson"},{name:"Tyrann Mathieu"},
  ]},

  q_nfl_bengals_steelers: { clue: "Name an NFL player who played for both the Bengals AND the Steelers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bengals" }, { fact_type: "played_for_team", fact_value: "Steelers" }], answers: [
    {name:"Chad Johnson"},{name:"Hines Ward"},{name:"Mike Mitchell"},
    {name:"Vontaze Burfict"},{name:"A.J. Green"},{name:"Carlos Dunlap"},
    {name:"Geno Atkins"},{name:"George Iloka"},{name:"Mike Hilton"},
    {name:"Joe Mixon"},{name:"Ryan Shazier"},{name:"William Jackson"},
  ]},

  q_nfl_rams_49ers: { clue: "Name an NFL player who played for both the Rams AND the 49ers", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Rams" }, { fact_type: "played_for_team", fact_value: "49ers" }], answers: [
    {name:"Isaac Bruce"},{name:"Torry Holt"},{name:"Marshall Faulk"},
    {name:"Deion Sanders"},{name:"Richard Sherman"},{name:"NaVorro Bowman"},
    {name:"Chris Long"},{name:"Eric Reid"},{name:"Carlos Hyde"},
    {name:"Tavon Austin"},{name:"Sammy Watkins"},{name:"Odell Beckham Jr"},
  ]},

  q_nfl_browns_ravens: { clue: "Name an NFL player who played for both the Browns AND the Ravens", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Browns" }, { fact_type: "played_for_team", fact_value: "Ravens" }], answers: [
    {name:"Ozzie Newsome"},{name:"Vinny Testaverde"},{name:"Art Modell"},
    {name:"Eric Turner"},{name:"Rob Burnett"},{name:"Michael Jackson"},
    {name:"Matt Stover"},{name:"Earnest Byner"},{name:"Breshad Perriman"},
    {name:"Joe Thomas"},{name:"Gary Baxter"},{name:"Jadeveon Clowney"},
  ]},

  q_nfl_saints_patriots: { clue: "Name an NFL player who played for both the Saints AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Saints" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Brandin Cooks"},{name:"Danny Amendola"},{name:"Malcolm Butler"},
    {name:"Brandon Browner"},{name:"Malcolm Jenkins"},{name:"Willie Snead"},
    {name:"Jabari Greer"},{name:"Jonathan Vilma"},{name:"Kenbrell Thompkins"},
    {name:"Corey White"},{name:"Mark Ingram"},{name:"Chris Hogan"},
  ]},

  q_nfl_raiders_patriots: { clue: "Name an NFL player who played for both the Raiders AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Raiders" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Randy Moss"},{name:"Darrelle Revis"},{name:"Antonio Brown"},
    {name:"Aqib Talib"},{name:"Wes Welker"},{name:"Nnamdi Asomugha"},
    {name:"Charles Woodson"},{name:"Michael Floyd"},{name:"Cordarrelle Patterson"},
    {name:"Trent Brown"},{name:"Seth Roberts"},{name:"Justin Fargas"},
  ]},

  q_nfl_falcons_saints: { clue: "Name an NFL player who played for both the Falcons AND the Saints", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Falcons" }, { fact_type: "played_for_team", fact_value: "Saints" }], answers: [
    {name:"Deion Sanders"},{name:"Brett Favre"},{name:"Joe Horn"},
    {name:"Bobby Hebert"},{name:"Morten Andersen"},{name:"Andre Rison"},
    {name:"Roddy White"},{name:"Michael Turner"},{name:"Drew Brees"},
    {name:"Devonta Freeman"},{name:"Cameron Jordan"},{name:"Malcolm Jenkins"},
  ]},

  q_nfl_bucs_giants: { clue: "Name an NFL player who played for both the Buccaneers AND the Giants", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Buccaneers" }, { fact_type: "played_for_team", fact_value: "Giants" }], answers: [
    {name:"Saquon Barkley"},{name:"Jason Pierre-Paul"},{name:"Plaxico Buress"},
    {name:"Kenny Golladay"},{name:"Daniel Jones"},{name:"Brandon Jacobs"},
    {name:"Ahmad Bradshaw"},{name:"Dion Lewis"},{name:"Leonard Fournette"},
    {name:"Ndamukong Suh"},{name:"Shaq Barrett"},{name:"Tom Brady"},
  ]},

  q_nfl_jets_patriots: { clue: "Name an NFL player who played for both the Jets AND the Patriots", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Jets" }, { fact_type: "played_for_team", fact_value: "Patriots" }], answers: [
    {name:"Darrelle Revis"},{name:"Curtis Martin"},{name:"Bill Belichick"},
    {name:"Ty Law"},{name:"Chad Johnson"},{name:"Mike Vrabel"},
    {name:"Willie McGinest"},{name:"Bill Parcells"},{name:"Bryan Cox"},
    {name:"LeGarrette Blount"},{name:"Brandon Marshall"},{name:"Chris Long"},
  ]},

  q_nfl_lions_bears: { clue: "Name an NFL player who played for both the Lions AND the Bears", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Lions" }, { fact_type: "played_for_team", fact_value: "Bears" }], answers: [
    {name:"Dick Butkus"},{name:"Jay Cutler"},{name:"Brandon Marshall"},
    {name:"Ndamukong Suh"},{name:"Golden Tate"},{name:"Darius Slay"},
    {name:"Reggie Bush"},{name:"Joique Bell"},{name:"Glover Quin"},
    {name:"Jason Hanson"},{name:"Robert Quinn"},{name:"Allen Robinson"},
  ]},

  q_nfl_bills_chiefs: { clue: "Name an NFL player who played for both the Bills AND the Chiefs", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Bills" }, { fact_type: "played_for_team", fact_value: "Chiefs" }], answers: [
    {name:"Tyreek Hill"},{name:"LeSean McCoy"},{name:"Sammy Watkins"},
    {name:"Marshawn Lynch"},{name:"Willis McGahee"},{name:"Travis Henry"},
    {name:"Stevie Johnson"},{name:"Nate Clements"},{name:"Antoine Winfield"},
    {name:"Drew Bledsoe"},{name:"Marcus Peters"},{name:"Dontari Poe"},
  ]},

  q_nfl_colts_broncos: { clue: "Name an NFL player who played for both the Colts AND the Broncos", sport: "NFL", rules: [{ fact_type: "played_for_team", fact_value: "Colts" }, { fact_type: "played_for_team", fact_value: "Broncos" }], answers: [
    {name:"Peyton Manning"},{name:"John Elway"},{name:"Marvin Harrison"},
    {name:"Edgerrin James"},{name:"Dwight Freeney"},{name:"Adam Vinatieri"},
    {name:"Brandon Stokley"},{name:"Eric Decker"},{name:"Frank Gore"},
    {name:"T.Y. Hilton"},{name:"Andre Johnson"},{name:"Reggie Wayne"},
  ]},

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NFL_BEGINNER = [
  "q_nfl_qb_sb_300td","q_nfl_rb_10k_probowl","q_nfl_sb_undrafted",
  "q_nfl_wr_800rec_sb","q_nfl_rb_sb_1st_round","q_nfl_steelers_sb_probowl",
  "q_nfl_hall_of_fame_sb","q_nfl_qb_superbowl_heisman",
  "q_nfl_cowboys_49ers","q_nfl_patriots_broncos","q_nfl_packers_vikings",
  "q_nfl_giants_eagles","q_nfl_steelers_patriots","q_nfl_chiefs_raiders",
  "q_nfl_seahawks_broncos","q_nfl_cowboys_eagles","q_nfl_bears_packers",
  "q_nfl_ravens_49ers","q_nfl_broncos_colts","q_nfl_patriots_buccaneers",
  "q_nfl_cowboys_steelers","q_nfl_sb_mvp_team","q_nfl_ravens_steelers",
  "q_nfl_49ers_cowboys","q_nfl_chiefs_broncos","q_nfl_packers_bears",
  "q_nfl_eagles_giants","q_nfl_patriots_colts","q_nfl_dolphins_49ers",
  "q_nfl_steelers_broncos","q_nfl_seahawks_49ers",
];

export const NFL_KNOWLEDGEABLE = [
  "q_nfl_de_lb_100sacks_sb","q_nfl_qb_300td_sb","q_nfl_coach_sb_150w",
  "q_nfl_te_probowl5_sb","q_nfl_rb_14td_sb","q_nfl_cb_int50_sb",
  "q_nfl_wr_1000_rec_sb","q_nfl_edge_dpoy_sb",
  "q_nfl_49ers_raiders","q_nfl_eagles_patriots","q_nfl_dolphins_bears",
  "q_nfl_giants_chargers","q_nfl_broncos_packers","q_nfl_saints_chargers",
  "q_nfl_rams_patriots","q_nfl_vikings_packers","q_nfl_colts_patriots",
  "q_nfl_jaguars_steelers","q_nfl_eagles_cowboys","q_nfl_texans_seahawks",
  "q_nfl_cowboys_giants","q_nfl_allpro_bears","q_nfl_probowl_chiefs",
  "q_nfl_chargers_broncos","q_nfl_packers_raiders",
  "q_nfl_chiefs_eagles","q_nfl_seahawks_raiders","q_nfl_cowboys_broncos",
  "q_nfl_panthers_bears","q_nfl_steelers_ravens",
];

export const NFL_EXPERT = [
  "q_nfl_k_200pts_sb","q_nfl_qb_4000yd_sb",
  "q_nfl_hof_no_sb","q_nfl_rb_2000yd_probowl",
  "q_nfl_saints_cowboys","q_nfl_bengals_cowboys","q_nfl_lions_patriots",
  "q_nfl_falcons_patriots","q_nfl_titans_ravens","q_nfl_cardinals_steelers",
  "q_nfl_bills_cowboys","q_nfl_dolphins_patriots","q_nfl_giants_patriots",
  "q_nfl_bears_saints","q_nfl_vikings_seahawks","q_nfl_broncos_raiders",
  "q_nfl_panthers_patriots","q_nfl_texans_chiefs","q_nfl_bengals_steelers",
  "q_nfl_rams_49ers","q_nfl_browns_ravens",
  "q_nfl_saints_patriots","q_nfl_raiders_patriots","q_nfl_falcons_saints",
  "q_nfl_bucs_giants","q_nfl_jets_patriots","q_nfl_lions_bears",
  "q_nfl_bills_chiefs","q_nfl_colts_broncos",
];
