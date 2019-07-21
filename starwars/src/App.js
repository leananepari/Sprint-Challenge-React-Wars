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
  const [starships, setStarships] = useState({});

  useEffect(() => {
    axios.get(api)
      .then(response => {
        setStarships({});
        let length = 0;
        response.data.results.forEach(item => {
          length = length + 1;
          if (item.starships.length > 0) {
            getStarships(item.starships, item, response);
          }
        })
        if (length === response.data.results.length ) {
          return response;
        }
      }) 
      .then(response => {
        setNextPageUrl(response.data.next);
        setPreviousPageUrl(response.data.previous)
        setData(response.data.results)
      })  

      function getStarships(arr, item) {
        arr.forEach(url => {
              axios.get(url)
              .then(res => {
                let name = res.data.name;
                setStarships((starships) => {
                  return {...starships, [item.name]: starships[item.name] ? starships[item.name].concat(name) : [name]}
                })
              })
        })
      }
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
      <Cards data={data} api={api} setApi={setApi}  starships={starships}/>
      <Page currentPage={currentPage} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
    </Wrap>
  );
}

export default App;
