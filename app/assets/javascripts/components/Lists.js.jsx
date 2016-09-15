class Lists extends React.Component {
	constructor(props) {
		super(props);
		this.addList = this.addList.bind(this);
		this.displayLists = this.displayLists.bind(this);
		this.deleteList = this.deleteList.bind(this);
		this.state = { lists: this.props.lists, board: this.props.board };
	}

	addList(e) {
		e.preventDefault();
		let id = this.state.board.id;
		let name = this.refs.listName.value;
		$.ajax({
			url: `/boards/${id}/lists`,
			type: 'POST',
			dataType: 'JSON',
			data: { list: { name } }
		}).done( data => {
			this.setState({
				lists: [data, ...this.state.lists]
			});
			this.refs.addListForm.reset();
		}).fail( data => {
			console.log(data);
		});
	}

	deleteList(id) {
		$.ajax({
			url: `/boards/${this.state.board.id}/lists/${id}`,
			type: 'DELETE',
			dataType: 'JSON',
		}).done(data => {
			let lists = this.state.lists;
			let deleteIndex = lists.findIndex( b => b.id === id );
			this.setState({
				lists: [...lists.slice(0, deleteIndex), ...lists.slice(deleteIndex + 1, lists.length)]
			});
		}).fail(data => {
			console.log(data);
		})
	}

	displayLists() {
		let lists = this.state.lists.map( list => {
			return(<List key={`list-${list.id}`} list={list} deleteList={this.deleteList} board={this.state.board} />)
		});
		return lists;
	}

	render() {
		// display all the lists for the board
		// NOTE see boards.js.jsx
		// 1. ability to add a list
		// 2. ability to delete a list
		// 3. ability to edit a list
		// Bonus:
			// 1. Do the same thing for items
		return(
			<div>
				<form ref='addListForm' onSubmit={ this.addList }>
					<input type='text' required placeholder="List Name" ref='listName' />
					<input type='submit' className='btn btn-primary btn-xs' />
				</form>
				<div className='row'>
					{ this.displayLists() }
				</div>
			</div>
		);
	}
}