class ListsController < ApplicationController
	before_action :set_board
	before_action :set_list, only: [:update, :destroy]
  def index
  	@lists = @board.lists
  end

  def create
  	list = @board.lists.new(list_params)
  	if list.save
  		render json: list
  	else
  		render json: {errors: list.errors}, status: 401
  	end
  end

  def update
  	if @list.update(list_params)
  		render json: @list
  	else
  		render json: {errors: @list.errors}, status: 401
  	end
  end

  def destroy
  	@list.destroy
  	render json: {message: 'List Destroyed!'}
  end

  private
  	def set_board
  		@board = Board.find(params[:board_id])
  	end

  	def list_params
  		params.require(:list).permit(:name, :board_id)
  	end

  	def set_list
  		@list = @board.lists.find(params[:id])
  	end
end
