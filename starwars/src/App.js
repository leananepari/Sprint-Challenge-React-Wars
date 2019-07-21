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
  const [currentPage, setCurrentPage] = useState('1');
  const [starships, setStarships] = useState({});

  const [dataNext, setDataNext] = useState();
  const [dataArr, setDataArray] = useState([]);

  useEffect(() => {
    axios.get(api)
      .then(response => {
        setStarships({});
        setData(response.data.results);

        response.data.results.forEach(item => {
          if (item.starships.length > 0) {
            getStarships(item.starships, item, response, item.starships.length);
          }
        })
        return response.data.next;
      })
      .then(next => {
        axios.get(next)
        .then(response => {
          setNextPageUrl(response.data.next);
          setDataNext(response.data.results);

        }) 
      })

      function getStarships(arr, item) {
        let length = 0;
        let names = [];
        arr.forEach(url => {
              axios.get(url)
              .then(res => {
                names.push(res.data.name);
                length = length + 1;
                if (length === arr.length) {
                  setStarships((starships) => {
                  return {...starships, [item.name]: names}
                })
                }
              })
        })
      }
  }, [api])

  function getNextPage(url) {
    axios.get(url)
    .then(response => {
      if (response.data.next !== null) {
        setNextPageUrl(response.data.next);
      }
      setDataNext(response.data.results);
    })
  }
  
  function handleLeftClick() {
    if (currentPage > 1) {
      let page = parseInt(currentPage) - 1;
      setCurrentPage(page);
      if (!dataArr[page]) {
        setDataArray(dataArr.concat([data]));
      }
      setData(dataArr[page - 1]);
    }
  }

  function handleRightClick() {
    if (currentPage < 9) {
      let page = parseInt(currentPage) + 1;
      setCurrentPage(page);
      if (dataArr[page - 1]) {
        setData(dataArr[page - 1]);
      } else if (!dataArr[page - 2]){
        setDataArray(dataArr.concat([data]));
        setData(dataNext);
        getNextPage(nextPageUrl);
      } else {
        setData(dataNext);
        getNextPage(nextPageUrl);
      }
    }
  }
  if (data.length > 0) {
  return (
    <Wrap>
      <h1 style={{ paddingTop: "20px", fontSize: "3em"}} className="Header">React Wars</h1>
      <Page currentPage={currentPage} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
      <Cards data={data} api={api} setApi={setApi}  starships={starships}/>
      <Page currentPage={currentPage} handleLeftClick={handleLeftClick} handleRightClick={handleRightClick}/>
    </Wrap>
  );
  } else {
    return (
      <div>Loading...</div>
    )
  }
}

export default App;
