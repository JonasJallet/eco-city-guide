import express from 'express';

const app = express();
const PORT = 4000;

const startApp = () => {
    app.listen(PORT, () => 
    console.log(`Server is listening on PORT ${PORT}`))
};

startApp();