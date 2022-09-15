import axios from 'axios';
import React, { useState, useEffect } from "react";
import { Router } from './router/index';
import { PageStaticData } from './App.d';
import { Navbar } from './components/Navbar/Navbar';

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
        getPageStatics();
    });

    return (
        <>
            {typeof pageStatics != 'undefined' ? (
                // <Navbar logo={pageStatics?.logo} footer={pageStatics?.footer}/>
                <Navbar />
            ): (
                <div></div>
            )}
            <Router />
            {typeof pageStatics != 'undefined' ? (
                <div></div>
                // <Footer logo={pageStatics?.logo} footer={pageStatics?.footer}/>
            ): (
                <div></div>
            )}
        </>
    );
};