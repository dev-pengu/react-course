import { useCallback, useEffect, useState} from 'react';

const sendHttpRequest = async (url: string, config?: RequestInit) => {
    const resp = await fetch(url, config);
    const respData = await resp.json();
    if (!resp.ok) {
        throw new Error(respData.message || 'Something went wrong, failed to send request.');
    }

    return respData;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useFetch<T>(url: string, defaultValue: T | null = null, config?: RequestInit): [T | null, boolean, Error | null, (data?: any) => Promise<void>, () => void] { 
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [fetchedData, setFetchedData] = useState<T | null>(defaultValue);

    const clearData = () => setFetchedData(defaultValue);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sendRequest = useCallback(async (data?: any) => {
        setIsFetching(true);
        try {
            const respData = await sendHttpRequest(url, {...config, body: data ? JSON.stringify(data) : null});
            setFetchedData(respData);
        } catch (error) {
            setError(error as Error);
        }
        setIsFetching(false);
    }, [url, config])

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            sendRequest();
        }
    }, [sendRequest, config]);

    return [fetchedData, isFetching, error, sendRequest, clearData];
}