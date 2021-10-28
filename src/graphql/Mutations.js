import { gql } from '@apollo/client';

export const CREATE_USER_MUTATION = gql`
  mutation createUser(
    $firstName: String!
    $lastName: String!
    $gender: String!
    $age: Int!
    $checkedIn: Boolean!
    $shirtSize: String!
    $state: String!
    $yards: Int!
  ) {
    createUser(
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      age: $age
      checkedIn: $checkedIn
      shirtSize: $shirtSize
      state: $state
      yards: $yards
    ) {
      firstName
    }
  }
`;
