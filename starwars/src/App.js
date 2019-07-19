import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import Cards from "./components/Cards";
import styled from 'styled-components';
import img from './assets/sw-bg.jpg';

const Wrap = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background-image: url(${img});
  // background: red;
  width: 100%;
  background-size: cover;
  text-align: center;
  background-size: contain;
`

const App = () => {
  // Try to think through what state you'll need for this app before starting. Then build out
  // the state properties here.
  const [data, setData] = useState([])

  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    axios.get("https://swapi.co/api/people")
      .then(response => {
        return response.data.results
      })
      .then(response => {
        let dataSet = response;
        dataSet.forEach(item => {
          item['list'] = [];
        })
        dataSet.forEach((item, index) => {
          if (item.starships.length > 0) {
            item.starships.forEach(elem => {
              axios.get(elem)
              .then(response => {
                dataSet[index]['list'].push(response.data.name);
              })
              .catch(error => {
                console.log(error)
              })
            })
        } else {
          item.list = 'n/a';
        }
        });
        setData(dataSet);
      })
      .catch(error => { 
        console.log(error)
      })
  }, [])

  return (
    <Wrap>
      <h1 style={{ paddingTop: "20px", fontSize: "3em"}} className="Header">React Wars</h1>
      <span className="left-btn" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>L</span>
      <span className="page" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>Page 1 of ..</span>
      <span className="right-btn" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>R</span>
      <Cards data={data}/>
      <span className="left-btn" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>L</span>
      <span className="page" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>Page 1 of ..</span>
      <span className="right-btn" style={{fontSize: "1.5em", color: "white", margin: "20px 20px 20px 20px", paddingBottom: "20px"}}>R</span>
    </Wrap>
  );
}

export default App;
