import express from 'express';
const app = express();
app.listen(5001, () => console.log('Test Server Running'));
setInterval(() => console.log('Tick'), 1000); // Keep alive force
