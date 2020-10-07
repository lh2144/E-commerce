import express, { request, response } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import usersRouter from './routes/users';

const app = express();
const port = 8080;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/', (req , res ) => {
    res.send('Hello world');
});
// catch 404 and forward to error handler
app.use((req , res , next) => {
  next();
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => console.log(port));

export default app;
