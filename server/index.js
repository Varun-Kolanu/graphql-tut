import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import {expressMiddleware} from "@apollo/server/express4";
import bodyParser from "body-parser";
import {startStandaloneServer} from "@apollo/server/standalone"

//* Types
import { typeDefs } from "./schema.js";

const app = express();

//* Server setup
const server = new ApolloServer({
    typeDefs,
    //resolvers
})




const {url} = await startStandaloneServer(server, {
    listen: {
        port: 8000
    }
})

console.log(`Server listening at ${url}`);
