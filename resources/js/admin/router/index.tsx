import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from '../views/Dashboard';
import { NoPage } from '../views/NoPage';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/'>
                    <Route index element={<Dashboard />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};