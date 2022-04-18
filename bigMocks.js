const listOptions = [{
  "id": 1,
  "name": "Bendix"
}, {
  "id": 2,
  "name": "Osbert"
}, {
  "id": 3,
  "name": "Stanly"
}, {
  "id": 4,
  "name": "Shirline"
}, {
  "id": 5,
  "name": "Edy"
}, {
  "id": 6,
  "name": "Yorgos"
}, {
  "id": 7,
  "name": "Latrina"
}, {
  "id": 8,
  "name": "Adelaide"
}, {
  "id": 9,
  "name": "Yurik"
}, {
  "id": 10,
  "name": "Page"
}, {
  "id": 11,
  "name": "Padriac"
}, {
  "id": 12,
  "name": "Gilles"
}, {
  "id": 13,
  "name": "Hettie"
}, {
  "id": 14,
  "name": "Aylmar"
}, {
  "id": 15,
  "name": "Burg"
}, {
  "id": 16,
  "name": "Emmett"
}, {
  "id": 17,
  "name": "Obadiah"
}, {
  "id": 18,
  "name": "Helene"
}, {
  "id": 19,
  "name": "Rosette"
}, {
  "id": 20,
  "name": "Camille"
}, {
  "id": 21,
  "name": "Diann"
}, {
  "id": 22,
  "name": "Tonie"
}, {
  "id": 23,
  "name": "Lisha"
}, {
  "id": 24,
  "name": "Tammy"
}, {
  "id": 25,
  "name": "Arabele"
}, {
  "id": 26,
  "name": "Loralyn"
}, {
  "id": 27,
  "name": "Thorpe"
}, {
  "id": 28,
  "name": "Albrecht"
}, {
  "id": 29,
  "name": "Worth"
}, {
  "id": 30,
  "name": "Carey"
}, {
  "id": 31,
  "name": "Shirl"
}, {
  "id": 32,
  "name": "Silvan"
}, {
  "id": 33,
  "name": "Arny"
}, {
  "id": 34,
  "name": "Mallissa"
}, {
  "id": 35,
  "name": "Tremaine"
}, {
  "id": 36,
  "name": "Cariotta"
}, {
  "id": 37,
  "name": "Meridith"
}, {
  "id": 38,
  "name": "Jemie"
}, {
  "id": 39,
  "name": "Bobbette"
}, {
  "id": 40,
  "name": "Lynsey"
}, {
  "id": 41,
  "name": "Cy"
}, {
  "id": 42,
  "name": "Ruddy"
}, {
  "id": 43,
  "name": "Abagael"
}, {
  "id": 44,
  "name": "Mallory"
}, {
  "id": 45,
  "name": "Sammy"
}, {
  "id": 46,
  "name": "Anabelle"
}, {
  "id": 47,
  "name": "Abram"
}, {
  "id": 48,
  "name": "Chrisy"
}, {
  "id": 49,
  "name": "Hilliary"
}, {
  "id": 50,
  "name": "Helaina"
}];

const cardsOptions = [{ "id": 1, "name": "Killing Zoe", "isCompleted": false, "listId": 33 },
{ "id": 2, "name": "Spin (You Are Here)", "isCompleted": true, "listId": 27 },
{ "id": 3, "name": "Skippy", "isCompleted": true, "listId": 9 },
{ "id": 4, "name": "Paycheck", "isCompleted": true, "listId": 48 },
{ "id": 5, "name": "Diamonds Are Forever", "isCompleted": true, "listId": 3 },
{ "id": 6, "name": "Beneath", "isCompleted": false, "listId": 19 },
{ "id": 7, "name": "Brood, The", "isCompleted": true, "listId": 22 },
{ "id": 8, "name": "Toxic Avenger Part III: The Last Temptation of Toxie, The", "isCompleted": true, "listId": 36 },
{ "id": 9, "name": "Man Who Never Was, The", "isCompleted": false, "listId": 27 },
{ "id": 10, "name": "À l'aventure", "isCompleted": false, "listId": 45 },
{ "id": 11, "name": "Losin' It", "isCompleted": false, "listId": 16 },
{ "id": 12, "name": "Beyond the Mind's Eye", "isCompleted": false, "listId": 7 },
{ "id": 13, "name": "Parasite", "isCompleted": false, "listId": 17 },
{ "id": 14, "name": "Nick of Time", "isCompleted": true, "listId": 32 },
{ "id": 15, "name": "Count Three and Pray", "isCompleted": true, "listId": 5 },
{ "id": 16, "name": "Mulan", "isCompleted": false, "listId": 35 },
{ "id": 17, "name": "Dreamgirls", "isCompleted": false, "listId": 40 },
{ "id": 18, "name": "Boudu Saved From Drowning (Boudu sauvé des eaux)", "isCompleted": false, "listId": 19 },
{ "id": 19, "name": "Twilight of the Ice Nymphs", "isCompleted": false, "listId": 42 },
{ "id": 20, "name": "Beastly", "isCompleted": false, "listId": 38 },
{ "id": 21, "name": "Blood, Sweat + Vinyl: DIY in the 21st Century", "isCompleted": true, "listId": 20 },
{ "id": 22, "name": "Star Trek VI: The Undiscovered Country", "isCompleted": true, "listId": 12 },
{ "id": 23, "name": "Stitches", "isCompleted": true, "listId": 28 },
{ "id": 24, "name": "Two Night Stand", "isCompleted": true, "listId": 4 },
{ "id": 25, "name": "City of Violence, The (Jjakpae)", "isCompleted": true, "listId": 39 },
{ "id": 26, "name": "Oppai Volleyball (Oppai barê)", "isCompleted": false, "listId": 24 },
{ "id": 27, "name": "Inequality for All", "isCompleted": false, "listId": 21 },
{ "id": 28, "name": "Tokyo-Ga", "isCompleted": false, "listId": 14 },
{ "id": 29, "name": "Me and the Colonel ", "isCompleted": false, "listId": 8 },
{ "id": 30, "name": "Felon", "isCompleted": true, "listId": 15 },
{ "id": 31, "name": "On the Run", "isCompleted": true, "listId": 16 },
{ "id": 32, "name": "Misérables, Les", "isCompleted": false, "listId": 22 },
{ "id": 33, "name": "Operation Homecoming: Writing the Wartime Experience", "isCompleted": false, "listId": 47 },
{ "id": 34, "name": "Colors", "isCompleted": true, "listId": 37 },
{ "id": 35, "name": "Get Thrashed: The Story of Thrash Metal", "isCompleted": true, "listId": 1 },
{ "id": 36, "name": "Bicentennial Man", "isCompleted": true, "listId": 28 },
{ "id": 37, "name": "Big Momma's House 2", "isCompleted": true, "listId": 23 },
{ "id": 38, "name": "I Hate Christian Laettner", "isCompleted": false, "listId": 50 },
{ "id": 39, "name": "Rustlers' Rhapsody", "isCompleted": true, "listId": 21 },
{ "id": 40, "name": "Batman: Gotham Knight", "isCompleted": true, "listId": 35 },
{ "id": 41, "name": "In July (Im Juli)", "isCompleted": true, "listId": 38 },
{ "id": 42, "name": "Metal: A Headbanger's Journey", "isCompleted": true, "listId": 47 },
{ "id": 43, "name": "Hard Corps, The", "isCompleted": false, "listId": 2 },
{ "id": 44, "name": "Closet Land", "isCompleted": true, "listId": 7 },
{ "id": 45, "name": "Little Men", "isCompleted": false, "listId": 33 },
{ "id": 46, "name": "Belle comme la femme d'un autre", "isCompleted": true, "listId": 1 },
{ "id": 47, "name": "Savages", "isCompleted": false, "listId": 49 },
{ "id": 48, "name": "Return to Life", "isCompleted": true, "listId": 46 },
{ "id": 49, "name": "Black Coffee", "isCompleted": false, "listId": 26 },
{ "id": 50, "name": "Maria's Lovers", "isCompleted": false, "listId": 27 },
{ "id": 51, "name": "Death by China ", "isCompleted": true, "listId": 11 },
{ "id": 52, "name": "Scissere", "isCompleted": false, "listId": 1 },
{ "id": 53, "name": "Natural City", "isCompleted": false, "listId": 31 },
{ "id": 54, "name": "Barbershop", "isCompleted": false, "listId": 46 },
{ "id": 55, "name": "Soviet Story, The", "isCompleted": true, "listId": 15 },
{ "id": 56, "name": "Fanny and Alexander (Fanny och Alexander)", "isCompleted": false, "listId": 32 },
{ "id": 57, "name": "Joke, The (Zert)", "isCompleted": false, "listId": 8 },
{ "id": 58, "name": "33 Scenes from Life (33 sceny z zycia)", "isCompleted": true, "listId": 19 },
{ "id": 59, "name": "Kon-Tiki", "isCompleted": true, "listId": 3 },
{ "id": 60, "name": "Last Taboo, The", "isCompleted": true, "listId": 10 },
{ "id": 61, "name": "Comet", "isCompleted": true, "listId": 18 },
{ "id": 62, "name": "Plutonium Circus", "isCompleted": false, "listId": 38 },
{ "id": 63, "name": "20,000 Leagues Under the Sea", "isCompleted": true, "listId": 22 },
{ "id": 64, "name": "Not Love, Just Frenzy (Más que amor, frenesí)", "isCompleted": false, "listId": 30 },
{ "id": 65, "name": "Elephants Dream", "isCompleted": true, "listId": 21 },
{ "id": 66, "name": "Last Drop, The", "isCompleted": true, "listId": 22 },
{ "id": 67, "name": "Little Women", "isCompleted": false, "listId": 1 },
{ "id": 68, "name": "18 Years Later (Diciotto anni dopo)", "isCompleted": false, "listId": 24 },
{ "id": 69, "name": "Phffft", "isCompleted": false, "listId": 9 },
{ "id": 70, "name": "This Is Not a Film (In film nist)", "isCompleted": false, "listId": 2 },
{ "id": 71, "name": "Beloved/Friend (a.k.a. Amigo/Amado) (Amic/Amat)", "isCompleted": false, "listId": 29 },
{ "id": 72, "name": "Ass Backwards", "isCompleted": false, "listId": 28 },
{ "id": 73, "name": "Restless (Uro)", "isCompleted": false, "listId": 16 },
{ "id": 74, "name": "Storm Rider", "isCompleted": true, "listId": 41 },
{ "id": 75, "name": "Miracle in Milan (Miracolo a Milano)", "isCompleted": false, "listId": 11 },
{ "id": 76, "name": "Star Wreck: In the Pirkinning", "isCompleted": false, "listId": 20 },
{ "id": 77, "name": "Forever Mine", "isCompleted": true, "listId": 26 },
{ "id": 78, "name": "He Was a Quiet Man", "isCompleted": false, "listId": 4 },
{ "id": 79, "name": "This Is the Night", "isCompleted": true, "listId": 1 },
{ "id": 80, "name": "Sarah's Key (Elle s'appelait Sarah)", "isCompleted": false, "listId": 41 },
{ "id": 81, "name": "ChubbChubbs!, The", "isCompleted": false, "listId": 16 },
{ "id": 82, "name": "Lila Says (Lila dit ça)", "isCompleted": false, "listId": 10 },
{ "id": 83, "name": "Charlie Countryman", "isCompleted": true, "listId": 25 },
{ "id": 84, "name": "That Championship Season", "isCompleted": true, "listId": 4 },
{ "id": 85, "name": "Maid in Manhattan", "isCompleted": true, "listId": 21 },
{ "id": 86, "name": "Black Rain", "isCompleted": true, "listId": 37 },
{ "id": 87, "name": "Slaves to the Underground", "isCompleted": false, "listId": 5 },
{ "id": 88, "name": "Frankenstein's Army", "isCompleted": false, "listId": 2 },
{ "id": 89, "name": "Divorcee, The", "isCompleted": false, "listId": 30 },
{ "id": 90, "name": "Ballad of Narayama, The (Narayama bushiko)", "isCompleted": true, "listId": 50 },
{ "id": 91, "name": "No Good Deed (a.k.a. The House on Turk Street)", "isCompleted": true, "listId": 32 },
{ "id": 92, "name": "Bandits (Bandidos)", "isCompleted": true, "listId": 7 },
{ "id": 93, "name": "Fire Down Below", "isCompleted": true, "listId": 29 },
{ "id": 94, "name": "Man of No Importance, A", "isCompleted": true, "listId": 37 },
{ "id": 95, "name": "Dollman", "isCompleted": false, "listId": 7 },
{ "id": 96, "name": "Riot On!", "isCompleted": false, "listId": 44 },
{ "id": 97, "name": "Thing from Another World, The", "isCompleted": false, "listId": 23 },
{ "id": 98, "name": "Yesterday", "isCompleted": true, "listId": 27 },
{ "id": 99, "name": "Black Venus", "isCompleted": false, "listId": 10 },
{ "id": 100, "name": "Leap Year (Año bisiesto)", "isCompleted": false, "listId": 44 },
{ "id": 101, "name": "Wood & Stock: Sexo, Orégano e Rock'n'Roll", "isCompleted": true, "listId": 28 },
{ "id": 102, "name": "I'll Cry Tomorrow", "isCompleted": true, "listId": 5 },
{ "id": 103, "name": "The Circle", "isCompleted": true, "listId": 29 },
{ "id": 104, "name": "Two Lives (Zwei Leben)", "isCompleted": true, "listId": 38 },
{ "id": 105, "name": "Belle toujours", "isCompleted": true, "listId": 22 },
{ "id": 106, "name": "I Am", "isCompleted": false, "listId": 38 },
{ "id": 107, "name": "Miss Violence", "isCompleted": true, "listId": 2 },
{ "id": 108, "name": "Garfield's Halloween Adventure", "isCompleted": false, "listId": 44 },
{ "id": 109, "name": "Mother Küsters Goes to Heaven (Mutter Küsters' Fahrt zum Himmel)", "isCompleted": false, "listId": 34 },
{ "id": 110, "name": "White Night (Hvid nat)", "isCompleted": false, "listId": 40 },
{ "id": 111, "name": "Employees' Entrance", "isCompleted": true, "listId": 49 },
{ "id": 112, "name": "Eight Men Out", "isCompleted": false, "listId": 26 },
{ "id": 113, "name": "Equilibrium", "isCompleted": false, "listId": 26 },
{ "id": 114, "name": "Rita, Sue and Bob Too!", "isCompleted": true, "listId": 45 },
{ "id": 115, "name": "Lili", "isCompleted": true, "listId": 40 },
{ "id": 116, "name": "Girl Next Door, The", "isCompleted": true, "listId": 37 },
{ "id": 117, "name": "Girls About Town", "isCompleted": false, "listId": 38 },
{ "id": 118, "name": "Real Life", "isCompleted": true, "listId": 22 },
{ "id": 119, "name": "Krush Groove", "isCompleted": true, "listId": 39 },
{ "id": 120, "name": "Betrayed (True and the Brave, The)", "isCompleted": false, "listId": 15 },
{ "id": 121, "name": "Mr Bones 2: Back from the Past", "isCompleted": false, "listId": 46 },
{ "id": 122, "name": "Charleston", "isCompleted": true, "listId": 33 },
{ "id": 123, "name": "Man of Her Dreams (a.k.a. The Fiancé)", "isCompleted": true, "listId": 3 },
{ "id": 124, "name": "Tyler Perry's Madea Goes to Jail", "isCompleted": false, "listId": 30 },
{ "id": 125, "name": "Earth Dies Screaming, The", "isCompleted": true, "listId": 34 },
{ "id": 126, "name": "Jin Roh: The Wolf Brigade (Jin-Rô)", "isCompleted": false, "listId": 47 },
{ "id": 127, "name": "Thank You, Mr. Moto", "isCompleted": true, "listId": 13 },
{ "id": 128, "name": "You Were Never Lovelier", "isCompleted": true, "listId": 13 },
{ "id": 129, "name": "Junior Prom", "isCompleted": true, "listId": 24 },
{ "id": 130, "name": "1", "isCompleted": false, "listId": 33 },
{ "id": 131, "name": "Electra, My Love (Szerelmem, Elektra)", "isCompleted": true, "listId": 18 },
{ "id": 132, "name": "Along the Sungari River (Song hua jiang shang)", "isCompleted": false, "listId": 15 },
{ "id": 133, "name": "Celebrity", "isCompleted": false, "listId": 33 },
{ "id": 134, "name": "I Declare War", "isCompleted": false, "listId": 33 },
{ "id": 135, "name": "Bug", "isCompleted": false, "listId": 9 },
{ "id": 136, "name": "Operation Homecoming: Writing the Wartime Experience", "isCompleted": false, "listId": 1 },
{ "id": 137, "name": "Give My Regards to Broad Street", "isCompleted": true, "listId": 46 },
{ "id": 138, "name": "Tarzan Escapes", "isCompleted": true, "listId": 36 },
{ "id": 139, "name": "Bones", "isCompleted": false, "listId": 23 },
{ "id": 140, "name": "Morphia (Morfiy)", "isCompleted": true, "listId": 10 },
{ "id": 141, "name": "Next Karate Kid, The", "isCompleted": true, "listId": 15 },
{ "id": 142, "name": "Yes", "isCompleted": false, "listId": 31 },
{ "id": 143, "name": "Collateral", "isCompleted": false, "listId": 32 },
{ "id": 144, "name": "Trek Nation", "isCompleted": false, "listId": 32 },
{ "id": 145, "name": "Box, The", "isCompleted": true, "listId": 14 },
{ "id": 146, "name": "Bereavement", "isCompleted": false, "listId": 26 },
{ "id": 147, "name": "Wet Parade, The", "isCompleted": false, "listId": 36 },
{ "id": 148, "name": "London", "isCompleted": true, "listId": 48 },
{ "id": 149, "name": "Shaggy Dog, The", "isCompleted": false, "listId": 15 },
{ "id": 150, "name": "Grand Dukes, The (Les grands ducs)", "isCompleted": false, "listId": 4 },
{ "id": 151, "name": "King, The", "isCompleted": true, "listId": 44 },
{ "id": 152, "name": "Night and the City", "isCompleted": true, "listId": 41 },
{ "id": 153, "name": "Sasayaki (a.k.a. Moonlight Whispers) (Gekkô no sasayaki)", "isCompleted": false, "listId": 50 },
{ "id": 154, "name": "Too Many Cooks", "isCompleted": false, "listId": 20 },
{ "id": 155, "name": "Wasabi", "isCompleted": false, "listId": 10 },
{ "id": 156, "name": "L.A. Story", "isCompleted": false, "listId": 39 },
{ "id": 157, "name": "Played", "isCompleted": true, "listId": 41 },
{ "id": 158, "name": "Thank You, Jeeves!", "isCompleted": false, "listId": 16 },
{ "id": 159, "name": "Hunchback of Notre Dame, The", "isCompleted": true, "listId": 12 },
{ "id": 160, "name": "Maniac", "isCompleted": false, "listId": 32 },
{ "id": 161, "name": "Antboy", "isCompleted": false, "listId": 30 },
{ "id": 162, "name": "Night Across the Street (La noche de enfrente)", "isCompleted": true, "listId": 46 },
{ "id": 163, "name": "Unrest", "isCompleted": true, "listId": 3 },
{ "id": 164, "name": "An Evening with Robin Williams", "isCompleted": false, "listId": 43 },
{ "id": 165, "name": "La Bande du drugstore", "isCompleted": true, "listId": 29 },
{ "id": 166, "name": "Paperboy, The", "isCompleted": false, "listId": 18 },
{ "id": 167, "name": "Brooklyn", "isCompleted": false, "listId": 47 },
{ "id": 168, "name": "Catwoman", "isCompleted": true, "listId": 25 },
{ "id": 169, "name": "Foolish Wives", "isCompleted": false, "listId": 11 },
{ "id": 170, "name": "Madagascar", "isCompleted": false, "listId": 31 },
{ "id": 171, "name": "D-War (Dragon Wars)", "isCompleted": false, "listId": 22 },
{ "id": 172, "name": "Appaloosa", "isCompleted": true, "listId": 38 },
{ "id": 173, "name": "Lianna", "isCompleted": false, "listId": 43 },
{ "id": 174, "name": "Subject Two", "isCompleted": true, "listId": 15 },
{ "id": 175, "name": "Enthusiasm (Entuziazm: Simfoniya Donbassa)", "isCompleted": false, "listId": 43 },
{ "id": 176, "name": "Rocky Saga: Going the Distance, The", "isCompleted": true, "listId": 37 },
{ "id": 177, "name": "Dark Lurking, The", "isCompleted": false, "listId": 30 },
{ "id": 178, "name": "Normal Life", "isCompleted": false, "listId": 23 },
{ "id": 179, "name": "Prison", "isCompleted": true, "listId": 41 },
{ "id": 180, "name": "Count Yorga, Vampire", "isCompleted": true, "listId": 40 },
{ "id": 181, "name": "My Darling Clementine", "isCompleted": true, "listId": 21 },
{ "id": 182, "name": "Last Days on Mars, The", "isCompleted": true, "listId": 38 },
{ "id": 183, "name": "Menace II Society", "isCompleted": false, "listId": 17 },
{ "id": 184, "name": "My Father the Hero (Mon père, ce héros.)", "isCompleted": true, "listId": 23 },
{ "id": 185, "name": "Before and After", "isCompleted": true, "listId": 1 },
{ "id": 186, "name": "Lonely Villa, The", "isCompleted": false, "listId": 50 },
{ "id": 187, "name": "Pretty Persuasion", "isCompleted": true, "listId": 33 },
{ "id": 188, "name": "Sube y Baja", "isCompleted": true, "listId": 40 },
{ "id": 189, "name": "C.H.O.M.P.S.", "isCompleted": true, "listId": 31 },
{ "id": 190, "name": "The Last Outpost", "isCompleted": false, "listId": 50 },
{ "id": 191, "name": "Wer", "isCompleted": false, "listId": 35 },
{ "id": 192, "name": "Last Lions, The", "isCompleted": true, "listId": 5 },
{ "id": 193, "name": "Crime and Punishment", "isCompleted": false, "listId": 43 },
{ "id": 194, "name": "Score, The", "isCompleted": false, "listId": 9 },
{ "id": 195, "name": "When the Wind Blows", "isCompleted": true, "listId": 45 },
{ "id": 196, "name": "Detective Story", "isCompleted": false, "listId": 35 },
{ "id": 197, "name": "Seven Samurai (Shichinin no samurai)", "isCompleted": false, "listId": 45 },
{ "id": 198, "name": "Beloved/Friend (a.k.a. Amigo/Amado) (Amic/Amat)", "isCompleted": false, "listId": 16 },
{ "id": 199, "name": "Mág", "isCompleted": false, "listId": 48 },
{ "id": 200, "name": "The Count of Monte Cristo", "isCompleted": true, "listId": 13 },
{ "id": 201, "name": "Money Talks", "isCompleted": true, "listId": 37 },
{ "id": 202, "name": "Nine", "isCompleted": false, "listId": 27 },
{ "id": 203, "name": "Intolerable Cruelty", "isCompleted": false, "listId": 31 },
{ "id": 204, "name": "You Kill Me", "isCompleted": false, "listId": 48 },
{ "id": 205, "name": "Shaolin Temple 3: Martial Arts of Shaolin (Nan bei Shao Lin) (Martial Arts of Shaolin)", "isCompleted": false, "listId": 20 },
{ "id": 206, "name": "66 Scenes From America", "isCompleted": false, "listId": 22 },
{ "id": 207, "name": "Relationship Status: It's Complicated", "isCompleted": true, "listId": 42 },
{ "id": 208, "name": "Adventures of Baron Munchausen, The", "isCompleted": true, "listId": 42 },
{ "id": 209, "name": "Big Boys Gone Bananas!*", "isCompleted": false, "listId": 14 },
{ "id": 210, "name": "Hell's Highway: The True Story of Highway Safety Films", "isCompleted": true, "listId": 1 },
{ "id": 211, "name": "The Runner from Ravenshead", "isCompleted": true, "listId": 40 },
{ "id": 212, "name": "Silver Stallion (Silver Brumpy, The)", "isCompleted": false, "listId": 47 },
{ "id": 213, "name": "Texas Killing Fields", "isCompleted": false, "listId": 48 },
{ "id": 214, "name": "Shake Hands with the Devil", "isCompleted": true, "listId": 7 },
{ "id": 215, "name": "Zombie Apocalypse", "isCompleted": false, "listId": 4 },
{ "id": 216, "name": "Jane Austen's Mafia!", "isCompleted": false, "listId": 41 },
{ "id": 217, "name": "Alexandra's Project", "isCompleted": false, "listId": 11 },
{ "id": 218, "name": "Forbidden Zone", "isCompleted": false, "listId": 2 },
{ "id": 219, "name": "Taxi Blues", "isCompleted": true, "listId": 47 },
{ "id": 220, "name": "Alpha and Omega 2: A Howl-iday Adventure (Alpha & Omega 2)", "isCompleted": false, "listId": 38 },
{ "id": 221, "name": "Asfour Stah", "isCompleted": true, "listId": 26 },
{ "id": 222, "name": "Dr. Jack", "isCompleted": true, "listId": 12 },
{ "id": 223, "name": "Radio Days", "isCompleted": false, "listId": 48 },
{ "id": 224, "name": "Missing in Action", "isCompleted": true, "listId": 12 },
{ "id": 225, "name": "Bird People", "isCompleted": false, "listId": 15 },
{ "id": 226, "name": "Comanche Territory (Territorio comanche)", "isCompleted": true, "listId": 22 },
{ "id": 227, "name": "Crazy in Alabama", "isCompleted": true, "listId": 26 },
{ "id": 228, "name": "Solo", "isCompleted": true, "listId": 10 },
{ "id": 229, "name": "Bad Sleep Well, The (Warui yatsu hodo yoku nemuru)", "isCompleted": false, "listId": 29 },
{ "id": 230, "name": "Chak De India!", "isCompleted": true, "listId": 15 },
{ "id": 231, "name": "Shinobi No Mono 2: Vengeance (Zoku shinobi no mono)", "isCompleted": true, "listId": 18 },
{ "id": 232, "name": "Filthy Gorgeous: The Bob Guccione Story", "isCompleted": true, "listId": 49 },
{ "id": 233, "name": "Castaway on the Moon (Kimssi pyoryugi)", "isCompleted": true, "listId": 48 },
{ "id": 234, "name": "Kiss of the Spider Woman", "isCompleted": true, "listId": 5 },
{ "id": 235, "name": "Gridlock'd", "isCompleted": true, "listId": 1 },
{ "id": 236, "name": "Fando and Lis (Fando y Lis)", "isCompleted": true, "listId": 23 },
{ "id": 237, "name": "World's End, The", "isCompleted": true, "listId": 46 },
{ "id": 238, "name": "Outland", "isCompleted": true, "listId": 27 },
{ "id": 239, "name": "Science of Sleep, The (La science des rêves)", "isCompleted": true, "listId": 19 },
{ "id": 240, "name": "Whatever Happened to Aunt Alice?", "isCompleted": false, "listId": 44 },
{ "id": 241, "name": "10.5: Apocalypse", "isCompleted": true, "listId": 37 },
{ "id": 242, "name": "Ludwig", "isCompleted": false, "listId": 47 },
{ "id": 243, "name": "Bank Job, The", "isCompleted": false, "listId": 24 },
{ "id": 244, "name": "Ju-on: The Beginning of the End (Ju-on: Owari no hajimari)", "isCompleted": true, "listId": 40 },
{ "id": 245, "name": "Manuel on the Island of Wonders (Manoel dans l'île des merveilles)", "isCompleted": false, "listId": 30 },
{ "id": 246, "name": "Pekka ja Pätkä lumimiehen jäljillä", "isCompleted": false, "listId": 5 },
{ "id": 247, "name": "I Am Curious (Yellow) (Jag är nyfiken - en film i gult)", "isCompleted": true, "listId": 24 },
{ "id": 248, "name": "Beauty Shop", "isCompleted": true, "listId": 19 },
{ "id": 249, "name": "Stealing Time (a.k.a. Rennie's Landing)", "isCompleted": true, "listId": 21 },
{ "id": 250, "name": "Cooking with Stella", "isCompleted": true, "listId": 6 }];


module.exports = { cardsOptions, listOptions }