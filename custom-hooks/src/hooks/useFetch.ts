import {useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export default function useFetch<T>(fetchFunction: () => Promise<T>, defaultValue: T | null = null): [boolean, Error | null, T | null, Dispatch<SetStateAction<T | null>>] { 
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [fetchedData, setFetchedData] = useState<T | null>(defaultValue);

    useEffect(() => {
        const fetchPlaces = async () => {
          setIsFetching(true);
          try {
            const data = await fetchFunction();
            setFetchedData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError(error as Error);
          } finally {
            setIsFetching(false);
          }
        }
        fetchPlaces();
      }, []);

      return [ isFetching, error, fetchedData, setFetchedData ];
}