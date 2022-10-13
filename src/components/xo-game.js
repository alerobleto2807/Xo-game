import React from "react";
import '../components/buttonClass.css';
import '../components/board.css'

//*----------clase exportable*////
class Game extends React.Component{
  // con este constructor levantamos el estado y configuramos el viaje en el tiempo de los movimientos anteriores
  constructor(props){
    super(props);
    this.state ={
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }
  // diseñaremos el handleClick metodo 
handleClick(i) {
  const history = this.state.history.slice(0, this.state.stepNumber + 1);;
  const current = history[history.length - 1];
  const squares = current.squares.slice();
   //const squares = this.state.squares.slice();
   if(calculateiWinner(squares) || squares[i]){
     return;
   }
   squares[i] = this.state.xIsNext ? 'X' : 'O';
   this.setState({
     history: history.concat([{ // usar contact es mejor  que push ya que no muta la matris o los datos
       squares: squares,
     }]),
     stepNumber: history.length,
     xIsNext: !this.state.xIsNext,
   });
 }

// creando el metodo jummTo()
jumpTo(step){
  this.setState({
    stepNumber: step,
    xIsNext: (step % 2) === 0,
  })
}


    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateiWinner(current.squares);

      // crearemos un bloque de codigo para mostrar el historial
      const moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move :
          'Go to game start';
        return (
          <li key={move} >
           <button className="boton_move" onClick={() => this.jumpTo(move) }>{desc}</button>
          </li>
        );
      })

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }

       return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
      }
    }
    
//------inicianso las clases para el comportamiento del juego-----\\
/* class Square extends React.Component{
// inicianso el constructor podremos activar y manejar el estado
  constructor(props){
    super(props);
    this.state = {
      value: null, // iniciado en null para que adote otros valores
    }
  }

    render(){
        return(
          //  <p className="button__play">Inicia el Juego</p>
            <button 
              className="square" 
              onClick={() => this.props.onClick()}>
              {this.props.value}
            </button>
        );
    }
} */

// convertiremos la clase Squares a una funcion mas sencilla
function Square(props){
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// clase que dibuja los cuadros
class Board extends React.Component {
    renderSquare(i) {
      return (
      <Square 
      value ={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
      />
      );
    }
  
    render() {
      return (
        <div className="genaral__container">
          <h2>Gamers</h2>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }


  function calculateiWinner(squares){
    const lines = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

export default Game;