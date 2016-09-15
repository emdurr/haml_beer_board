class List extends React.Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.editList = this.editList.bind(this);
		this.state = { edit: false, list: this.props.list, board: this.props.board };
	}

	editList(e) {
		e.preventDefault();
		let name = this.refs.editListName.value;
		$.ajax({
			url: `/boards/${this.state.board.id}/lists/${this.state.list.id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { list: { name } }
		}).done( data => {
			this.toggleEdit();
			this.setState({ list: data });
		}).fail( data => {
			console.log(data);
		});
	}

	displayView() {
		let board = this.state.board;
		let list = this.state.list;
		return(
			<div className='outside'>
				<a href={`/boards/${board.id}/lists/${list.id}/items`}>
					<div className='jumbotron col-xs-12 col-sm-4 list'>
						{	list.name }
						<br />

						<br />
						<button onClick={this.toggleEdit} className='btn btn-xs btn-warning'>Edit</button>
						<button onClick={() => this.props.deleteList(list.id)} className='btn btn-xs btn-danger'>Delete</button>
					</div>
				</a>
			</div>
		)

	}

	editView() {
		return(
			<div className='jumbotron col-xs-12 col-sm-4 list'>
				<form onSubmit={this.editList}>
					<input type='text' defaultValue={this.state.list.name} required placeholder='List Name' ref='editListName' />
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