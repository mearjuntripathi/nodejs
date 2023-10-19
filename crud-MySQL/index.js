import express from 'express';
import mysql from 'mysql';

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const port = process.env.PORT || 3000;

const con = mysql.createConnection({
    host: "localhost",
    password: "",
    user: "root",
    database: "test"
});

con.connect(err => {
    if (err) {
        console.error("Database Commection error:", err);
    } else {
        console.log('Sucessfully database connected');
    }
});

// create a query Promise to make valid connection
function queryPromise(query, value) {
    return new Promise((resolve, reject) => {
        con.query(query, value, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        })
    })
}

// All restAPI Functionality define here
async function getAllStudents(req, res) {
    try {
        const query = "SELECT * FROM students";
        const result = await queryPromise(query);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some issue occured" });
    }
}

async function getAStudent(req, res) {
    try {
        const id = req.params.id;
        const query = "SELECT * FROM students where id = ?";
        const result = await queryPromise(query, id);
        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some issue occured" });
    }
}

async function addStudent(req, res) {
    try {
        const value = req.body;
        const query = "INSERT INTO students SET ?";
        const result = await queryPromise(query, value);

        res.status(201).json({ message: "Data Successfully inserted" });
        console.log(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Some issue occurred" });
    }
}

async function updateStudent(req,res){
    try{
        let id = req.params.id;
        req.body.name = req.body.name !== undefined ? req.body.name : "";
        req.body.course = req.body.course !== undefined ? req.body.course : "";
        req.body.roll_no = req.body.roll_no !== undefined ? req.body.roll_no : "";
        const value = req.body;

        const query = "UPDATE students SET ? WHERE id = ?";
        const result = await queryPromise(query,[value, id]);
        res.status(202).json({message: "Data Update Sucessfully"});
        console.log(result);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: "Some issue occurred" });
    }
}

async function updateStudentvalue(req, res){
    try{
        const id = req.params.id;
        const value = req.body;
        const query = "UPDATE students SET ? WHERE id = ?";

        const result = await queryPromise(query, [value, id]);
        res.status(202).json({message: "Data Update Sucessfully"});
        console.log(result);
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Some issue occurred"});
    }
}

async function deleteStudent(req, res){
    try{
        const id = req.params.id;
        const query = "DELETE FROM students where id = ?";

        const result = await queryPromise(query, id);
        res.status(200).json({message: "Data delete sucessfully"});
    }catch(error){
        console.error(error);
        res.status(500).json({message: "Some issue occurred"});
    }
}

app.get("/students/", getAllStudents);

app.get('/students/:id', getAStudent);

app.post('/students', addStudent);

app.put('/students/:id', updateStudent)

app.patch('/students/:id', updateStudentvalue)

app.delete('/students/:id', deleteStudent)

app.listen(port, console.log(`Server started on http://localhost:${port}`));