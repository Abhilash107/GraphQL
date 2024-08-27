import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {games, authors, reviews} from './db.js'
import { typeDefs } from "./schema.js";
import { argsToArgsConfig } from "graphql/type/definition.js";

const resolvers = {
    Query:{
        games(){
            return games
        },

        reviews(){
            return reviews
        },

        authors(){
            return authors
        },

        review(_, args){
            return reviews.find( (review)=> review.id === args.id )
        },

        game(_, args){
            return games.find( (game)=> game.id === args.id )
        },

        author(_, args){
            return authors.find( (author)=> author.id === args.id )
        }
    }
}

/* 
game{
    title
}
*/ 


// server setup
const server = new ApolloServer({
    // typeDefs --> definitions of types of data
    // Resolvers --> 
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
    listen: { port: 3000}
} )

console.log("Server started at Port", 3000);
