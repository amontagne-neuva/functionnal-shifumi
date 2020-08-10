import { Sign, SignName } from './shifumi-sign';
import { game } from './game';

const rock: Sign = {
    name: SignName.ROCK,
    weakness: SignName.PAPER
};

const scissors: Sign = {
    name: SignName.SCISSORS,
    weakness: SignName.ROCK
};

const paper: Sign = {
    name: SignName.PAPER,
    weakness: SignName.SCISSORS
};

const signs = [rock, paper, scissors];

game(signs);