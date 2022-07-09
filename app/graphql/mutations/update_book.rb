module Mutations
  class UpdateBook < Mutations::BaseMutation
    argument :id, ID, required: true
    argument :params, InputTypes::Book, required: true

    field :book, ObjectTypes::Book, null: true

    def resolve(id:, params:)
      book = Book.find(id)
      book.update!(params.to_h)
      { book: book }
    rescue StandardError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end
end
