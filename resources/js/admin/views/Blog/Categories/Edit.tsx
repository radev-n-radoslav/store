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
import { Category } from './Category';


export const BlogCategoriesEdit = () => {
    const categoryId = useParams().id;
    const methods = useForm();
    const navigate = useNavigate();
    const [thumbnailType, setThumbnailType] = useState();
    const [categoryData, setCategoryData] = useState<Category>();

    const fetchCategoryData = () => {
        axios.get('/admin/v1/blog/categories/details/' + categoryId)
            .then((response) => {
                nameSettings.defaultValue = response.data.data.name;
                descriptionSettings.defaultValue = response.data.data.description;
                thumbnailUrlSettings.defaultValue = response.data.data.thumbnail_url;
                setCategoryData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    useEffect(() => {
        fetchCategoryData();
    }, []);

    const updateCategory = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if(thumbnailType == 'upload'){
            formData.append('thumbnail', data.thumbnail[0]);
        }else{
            formData.append('thumbnail_url', data.thumbnail_url);
        }
        

        axios.post('/admin/v1/blog/categories/update', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                navigate('/admin/blog/categories/details/' + response.data.data.id);
            })
            .catch((errors) => {

            });
    }

    const nameSettings: InputSettings ={
        type: 'text',
        label: 'Category name',
        name: 'name',
        id: 'name',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        readonly: false
    };

    const descriptionSettings: InputSettings ={
        type: 'text',
        label: 'Description',
        name: 'description',
        id: 'description',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        readonly: false
    };

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
                    <form onSubmit={methods.handleSubmit(updateCategory)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                                <Input settings={nameSettings} />
                            </div>
                            <div className="col-span-12 md:col-span-6 mb-4">
                                <Input settings={descriptionSettings} />
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <RadioCardsSmall 
                                    label='Thumbnail'
                                    options={thumbnailUploadTypes}
                                    default={1}
                                    selected={getSelectedThumbnailType}
                                />
                                
                            </div>
                            {
                                thumbnailType == 'upload' ? 
                                    <div className="col-span-12 md:col-span-6">
                                        <ImageUploadSingle settings={thumbnailSettings} />
                                    </div>
                                :
                                <div className="col-span-12 md:col-span-6 mb-4">
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
                    title='Create a blog category'
                    description={
                        <Link to="/admin/blog/categories" className="pt-4">
                            <i className="fa fa-arrow-left"></i> Return back to categories
                        </Link>
                    }
                    content={renderPage()}
                />
            </div>
        </>
    )
}