class Item extends React.Component {
	constructor(props) {
		super(props);
		this.toggleEdit = this.toggleEdit.bind(this);
		this.editItem = this.editItem.bind(this);
		this.state = { edit: false, item: this.props.item, list: this.props.list, board: this.props.board };
	}

	editItem(e) {
		e.preventDefault();
		let name = this.refs.editItemName.value;
		$.ajax({
			url: `/boards/${this.state.board.id}/lists/${this.state.list.id}/items/${this.state.item.id}`,
			type: 'PUT',
			dataType: 'JSON',
			data: { list: { name } }
		}).done( data => {
			this.toggleEdit();
			this.setState({ item: data });
		}).fail( data => {
			console.log(data);
		});
	}

	displayView() {
		let board = this.state.board;
		let list = this.state.list;
		let item = this.state.item;
		return(
			<div className='outside'>
					<div className='jumbotron col-xs-12 col-sm-4 item'>
						{	item.name }
						<br />
						<button onClick={this.toggleEdit} className='btn btn-xs btn-warning'>Edit</button>
						<button onClick={() => this.props.deleteItem(item.id)} className='btn btn-xs btn-danger'>Delete</button>
					</div>
			</div>
		)

	}

	editView() {
		return(
			<div className='jumbotron col-xs-12 col-sm-4 item'>
				<form onSubmit={this.editItem}>
					<input type='text' defaultValue={this.state.item.name} required placeholder='Item Name' ref='editItemName' />
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