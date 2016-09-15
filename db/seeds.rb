30.times do |n|
	Board.create(name: Faker::Beer.style)
end