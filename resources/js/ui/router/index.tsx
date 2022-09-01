import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { Home } from '../views/Home';
import { Category } from '../views/Catalog/Category';
import { Product } from '../views/Catalog/Product';
import { BlogCategory } from '../views/Blog/Category';
import { BlogArticle } from '../views/Blog/Article';
import { NoPage } from '../views/NoPage';

export const Router = () => {
    return (
        <>
            <Routes>
                <Route path='/'>
                    <Route index element={<Home />} />
                    <Route path="category/:slug" element={<Category />} />
                    <Route path="product/:slug" element={<Product />} />
                    <Route path="blog">
                        <Route path="category/:slug" element={<BlogCategory />} />
                        <Route path="article/:slug" element={<BlogArticle />} />
                    </Route>
                    <Route path="contacts" element={<Home />} />
                    <Route path="*" element={<NoPage />} />
                </Route>
            </Routes>
        </>
    );
};