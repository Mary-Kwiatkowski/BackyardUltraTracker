const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLString,
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
    yards: { type: GraphQLInt },
  }),
});

module.exports = UserType;
