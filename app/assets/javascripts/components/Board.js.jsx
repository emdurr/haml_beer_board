class Board extends React.Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.editBoard = this.editBoard.bind(this);
		this.state = { edit: false, board: this.props.board };
	}

	editBoard(e) {
		e.preventDefault();
		let name = this.refs.editBoardName.value;
		$.ajax({
			url: `/boards/${this.props.board.id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { board: { name } }
		}).done( data => {
			this.toggleEdit();
			this.setState({ board: data });
		}).fail( data => {
			console.log(data);
		});
	}

	displayView() {
		let board = this.state.board;
		return(
			<div className='outside'>
				<a href={`/boards/${board.id}/lists`}>
					<div className='jumbotron col-xs-12 col-sm-4 board'>
						{	board.name }
						<br />
						<button onClick={this.toggleEdit} className='btn btn-xs btn-warning'>Edit</button>
						<button onClick={() => this.props.deleteBoard(board.id)} className='btn btn-xs btn-danger'>Delete</button>
					</div>
				</a>
			</div>
		)

	}

	editView() {
		return(
			<div className='jumbotron col-xs-12 col-sm-4 board'>
				<form onSubmit={this.editBoard}>
					<input type='text' defaultValue={this.state.board.name} required placeholder='Board Name' ref='editBoardName' />
					<br />
					<button onClick={this.toggleEdit} type='button' className='btn btn-xs btn-default'>Cancel</button>
					<button type='submit' className='btn btn-xs btn-success'>Save</button>
				</form>
			</div>
		)

	}

	toggleEdit() {
		this.setState({ edit: !this.state.edit });
	}

	render() {
		if(this.state.edit)
			return(this.editView());
		else
			return(this.displayView());
	}
}