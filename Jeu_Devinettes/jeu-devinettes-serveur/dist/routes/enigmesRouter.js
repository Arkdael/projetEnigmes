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
    async getEnigmes(_req, res, _next) {
        res.json(await this.enigmeService.getEnigmes());
    }
    async getEnigme(_req, res, _next) {
        // TODO validations des paramètres et gestion d'erreurs.
        try {
            const enigme = await this.enigmeService.getEnigme(Number.parseInt(_req.params.id?.toString() ?? "0"));
            res.json(enigme);
        }
        catch (erreur) {
            res.status(404);
        }
    }
    async creerEnigme(_req, res, _next) {
        const enigme = _req.body;
        res.json(await this.enigmeService.addEnigme(enigme));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = EnigmesRouter;
//# sourceMappingURL=enigmesRouter.js.map