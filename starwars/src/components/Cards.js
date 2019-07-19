import React from "react";
import DisplayCard from "./DisplayCard";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
`

const Cards = ({ data }) => {

  return (
    <Container>
    { data.map((item, index) => {
      return <DisplayCard key={index} name={item.name} gender={item.gender} height={item.height} 
                          hairColor={item.hair_color} starships={item.list} />
    })}
    </Container>
  );
}

export default Cards;