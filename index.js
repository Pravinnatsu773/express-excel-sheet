const express = require('express') ;
const multer = require('multer') ;
const xlsx = require('xlsx') ;

const app = express();
const port = 3001;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('excelFile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
console.log(jsonData)
    res.json(jsonData);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
