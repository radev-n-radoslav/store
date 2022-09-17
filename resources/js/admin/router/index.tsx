import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from '../views/Dashboard';
import { NoPage } from '../views/NoPage';
import { CustomerCreate } from "../views/Users/Customers/Create";
import { CustomerDetails } from "../views/Users/Customers/Details";
import { CustomerEdit } from "../views/Users/Customers/Edit";
import { CustomersHome } from "../views/Users/Customers/Home";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/admin'>
                    <Route index element={<Dashboard />} />
                    <Route path="customers" element={<CustomersHome />} />
                    <Route path="customers/create" element={<CustomerCreate />} />
                    <Route path="customers/details/:id" element={<CustomerDetails />} />
                    <Route path="customers/edit/:id" element={<CustomerEdit />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};