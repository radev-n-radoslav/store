import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InputSettings } from '../../../partials/Input.d';
import { Input } from '../../../partials/Input';
import { Card } from '../../../partials/Card';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { ImageUploadSingle, ImageUploadSingleSettings } from '../../../partials/ImageUpload';
import { RadioCardsSmall } from '../../../partials/Radio';
import { RadioCardsSmallOptions } from '../../../partials/Radio.d';
import { TinyMCE } from '../../../partials/TinyMCE';
import { ComboBox } from '../../../partials/ComboBox.jsx';
import { ComboBoxOption } from '../../../partials/ComboBoxI';
import { Category } from '../Categories/Category';
import { Article } from './Article';

export const BlogArticlesEdit = () => {
    const methods = useForm();
    const articleId = useParams().id;
    const navigate = useNavigate();
    const [articleData, setArticleData] = useState<Article>();
    const [thumbnailType, setThumbnailType] = useState();
    const [blogCategories, setBlogCategories] = useState<ComboBoxOption[]>([]);
    const [defaultSelectedCategory, setDefaultSelectedCategory] = useState<ComboBoxOption>();
    const [selectedCategory, setSelectedCategory] = useState<ComboBoxOption>();
    const [editorContents, setEditorContents] = useState<string>();

    const fetchArticleData = () => {
        axios.get('/admin/v1/blog/articles/details/' + articleId)
            .then((response) => {
                titleSettings.defaultValue = response.data.data.title;
                thumbnailUrlSettings.defaultValue = response.data.data.thumbnail_url;
                setArticleData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const fetchBlogCategories = () => {
        axios.get('/admin/v1/blog/categories', {
            params: {
                selectable: true
            }
        })
            .then((response) => {
                let categories: ComboBoxOption[] = [];
                response.data.data.map((category: Category) => {
                    let option: ComboBoxOption = {
                        value: String(category.id),
                        label: category.name
                    };
                    categories.push(option);
                });
                setBlogCategories(categories);
            })
            .catch((errors) => {

            });
    }

    useEffect(() => {
        fetchArticleData();
        fetchBlogCategories();
    }, []);

    useEffect(() => {
        blogCategories.map((option: ComboBoxOption) => {
            if(option.value == String(articleData?.category_id)){
                setDefaultSelectedCategory(option);
            }
        })
    }, [blogCategories, articleData]);

    const storeArticle = (data: any) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('category_id', String(selectedCategory?.value));
        formData.append('content', String(editorContents));
        if(thumbnailType == 'upload'){
            formData.append('thumbnail', data.thumbnail[0]);
        }else{
            formData.append('thumbnail_url', data.thumbnail_url);
        }
        

        axios.post('/admin/v1/blog/articles/store', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                navigate('/admin/blog/articles/details/' + response.data.data.id);
            })
            .catch((errors) => {

            });
    }

    const titleSettings: InputSettings ={
        type: 'text',
        label: 'Article title',
        name: 'title',
        id: 'title',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        readonly: false
    };

    const getSelectedCategory = (data: any) => {
        setSelectedCategory(data);
    }

    const getContents = (data: any) => {
        setEditorContents(data);
    }

    const thumbnailUrlSettings: InputSettings ={
        type: 'text',
        label: 'Thumbnail url',
        name: 'thumbnail_url',
        id: 'thumbnail_url',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        icon: <i className="fas fa-link h-5 w-5"></i>,
        readonly: false
    };

    const thumbnailSettings: ImageUploadSingleSettings ={
        label: '',
        name: 'thumbnail',
        id: 'thumbnail',
        validationRules: {
            
        }
    };

    const thumbnailUploadTypes: RadioCardsSmallOptions[] = [
        {
            label: 'Upload new image',
            value: 'upload',
            disabled: false
        },
        {
            label: 'Use a link',
            value: 'link',
            disabled: false
        }
    ]

    const getSelectedThumbnailType = (selected: any) => {
        setThumbnailType(selected.value);
    }

    const renderPage = () => {
        return (
            <>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(storeArticle)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <Input settings={titleSettings} />
                            </div>
                            <div className="col-span-12">
                                <ComboBox
                                    label='Select article category'
                                    optionsArr={blogCategories}
                                    getSelected={getSelectedCategory}
                                    defaultSelected={defaultSelectedCategory}
                                />
                            </div>
                            <div className="col-span-12">
                                <TinyMCE
                                    initialValue={articleData?.content} 
                                    getContents={getContents}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <RadioCardsSmall 
                                    label='Thumbnail'
                                    options={thumbnailUploadTypes}
                                    selected={getSelectedThumbnailType}
                                    default={1}
                                />
                                
                            </div>
                            {
                                thumbnailType == 'upload' ? 
                                    <div className="col-span-12 md:col-span-6 md:col-start-4">
                                        <ImageUploadSingle settings={thumbnailSettings} />
                                    </div>
                                :
                                <div className="col-span-12 md:col-span-6 md:col-start-4 mb-4">
                                    <Input settings={thumbnailUrlSettings} />
                                </div>
                            }
                        </div>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 lg:col-span-4"></div>
                            <div className="col-span-12 lg:col-span-4">
                                <button type="submit" className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-3 rounded w-full">
                                    <i className="fa fa-save"></i> Save
                                </button>
                            </div>
                        </div>
                    </form>
                </FormProvider>
            </>
        );
    }

    return (
        <>
            <div className="px-4">
                <Card
                    title='Edit a blog article'
                    description={
                        <Link to="/admin/blog/articles" className="pt-4">
                            <i className="fa fa-arrow-left"></i> Return back to articles
                        </Link>
                    }
                    content={renderPage()}
                />
            </div>
        </>
    )
}
    