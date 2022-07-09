module Mutations
  class DeleteBook < Mutations::BaseMutation
    argument :id, ID, required: true

    field :book, ObjectTypes::Book, null: true

    def resolve(id:)
      book = Book.find(id)
      book.destroy
      { book: book }
    rescue StandardError => e
      GraphQL::ExecutionError.new(e.message)
    end
  end
end
