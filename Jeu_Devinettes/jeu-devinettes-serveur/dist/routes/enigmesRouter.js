"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EnigmeService_1 = __importDefault(require("../services/EnigmeService"));
class EnigmesRouter {
    router;
    enigmeService;
    constructor() {
        this.router = (0, express_1.Router)();
        this.enigmeService = EnigmeService_1.default.getInstance();
        this.initRoutes();
    }
    initRoutes() {
        this.router.get('/', this.getEnigmes.bind(this));
        this.router.get('/:id', this.getEnigme.bind(this));
        this.router.post('/creer', this.creerEnigme.bind(this));
    }
    getEnigmes(_req, res, _next) {
        res.json(this.enigmeService.getEnigmes());
    }
    getEnigme(_req, res, _next) {
        console.log(_req.params.id);
        res.json(this.enigmeService.getEnigme(Number.parseInt(_req.params.id?.toString() ?? "0")));
    }
    creerEnigme(_req, res, _next) {
        const enigme = _req.body;
        res.json(this.enigmeService.addEnigme(enigme));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = EnigmesRouter;
//# sourceMappingURL=enigmesRouter.js.map