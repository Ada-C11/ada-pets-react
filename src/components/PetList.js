import React from 'react';
import PropTypes from 'prop-types';
import PetCard from './PetCard';

import 'bootstrap/dist/css/bootstrap.min.css';

const PetList = (props) => {
  const { pets, onSelectPet, onDeletePet } = props;
  // You may not have seen ".flatMap" before.
  //
  // ".flatMap" performs a ".map" as normal and then flattens one
  // level of your list.
  //
  // This is handy if you'd like to do something like combine a ".map"
  // and a filter since if you return [] the item is omitted.
  const petCards = pets.flatMap(
    ({ id, name, species, about, location}) => {
      // Construct a RegExp object with 'i' so that the match is case
      // insensitive.
      const query = new RegExp(props.queryString, 'i');

      if (name.match(query) || species.match(query) || about.match(query)) {
        return [<PetCard
                  key = {id}
                  id = {id}
                  name = {name}
                  species = {species}
                  about = {about}
                  location = {location}
                  onSelectPet = {onSelectPet}
                  onDeletePet = {onDeletePet} />];
      } else {
        return [];
      }
    }).reverse().slice(0, 9);

  return (
    <div className="card-group">
      {petCards}
    </div>
  )
}

PetList.propTypes = {
  pets: PropTypes.array.isRequired,
  onSelectPet: PropTypes.func,
  onDeletePet: PropTypes.func,
};

export default PetList;
