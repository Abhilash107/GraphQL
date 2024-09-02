import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {games, authors, reviews} from './db.js'
import { typeDefs } from "./schema.js";
import { argsToArgsConfig } from "graphql/type/definition.js";

const resolvers = {
    Query: {
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
    },
    //for nested queries
    Game: {
        reviews(parent){
            return reviews.filter( (r) => r.game_id === parent.id )
        }

    },

    Author: {
        reviews(parent){
            return reviews.filter( (r) => r.author_id === parent.id )
        }
    },
    
    Review: {
        author(parent){
            return authors.find( (a) => a.id === parent.author_id )
        },
        game(parent){
            return games.find( (g) => g.id === parent.game_id )
        }
    }
}

/* 
game{
    title,
        nested query
    reviews{
        rating,
        content
    }
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
