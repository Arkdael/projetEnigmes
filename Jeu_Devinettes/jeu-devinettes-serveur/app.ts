import createError from 'http-errors';
import express from 'express';
import path from 'path';
//import cookieParser from 'cookie-parser';
//import logger from 'morgan';
import EnigmesRouter from './routes/enigmesRouter';
import IndexRouter from './routes/indexRouter';
import TentativeRouter from './routes/tentativesRouter';

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

const indexRoutes = new IndexRouter();
const enigmesRoutes = new EnigmesRouter();
const tentativesRoutes = new TentativeRouter();
app.use('/', indexRoutes.getRouter());
app.use('/enigmes', enigmesRoutes.getRouter());
app.use('/tentatives', tentativesRoutes.getRouter());
// catch 404 and forward to error handler
app.use(function(req:any, res:any, next:any) {
  next(createError(404));
});

// error handler
app.use(function(err:any, req:any, res:any, next:any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
