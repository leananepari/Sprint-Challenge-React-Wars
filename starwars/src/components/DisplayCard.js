import React from "react";
import { Card } from 'semantic-ui-react';


const DisplayCard = ({ name, gender, height, hairColor, starships }) => {
  console.log('inside display')
  return (
    <div>
      <Card style={{ margin: '20px', width: '350px', textAlign: "left"}}>
        <Card.Content>
          <Card.Header>Name: {name}</Card.Header>
          <Card.Header>Gender: {gender}</Card.Header>
          <Card.Header>Height: {height}</Card.Header>
          <Card.Header>Hair Color: {hairColor}</Card.Header>
          <Card.Header>Starships: {starships}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
}

export default DisplayCard;

