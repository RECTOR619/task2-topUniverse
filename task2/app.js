// importing express module
const express = require("express")

// creating an express app
const app = express()

// accepting json body
app.use(express.json())

// creating a port
const PORT = 8080

// to confirm that our app is running on the created port 
app.listen(PORT, () => {
    console.log("app listening on PORT " + PORT);

})

// create DB for the app
const students = [{
        id: 1,
        name: "Joe Doe",
        faculty: "SPS",
        course: "Physics"

    },

    {
        id: 2,
        name: "Adam Dee",
        faculty: "SLS",
        course: "Biology"
    },

    {
        id: 3,
        name: "Jerry Jay",
        faculty: "SSTE",
        course: "ITE"
    }
]

// welcome page
app.get("/", (req, res) => {
    res.status(200).send("Welcome to my Home Page")
})

// get the list of student in DB
app.get("/students", (req, res) => {
    res.status(200).send(students)
})

// to get a single student from DB
app.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) res.status(404).send("student with id not found")
    res.send(student)
})

// to update student data
app.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) res.status(404).send("student with id not found")

    // input validation
    if (!req.body.name || req.body.length < 3) {
        res.status(400).send("the field is required and the character field should be more than three")
    }

    // update student
    student.name = req.body.name,
        student.faculty = req.body.faculty,
        student.course = req.body.course

    res.send(student)
})

// create new student to DB
app.post("/students", (req, res) => {

    // input validation
    if (!req.body.name || req.body.length < 3) {
        res.status(400).send("the field is required and the character field should be more than three")
    }

    const student = {
        id: students.length + 1,
        name: req.body.name,
        faculty: req.body.faculty,
        course: req.body.course
    }

    students.push(student)
    res.send(student)
})

// To delete a student from DB
app.delete("/students/:id", (req, res) => {

    // check if student exist
    const student = students.find(s => s.id === parseInt(req.params.id))
    if (!student) res.status(404).send("student with id not found")

    // to delete all student from DB
    const index = students.indexOf(student)
    students.splice(index, 1)

    // reture the deleted student data
    res.send(`student with id number ${req.params.id} has been deleted successfully`)
})