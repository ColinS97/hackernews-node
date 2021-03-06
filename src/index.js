const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const AuthPayload = require('./resolvers/AuthPayLoad')
const Subscription = require('./resolvers/Subscription')
const Feed = require('./resolvers/Feed')

const resolvers = {
    Query,
    Mutation,
    AuthPayload,
    Subscription,
    Feed
}

//https://www.howtographql.com/graphql-js/9-summary/
const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/sgtwigglytuff-fb7c30/database/dev',
            secret: 'mysecret123',
            debug: true,
        }),
    }),
})
server.start(() =>  console.log(`Server is running on http://localhost:4000`))