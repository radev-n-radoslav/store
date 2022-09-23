import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Category } from './Category';
import { Pagination, PaginationData } from '../../../partials/Pagination';
import { useCurrentQueryChanged, useCurrentQueryParams } from '../../../helpers/urlHelpers';
import { PageHeadingSimple } from '../../../components/PageHeading';
import { Sort } from '../../../partials/Sort';

export const BlogCategoriesHome = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState<PaginationData>();
    const urlQuery = useCurrentQueryParams();
    
    const fetchCategories = () => {
        axios.get('/admin/v1/blog/categories', urlQuery)
            .then((response) => {
                let responseData = response.data.data;
                setPagination({
                    currentPage: responseData.current_page,
                    lastPage: responseData.last_page,
                    from: responseData.from,
                    to: responseData.to,
                    perPage: responseData.per_page,
                    total: responseData.total,
                    firstPageUrl: responseData.first_page_url,
                    lastPageUrl: responseData.last_page_url,
                    nextPageUrl: responseData.next_page_url,
                    prevPageUrl: responseData.prev_page_url,
                    path: responseData.path
                });
                setCategories(responseData.data);
            })
            .catch((errors) => {

            });
    }

    // On component mount
    useEffect(() => {
        fetchCategories();
    }, []);

    // Watch if any query params change and update page
    useCurrentQueryChanged(() => {
        fetchCategories();
    });

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <PageHeadingSimple
                title="Categories"
                description="A list of all categories"
                actions={
                    (
                        <Link to='/admin/blog/categories/create'>
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                            >
                                Add category
                            </button>
                        </Link>
                    )
                }
            />
            <div className="pt-4">
                <Sort
                    title="Order by"
                    queryParam="sort"
                    options={[
                        {
                            name: "Last created",
                            queryVal: "desc"
                        },
                        {
                            name: "First created",
                            queryVal: 'asc'
                        }
                    ]}
                />
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Thumbnail
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Description
                                        </th>
                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Action</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {categories.map((category) => (
                                        <tr key={category.name}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <img 
                                                        src={category.thumbnail_url} 
                                                        className="max-w-full max-h-16"
                                                        alt="Category thumbnail" 
                                                    />
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                <div className="flex items-center">
                                                    <div className="font-medium text-gray-900">{category.name}</div>
                                                </div>
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">
                                                    {category.description?.substring(0, 40) + '...'}
                                                </div>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6 space-x-3">
                                                <Link to={"/admin/blog/categories/details/" + category.id} className="text-indigo-600 hover:text-indigo-900">
                                                    <i className="fa fa-eye text-blue-600"></i> Details<span className="sr-only">, {category.name}</span>
                                                </Link>
                                                <Link to={"/admin/blog/categories/edit/" + category.id} className="text-indigo-600 hover:text-indigo-900">
                                                    <i className="fa fa-edit text-green-600"></i> Edit<span className="sr-only">, {category.name}</span>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination data={pagination} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
    