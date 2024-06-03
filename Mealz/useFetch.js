
import { useState, useEffect } from "react";

//Trate de hacer un hook genérico para hacer fetch a cualquier url, pero no pude hacer que funcionara

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    
    fetch(url)
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch(error => {
        console.error(error);
      })
      .finally(() => setLoading(false));
  }, []);


  return { data, loading, error};}