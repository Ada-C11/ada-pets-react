import React, { Component } from 'react';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.min.css';
import './NewPetForm.css'

class NewPetForm extends Component {
  constructor(props) {
    super(props);

    this.cleared = {
      name: "",
      species: "",
      location: "",
      about: "",
      images: ""
    };

    this.state = { ...this.cleared }
  }

  addPet = (event) => {
    event.preventDefault();

    const pet = this.state;

    this.props.addPetCallback(pet)

    this.setState({ ...this.cleared });
  }

  onInputChange = (event) => {
    const updatedState = {};

    const field = event.target.name;
    const value = event.target.value;

    updatedState[field] = value;
    this.setState(updatedState);
  }

  render() {
    return (
      <form
        className="new-pet-form"
        onSubmit={this.addPet}
        className="great-form"
      >
        <h3>Add a Pet</h3>
        <label>
          Name:
          <input
            name="name"
            type="text"
            value={this.state.name}
            onChange={this.onInputChange}></input>
        </label>
        <label>
          Species:
          <select
            name="species"
            value={this.state.species}
            onChange={this.onInputChange}>
            <option value="">Please Select a Species</option>
            <option value="cat">Cat</option>
            <option value="dog">Dog</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label>
          Location:
          <input
            name="location"
            type="text"
            value={this.state.location}
            onChange={this.onInputChange}></input>
        </label>
        <label>
          About:
          <textarea
            name="about"
            value={this.state.about}
            onChange={this.onInputChange} />
        </label>
        <label>
          Images:
          <input name="images" type="text" value={this.state.images} onChange={this.onInputChange}></input>
        </label>
        <input className="btn btn-success new-pet-form--submit" type="submit" name="submit" value="Add a Pet" />
      </form>
    );
  }


}

NewPetForm.propTypes = {
  addPetCallback: PropTypes.func.isRequired,
};

export default NewPetForm;
