const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
// const Employee = require("./lib/Employee");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];

// FIRST ... MANAGER QUESTIONS
function askManager() {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the manager's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the manager's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the manager's email?"
        },
        {
            type: "input",
            name: "office",
            message: "What is the manager's office number?"
        }]).then(answers => {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.office)
            teamMembers.push(manager)
            managerTeam();
        });
}


// GENERATE MANAGER TEAM
function managerTeam() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'add',
                message: 'What team member would you like to add?',
                choices: [
                    "Engineer",
                    "Intern",
                    new inquirer.Separator(),
                    'I do not need to add additional team members'
                ]
            },
        ])
        .then(answers => {
            if (answers.add == "Engineer") {
                return askEngineer();
            } else if (answers.add == "Intern") {
                return askIntern();
            } else {
                return endTeamBuild();
            }
        })
}
// ENGINEER QUESTIONS
function askEngineer() {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the engineer's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the engineer's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the engineer's email?"
        },
        {
            type: "input",
            name: "github",
            message: "What is the engineer's github username?"
        }]).then(({ name, id, email, github }) => {
            const engineer = new Engineer(name, id, email, github)
            teamMembers.push(engineer);
            managerTeam();
        });
}

//Intern Questions
function askIntern() {
    inquirer
        .prompt([{
            type: "input",
            name: "name",
            message: "What is the intern's name?"
        },
        {
            type: "input",
            name: "id",
            message: "What is the intern's ID?"
        },
        {
            type: "input",
            name: "email",
            message: "What is the intern's email?"
        },
        {
            type: "input",
            name: "school",
            message: "What is the intern's univeristy?"
        }]).then(({ name, id, email, school }) => {
            const intern = new Intern(name, id, email, school)
            teamMembers.push(intern);
            managerTeam();
        });
}

function endTeamBuild() {
    inquirer
        .prompt([{
            type: "list",
            name: "end",
            message: "Are you sure?",
            choices: [
                "Yes, I'm sure.",
                "No, let's go back."
            ]

        }])
        .then(answers => {
            if (answers.end == "Yes, I'm sure.") {
                console.log("Ok, you're done!")
                fs.writeFile(outputPath, render(teamMembers), (err) => {
                    if (err) throw err;
                    console.log('file has been saved');
                });
            } else {
                console.log("Ok, let's go back...")
                managerTeam();
            }
        })
}

// Calling askManager Function
askManager();


























// //none function
// function endTeamBuild() {
//     inquirer.prompt([
//         {
//             type: "validate",
//             name: "none",
//             message: "Would you like to add another team member?"
//         }
//     ]).then(answers => {
//         if (answers === true) {
//             return createTeam();

//         } else {

//         }
//     })
// }





// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```


// createManager();
// createEngineer();
// createIntern();
