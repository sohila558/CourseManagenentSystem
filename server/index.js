const multer = require('multer'); // The library responsible for decoding and storing files (images).
const path = require('path'); // A ready-made library in Node that helps us deal with folder paths and image extensions (.jpg, .png).
const fs = require('fs'); // File System library for creating folders or reading files.
const express = require('express'); // The basic framework for building the server and APIs.
const cors = require('cors'); // A module that allows Angular (port 4200) to communicate with Node (port 3000) without security issues.

const dbPath = path.join(__dirname, 'db.json');

function loadData() {
    const rawData = fs.readFileSync(dbPath);
    return JSON.parse(rawData);
}

const app = express(); // Create a copy of the Express app to start using it

const data = loadData();
let courses = data.courses || [];
let users = data.users || [];
let enrollments = data.enrollments || [];
let lessons = data.lessons || [];
let wishlist = data.wishlist || [];

app.use(cors()); // Activate CORS so the server can accept requests from other links.
app.use(express.json()); // This allows the server to understand the data coming in JSON format and convert it into an object.
app.use('/uploads', express.static('uploads')); // This makes the uploads folder "public," meaning anyone has the image link can view it in their browser.

// Specify the full path to the folder where we will upload the images to the hard drive
const uploadDir = path.join(__dirname, 'uploads');

// If the folder doesn't exist, this code will be automatically generated as soon as the server starts.
if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Setting up Multer's "Storage" which specifies the location and new name of the image.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // We specified that the images go to the uploads folder.
    },
    filename: (req, file, cb) => {
        // We name the image (Current Time + Original Extension) to ensure that no two images have the same name.
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Create a ready-to-use copy of Multer with the settings we made above.
const upload = multer({ storage : storage });

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        res.json(user);
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
});

app.get('/courses', (req, res) => {
    res.json(courses);
});

app.get('/courses/:id', (req, res) => {
    const course = courses.find(c => c.id == req.params.id);
    course ? res.json(course) : res.status(404).json({ message: 'Course not found' });
});

app.get('/lessons', (req, res) => {
    const courseId = req.query.courseId;
    if (courseId) {
        const filteredLessons = lessons.filter(l => l.courseId === courseId);
        res.json(filteredLessons);
    } else {
        res.json(lessons);
    }
});

// Route responsible for adding a new course.
// Pay attention: upload.single('image') is what holds the image and stores it before going into the rest of the code.
app.post('/courses', upload.single('image'), (req, res) => {
    try {
        const newCourse = {
            id: Date.now(),
            title: req.body.title,
            description: req.body.description,
            instructorName: req.body.instructorName,
            image: `http://localhost:3000/uploads/${req.file.filename}` // The full link to the image after it was saved.
        };

        courses.push(newCourse);
        // Reply to Angular successfully and send the new course data.
        res.status(201).json(newCourse);

    } catch(error) {
        // In case of any problem (such as the image not being present or the path being incorrect), it sends error code 500.
        res.status(500).json({ message: 'Error uploading file' });
    }
});

app.put('/courses/:id', upload.single('image'), (req, res) => {
    const id = req.params.id;
    const index = courses.findIndex(c => c.id == id);

    if (index !== -1) {
        courses[index] = {
            ...courses[index], 
            ...req.body,       
            id: Number(id),    
            image: req.file ? `http://localhost:3000/uploads/${req.file.filename}` : courses[index].image
        };
        res.json(courses[index]);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.delete('/courses/:id', (req, res) => {
    const id = req.params.id;
    courses = courses.filter(c => c.id != id);
    res.status(200).json({ message: 'Course deleted successfully' });
});

app.get('/users', (req, res) => res.json(users));
app.get('/enrollments', (req, res) => res.json(enrollments));
app.get('/lessons', (req, res) => res.json(lessons));
app.get('/wishlist', (req, res) => res.json(wishlist));

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
