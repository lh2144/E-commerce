import express, { Request, Response } from 'express';
import path from 'path';
import usersRouter from './routes/users';
import productRouter from './routes/product';
import commentRouter from './routes/comment';
import db from './db/mongoose';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// set cors headers
app.use((req: Request, res: Response, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
    next();
});
// app.use('/test', (req, res, next) => res.send('Hello world'));
app.use(usersRouter);
app.use(productRouter);
app.use(commentRouter);
// error handler
app.use((err: any, req: Request, res: Response, next: any) => {
    console.log(err);
    const status = err.statusCode || 500;
    const message = err.message;
    const data = err.data;

    // render the error page
    res.status(status).json({ message, data });
});

db.then(() => {
    console.log('server connected');
    app.listen(port);
}).catch((err) => console.log(err));
export default app;
