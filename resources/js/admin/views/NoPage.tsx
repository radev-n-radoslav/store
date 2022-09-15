/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const links = [
    { title: 'Catalog', description: 'Take a look at our products', href: '/catalog', icon: "fas fa-shopping-cart" },
    { title: 'Blog', description: 'Read about the latest news & guides', href: '/blog', icon: "far fa-newspaper" },
    { title: 'Contacts', description: 'Don\'t hesitate to contact us!', href: '/contacts', icon: "fa fa-wpforms" },
]

export const NoPage = () => {
    return (
        <div className="bg-white">
            <main className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-xl py-16 sm:py-24">
                    <div className="text-center">
                        <p className="text-4xl font-semibold text-indigo-600">404</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                            This page does not exist.
                        </h1>
                        <p className="mt-2 text-lg text-gray-500">The page you are looking for could not be found.</p>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-base font-semibold text-gray-500">Popular pages</h2>
                        <ul role="list" className="mt-4 divide-y divide-gray-200 border-t border-b border-gray-200">
                            {links.map((link, linkIdx) => (
                                <li key={linkIdx} className="relative flex items-start space-x-4 py-6">
                                    <div className="flex-shrink-0">
                                        <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50">
                                            <i className={link.icon + " h-6 w-6 text-indigo-700 text-center fa-lg pt-1"} aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-base font-medium text-gray-900">
                                            <span className="rounded-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2">
                                                <Link to={ link.href } className="focus:outline-none">
                                                    <span className="absolute inset-0" aria-hidden="true" />
                                                    {link.title}
                                                </Link>
                                            </span>
                                        </h3>
                                        <p className="text-base text-gray-500">{link.description}</p>
                                    </div>
                                    <div className="flex-shrink-0 self-center">
                                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8">
                            <Link to="/" className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                                Or go back home
                                <span aria-hidden="true"> &rarr;</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
