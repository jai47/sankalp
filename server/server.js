const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const sharp = require('sharp');

const app = express();
const PORT = 3001;
const serverURL = 'http://localhost:' + PORT; // Change this to your server URL

// Middleware
app.use(helmet()); // Secure HTTP headers

const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}
const accessLogStream = fs.createWriteStream(path.join(logDir, 'access.log'), {
    flags: 'a',
});
// Use combined log format (IP, date, method, path, etc.)
app.use(morgan('combined', { stream: accessLogStream })); //logging
app.use(express.json());

// CORS Config: allow only sankalp.com
app.use(
    cors({
        origin: 'http://sankalp.com',
        methods: ['POST', 'GET'],
        allowedHeaders: ['Content-Type'],
        optionsSuccessStatus: 200,
    })
);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// File type filter (accept images only)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|svg/;
    const mimeType = allowedTypes.test(file.mimetype);
    const extName = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    if (mimeType && extName) {
        return cb(null, true);
    }
    cb(new Error('Only image files are allowed!'));
};

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => {
        // Sanitize and create a unique filename
        const safeName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const uniqueName = `${Date.now()}-${safeName}`;
        cb(null, uniqueName);
    },
});

const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB max file size
    },
    fileFilter,
});

// Welcome route
app.get('/', (req, res) => {
    res.send('Welcome to the Secure Image Upload Server!');
});

// Serve static files (uploads) without directory listing
app.use(
    '/uploads',
    express.static('uploads', {
        index: false,
        redirect: false,
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    })
);

// Upload endpoint
app.post('/upload', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    try {
        const originalPath = req.file.path;
        const filenameWithoutExt = path.parse(req.file.filename).name;
        const webpFilename = `${filenameWithoutExt}.webp`;
        const outputPath = path.join(uploadDir, webpFilename);

        // Convert and compress image to webp
        await sharp(originalPath)
            .webp({ quality: 80 }) // adjust quality as needed (default: 80)
            .toFile(outputPath);

        // Delete original uploaded file
        fs.unlinkSync(originalPath);

        const imageUrl = `${serverURL}/uploads/${webpFilename}`;
        res.json({ url: imageUrl });
    } catch (err) {
        console.error('Image processing error:', err);
        res.status(500).json({ error: 'Image processing failed' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message });
    } else if (err.message === 'Only image files are allowed!') {
        return res.status(415).json({ error: err.message });
    }
    res.status(500).json({ error: 'Server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Secure server running at http://localhost:${PORT}`);
});
