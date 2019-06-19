import React from 'react';
import NewPetForm from '../NewPetForm';
import { shallow } from 'enzyme';

describe('NewPetForm', () => {

  test('that it matches an existing snapshot', () => {

    const wrapper = shallow( <NewPetForm addPetCallback={() => {}} /> );

    expect(wrapper).toMatchSnapshot();
  });
});