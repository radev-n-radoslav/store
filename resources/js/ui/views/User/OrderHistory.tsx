import React, { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingCartIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const orders = [
    {
        number: 'WU88191111',
        date: 'January 22, 2021',
        datetime: '2021-01-22',
        invoiceHref: '#',
        total: '$104.00',
        products: [
            {
                id: 1,
                name: "Men's 3D Glasses Artwork Tee",
                href: '#',
                price: '36.00',
                status: 'Delivered Jan 25, 2021',
                imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-04-product-01.jpg',
                imageAlt: 'Black tee with intersecting red, white, and green curved lines on front.',
            },
            // More products...
        ],
    },
    // More orders...
]

function classNames(...classes: any) {
    return classes.filter(Boolean).join(' ')
}

export const OrderHistory = () => {
    const [open, setOpen] = useState(false)

    return (
        <div className="bg-white">
            <main className="mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8 lg:pb-24">
                <div className="max-w-xl">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Order history</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Check the status of recent orders, manage returns, and download invoices.
                    </p>
                </div>

                <section aria-labelledby="recent-heading" className="mt-16">
                    <h2 id="recent-heading" className="sr-only">
                        Recent orders
                    </h2>

                    <div className="space-y-20">
                        {orders.map((order) => (
                            <div key={order.number}>
                                <h3 className="sr-only">
                                    Order placed on <time dateTime={order.datetime}>{order.date}</time>
                                </h3>

                                <div className="rounded-lg bg-gray-50 py-6 px-4 sm:flex sm:items-center sm:justify-between sm:space-x-6 sm:px-6 lg:space-x-8">
                                    <dl className="flex-auto space-y-6 divide-y divide-gray-200 text-sm text-gray-600 sm:grid sm:grid-cols-3 sm:gap-x-6 sm:space-y-0 sm:divide-y-0 lg:w-1/2 lg:flex-none lg:gap-x-8">
                                        <div className="flex justify-between sm:block">
                                            <dt className="font-medium text-gray-900">Date placed</dt>
                                            <dd className="sm:mt-1">
                                                <time dateTime={order.datetime}>{order.date}</time>
                                            </dd>
                                        </div>
                                        <div className="flex justify-between pt-6 sm:block sm:pt-0">
                                            <dt className="font-medium text-gray-900">Order number</dt>
                                            <dd className="sm:mt-1">{order.number}</dd>
                                        </div>
                                        <div className="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                                            <dt>Total amount</dt>
                                            <dd className="sm:mt-1">{order.total}</dd>
                                        </div>
                                    </dl>
                                    <a
                                        href={order.invoiceHref}
                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                                    >
                                        View Invoice
                                        <span className="sr-only">for order {order.number}</span>
                                    </a>
                                    <a
                                        href={order.invoiceHref}
                                        className="mt-6 flex w-full items-center justify-center rounded-md border border-gray-300 bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto"
                                    >
                                        View Order
                                        <span className="sr-only">for order {order.number}</span>
                                    </a>
                                </div>

                                <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                    <caption className="sr-only">Products</caption>
                                    <thead className="text-left text-sm text-gray-500">
                                        <tr>
                                            <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                                Product
                                            </th>
                                            <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                                Price
                                            </th>
                                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                Quantity
                                            </th>
                                            <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                                Subtotal
                                            </th>
                                            <th scope="col" className="w-0 py-3 text-right font-normal">
                                                Info
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                        {order.products.map((product) => (
                                            <tr key={product.id}>
                                                <td className="py-6 pr-8">
                                                    <div className="flex items-center">
                                                        <img
                                                            src={product.imageSrc}
                                                            alt={product.imageAlt}
                                                            className="mr-6 h-16 w-16 rounded object-cover object-center"
                                                        />
                                                        <div>
                                                            <div className="font-medium text-gray-900">{product.name}</div>
                                                            <div className="mt-1 sm:hidden">${product.price}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">${product.price}</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">{ 2 }</td>
                                                <td className="hidden py-6 pr-8 sm:table-cell">${ 2 * parseFloat(product.price) }</td>
                                                <td className="whitespace-nowrap py-6 text-right font-medium">
                                                    <a href={product.href} className="text-indigo-600">
                                                        View <span className="hidden lg:inline">Product</span>
                                                        <span className="sr-only">, {product.name}</span>
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}
