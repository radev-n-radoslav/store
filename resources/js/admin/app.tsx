import axios from 'axios';
import React, { useState, useEffect } from "react";
import { PageStaticData } from './App.d';
import { HomeScreen } from './components/HomeScreen';

export const App = () => {

    const [pageStatics, setPageStatics] = useState<PageStaticData>();
    
    const getPageStatics = () => {
        axios.get('/admin/page-statics')
            .then((response) => {
                setPageStatics(response.data);
            })
            .catch((error) => {

            });
    };

    useEffect(() => {
        return getPageStatics();
    }, []);
    
    return (
        <>
            {typeof pageStatics != 'undefined' ? (
                <HomeScreen pageStaticData={pageStatics} />
            ): (
                <div></div>
            )}
        </>
    );
};