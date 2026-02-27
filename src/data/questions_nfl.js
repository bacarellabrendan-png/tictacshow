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

};

// ── Difficulty tiers ──────────────────────────────────────────────────────────
export const NFL_BEGINNER = [
  "q_nfl_qb_sb_300td","q_nfl_rb_10k_probowl","q_nfl_sb_undrafted",
  "q_nfl_wr_800rec_sb","q_nfl_rb_sb_1st_round","q_nfl_steelers_sb_probowl",
  "q_nfl_hall_of_fame_sb","q_nfl_qb_superbowl_heisman",
];

export const NFL_KNOWLEDGEABLE = [
  "q_nfl_de_lb_100sacks_sb","q_nfl_qb_300td_sb","q_nfl_coach_sb_150w",
  "q_nfl_te_probowl5_sb","q_nfl_rb_14td_sb","q_nfl_cb_int50_sb",
  "q_nfl_wr_1000_rec_sb","q_nfl_edge_dpoy_sb",
];

export const NFL_EXPERT = [
  "q_nfl_k_200pts_sb","q_nfl_qb_4000yd_sb",
  "q_nfl_hof_no_sb","q_nfl_rb_2000yd_probowl",
];
