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
                    <Route path="category/:slug" element={<Home />} />
                    <Route path="product/:slug" element={<Home />} />
                    <Route path="blog" element={<Home />}>
                        <Route path="category/:slug" element={<Home />} />
                        <Route path="article/:slug" element={<Home />} />
                    </Route>
                    <Route path="contacts" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};