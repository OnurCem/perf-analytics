import express from 'express';

const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.send('Hello world!');
});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT} port`);
});
