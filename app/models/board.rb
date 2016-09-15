# == Schema Information
#
# Table name: boards
#
#  id         :integer          not null, primary key
#  name       :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Board < ApplicationRecord
	has_many :lists, dependent: :destroy

	def self.by_newest
		order(created_at: :desc)
		
	end
end
