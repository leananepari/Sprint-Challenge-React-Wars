import React, { useEffect, useState } from "react";
import axios from 'axios';
import './App.css';
import Cards from "./components/Cards";
import Page from "./components/Page";
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
  const [data, setData] = useState([]);
  const [api, setApi] = useState("https://swapi.co/api/people");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [currentPage, setCurrentPage] = useState('1');
  
  // Fetch characters from the star wars api in an effect hook. Remember, anytime you have a 
  // side effect in a component, you want to think about which state and/or props it should
  // sync up with, if any.
  useEffect(() => {
    axios.get(api)
      .then(response => {
        setNextPageUrl(response.data.next);
        setPreviousPageUrl(response.data.previous)
        setData(response.data.results);
      })
  }, [api])

  function handleLeftClick() {
    if (previousPageUrl !== null) {
      let page = parseInt(currentPage) - 1;
      setApi(previousPageUrl);
      setCurrentPage(page);
    }
  }

  function handleRightClick() {
    if (nextPageUrl !== null) {
      let page = parseInt(currentPage) + 1;
      setApi(nextPageUrl);
      setCurrentPage(page);
    }
  }

  return (
    <Wrap>
      <h1 style={{ paddingTop: "20px", fontSize: "3em"}} className="Header">React Wars</h1>
      <Page currentPage={currentPage} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
      <Cards data={data} api={api} setApi={setApi} />
      <Page currentPage={currentPage} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
    </Wrap>
  );
}

export default App;
