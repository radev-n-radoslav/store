import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Category } from './Category';
import { PageHeading } from '../../../components/PageHeading';
import { DescriptionList, DescriptionListRows } from '../../../components/DescriptionList';

export const BlogCategoriesDetails = (props: any) => {
    const categoryId = useParams().id;
    const [categoryData, setCategoryData] = useState<Category>();
    const navigate = useNavigate();
    
    const fetchCategoryDetails = () => {
        axios.get('/admin/blg/categories/details/' + categoryId)
            .then((response) => {
                setCategoryData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const formatCategoryDetails = () => {
        let rows: DescriptionListRows[] = [
            {
                title: 'Thumbnail URL',
                content: categoryData?.thumbnail_url
            },
            {
                title: 'Title',
                content: categoryData?.name
            },
            {
                title: 'Content',
                content: categoryData?.description
            },
            {
                title: 'Created at',
                content: categoryData?.created_at
            },
            {
                title: 'Last updated at',
                content: categoryData?.updated_at
            }
        ];

        if (categoryData?.deleted_at != null) {
            rows.push(
                {
                    title: 'Disabled at',
                    content: categoryData?.deleted_at
                }
            );
        }

        return rows;
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const disableCategory = () => {
        axios.delete('/admin/blg/categories/delete/' + categoryId)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/admin/blog/categories');
                }
            })
            .catch((error) => {

            });
    };

    const enableCategory = () => {
        axios.post('/admin/blg/categories/restore/' + categoryId)
            .then((response) => {
                if(response.status == 200){
                    navigate(0);
                }
            })
            .catch((error) => {

            });
    }

    const renderActions = () => {
        return (
            <>
                <Link to={'/admin/categories/edit/' + categoryId}>
                    <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                        <i className="fa fa-edit pr-4"></i> Edit
                    </button>
                </Link>
                {
                    !categoryData?.deleted_at ? 
                        <button onClick={() => disableCategory()} className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                            <i className="fa fa-trash pr-4"></i> Delete
                        </button>
                    :
                    <button onClick={() => enableCategory()} className="inline-flex items-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-3 w-full rounded ml-4">
                        <i className="fas fa-redo pr-4"></i> Restore
                    </button>
                }
            </>
        );
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Category details" actions={renderActions()}/>
                <DescriptionList
                    title="Category information"
                    description=""
                    rows={formatCategoryDetails()}
                />
            </div>
        </>
    );
}