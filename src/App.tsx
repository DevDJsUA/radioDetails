import React, { useEffect, useState, useCallback } from 'react';

import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Product } from './components/product';
import { ITable } from './interfaces/itable';
function App() {

  //setTheArray(prevArray => [...prevArray, newValue])
  // const [data, setData] = useState<Array<any>>([])
  const [parsedData, setParsedData] = useState<Array<ITable>>([])
  const [loading, setLoading] = useState<boolean>(false)


  const dataParse = useCallback((data: Array<any>) => {
    // let dataObj: ITable = {prodName: "", photo: "", price: "", description: ""};
    let steps = 1;
    let dataList: Array<ITable> = [];
    // data.map(x => {
      
    // })
    console.log(data)
    data.forEach(x => {
      console.log("!")
      console.log(x.content.$t)
      if (steps === 1) {
        dataList.push({ prodName: "", photo: "", price: "", description: "" })
        dataList[dataList.length - 1].prodName = x.content.$t;
        // dataObj.prodName = x.content.$t;
      }
      else if (steps === 2) {
        dataList[dataList.length - 1].price = x.content.$t;
        // dataObj.price = x.content.$t;
      }
      else if (steps === 3) {
        dataList[dataList.length - 1].photo = x.content.$t;
        // dataObj.photo = x.content.$t;
      }
      else if (steps === 4) {
        dataList[dataList.length - 1].description = x.content.$t;
        // dataObj.description = x.content.$t;
        steps = 0;
        // dataList.push(dataObj);
      }
      steps++;
    });

    setParsedData(dataList)
    console.log(dataList)
    setLoading(true)
  }, []);


  useEffect(() => {
    axios.get('https://spreadsheets.google.com/feeds/cells/1iMAJCqnRRc0QURrIAYTBy-hGh7JCf5BzEjSfTMvSHtk/od6/public/basic?alt=json')
      .then(res => {
        const _data = res.data;
        // setData(_data.feed.entry);
        console.log(_data.feed.entry)
        dataParse(_data.feed.entry)
        
        // console.log(_parsedData)
        
      })


  }, [])

  if (loading === false) {
    return (
      <div>Loading!</div>
    )
  }
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src="https://i.imgur.com/TYY6QIq.jpeg" /> */}
        <p>"ПРАЙСЛИСТ"</p>
        
        
        {parsedData.map(prod => <Product prodName={prod.prodName} price={prod.price} description={prod.description} photo={prod.photo} />)}
        
      </header>
    </div>
  );
}

function dataParser(data: Array<any>): Array<ITable> {
  // let dataObj: ITable = {prodName: "", photo: "", price: "", description: ""};
  let steps = 1;
  let dataList: Array<ITable> = [];
  data.map(x => {
    console.log(x.content.$t)
    if (steps === 1) {
      dataList.push({ prodName: "", photo: "", price: "", description: "" })
      dataList[dataList.length - 1].prodName = x.content.$t;
      // dataObj.prodName = x.content.$t;
    }
    else if (steps === 2) {
      dataList[dataList.length - 1].price = x.content.$t;
      // dataObj.price = x.content.$t;
    }
    else if (steps === 3) {
      dataList[dataList.length - 1].photo = x.content.$t;
      // dataObj.photo = x.content.$t;
    }
    else if (steps === 4) {
      dataList[dataList.length - 1].description = x.content.$t;
      // dataObj.description = x.content.$t;
      steps = 0;
      // dataList.push(dataObj);
    }
    steps++;
  })

  return dataList;
}





export default App;
