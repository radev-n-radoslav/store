import axios from 'axios';
import { PageStaticData } from './App.d';
import React, { useState, useEffect } from "react";

export const App = () => {

    const [pageStatics, setPageStatics] = useState<PageStaticData[]>([]);

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
        <div>
            <h1>Users list</h1>
            
        </div>
    );
};