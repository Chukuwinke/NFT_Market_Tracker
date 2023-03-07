import { useState, useEffect, useRef} from 'react'
import './App.css'
//import Countdown from './experiments/Countdown'
import { useFetch} from './hooks/useFetch'


function App() {
  let options = {method: 'GET', headers:{accept: 'application/json'}};
  let {data, loading, error, refetch} = useFetch('https://eth-mainnet.g.alchemy.com/nft/v2/D4u45LCppcFSzBvo01hYXe5W_pBrOtOd/getFloorPrice?contractAddress=0xe785e82358879f061bc3dcac6f0444462d4b5330',options );

  const _1min = 60;
  const _5min = _1min * 5;
  const _15min = _5min * 3;
  const _30min = _15min * 2;
  const _1hr = _30min * 2;
  const _12hr = _1hr *12;
  const _1d = _12hr* 2;

  const [seconds, setSeconds] = useState(0);
  const [max, setMax] = useState(_1min);
  const [rawData, setRawData] = useState({});
  
 // timer functionality
  useEffect(() => {
    setRawData(data)
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);

    // i found a hack by adding the data as a dependecy to the useffect 
    //the the component re-renders and sets the raw data state
  }, [data]);
  

  // check if max has been reached if true refetch data and reset timer automatically
  
  const refetchTrigger = async () =>{
    if(seconds == max){
      console.log(`${max} Reached`)
      const newdata = await refetch()
      setSeconds(prev => prev = 0)

      // (!!) i added "refetched" string for debug purposes
      setRawData(prev => prev = {"refetched":newdata})
      //console.log(newdata)
    }
    
  }

  // Reset the  timer 
  const reset = (time) =>{
    setSeconds(0)
    setMax(prev => prev = time)
  }
  
  refetchTrigger()
  console.log(seconds)
  console.log(rawData)
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
