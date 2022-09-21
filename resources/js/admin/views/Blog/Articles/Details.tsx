import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Article } from './Article';
import { PageHeading } from '../../../components/PageHeading';
import { DescriptionList, DescriptionListRows } from '../../../components/DescriptionList';

export const ArticlesDetails = (props: any) => {
    const articleId = useParams().id;
    const [articleData, setArticleData] = useState<Article>();
    const navigate = useNavigate();
    
    const fetchArticleDetails = () => {
        axios.get('/admin/blg/articles/details/' + articleId)
            .then((response) => {
                setArticleData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const formatArticleDetails = () => {
        let rows: DescriptionListRows[] = [
            {
                title: 'Thumbnail URL',
                content: articleData?.thumbnail_url
            },
            {
                title: 'Title',
                content: articleData?.title
            },
            {
                title: 'Content',
                content: articleData?.content
            },
            {
                title: 'Category',
                content: articleData?.category.name
            },
            {
                title: 'Views',
                content: String(articleData?.views)
            },
            {
                title: 'Created at',
                content: articleData?.created_at
            },
            {
                title: 'Last updated at',
                content: articleData?.updated_at
            }
        ];

        return rows;
    }

    useEffect(() => {
        fetchArticleDetails();
    }, []);

    const deleteArticle = () => {
        axios.delete('/admin/blg/articles/delete/' + articleId)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/admin/blog/articles');
                }
            })
            .catch((error) => {

            });
    };

    const renderActions = () => {
        return (
            <>
                <Link to={'/admin/articles/edit/' + articleId}>
                    <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                        <i className="fa fa-edit pr-4"></i> Edit
                    </button>
                </Link>
                <button onClick={() => deleteArticle()} className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                    <i className="fa fa-trash pr-4"></i> Delete
                </button>
            </>
        );
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Article details" actions={renderActions()}/>
                <DescriptionList
                    title="Article information"
                    description=""
                    rows={formatArticleDetails()}
                />
            </div>
        </>
    );
}