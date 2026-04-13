"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
//import cookieParser from 'cookie-parser';
//import logger from 'morgan';
const enigmesRouter_1 = __importDefault(require("./routes/enigmesRouter"));
const indexRouter_1 = __importDefault(require("./routes/indexRouter"));
const tentativesRouter_1 = __importDefault(require("./routes/tentativesRouter"));
var app = (0, express_1.default)();
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
const indexRoutes = new indexRouter_1.default();
const enigmesRoutes = new enigmesRouter_1.default();
const tentativesRoutes = new tentativesRouter_1.default();
app.use('/', indexRoutes.getRouter());
app.use('/enigmes', enigmesRoutes.getRouter());
app.use('/tentatives', tentativesRoutes.getRouter());
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
//# sourceMappingURL=app.js.map