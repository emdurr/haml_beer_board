class BoardsController < ApplicationController
	skip_before_action :verify_authenticity_token
	before_action :set_board, only: [:update, :destroy]

  def index
  	@boards = Board.all.by_newest
  end

  def create
  	board = Board.new(board_params)
  	if board.save
  		render json: board
  	else
  		render json: {errors: board.errors}, status: 401
  	end
  end

  def update
  	if @board.update(board_params)
  		render json: @board
  	else
  		render json: {errors: @board.errors}, status: 401
  	end
  end

  def destroy
  	@board.destroy
  	render json: {message: 'Board Destroyed!'}
  end

  private
  	def board_params
  		params.require(:board).permit(:name)
  	end

  	def set_board
  		@board = Board.find(params[:id])
  	end
end
