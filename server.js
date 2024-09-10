const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get('/pixel/image.jpg', (req, res) => {
    const ipAddress = req.headers['x-forwarded-for'] || req.ip;

    console.log(`Image was requested at ${new Date().toISOString()}`);
    console.log(`Image was loaded on ${ipAddress}`);
    res.sendFile(path.join(__dirname, 'public', 'image.jpg'));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});