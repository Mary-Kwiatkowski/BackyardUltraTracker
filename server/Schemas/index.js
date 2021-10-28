const UserType = require('./TypeDefs/UserType');

const userData = require('../byudata.json');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLList,
  GraphQLInt,
  GraphQLString,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    getAllUsers: {
      type: new GraphQLList(UserType),
      args: { age: { type: GraphQLInt } },
      resolve(parent, args) {
        return userData;
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    createUser: {
      type: UserType,
      args: {
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        gender: { type: GraphQLString },
        age: { type: GraphQLInt },
        checkedIn: { type: GraphQLBoolean },
        shirtSize: { type: GraphQLString },
        state: { type: GraphQLString },
        yards: { type: GraphQLInt },
      },
      resolve(parent, args) {
        userData.push({
          id: userData.length + 1,
          firstName: args.firstName,
          lastName: args.lastName,
          gender: args.gender,
          age: args.age,
          checkedIn: args.checkedIn,
          shirtSize: args.shirtSize,
          state: args.state,
          yards: args.yards,
        });
        return args;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
