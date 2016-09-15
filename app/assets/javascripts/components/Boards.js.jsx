class Boards extends React.Component {
	constructor(props) {
		super(props);
		this.displayBoards = this.displayBoards.bind(this);
		this.addBoard = this.addBoard.bind(this);
		this.deleteBoard = this.deleteBoard.bind(this);
		this.state = { boards: this.props.boards };
	}

	addBoard(e) {
		e.preventDefault();
		let name = this.refs.boardName.value;
		$.ajax({
			url: '/boards',
			type: 'POST',
			dataType: 'JSON',
			data: { board: { name } }
		}).done( data => {
			this.setState({
				boards: [data, ...this.state.boards]
			});
			this.refs.addBoardForm.reset();
		}).fail( data => {
			console.log(data);
		});
	}

	deleteBoard(id) {
		$.ajax({
			url: `/boards/${id}`,
			type: 'DELETE',
			dataType: 'JSON',
		}).done(data => {
			let boards = this.state.boards;
			let deleteIndex = boards.findIndex( b => b.id === id );
			this.setState({
				boards: [...boards.slice(0, deleteIndex), ...boards.slice(deleteIndex + 1, boards.length)]
			});
		}).fail(data => {
			console.log(data);
		})
	}

	displayBoards() {
		let boards = this.state.boards.map( board => {
			return(<Board key={`board-${board.id}`} board={board} deleteBoard={this.deleteBoard} />)
		});
		return boards;
	}

	render() {
		return(
			<div className='text-center'>
				<form ref='addBoardForm' onSubmit={this.addBoard}>
					<input type='text' required placeholder="Board Name" ref='boardName' />
					<input type='submit' className='btn btn-primary btn-xs' />
				</form>
				<div className='row'>
					{ this.displayBoards() }
				</div>
			</div>
		)
	}
}

