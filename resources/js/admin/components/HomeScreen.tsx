import React, { Fragment, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3CenterLeftIcon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Navigation, NavigationSubPage, PageStaticData } from '../App.d';
import { Router } from '../router/index';
import { Link } from "react-router-dom";
import { useClassNames } from '../helpers/styleHelpers';

export const HomeScreen = (props: any) => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [pageStaticData, setPageStaticData] = useState<PageStaticData>(props.pageStaticData);

    return (
        <>
            <div className="min-h-full">
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-40 lg:hidden" onClose={setSidebarOpen}>
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-linear duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-linear duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                        </Transition.Child>

                        <div className="fixed inset-0 z-40 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transition ease-in-out duration-300 transform"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transition ease-in-out duration-300 transform"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-cyan-700 pt-5 pb-4">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                                            <button
                                                type="button"
                                                className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="flex flex-shrink-0 items-center px-4">
                                        <img
                                            className="h-8 w-auto"
                                            src={pageStaticData.logo}
                                            alt="Logo"
                                        />
                                    </div>
                                    <nav
                                        className="mt-5 h-full flex-shrink-0 divide-y-2 divide-cyan-800 overflow-y-auto"
                                        aria-label="Sidebar"
                                    >
                                        {pageStaticData.navigation.map((item: Navigation) => {
                                            return (
                                                <div key={(item.name + '-mobile')}>
                                                    <div>
                                                        {
                                                            item.href ? 
                                                            <div className="space-y-1 px-2">
                                                                <Link
                                                                    to={(item.href ?? '#')}
                                                                    className={useClassNames(
                                                                        item.current
                                                                            ? 'bg-cyan-800 text-white'
                                                                            : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                                        'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                                                                    )}
                                                                    aria-current={item.current ? 'page' : undefined}
                                                                >
                                                                    <i className={item.icon + " mr-4 fa-lg flex-shrink-0 text-cyan-200"} aria-hidden="true"></i>
                                                                    {item.name}
                                                                </Link>
                                                            </div> : 
                                                            <div className="space-y-1 px-2">
                                                                <div className="p-2 text-base leading-6 font-bold text-white text-center pt-3">
                                                                    <i className={item.icon + " mr-4 fa-sm flex-shrink-0"} aria-hidden="true"></i> {item.name}
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                    {
                                                        item.pages.map((page) => {
                                                            return (
                                                                <div className="pt-3" key={page.name + '-mobile-subpage'}>
                                                                    <div className="space-y-1 px-2">
                                                                        <Link
                                                                            to={page.href}
                                                                            className={useClassNames(
                                                                                page.current
                                                                                    ? 'bg-cyan-800 text-white'
                                                                                    : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                                                'group flex pages-center px-2 py-2 text-base font-medium rounded-md'
                                                                            )}
                                                                            aria-current={page.current ? 'page' : undefined}
                                                                        >
                                                                            <i className={page.icon + " mr-4 fa-lg flex-shrink-0 text-cyan-200"} aria-hidden="true"></i>
                                                                            {page.name}
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            )
                                        })}
                                    </nav>
                                </Dialog.Panel>
                            </Transition.Child>
                            <div className="w-14 flex-shrink-0" aria-hidden="true">
                                {/* Dummy element to force sidebar to shrink to fit close icon */}
                            </div>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop */}
                <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-grow flex-col overflow-y-auto bg-cyan-700 pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                            <img
                                className="h-8 w-auto"
                                src={pageStaticData.logo}
                                alt="Logo"
                            />
                        </div>
                        <nav className="mt-5 flex flex-1 flex-col divide-y divide-cyan-800 overflow-y-auto" aria-label="Sidebar">
                            {pageStaticData.navigation.map((item: Navigation, index: number) => {
                                return (
                                    <div key={item.name}>
                                        <div>
                                            {
                                                item.href ? 
                                                <div className="space-y-1 px-2">
                                                    <Link
                                                        to={(item.href ?? '')}
                                                        className={useClassNames(
                                                            item.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                            'group flex items-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                                        )}
                                                        aria-current={item.current ? 'page' : undefined}
                                                    >
                                                        <i className={item.icon + " mr-4 fa-lg flex-shrink-0 text-cyan-200"} aria-hidden="true"></i>
                                                        {item.name}
                                                    </Link>
                                                </div> :
                                                <div className="space-y-1 px-2">
                                                    <div className="p-2 text-base leading-6 font-bold text-white text-center pt-3">
                                                        <i className={item.icon + " mr-4 fa-sm flex-shrink-0"} aria-hidden="true"></i> {item.name}
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        {
                                            pageStaticData.navigation[index].pages.map((page: NavigationSubPage) => {
                                                return (
                                                    <div className="pt-3" key={page.name + '-subpage'}>
                                                        <div className="space-y-1 px-2">
                                                            <Link
                                                                to={(page.href ?? '')}
                                                                className={useClassNames(
                                                                    page.current ? 'bg-cyan-800 text-white' : 'text-cyan-100 hover:text-white hover:bg-cyan-600',
                                                                    'group flex pages-center px-2 py-2 text-sm leading-6 font-medium rounded-md'
                                                                )}
                                                                aria-current={page.current ? 'page' : undefined}
                                                            >
                                                                <i className={page.icon + " mr-4 fa-lg flex-shrink-0 text-cyan-200"} aria-hidden="true"></i>
                                                                {page.name}
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            })}
                        </nav>
                    </div>
                </div>

                <div className="flex flex-1 flex-col lg:pl-64">
                    <div className="flex h-16 flex-shrink-0 border-b border-gray-200 bg-white lg:border-none">
                        <button
                            type="button"
                            className="border-r border-gray-200 px-4 text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3CenterLeftIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                        {/* Search bar */}
                        <div className="flex flex-1 justify-between px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
                            <div className="flex flex-1">
                                <form className="flex w-full md:ml-0" action="#" method="GET">
                                    <label htmlFor="search-field" className="sr-only">
                                        Search
                                    </label>
                                    <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                                            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <input
                                            id="search-field"
                                            name="search-field"
                                            className="block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                            placeholder="Search transactions"
                                            type="search"
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <button
                                    type="button"
                                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                                </button>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <div>
                                        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 lg:rounded-md lg:p-2 lg:hover:bg-gray-50">
                                            <i className="far fa-user-circle fa-2x"></i>
                                            <span className="ml-3 hidden text-sm font-medium text-gray-700 lg:block">
                                                <span className="sr-only">Open user menu for </span>Emilia Birch
                                            </span>
                                            <ChevronDownIcon
                                                className="ml-1 hidden h-5 w-5 flex-shrink-0 text-gray-400 lg:block"
                                                aria-hidden="true"
                                            />
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <Link
                                                        to="#"
                                                        className={useClassNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                    >
                                                        Logout
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6">
                        <Router />
                    </div>
                </div>
            </div>
        </>
    )
}
