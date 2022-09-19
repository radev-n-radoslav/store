import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom'; 

export const useCurrentQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    return {
        params: Object.fromEntries(new URLSearchParams('?' + searchParams.toString()))
    };
}

export const useCurrentQueryChanged = (callback: () => void) => {
    const [searchParams, setSearchParams] = useSearchParams();

    return useEffect(() => {
        callback();
    }, [searchParams]);
}