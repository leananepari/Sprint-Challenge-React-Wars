import React from "react";
import { Card, Image } from 'semantic-ui-react';
import Img from "./../assets/avatar.png";

const DisplayCard = ({ name, gender, height, hairColor }) => {
  return (
    <div>
      <Card style={{ margin: '20px', width: '350px', textAlign: "left"}}>
        <Image src={Img} wrapped ui={false} />
        <Card.Content>
          <Card.Header>Name: {name}</Card.Header>
          <Card.Header>Gender: {gender}</Card.Header>
          <Card.Header>Height: {height}</Card.Header>
          <Card.Header>Hair Color: {hairColor}</Card.Header>
        </Card.Content>
      </Card>
    </div>
  );
}

export default DisplayCard;

