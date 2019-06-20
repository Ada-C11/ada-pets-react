import React, { Component } from 'react';
import axios from 'axios';

import PetList from './components/PetList';
import PetDetails from './components/PetDetails';
import SearchBar from './components/SearchBar';
import NewPetForm from './components/NewPetForm';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const PET_API_URL = 'https://petdibs.herokuapp.com/pets';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      petList: [],
      currentPet: undefined,
    };
  }

  componentDidMount() {
    axios.get(PET_API_URL)
      .then((response) => {
        //console.log(response.data);

        const petList = response.data.map((pet) => {
          const newPet = {
            name: 'Madonna',
            ...pet,
            location: 'Seattle, WA',
            species: pet.breed ? pet.breed.toLowerCase() : 'dog',
            about: pet.about ? pet.about : '',
            images: pet.img ? [pet.img] : ['https://fortunedotcom.files.wordpress.com/2019/01/boo.jpg'],

          }
          return newPet;
        }).splice(0, 10);

        console.log(petList);

        this.setState({
          petList,
        });
      })
      .catch((error) => {
        console.log(error);
      })

    // this.setState({
    //   petList: [
    //     {
    //       id: 1,
    //       name: 'Popeye1',
    //       species: 'cat',
    //       about: 'some pet',
    //       location: 'Dallas, TX',
    //     },
    //     {
    //       id: 2,
    //       name: 'Stinker',
    //       species: 'dog',
    //       about: 'some pet',
    //       location: 'Dallas, TX',
    //     },
    //   ],
    // })

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
    const petIds = this.state.petList.map(pet => pet.id)

    this.setState({
      petList: [...this.state.petList, { ...pet, id: Math.max(...petIds) + 1 }]
    });
  }

  searchCallback = (queryString) => {
    this.setState({
      queryString
    });
  }

  render() {
    const { currentPet, petList } = this.state;

    return (
      <main className="App">
        <header className="app-header">
          <h1>Ada Pets</h1>
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
            queryString={this.state.queryString} />
        </section>
        <section className="new-pet-form-wrapper">
          <NewPetForm addPetCallback={this.addPetCallback} />
        </section>
      </main>
    );
  }
}

export default App;
