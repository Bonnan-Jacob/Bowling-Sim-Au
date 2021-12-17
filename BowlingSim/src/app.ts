import { Console } from "console";

export class App {
  
  seconds = 0;
  game = [];
  gameScore = [];

  constructor() {    
    this.createGame();
  }

  createGame(){
    this.game = this.generateGame();
    this.gameScore = this.scoreGame(this.game);
  }

  scoreGame(game: number[]){
    game = game.flat();
    
    var scores = [];
    var score: number = 0;

    for(let i = 0; i < game.length - 1; i+=2){ 
        //strike
        if(game[i] === 10){
          scores.push(10 + game[i+1] + (game[i+2] || 10));
          score += 10 + game[i+1] + (game[i+2] || 10); 
          i--;
        }
 
        //spare 
        else if(game[i] + game[i+1] === 10){
          scores.push(10 + (game[i+2] || 10));
          score += 10 + (game[i+2] || 10); 
        }

        else{
        //normal
        score += game[i] + game[i+1];   
        scores.push(game[i] + game[i+1]);
        } 
    }

    if(scores.length === 11){
      scores[10] += scores[11];
      scores.pop();
    }

    return [score, scores];
  }

  generateGame(){
    var gameResult = [];

    for(let i = 0; i < 10; i++) {
      gameResult[i] = [];
      gameResult[i][0] = this.generateTurn();

      if(gameResult[i][0] < 10){
        gameResult[i][1] = this.generateTurn(gameResult[i][0]);
      }
    }
 
    if(gameResult[9][0] === 10)
    {
      gameResult[9][1] = this.generateTurn();
    }  

    if(gameResult[9][0] + gameResult[9][1] > 9)
    {
      gameResult[9][2] = this.generateTurn();
    }

    return gameResult;
  } 

  generateTurn(prevTurn: number = 0): number {
    return Math.floor(Math.random() * (11 - prevTurn));
  }
}
