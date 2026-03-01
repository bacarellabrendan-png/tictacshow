#!/usr/bin/env node
// Import comprehensive historical player lists into Supabase `players` table.
// NBA players are fetched from a public JSON endpoint; all other sports are
// hardcoded with 200+ well-known historical players each.
//
// Usage: node scripts/import_all_players.mjs <SUPABASE_SERVICE_ROLE_KEY>

import https from 'https';

const SUPABASE_URL = 'https://uqufvtajxqbicuxlxcxu.supabase.co';
const SERVICE_KEY = process.argv[2] || process.env.SUPABASE_SERVICE_KEY;

if (!SERVICE_KEY) {
  console.error('Usage: node scripts/import_all_players.mjs <SUPABASE_SERVICE_ROLE_KEY>');
  console.error('  Get the service_role key from Supabase Dashboard → Settings → API');
  process.exit(1);
}

const BATCH_SIZE = 500;

// ---------------------------------------------------------------------------
// NBA — fetched from public JSON
// ---------------------------------------------------------------------------
function fetchNBA() {
  return new Promise((resolve, reject) => {
    https.get('https://raw.githubusercontent.com/bttmly/nba/master/data/players.json', res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        try {
          const players = JSON.parse(Buffer.concat(chunks).toString());
          const names = [...new Set(
            players.map(p => {
              if (p.firstName && p.lastName) return `${p.firstName} ${p.lastName}`;
              if (p.name) return p.name;
              if (p.playerName) return p.playerName;
              return null;
            }).filter(Boolean)
          )];
          resolve(names);
        } catch (e) {
          reject(new Error(`Failed to parse NBA JSON: ${e.message}`));
        }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// ---------------------------------------------------------------------------
// NFL — 250 well-known historical players
// ---------------------------------------------------------------------------
const NFL_PLAYERS = [
  // Quarterbacks
  "Tom Brady", "Joe Montana", "Peyton Manning", "Johnny Unitas", "Brett Favre",
  "John Elway", "Dan Marino", "Aaron Rodgers", "Drew Brees", "Terry Bradshaw",
  "Troy Aikman", "Roger Staubach", "Steve Young", "Dan Fouts", "Bart Starr",
  "Otto Graham", "Fran Tarkenton", "Warren Moon", "Jim Kelly", "Bob Griese",
  "Joe Namath", "Eli Manning", "Ben Roethlisberger", "Kurt Warner", "Russell Wilson",
  "Patrick Mahomes", "Lamar Jackson", "Josh Allen", "Daunte Culpepper", "Donovan McNabb",
  "Michael Vick", "Randall Cunningham", "Phil Simms", "Ken Stabler", "Boomer Esiason",
  "Vinny Testaverde", "Rich Gannon", "Matt Ryan", "Philip Rivers", "Tony Romo",
  "Cam Newton", "Deshaun Watson", "Dak Prescott", "Matthew Stafford", "Joe Burrow",
  "Justin Herbert", "Jalen Hurts", "Len Dawson", "Sonny Jurgensen", "Y.A. Tittle",
  // Running backs
  "Jim Brown", "Walter Payton", "Barry Sanders", "Emmitt Smith", "Eric Dickerson",
  "Adrian Peterson", "LaDainian Tomlinson", "Earl Campbell", "Tony Dorsett", "Marcus Allen",
  "Marshall Faulk", "Thurman Thomas", "Curtis Martin", "Jerome Bettis", "Franco Harris",
  "Gale Sayers", "O.J. Simpson", "Terrell Davis", "Edgerrin James", "Ricky Williams",
  "Priest Holmes", "Jamal Lewis", "Clinton Portis", "Fred Taylor", "Corey Dillon",
  "Shaun Alexander", "Larry Johnson", "Steven Jackson", "Chris Johnson", "Arian Foster",
  "Jamaal Charles", "Le'Veon Bell", "Todd Gurley", "Ezekiel Elliott", "Derrick Henry",
  "Dalvin Cook", "Alvin Kamara", "Saquon Barkley", "Nick Chubb", "Jonathan Taylor",
  "Christian McCaffrey", "Frank Gore", "Marshawn Lynch", "DeMarco Murray", "Matt Forte",
  "Ray Rice", "Maurice Jones-Drew", "Tiki Barber", "Ahman Green", "Warrick Dunn",
  // Wide receivers
  "Jerry Rice", "Randy Moss", "Terrell Owens", "Larry Fitzgerald", "Calvin Johnson",
  "Cris Carter", "Tim Brown", "Marvin Harrison", "Isaac Bruce", "Torry Holt",
  "Steve Largent", "Michael Irvin", "Andre Johnson", "DeAndre Hopkins", "Julio Jones",
  "Antonio Brown", "Davante Adams", "Tyreek Hill", "Stefon Diggs", "A.J. Green",
  "Odell Beckham Jr.", "Mike Evans", "Dez Bryant", "Brandon Marshall", "Anquan Boldin",
  "Reggie Wayne", "Hines Ward", "Chad Johnson", "Steve Smith", "Wes Welker",
  "Julian Edelman", "Cooper Kupp", "Ja'Marr Chase", "Justin Jefferson", "DK Metcalf",
  "Don Hutson", "Lance Alworth", "Raymond Berry", "Paul Warfield", "Art Monk",
  // Tight ends
  "Tony Gonzalez", "Rob Gronkowski", "Travis Kelce", "Shannon Sharpe", "Antonio Gates",
  "Mike Ditka", "Kellen Winslow", "Jason Witten", "Ozzie Newsome", "John Mackey",
  "George Kittle", "Mark Andrews", "Dallas Clark", "Vernon Davis", "Jimmy Graham",
  // Defensive players
  "Lawrence Taylor", "Reggie White", "Deion Sanders", "Dick Butkus", "Ray Lewis",
  "Ronnie Lott", "Joe Greene", "Jack Lambert", "Mike Singletary", "Bruce Smith",
  "Derrick Thomas", "Junior Seau", "Brian Urlacher", "Ed Reed", "Troy Polamalu",
  "Charles Woodson", "Rod Woodson", "Champ Bailey", "Darrelle Revis", "Richard Sherman",
  "J.J. Watt", "Aaron Donald", "Khalil Mack", "Von Miller", "T.J. Watt",
  "Myles Garrett", "Nick Bosa", "Micah Parsons", "Patrick Willis", "Luke Kuechly",
  "Bobby Wagner", "Derrick Brooks", "Jack Ham", "Ted Hendricks", "Michael Strahan",
  "Jason Taylor", "Dwight Freeney", "Robert Mathis", "Julius Peppers", "DeMarcus Ware",
  "Terrell Suggs", "Cameron Jordan", "Calais Campbell", "Fletcher Cox", "Geno Atkins",
  "Warren Sapp", "John Randle", "Cortez Kennedy", "Alan Page", "Bob Lilly",
  "Merlin Olsen", "Deacon Jones", "Randy White", "Howie Long", "Dan Hampton",
  "Night Train Lane", "Mel Blount", "Herb Adderley", "Willie Brown", "Mike Haynes",
  "Ty Law", "Aeneas Williams", "Ronde Barber", "Brian Dawkins", "John Lynch",
  "Kenny Easley", "Steve Atwater", "Kam Chancellor", "Earl Thomas", "Tyrann Mathieu",
  // Offensive line
  "Anthony Munoz", "John Hannah", "Bruce Matthews", "Larry Allen", "Jonathan Ogden",
  "Walter Jones", "Orlando Pace", "Jim Parker", "Forrest Gregg", "Gene Upshaw",
  // Kickers/punters
  "Adam Vinatieri", "Morten Andersen", "Justin Tucker", "Jan Stenerud", "Jason Hanson",
  // Coaches as players or well-known names
  "Jim Thorpe", "Red Grange", "Sammy Baugh", "Bronko Nagurski", "Chuck Bednarik",
];

// ---------------------------------------------------------------------------
// MLB — 250 well-known historical players
// ---------------------------------------------------------------------------
const MLB_PLAYERS = [
  // Pitchers
  "Nolan Ryan", "Sandy Koufax", "Bob Gibson", "Tom Seaver", "Roger Clemens",
  "Greg Maddux", "Pedro Martinez", "Randy Johnson", "Walter Johnson", "Christy Mathewson",
  "Cy Young", "Warren Spahn", "Steve Carlton", "Whitey Ford", "Juan Marichal",
  "Bob Feller", "Lefty Grove", "Satchel Paige", "Mariano Rivera", "Trevor Hoffman",
  "Dennis Eckersley", "Goose Gossage", "Rollie Fingers", "Lee Smith", "Craig Kimbrel",
  "Kenley Jansen", "Aroldis Chapman", "Max Scherzer", "Clayton Kershaw", "Justin Verlander",
  "Jacob deGrom", "Gerrit Cole", "Zack Greinke", "CC Sabathia", "Roy Halladay",
  "Curt Schilling", "John Smoltz", "Mike Mussina", "Andy Pettitte", "David Cone",
  "Orel Hershiser", "Dwight Gooden", "Jack Morris", "Catfish Hunter", "Don Drysdale",
  "Gaylord Perry", "Phil Niekro", "Jim Palmer", "Fergie Jenkins", "Don Sutton",
  "Nolan Arenado", "Shohei Ohtani", "Felix Hernandez", "Tim Lincecum", "Madison Bumgarner",
  "Johan Santana", "Roy Oswalt", "Mark Buehrle", "Barry Zito", "Tim Hudson",
  // Catchers
  "Johnny Bench", "Yogi Berra", "Carlton Fisk", "Mike Piazza", "Ivan Rodriguez",
  "Joe Mauer", "Buster Posey", "Yadier Molina", "Jorge Posada", "Gary Carter",
  "Roy Campanella", "Thurman Munson", "Bill Dickey", "Gabby Hartnett", "J.T. Realmuto",
  // First basemen
  "Lou Gehrig", "Albert Pujols", "Jeff Bagwell", "Frank Thomas", "Jim Thome",
  "Eddie Murray", "Willie McCovey", "Harmon Killebrew", "Jimmie Foxx", "Hank Greenberg",
  "Mark McGwire", "Rafael Palmeiro", "Don Mattingly", "Keith Hernandez", "Steve Garvey",
  "Paul Goldschmidt", "Freddie Freeman", "Joey Votto", "Miguel Cabrera", "Todd Helton",
  "Prince Fielder", "Ryan Howard", "Jason Giambi", "Mo Vaughn", "Fred McGriff",
  // Second basemen
  "Rogers Hornsby", "Joe Morgan", "Jackie Robinson", "Roberto Alomar", "Ryne Sandberg",
  "Craig Biggio", "Rod Carew", "Nap Lajoie", "Charlie Gehringer", "Chase Utley",
  "Dustin Pedroia", "Robinson Cano", "Jeff Kent", "Jose Altuve", "Marcus Semien",
  // Shortstops
  "Honus Wagner", "Derek Jeter", "Cal Ripken Jr.", "Ernie Banks", "Ozzie Smith",
  "Alex Rodriguez", "Robin Yount", "Barry Larkin", "Alan Trammell", "Luke Appling",
  "Nomar Garciaparra", "Miguel Tejada", "Jose Reyes", "Troy Tulowitzki", "Francisco Lindor",
  "Corey Seager", "Trea Turner", "Carlos Correa", "Xander Bogaerts", "Fernando Tatis Jr.",
  // Third basemen
  "Mike Schmidt", "George Brett", "Brooks Robinson", "Wade Boggs", "Chipper Jones",
  "Eddie Mathews", "Ron Santo", "Adrián Beltré", "David Wright", "Scott Rolen",
  "Manny Machado", "Kris Bryant", "Evan Longoria", "Matt Williams", "Graig Nettles",
  // Outfielders
  "Babe Ruth", "Willie Mays", "Hank Aaron", "Ted Williams", "Ty Cobb",
  "Mickey Mantle", "Joe DiMaggio", "Roberto Clemente", "Stan Musial", "Frank Robinson",
  "Ken Griffey Jr.", "Barry Bonds", "Mike Trout", "Rickey Henderson", "Tony Gwynn",
  "Ichiro Suzuki", "Dave Winfield", "Andre Dawson", "Kirby Puckett", "Duke Snider",
  "Al Kaline", "Carl Yastrzemski", "Reggie Jackson", "Sammy Sosa", "Manny Ramirez",
  "Vladimir Guerrero", "Larry Walker", "Jim Rice", "Dwight Evans", "Dale Murphy",
  "Darryl Strawberry", "Jose Canseco", "Juan Soto", "Ronald Acuña Jr.", "Mookie Betts",
  "Bryce Harper", "Aaron Judge", "Giancarlo Stanton", "J.D. Martinez", "Christian Yelich",
  "Cody Bellinger", "Kyle Schwarber", "Andrew McCutchen", "Carlos Beltran", "Torii Hunter",
  "Andruw Jones", "Jim Edmonds", "Kenny Lofton", "Bernie Williams", "Johnny Damon",
  "Manny Machado", "Nelson Cruz", "Shin-Soo Choo", "Matt Holliday", "Ryan Braun",
  "Vladimir Guerrero Jr.", "Yordan Alvarez", "Kyle Tucker", "Julio Rodríguez", "Elly De La Cruz",
  // Designated hitters / utility
  "David Ortiz", "Edgar Martinez", "Harold Baines", "Hideki Matsui", "Paul Molitor",
  "George Sisler", "Tris Speaker", "Mel Ott", "Ernie Lombardi", "Pie Traynor",
  "Ozzie Albies", "Pete Rose", "Cap Anson", "Eddie Collins", "Sam Crawford",
];

// ---------------------------------------------------------------------------
// NHL — 250 well-known historical players
// ---------------------------------------------------------------------------
const NHL_PLAYERS = [
  // Centers
  "Wayne Gretzky", "Mario Lemieux", "Sidney Crosby", "Mark Messier", "Steve Yzerman",
  "Jean Beliveau", "Phil Esposito", "Bryan Trottier", "Peter Forsberg", "Joe Sakic",
  "Ron Francis", "Adam Oates", "Mats Sundin", "Joe Thornton", "Eric Lindros",
  "Evgeni Malkin", "Anze Kopitar", "Patrice Bergeron", "Jonathan Toews", "Steven Stamkos",
  "Connor McDavid", "Jack Eichel", "Auston Matthews", "Nathan MacKinnon", "Leon Draisaitl",
  "Aleksander Barkov", "Dylan Larkin", "Sebastian Aho", "Elias Pettersson", "Mika Zibanejad",
  "Howie Morenz", "Syl Apps", "Ted Kennedy", "Henri Richard", "Bobby Clarke",
  "Darryl Sittler", "Denis Savard", "Dale Hawerchuk", "Pierre Turgeon", "Mike Modano",
  "Pat LaFontaine", "Jeremy Roenick", "Doug Gilmour", "Vincent Lecavalier", "Ryan Getzlaf",
  "John Tavares", "Derick Brassard", "Nicklas Backstrom", "Claude Giroux", "Mark Scheifele",
  // Left wings
  "Bobby Hull", "Alex Ovechkin", "Ted Lindsay", "Luc Robitaille", "Frank Mahovlich",
  "Brendan Shanahan", "John Bucyk", "Michel Goulet", "Dave Andreychuk", "Keith Tkachuk",
  "Rick Nash", "Ilya Kovalchuk", "Henrik Zetterberg", "Taylor Hall", "Artemi Panarin",
  "Brad Marchand", "Johnny Gaudreau", "Gabriel Landeskog", "Jason Robertson", "Chris Kreider",
  "Busher Jackson", "Dickie Moore", "Bill Barber", "Steve Shutt", "Clark Gillies",
  // Right wings
  "Gordie Howe", "Maurice Richard", "Guy Lafleur", "Jaromir Jagr", "Mike Bossy",
  "Brett Hull", "Jari Kurri", "Teemu Selanne", "Cam Neely", "Joe Mullen",
  "Mike Gartner", "Dino Ciccarelli", "Dave Taylor", "Yvan Cournoyer", "Rod Gilbert",
  "Pat Verbeek", "Marian Hossa", "Jarome Iginla", "Jerome Iginla", "Daniel Alfredsson",
  "Marian Gaborik", "Corey Perry", "Patrick Kane", "Nikita Kucherov", "David Pastrnak",
  "Mitch Marner", "Mikko Rantanen", "Mark Stone", "Timo Meier", "Matthew Tkachuk",
  "Andy Bathgate", "Bernie Geoffrion", "Charlie Conacher", "Cy Denneny", "Bill Cook",
  // Defensemen
  "Bobby Orr", "Nicklas Lidstrom", "Doug Harvey", "Ray Bourque", "Paul Coffey",
  "Denis Potvin", "Larry Robinson", "Chris Chelios", "Brian Leetch", "Scott Stevens",
  "Al MacInnis", "Phil Housley", "Borje Salming", "Serge Savard", "Brad Park",
  "Scott Niedermayer", "Chris Pronger", "Rob Blake", "Zdeno Chara", "Shea Weber",
  "Drew Doughty", "Duncan Keith", "Brent Burns", "Erik Karlsson", "Victor Hedman",
  "Cale Makar", "Adam Fox", "Quinn Hughes", "Miro Heiskanen", "Moritz Seider",
  "Dit Clapper", "Eddie Shore", "King Clancy", "Red Kelly", "Tim Horton",
  "Pierre Pilote", "Jacques Laperriere", "Guy Lapointe", "Mark Howe", "Gary Suter",
  "Sandis Ozolinsh", "Brian Campbell", "Kimmo Timonen", "Tomas Kaberle", "Roman Josi",
  "John Carlson", "Seth Jones", "Rasmus Dahlin", "Devon Toews", "Charlie McAvoy",
  // Goalies
  "Patrick Roy", "Martin Brodeur", "Dominik Hasek", "Terry Sawchuk", "Jacques Plante",
  "Ken Dryden", "Tony Esposito", "Ed Belfour", "Grant Fuhr", "Billy Smith",
  "Glenn Hall", "Mike Richter", "Curtis Joseph", "Olaf Kolzig", "Roberto Luongo",
  "Henrik Lundqvist", "Carey Price", "Marc-Andre Fleury", "Tuukka Rask", "Braden Holtby",
  "Jonathan Quick", "Ryan Miller", "Tim Thomas", "Cam Talbot", "Andrei Vasilevskiy",
  "Igor Shesterkin", "Connor Hellebuyck", "Juuse Saros", "Jake Oettinger", "Ilya Sorokin",
  "Georges Vezina", "Clint Benedict", "George Hainsworth", "Turk Broda", "Bill Durnan",
  "Gump Worsley", "Johnny Bower", "Rogie Vachon", "Bernie Parent", "Tom Barrasso",
  "Mike Vernon", "Chris Osgood", "Nikolai Khabibulin", "Evgeni Nabokov", "Pekka Rinne",
  "Sergei Bobrovsky", "John Gibson", "Linus Ullmark", "Thatcher Demko", "Adin Hill",
];

// ---------------------------------------------------------------------------
// Soccer — 250 well-known historical players
// ---------------------------------------------------------------------------
const SOCCER_PLAYERS = [
  // Brazil
  "Pelé", "Ronaldo", "Ronaldinho", "Neymar", "Romário",
  "Rivaldo", "Garrincha", "Kaká", "Cafu", "Roberto Carlos",
  "Socrates", "Zico", "Falcão", "Didi", "Jairzinho",
  "Bebeto", "Adriano", "Robinho", "Dani Alves", "Marcelo",
  "Thiago Silva", "Casemiro", "Firmino", "Vinicius Jr.", "Alisson",
  // Argentina
  "Diego Maradona", "Lionel Messi", "Alfredo Di Stéfano", "Gabriel Batistuta", "Hernán Crespo",
  "Juan Román Riquelme", "Javier Zanetti", "Diego Simeone", "Mario Kempes", "Daniel Passarella",
  "Sergio Agüero", "Javier Mascherano", "Carlos Tevez", "Gonzalo Higuaín", "Ángel Di María",
  "Lautaro Martínez", "Julián Álvarez", "Emiliano Martínez", "Paulo Dybala", "Claudio Caniggia",
  // Germany
  "Franz Beckenbauer", "Gerd Müller", "Lothar Matthäus", "Jürgen Klinsmann", "Karl-Heinz Rummenigge",
  "Miroslav Klose", "Michael Ballack", "Bastian Schweinsteiger", "Thomas Müller", "Manuel Neuer",
  "Philipp Lahm", "Toni Kroos", "Mesut Özil", "Oliver Kahn", "Sepp Maier",
  "Fritz Walter", "Uwe Seeler", "Berti Vogts", "Paul Breitner", "Pierre Littbarski",
  // France
  "Zinedine Zidane", "Michel Platini", "Thierry Henry", "Just Fontaine", "Raymond Kopa",
  "Patrick Vieira", "Lilian Thuram", "Laurent Blanc", "Eric Cantona", "David Trezeguet",
  "Kylian Mbappé", "Antoine Griezmann", "Karim Benzema", "Hugo Lloris", "N'Golo Kanté",
  "Paul Pogba", "Franck Ribéry", "Robert Pirès", "Didier Deschamps", "Fabien Barthez",
  // Italy
  "Paolo Maldini", "Franco Baresi", "Roberto Baggio", "Alessandro Del Piero", "Francesco Totti",
  "Gianluigi Buffon", "Andrea Pirlo", "Dino Zoff", "Giuseppe Meazza", "Giacinto Facchetti",
  "Gianni Rivera", "Sandro Mazzola", "Marco Tardelli", "Alessandro Nesta", "Fabio Cannavaro",
  "Filippo Inzaghi", "Christian Vieri", "Gennaro Gattuso", "Daniele De Rossi", "Giorgio Chiellini",
  // England
  "Bobby Charlton", "Bobby Moore", "Gary Lineker", "David Beckham", "Wayne Rooney",
  "Alan Shearer", "Michael Owen", "Paul Gascoigne", "Kevin Keegan", "Jimmy Greaves",
  "Stanley Matthews", "Gordon Banks", "Peter Shilton", "Rio Ferdinand", "John Terry",
  "Frank Lampard", "Steven Gerrard", "Harry Kane", "Raheem Sterling", "Jack Charlton",
  // Spain
  "Xavi", "Andrés Iniesta", "Raúl", "Fernando Torres", "David Villa",
  "Iker Casillas", "Sergio Ramos", "Carles Puyol", "Xabi Alonso", "Sergio Busquets",
  "Gerard Piqué", "David Silva", "Pedro", "Cesc Fàbregas", "Fernando Hierro",
  "Luis Suárez Miramontes", "Emilio Butragueño", "Michel", "Luis Enrique", "Pedri",
  // Portugal
  "Cristiano Ronaldo", "Eusébio", "Luís Figo", "Rui Costa", "Deco",
  "Pepe", "Bruno Fernandes", "Bernardo Silva", "João Félix", "Nuno Gomes",
  // Netherlands
  "Johan Cruyff", "Marco van Basten", "Ruud Gullit", "Frank Rijkaard", "Dennis Bergkamp",
  "Arjen Robben", "Robin van Persie", "Wesley Sneijder", "Virgil van Dijk", "Memphis Depay",
  "Edgar Davids", "Clarence Seedorf", "Patrick Kluivert", "Ruud van Nistelrooy", "Johan Neeskens",
  // Other notable players
  "George Best", "Lev Yashin", "Ferenc Puskás", "George Weah", "Samuel Eto'o",
  "Didier Drogba", "Zlatan Ibrahimović", "Robert Lewandowski", "Luis Suárez", "Edinson Cavani",
  "Radamel Falcao", "James Rodríguez", "Mohamed Salah", "Sadio Mané", "Riyad Mahrez",
  "Son Heung-min", "Park Ji-sung", "Hidetoshi Nakata", "Hugo Sánchez", "Hristo Stoichkov",
  "Gheorghe Hagi", "Davor Šuker", "Luka Modrić", "Ivan Rakitić", "Dejan Lovren",
  "Erling Haaland", "Jude Bellingham", "Phil Foden", "Bukayo Saka", "Jamal Musiala",
];

// ---------------------------------------------------------------------------
// Supabase helpers (same pattern as import_players.mjs)
// ---------------------------------------------------------------------------
function postBatch(rows) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(rows);
    const url = new URL('/rest/v1/players?on_conflict=name,sport', SUPABASE_URL);
    const opts = {
      method: 'POST',
      hostname: url.hostname,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Prefer': 'resolution=merge-duplicates',
        'Content-Length': Buffer.byteLength(body),
      },
    };
    const req = https.request(opts, res => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        const text = Buffer.concat(chunks).toString();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve({ ok: true, status: res.statusCode });
        } else {
          resolve({ ok: false, status: res.statusCode, body: text });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function importSport(sport, names) {
  // Deduplicate within the list
  const unique = [...new Set(names)];
  console.log(`\n[${sport.toUpperCase()}] ${unique.length} players to import`);

  let imported = 0;
  let errors = 0;

  for (let i = 0; i < unique.length; i += BATCH_SIZE) {
    const batch = unique.slice(i, i + BATCH_SIZE).map(name => ({ name, sport }));
    const result = await postBatch(batch);
    if (result.ok) {
      imported += batch.length;
      process.stdout.write(`  batch ${Math.floor(i / BATCH_SIZE) + 1}: ${imported}/${unique.length}\r`);
    } else {
      errors++;
      console.error(`  batch ${Math.floor(i / BATCH_SIZE) + 1} FAILED (${result.status}): ${result.body.slice(0, 200)}`);
    }
  }

  console.log(`  [${sport.toUpperCase()}] Done: ${imported} imported, ${errors} batch errors`);
  return imported;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
console.log('=== Importing all players into Supabase ===');

let total = 0;

// NBA — fetch from remote JSON
console.log('\nFetching NBA players from GitHub...');
try {
  const nbaNames = await fetchNBA();
  total += await importSport('nba', nbaNames);
} catch (e) {
  console.error(`Failed to fetch NBA players: ${e.message}`);
}

// NFL, MLB, NHL, Soccer — hardcoded lists
total += await importSport('nfl', NFL_PLAYERS);
total += await importSport('mlb', MLB_PLAYERS);
total += await importSport('nhl', NHL_PLAYERS);
total += await importSport('soccer', SOCCER_PLAYERS);

console.log(`\n=== COMPLETE: ${total} total players imported ===`);
