class ItemsController < ApplicationController
	before_action :set_board
	before_action :set_list
	before_action :set_item, only: [:update, :destroy]
  def index
  	@items = @list.items
  end

  def create
  	item = @list.items.new(item_params)
  	if item.save
  		render json: item
  	else
  		render json: {errors: item.errors}, status: 401
  	end
  end

  def update
  	if @item.update(item_params)
  		render json: @item
  	else
  		render json: {errors: @item.errors}, status: 401
  	end
  end

  def destroy
  	@item.destroy
  	render json: {message: 'Item Destroyed!'}
  end

  private
	  def set_board
  		@board = Board.find(params[:board_id])
  	end

  	def set_list
  		@list = @board.lists.find(params[:list_id])
  	end

  	def set_item
  		@item = @list.items.find(params[:id])
  	end

  	def item_params
  		params.require(:list).permit(:name, :board_id, :list_id)
  	end
end
