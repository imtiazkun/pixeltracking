const express = require("express");
const path = require("path");
const app = express();
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);
app.use(express.static(path.join(__dirname, "public")));

// Function to log IP addresses to a text file
function log(name) {
    const logMessage = `${new Date().toISOString()} - name: ${name}\n\n`;
    fs.appendFileSync('ip_log.txt', logMessage, (err) => {
        if (err) {
            console.error('Error writing to file', err);
        }
    });
}

// Rate limiter middleware: limit each IP to 10 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes',
    skipFailedRequests: true
});

app.use(limiter);


app.get('/pixel/image.jpg', (req, res) => {
    console.log(`Image was loaded by IP: ${req.query.name}`);

    log(req.query.name);

    res.sendFile(path.join(__dirname, 'public', 'image.jpg'));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});