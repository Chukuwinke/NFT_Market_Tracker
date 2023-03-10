import { useState, useEffect, useRef} from 'react'
import './App.css'
//import Countdown from './experiments/Countdown'
//import { useFetch} from './hooks/useFetch'
import axios from "axios"


function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  //https://eth-mainnet.g.alchemy.com/nft/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd/getFloorPrice?
  //https://eth-mainnet.alchemyapi.io/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd

  // YOU CAN CHANGE THE toBlock VALUES TO FETCH NFTS AT DIFFERENT TIMES
  let options = {params:{owner:"0xd07dc4262BCDbf85190C01c996b4C06a461d2430", fromBlock: 0, toBlock: '4071942',}, headers:{accept: 'application/json'}};
  const endpoint = `https://eth-mainnet.g.alchemy.com/nft/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd/getNFTSales`;

  useEffect(() =>{
    getData();
    const interval = setInterval(() =>{
      getData();
      
    }, 1000 * 60)

    return () => clearInterval(interval);
  })

  const getData = async() => {
    const respose = await axios.get(endpoint, options);
    setData(respose.data)
    
  }

  // =================== CONVERT BLOCK TO DATE TIME AND VICE VERSA (BEGIN) ================== ///
  const blockTimestamp = (_block) => {
    const timestamp = (_block - 15) + 1438269988
    const date = new Date(timestamp * 1000).toISOString();
    return date;
  }
 
  const getBlockNumberFromDate = (date) => {
    const genesisTimestamp = 0; // timestamp of the Ethereum genesis block 1438269988
    const blockTime = 15; // average block time in seconds
    const secondsSinceGenesis = Math.floor((date.getTime() / 1000) - genesisTimestamp);
    const blockNumber = Math.floor(secondsSinceGenesis / blockTime);
    return blockNumber;
  }

   //console.log( blockTimestamp(30751669))
  const currentDate = new Date()
  const targetDate = new Date(currentDate.getTime() - (41629 * 60 * 60 * 1000));
  console.log(targetDate)

  // convert block to date time
  //console.log(blockTimestamp(97156856)) //101905756

  // convert date time to block 
  //console.log( getBlockNumberFromDate(targetDate))
  
  
  //console.log(currentDate)

  // =================== CONVERT BLOCK TO DATE TIME AND VICE VERSA (END) ================== ///
  
  console.log(data)
  return (
    <div className="App">
      {/* <Countdown/> */}
      <button onClick={() => reset(_1min)} >1m</button>
      <button onClick={() => reset(_5min)}>5m</button>
      <button onClick={() => reset(_15min)}>15m</button>
      <button onClick={() => reset(_30min)}>30m</button>
      <button onClick={() => reset(_1hr)}>1h</button>
      <button onClick={() => reset(_12hr)}>12h</button>
      <button onClick={() => reset(_1d)}>1d</button>
      <h1> NFT-Tracker App  </h1>
    </div>
  )
}

export default App

// GET DATE BY DAYS DIDNT WORK!!!!
// const today = new Date(); // current date
// const yesterday = new Date(today);
// yesterday.setDate(today.getDate() - 2920); // set yesterday's date by subtracting 1 day from today's date

//TIME ENDPOINT TESTED DIDNT WORK!!!
//const timeEndpoint =`https://eth-mainnet.g.alchemy.com/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd/blocks/by_time`
//let options2 = {params:{ datetime: datetime,}, headers:{accept: 'application/json'}};

// THEN PROMISE LOGIC FOR GETDATA FUNC
    // axios.get(endpoint, params2)
    // .then((response) => {
    //     setData(response.data)
    // })
    // .catch((error) =>{
    //     setError(error)
    // })
    // .finally(() =>{
    //     setLoading(false)
    // })

 // CONVERT BLOCK TO TIMESTAMP
  // const blockTimestamp = (_block) => {
  //   const timestamp = (_block - 15) + 1438269988
  //   const date = new Date(timestamp * 1000).toISOString();
  //   return date;
  // }

//let options = {method: 'GET', headers:{accept: 'application/json'}};
//   let {data, loading, error, refetch} = useFetch('https://eth-mainnet.g.alchemy.com/nft/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd/getFloorPrice?contractAddress=0xe785e82358879f061bc3dcac6f0444462d4b5330',options );

//   const _1min = 60;
//   const _5min = _1min * 5;
//   const _15min = _5min * 3;
//   const _30min = _15min * 2;
//   const _1hr = _30min * 2;
//   const _12hr = _1hr *12;
//   const _1d = _12hr* 2;

//   const [seconds, setSeconds] = useState(0);
//   const [max, setMax] = useState(_1min);
//   const [rawData, setRawData] = useState({});
  
//  // timer functionality
//   useEffect(() => {
//     setRawData(data)
//     const interval = setInterval(() => {
//       setSeconds(seconds => seconds + 1);
//     }, 1000);
//     return () => clearInterval(interval);

//     // i found a hack by adding the data as a dependecy to the useffect 
//     //the the component re-renders and sets the raw data state
//   }, [data]);
  

//   // check if max has been reached if true refetch data and reset timer automatically
  
//   const refetchTrigger = async () =>{
//     if(seconds == max){
//       console.log(`${max} Reached`)
//       const newdata = await refetch()
//       setSeconds(prev => prev = 0)

//       // (!!) i added "refetched" string for debug purposes
//       setRawData(prev => prev = {"refetched":newdata})
//       //console.log(newdata)
//     }
    
//   }

//   // Reset the  timer 
//   const reset = (time) =>{
//     setSeconds(0)
//     setMax(prev => prev = time)
//   }
  
//   refetchTrigger()
//   console.log(seconds)
//   console.log(rawData)