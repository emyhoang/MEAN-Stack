// Write a function called userLanguages that accepts an array of users, such as the one shown above.
//  Return a string that lists all the users by first name and last name and the languages that each user
//  knows. Make the string as nicely formatted as possible so that it is easy to read.


users = [
  {
    fname: "Kermit",
    lname: "the Frog",
    languages: ["Python", "JavaScript", "C#", "HTML", "CSS", "SQL"],
    interests: {
      music: ["guitar", "flute"],
      dance: ["tap", "salsa"],
      television: ["Black Mirror", "Stranger Things"]
    }
  },
  {
    fname: "Winnie",
    lname: "the Pooh",
    languages: ["Python", "Swift", "Java"],
    interests: {
      food: ["honey", "honeycomb"],
      flowers: ["honeysuckle"],
      mysteries: ["Heffalumps"]
    }
  },
  {
    fname: "Arthur",
    lname: "Dent",
    languages: ["JavaScript", "HTML", "Go"],
    interests: {
      space: ["stars", "planets", "improbability"],
      home: ["tea", "yellow bulldozers"]
    }
  }
]


function userLanguages(arr) {
  for (var i = 0; i < users.length; i++) {
    fName = users[i].fname
    lName = users[i].lname
    languages = users[i].languages
    console.log("" + fName + " " + lName + " knows " + languages)
  }
}
userLanguages(users);




