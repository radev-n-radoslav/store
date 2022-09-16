import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from '../views/Dashboard';
import { NoPage } from '../views/NoPage';
import { CustomersHome } from "../views/Users/Customers/Home";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/admin'>
                    <Route index element={<Dashboard />} />
                    <Route path="customers" element={<CustomersHome />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};