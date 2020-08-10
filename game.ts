import { whoWonGame, Sign } from "./shifumi-sign";
import * as readline from 'readline';
import { Interface as ReadlineInterface } from 'readline';

export async function game(signs: Sign[]) {
    const userChoice = await userTurn(signs);
    const computerChoice = computerTurn(signs);
    const won = whoWonGame(userChoice, computerChoice);
    process.stdout.write(`${won}`);
}

function computerTurn(signs: Sign[]): Sign {
    const randomNumber = getRandomNumberInRange(signs.length);
    process.stdout.write(`Computer choose ${signs[randomNumber].name}\n`);
    return signs[randomNumber];
}

function getRandomNumberInRange(range: number): number {
    return Math.floor(Math.random() * range);
}

async function userTurn(signs: Sign[]): Promise<Sign> {
    const readlineInterface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const choice =  await getUserChoice(readlineInterface, signs);
    readlineInterface.close();
    return signs[choice];
}

/**
 * Create choices list and ask user for a choice
 * @param readlineInterface 
 * @param signs 
 */
async function getUserChoice(readlineInterface: ReadlineInterface, signs: Sign[]): Promise<number> {
    const choices = signs.reduce((choices, sign, index ) => {
        return `${choices} ${index+1} / ${sign.name}\n`;
    }, 'Que choisissez-vous ?\n');

    let answer;
    do {
        answer = await question(readlineInterface, choices);
    } while(choiceHasError(answer, signs));
    return +answer-1;
}

/**
 * Check if answer match choices and show a retry message to user
 * @param answer
 * @param signs
 */
function choiceHasError(answer: string, signs: Sign[]): boolean {
    if (isNaN(+answer) || +answer <1 || +answer > signs.length) {
        process.stdout.write(`'${answer}' is not an acceptable answer, please try again with a good value.\n`)
        return true;
    }
    return false;
}

/**
 * Take a readline interface to show question and return answer
 * @param readlineInterface 
 * @param message 
 */
function question(readlineInterface: ReadlineInterface, message: string): Promise<string> {
    return new Promise((resolve, reject) => {
        readlineInterface.question(message, (answer) => {
            resolve(answer);
        })
    })
}