import React, {useEffect, useState} from 'react'
import axios from "axios"

export const useFetch = (url, header) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  useEffect(() => {
    setLoading(true);

    axios.get(url, header)
    .then((response) => {
        setData(response.data)
    })
    .catch((error) =>{
        setError(error)
    })
    .finally(() =>{
        setLoading(false)
    })
  }, [url]);

  const refetch = async () => {
    try {
      const refData = await axios.get(url, header);
      return refData.data
      
    } catch (error) {
      throw error;
    }
  }
  return {data, loading, error, refetch}
}
