import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from "body-parser";
import {startStandaloneServer} from "@apollo/server/standalone";
import db from "./_db.js";

//* Types
import { typeDefs } from "./schema.js";

const app = express();

//* Resolvers
const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, args) {
            return db.games.find(game => game.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, args) {
            return db.reviews.find(review => review.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, args) {
            return db.authors.find(author => author.id === args.id)
        }
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter(review => review.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter(review => review.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.find(author => author.id === parent.author_id)
        },
        game(parent) {
            return db.games.find(game => game.id === parent.game_id)
        }
    },

}

//* Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})




const {url} = await startStandaloneServer(server, {
    listen: {
        port: 8000
    }
})

console.log(`Server listening at ${url}`);
