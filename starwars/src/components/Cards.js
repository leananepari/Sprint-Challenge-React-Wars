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

const Cards = ({ data, starships }) => {
  
  return (
    <Container>
      { data.map((item, index) => {
        if (Object.keys(starships).length > 0) {
 
          return <DisplayCard key={index} name={item.name} gender={item.gender} height={item.height} 
                              hairColor={item.hair_color} starships={starships[item.name] ? starships[item.name].join(', ') : 'n/a'}/>
        } 
      }) }
    </Container>

  );
}

export default Cards;