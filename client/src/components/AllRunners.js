import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { GET_RUNNERS } from '../graphql/queries/index';

const AllRunners = () => {
  const { error, loading, data } = useQuery(GET_RUNNERS);
  useEffect(() => {
    console.log(data);
  }, [data]);

  return <div></div>;
};

export { AllRunners };
