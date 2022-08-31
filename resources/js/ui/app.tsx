import axios from 'axios';
import { PageStaticData } from './App.d';
import React, { useState, useEffect } from "react";

import { Router } from './router/index';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';

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
                <Navbar logo={pageStatics?.logo} footer={pageStatics?.footer}/>
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