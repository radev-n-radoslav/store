import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

export interface PaginationData {
    currentPage: number,
    lastPage: number,
    from: number,
    to: number,
    perPage: number,
    total: number,
    firstPageUrl: string,
    lastPageUrl: string,
    nextPageUrl: string | null,
    prevPageUrl: string | null,
    path: string
}

export const Pagination = (props: any) => {
    const [data, setData] = useState<PaginationData>(props.data);
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    
    // Feed the initial data needed for rendering
    useEffect(() => {
        if(data?.currentPage == undefined){
            setData(props.data);
        }else{
            return;
        }
    });

    // Watch props update
    useEffect(() => {
        setData(props.data);
    }, [props]);

    // Set pagination buttons
    const getButtons = () => {
        let neededCount = data?.total / data?.perPage;
        let roundedCount = Math.round(neededCount);
        neededCount = (roundedCount < neededCount ? roundedCount + 1 : roundedCount);
        let buttons = new Array<[number, string]>();
        
        for (let index = 0; index < neededCount; index++) {
            searchParams.set('page', String(index + 1));
            buttons.push([
                index + 1,
                searchParams.toString()
            ]);
        }

        return buttons;
    }

    return (
        <>
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <Link
                        to={String(data?.prevPageUrl)}
                        className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Previous
                    </Link>
                    <Link
                        to={String(data?.nextPageUrl)}
                        className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                    >
                        Next
                    </Link>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{data?.from}</span> to <span className="font-medium">{ data?.to }</span> of{' '}
                            <span className="font-medium">{data?.total}</span> results
                        </p>
                    </div>
                    <div>
                        <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                            <Link
                                to={String(data?.prevPageUrl)}
                                className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Previous</span>
                                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                            </Link>
                            {
                                getButtons().map((element, index) => {
                                    return (
                                        <Link
                                            key={index + 1}
                                            to={location.pathname + '?' + element[1]}
                                            className={"relative inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20" + (data.currentPage == index + 1 ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50')}
                                        >
                                            {element[0]}
                                        </Link>
                                    );
                                })
                            }
                            <Link
                                to={String(data?.nextPageUrl)}
                                className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            >
                                <span className="sr-only">Next</span>
                                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    );
}