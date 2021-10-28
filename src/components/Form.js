import React, { useState } from 'react';
import { CREATE_USER_MUTATION } from '../graphql/Mutations';
import { useMutation } from '@apollo/client';

function Form() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [checkedIn, setCheckedIn] = useState(false);
  const [shirtSize, setShirtSize] = useState('');
  const [state, setState] = useState('');
  const [yards, setYards] = useState(0);

  const [createUser, { error }] = useMutation(CREATE_USER_MUTATION);

  const handleCheckbox = (event) => {
    const target = event.target;
    const value =
      target.type === 'checkbox' ? target.checked : target.value;

    setCheckedIn(value);
  };

  const addUser = () => {
    createUser({
      variables: {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        age: age,
        checkedIn: checkedIn,
        shirtSize: shirtSize,
        state: state,
        yards: yards,
      },
    });

    if (error) {
      console.log(error);
    }
    console.log();
  };
  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        onChange={(e) => {
          setFirstName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Last Name"
        onChange={(e) => {
          setLastName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="Gender"
        onChange={(e) => {
          setGender(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(e) => {
          setAge(Number(e.target.value));
        }}
      />
      <label>Text</label>
      <input
        label="Checked In"
        type="checkbox"
        placeholder="Checked In"
        onChange={(e) => {
          handleCheckbox({
            target: {
              name: e.target.name,
              value: e.target.checked,
            },
          });
        }}
      />
      <input
        type="text"
        placeholder="Shirt Size"
        onChange={(e) => {
          setShirtSize(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="State"
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Yards"
        onChange={(e) => {
          setYards(Number(e.target.value));
        }}
      />
      <button onClick={addUser}> Create User</button>
    </div>
  );
}

export default Form;
