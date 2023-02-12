"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const getDailyGame_1 = require("./games/getDailyGame");
const getBestWords_1 = require("./utils/getBestWords");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const checkGame = () => {
    const args = process.argv.slice(2);
    if (args[0]) {
        const game = (0, getDailyGame_1.getDailyGame)(args[0]);
        if (game) {
            console.log('Finding best words for game', args[0]);
            (0, getBestWords_1.getBestWords)(game, Number(args[1]) || 99);
        }
        else {
            console.log('Game not found');
        }
        rl.close();
    }
    else {
        rl.question('Enter the date to check ', (dateString) => {
            const game = (0, getDailyGame_1.getDailyGame)(dateString);
            if (game) {
                rl.question('Enter the minimum points to print ', pointsString => {
                    (0, getBestWords_1.getBestWords)(game, Number(pointsString) || 99);
                    askAgain();
                });
            }
            else {
                console.log('Game not found');
                askAgain();
            }
        });
    }
};
const askAgain = () => {
    rl.question('Do you want to check another? ', reply => {
        if (reply.toLowerCase() === 'y' || reply.toLocaleLowerCase() === 'yes') {
            checkGame();
        }
        else {
            rl.close();
        }
    });
};
checkGame();
