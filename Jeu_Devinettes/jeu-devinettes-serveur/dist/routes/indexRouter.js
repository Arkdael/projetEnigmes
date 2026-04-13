"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class IndexRouter {
    router;
    constructor() {
        this.router = (0, express_1.Router)();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.getIndex.bind(this));
        // ajouter d'autres routes ici, par exemple:
        // this.router.post('/submit', this.postSubmit.bind(this));
    }
    getIndex(_req, res, _next) {
        res.send('index — Express (class)');
    }
    getRouter() {
        return this.router;
    }
}
exports.default = IndexRouter;
//# sourceMappingURL=indexRouter.js.map