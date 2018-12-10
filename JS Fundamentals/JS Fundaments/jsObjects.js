// Write a function that accepts an array of student objects, as shown below. 
// Print all of the students' names and their cohorts.

var students = [
  { name: 'Remy', cohort: 'Jan' },
  { name: 'Genevieve', cohort: 'March' },
  { name: 'Chuck', cohort: 'Jan' },
  { name: 'Osmund', cohort: 'June' },
  { name: 'Nikki', cohort: 'June' },
  { name: 'Boris', cohort: 'June' }
];


function studentInfo(arr) {
  for (var i = 0; i < students.length; i++) {
    Name = students[i].name
    Cohort = students[i].cohort
    console.log("Name: " + Name + ", cohort: " + Cohort)
  }
}
studentInfo(students);

// Write a function that accepts an object of users divided into employees and managers, as shown below, 
// and logs the information to the console.
// EMPLOYEES
// 1 - JONES, MIGUEL - 11
// 2 - BERTSON, ERNIE - 12
// 3 - LU, NORA - 6
// 4 - BARKYOUMB, SALLY - 14
// MANAGERS
// 1 - CHAMBERS, LILLIAN - 15
// 2 - POE, GORDON - 9

var users = {
  employees: [
    { 'first_name': 'Miguel', 'last_name': 'Jones' },
    { 'first_name': 'Ernie', 'last_name': 'Bertson' },
    { 'first_name': 'Nora', 'last_name': 'Lu' },
    { 'first_name': 'Sally', 'last_name': 'Barkyoumb' }
  ],
  managers: [
    { 'first_name': 'Lillian', 'last_name': 'Chambers' },
    { 'first_name': 'Gordon', 'last_name': 'Poe' }
  ]
};

function employeesManagers(group) {
  if (users.employees) {
    console.log('Employees');
  } else if (users.managers) {
    console.log('Managers')
  }
  for (var i = 0; i < group.length; i++) {
    first_name = group[i].first_name
    last_name = group[i].last_name
    length = first_name.length + last_name.length
    console.log("" + first_name + ", " + last_name + "- " + length)
  }
}
employeesManagers(users.employees);
employeesManagers(users.managers);