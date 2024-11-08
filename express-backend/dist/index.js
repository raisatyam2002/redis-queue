"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const redis_1 = require("redis");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const client = (0, redis_1.createClient)();
app.post("/submit", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;
    const userId = req.body.userId;
    try {
        yield client.lPush("problem", JSON.stringify({ problemId, code, language, userId }));
        res.json({
            message: "problem sumbitted succesfully",
        });
    }
    catch (error) {
        console.log("error while submitting problem ", error);
        res.json({
            message: "error while submitting problem",
        });
    }
}));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            console.log("redis is connected");
        }
        catch (error) {
            console.log("Error while connectiong redis ", error);
        }
    });
}
startServer();
// app.get("/check",async(req,res)=>{
//     const res=await client.rPop("p")
// })
app.listen(5000, () => {
    console.log("Port is runnning on 5000");
});
