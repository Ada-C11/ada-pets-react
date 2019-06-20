import React, { Component } from 'react';
import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// import pets from './data/pets.json';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petList: [],
      currentPet: undefined,
      errorMessage: null,
    };
  }

  componentDidMount() {
    axios.get('https://petdibs.herokuapp.com/pets')
    .then((response) => {
      console.log("In .then!");

      const pets = response.data.flatMap(pet => {
        if (pet.name && pet.breed && pet.about) {
          return [{
            ...pet,
            species: pet.breed.toLowerCase()
          }];
        } else {
          return [];
        }
      });

      this.setState({ petList: pets });
    })
    .catch((error) => {
      this.setState({
        errorMessage: error.message
      })
    })
  }

  onSelectPet = (petId) => {
    const pet = this.state.petList.find(pet => pet.id === petId)

    this.setState({
      currentPet: pet
    });
  }

  onDeletePet = (petId) => {
    const newPetList = this.state.petList.filter(pet => pet.id !== petId);

    this.setState({
      petList: newPetList
    });
  }

  addPetCallback = (pet) => {
    // What is the structure of data that we need to send to the API? ... this is a very api-specific question!
    const petDataToSendToApi = {
      name: pet.name,
      breed: pet.species,
      about: pet.about,
    };

    axios.post('https://petdibs.herokuapp.com/pets', petDataToSendToApi)
      .then((response) => {
        console.log("This is what response.data looks like from the API on a successful response", response.data)
        let updatedPetList = this.state.petList;
        updatedPetList.push({
          name: pet.name,
          species: pet.species,
          about: pet.about,
          id: response.data.id,
        });
        this.setState({
          petList: updatedPetList,
        });
      })
      .catch((error) => {
        this.setState({
          errorMessage: error.message
        });
      });
  }

  searchCallback = (queryString) => {
    this.setState({
      queryString
    });
  }

  render() {
    const { currentPet, petList } = this.state;

    const errorSection = (this.state.errorMessage) ? 
    (<section className="error">
       Error: {this.state.errorMessage}
     </section>) : null;

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
          {errorSection}
        </header>
        <section className="search-bar-wrapper">
          <SearchBar searchCallback={this.searchCallback} />
        </section>
        <PetDetails currentPet={currentPet} />
        <section className="pet-list-wrapper">
          <PetList
            pets={petList}
            onSelectPet={this.onSelectPet}
            onDeletePet={this.onDeletePet}
            queryString={this.state.queryString}/>
        </section>
        <section className="new-pet-form-wrapper">
          <NewPetForm addPetCallback={this.addPetCallback} />
        </section>
      </main>
    );
  }
}

export default App;
