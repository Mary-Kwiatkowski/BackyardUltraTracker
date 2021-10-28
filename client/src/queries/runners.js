const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    gender: { type: GraphQLString },
    age: { type: GraphQLInt },
    checkedIn: { type: GraphQLBoolean },
    shirtSize: { type: GraphQLString },
    state: { type: GraphQLString },
    laps: { type: GraphQLInt },
    miles: { type: GraphQLInt },
  }),
});

module.exports = UserType;
