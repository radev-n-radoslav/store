import axios from 'axios';
import { PageStaticData } from './App.d';
import React, { useState, useEffect } from "react";

import { Router } from './router/index';
import { Footer } from './components/Footer/Footer';

export const App = () => {

    const [pageStatics, setPageStatics] = useState<PageStaticData>();
    
    const getPageStatics = () => {
        axios.get('/api/page-statics')
            .then((response) => {
                setPageStatics(response.data);
            })
            .catch((error) => {

            });
    };

    useEffect(() => {
        getPageStatics();
    });

    return (
        <>
            {typeof pageStatics != 'undefined' ? (
                <div>navbar</div>
            ): (
                <div></div>
            )}
            <Router />
            {typeof pageStatics != 'undefined' ? (
                <Footer logo={pageStatics?.logo} footer={pageStatics?.footer}/>
            ): (
                <div></div>
            )}
        </>
    );
};