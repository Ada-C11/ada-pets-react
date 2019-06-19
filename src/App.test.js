import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

describe('<App />', () => {  
  test('that it renders App with shallow rendering', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  test('will match the last snapshot with deep rendering', () => {
    const wrapper = mount(<App />);
    expect(wrapper).toMatchSnapshot();

    // Remove the component from the DOM (save memory and prevent side effects).
    wrapper.unmount();
  });
});