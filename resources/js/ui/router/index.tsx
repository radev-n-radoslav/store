import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from '../views/Home';
import { NoPage } from '../views/NoPage';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};