class Items extends React.Component {
	constructor(props) {
		super(props);
		this.addItem = this.addItem.bind(this);
		this.displayItems = this.displayItems.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.state = { items: this.props.items, list: this.props.list, board: this.props.board };
	}

	addItem(e) {
		e.preventDefault();
		let id = this.state.board.id;
		let listId = this.state.list.id;
		let name = this.refs.itemName.value;
		$.ajax({
			url: `/boards/${id}/lists/${listId}/items`,
			type: 'POST',
			dataType: 'JSON',
			data: { list: { name } }
		}).done( data => {
			this.setState({
				items: [data, ...this.state.items]
			});
			this.refs.addItemForm.reset();
		}).fail( data => {
			console.log(data);
		});
	}

	deleteItem(id) {
		$.ajax({
			url: `/boards/${this.state.board.id}/lists/${this.state.list.id}/items/${id}`,
			type: 'DELETE',
			dataType: 'JSON',
		}).done(data => {
			let items = this.state.items;
			let deleteIndex = items.findIndex( b => b.id === id );
			this.setState({
				items: [...items.slice(0, deleteIndex), ...items.slice(deleteIndex + 1, items.length)]
			});
		}).fail(data => {
			console.log(data);
		})
	}

	displayItems() {
		let items = this.state.items.map( item => {
			return(<Item key={`item-${item.id}`} item={item} list={this.state.list} deleteItem={this.deleteItem} board={this.state.board} />)
		});
		return items;
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
				<form ref='addItemForm' onSubmit={ this.addItem }>
					<input type='text' required placeholder="Item Name" ref='itemName' />
					<input type='submit' className='btn btn-primary btn-xs' />
				</form>
				<div className='row'>
					{ this.displayItems() }
				</div>
			</div>
		);
	}
}