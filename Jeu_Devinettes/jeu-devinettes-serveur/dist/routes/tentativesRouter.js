"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TentativeService_1 = __importDefault(require("../services/TentativeService"));
class TentativeRouter {
    router;
    tentativesService;
    constructor() {
        this.router = (0, express_1.Router)();
        this.tentativesService = TentativeService_1.default.getInstance();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/:enigmeId/:joueurId', this.getTentatives.bind(this));
        this.router.post('/effectuer', this.effectuerTentative.bind(this));
    }
    getTentatives(_req, res, _next) {
        res.json(this.tentativesService.getTentatives(Number(_req.params.joueurId), Number(_req.params.enigmeId)));
    }
    effectuerTentative(_req, res, _next) {
        console.log(_req.body);
        const tentative = _req.body;
        console.log(tentative);
        res.json(this.tentativesService.effectuerTentative(tentative));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = TentativeRouter;
//# sourceMappingURL=tentativesRouter.js.map