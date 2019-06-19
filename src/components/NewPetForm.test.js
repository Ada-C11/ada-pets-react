import React from 'react';
import { shallow } from 'enzyme'

import NewPetForm from './NewPetForm';


describe('New Pet Form', () => {
  test('it matches snapshot', () => {

    // Mount the component in the DOM
    const wrapper = shallow(<NewPetForm
      addPetCallback={() => { }}
    />);

    expect(wrapper).toMatchSnapshot();
  });
});