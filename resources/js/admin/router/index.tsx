import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Dashboard } from '../views/Dashboard';
import { NoPage } from '../views/NoPage';
import { AdminsCreate } from "../views/Users/Admins/Create";
import { AdminDetails } from "../views/Users/Admins/Details";
import { AdminsEdit } from "../views/Users/Admins/Edit";
import { AdminsHome } from "../views/Users/Admins/Home";
import { CustomerCreate } from "../views/Users/Customers/Create";
import { CustomerDetails } from "../views/Users/Customers/Details";
import { CustomerEdit } from "../views/Users/Customers/Edit";
import { CustomersHome } from "../views/Users/Customers/Home";

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/admin'>
                    {/* Dashboard routes */}
                    <Route index element={<Dashboard />} />

                    {/* Admins routes */}
                    <Route path="admins" element={<AdminsHome />} />
                    <Route path="admins/create" element={<AdminsCreate />} />
                    <Route path="admins/details/:id" element={<AdminDetails />} />
                    <Route path="admins/edit/:id" element={<AdminsEdit />} />

                    {/* Customers routes */}
                    <Route path="customers" element={<CustomersHome />} />
                    <Route path="customers/create" element={<CustomerCreate />} />
                    <Route path="customers/details/:id" element={<CustomerDetails />} />
                    <Route path="customers/edit/:id" element={<CustomerEdit />} />

                    {/* Other routes */}
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};