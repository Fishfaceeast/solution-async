import React from 'react'
import ReactDOM from 'react-dom'

class Square extends React.Component {
	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		const {
			value,
			clickAble
		} = this.props
		if(clickAble) this.props.handleSquareClick(value)
	}

	render() {
		return (
			<button className="square" onClick={this.handleClick}>
				{this.props.player}
			</button>
		)
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props)
	}
	renderSquare(i) {
		const {
			squares
		} = this.props
		const clickAble = Object.keys(squares).indexOf(i.toString()) < 0
		return <Square value={i} player={squares[i] ? squares[i] : ''} clickAble={clickAble} handleSquareClick={this.props.onSquareClick}/>
	}
	render() {
		return (
			<div>
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
		)
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			winner: '',
			squares: {},
			player: 'x'
		}
		this.handleSquareClick = this.handleSquareClick.bind(this)
		this.calculateWinner = this.calculateWinner.bind(this)
	}
	handleSquareClick(pos) {
		let neoSquares = Object.assign(this.state.squares, {})
		neoSquares[pos] = this.state.player
		this.setState({squares: neoSquares})
		const res = this.calculateWinner(this.state.squares)
		if(res) {
			this.setState({winner: res})
		} else {
			const nextPlayer = this.state.player === 'x' ? 'o' : 'x'
			this.setState({player: nextPlayer})
		}
	}
	calculateWinner(squares) {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i]
			if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
				return squares[a]
			}
		}
		return null
	}
	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board squares={this.state.squares} onSquareClick={this.handleSquareClick}/>
				</div>
				<div className="game-info">
					<StatusInfo winner={this.state.winner} player={this.state.player}/>
					<StepList squares={this.state.squares}/>
				</div>
			</div>
		)
	}
}

const StatusInfo = (props) => {
	const {
		winner,
		player
	} = props
	if(winner) return <div>Winner is: {winner}!!!</div>
	return <div>Next Player: {player}</div>
}

const StepList = (props) => {
	const { squares } = props
	const keys = Object.keys(squares)
	var list = []
	keys.forEach((key, i) => {
		list.push(<li key={key}>Moves #{i}</li>)
	})
	return <ol>{list}</ol>
}

// ========================================

ReactDOM.render(
	<Game />,
	document.getElementById('container')
)