export type Sign = {
    name: SignName;
    weakness: SignName;
} 

export enum SignName {
    ROCK = 'Rock',
    SCISSORS = 'Scissors',
    PAPER = 'Paper'
}

/**
 * Return end of the match message 
 * @param userSign 
 * @param computerSign 
 */
export function whoWonGame(userSign: Sign, computerSign: Sign) {
    if (userSign.weakness === computerSign.name) {
        return "You loose";
    } else if (computerSign.weakness === userSign.name) {
        return "You win";
    } else {
        return "Tied match";
    }
}

