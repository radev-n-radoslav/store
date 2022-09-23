import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { BlogArticlesCreate } from "../views/Blog/Articles/Create";
import { BlogArticlesDetails } from "../views/Blog/Articles/Details";
import { BlogArticlesEdit } from "../views/Blog/Articles/Edit";
import { BlogArticlesHome } from "../views/Blog/Articles/Home";
import { BlogCategoriesCreate } from "../views/Blog/Categories/Create";
import { BlogCategoriesDetails } from "../views/Blog/Categories/Details";
import { BlogCategoriesEdit } from "../views/Blog/Categories/Edit";
import { BlogCategoriesHome } from "../views/Blog/Categories/Home";
import { CatalogCategoriesCreate } from "../views/Catalog/Categories/Create";
import { CatalogCategoriesDetails } from "../views/Catalog/Categories/Details";
import { CatalogCategoriesEdit } from "../views/Catalog/Categories/Edit";
import { CatalogCategoriesHome } from "../views/Catalog/Categories/Home";
import { CatalogFiltersCreate } from "../views/Catalog/Filters/Create";
import { CatalogFiltersDetails } from "../views/Catalog/Filters/Details";
import { CatalogFiltersEdit } from "../views/Catalog/Filters/Edit";
import { CatalogFiltersHome } from "../views/Catalog/Filters/Home";
import { CatalogProductsCreate } from "../views/Catalog/Products/Create";
import { CatalogProductsDetails } from "../views/Catalog/Products/Details";
import { CatalogProductsEdit } from "../views/Catalog/Products/Edit";
import { CatalogProductsHome } from "../views/Catalog/Products/Home";
import { CatalogRecommendedHome } from "../views/Catalog/Recommended/Home";
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
                    
                    {/* Catalog categories routes */}
                    <Route path="catalog/categories" element={<CatalogCategoriesHome />} />
                    <Route path="catalog/categories/create" element={<CatalogCategoriesCreate />} />
                    <Route path="catalog/categories/details/:id" element={<CatalogCategoriesDetails />} />
                    <Route path="catalog/categories/edit/:id" element={<CatalogCategoriesEdit />} />

                    {/* Catalog products routes */}
                    <Route path="catalog/products" element={<CatalogProductsHome />} />
                    <Route path="catalog/products/create" element={<CatalogProductsCreate />} />
                    <Route path="catalog/products/details/:id" element={<CatalogProductsDetails />} />
                    <Route path="catalog/products/edit/:id" element={<CatalogProductsEdit />} />

                    {/* Catalog filters routes */}
                    <Route path="catalog/filters" element={<CatalogFiltersHome />} />
                    <Route path="catalog/filters/create" element={<CatalogFiltersCreate />} />
                    <Route path="catalog/filters/details/:id" element={<CatalogFiltersDetails />} />
                    <Route path="catalog/filters/edit/:id" element={<CatalogFiltersEdit />} />

                    {/* Catalog recommended products routes */}
                    <Route path="catalog/recommended" element={<CatalogRecommendedHome />} />

                    {/* Sales routes */}

                    {/* Blog categories routes */}
                    <Route path="blog/categories" element={<BlogCategoriesHome />} />
                    <Route path="blog/categories/create" element={<BlogCategoriesCreate />} />
                    <Route path="blog/categories/details/:id" element={<BlogCategoriesDetails />} />
                    <Route path="blog/categories/edit/:id" element={<BlogCategoriesEdit />} />

                    {/* Blog articles routes */}
                    <Route path="blog/articles" element={<BlogArticlesHome />} />
                    <Route path="blog/articles/create" element={<BlogArticlesCreate />} />
                    <Route path="blog/articles/details/:id" element={<BlogArticlesDetails />} />
                    <Route path="blog/articles/edit/:id" element={<BlogArticlesEdit />} />

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