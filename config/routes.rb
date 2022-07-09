Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: 'graphiql#execute' if Rails.env.development?
  post '/graphiql', to: 'graphiql#execute'
end
