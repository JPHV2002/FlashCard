import express from 'express';

const app = express();

app.get('/', (req, res) => {
    return res.send('HELLO WORLD');
});

app.listen(3333, () => {
    console.log('Server is running on http://localhost:3333');
});