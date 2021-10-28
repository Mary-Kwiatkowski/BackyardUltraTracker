import { gql } from '@apollo/client';

const GET_RUNNERS = gql`
  query {
    getAllUsers {
      firstName
      lastName
      gender
      age
      checkedIn
      shirtSize
      state
      yards
    }
  }
`;

export { GET_RUNNERS };
