import { useEffect, useState } from 'react';

function getRandomAlphabet(): string {
  const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex = Math.floor(Math.random() * alphabets.length);
  return alphabets[randomIndex];
}


export const FetchInitialData = async () => {
  try {
    const char =  getRandomAlphabet()
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    const data = await req.json()
    return data
  } catch (error) {
    console.log(error)
  }
}


export const useFetchByName = (text: string, delay = 100) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      const fetchData = async () => {
        if (text.length > 0) {
          setLoading(true);
          try {
            const req = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`);
            const res = await req.json();
            if (res.meals === "no data found") {
              console.log("nothing found")
              return []
            }

            setResults(res.meals || []);
          } catch (error) {
            console.error(error);
            setResults([]);
          } finally {
            setLoading(false);
          }
        } else {
          setResults([]);
        }
      };

      fetchData();
    }, delay);

    return () => clearTimeout(handler);
  }, [text]);

  return { results, loading };
};


export const GetDetails = async (id: number) => {
  try {
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    const res = await req.json();
    return res.meals;
  } catch (error) {
    console.error(error);
    return [];
  }
};


