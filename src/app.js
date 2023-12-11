import express from "express";
import { ApolloError, ApolloServer } from "apollo-server-express";

import { typeDefs } from "./typeDefs.js";
import { resolvers } from "./resolvers.js";

import { connectDB } from "./db.js";

export const app = express();

connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const start = async() => {

    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    });

    await apolloServer.start();
    
    apolloServer.applyMiddleware({ app: app });

    app.use("*", (req, res) => {
        res.status(404).json({
            error: "Not found"
        });
    });

    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
}

start();