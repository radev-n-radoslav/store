import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InputSettings } from '../../../partials/Input.d';
import { Input } from '../../../partials/Input';
import { Card } from '../../../partials/Card';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { ImageUploadSingle, ImageUploadSingleSettings } from '../../../partials/ImageUpload';


export const BlogCategoriesCreate = () => {
    const methods = useForm();
    const navigate = useNavigate();

    const storeCategory = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('thumbnail', data.thumbnail[0]);

        axios.post('/admin/v1/blog/categories/store', formData, {
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

    const thumbnailSettings: ImageUploadSingleSettings ={
        label: 'Thumbnail',
        name: 'thumbnail',
        id: 'thumbnail',
        validationRules: {
            
        }
    };

    const renderPage = () => {
        return (
            <>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(storeCategory)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                                <Input settings={nameSettings} />
                            </div>
                            <div className="col-span-12 md:col-span-6 mb-4">
                                <Input settings={descriptionSettings} />
                            </div>
                            <div className="col-span-12 md:col-span-6">
                                <ImageUploadSingle settings={thumbnailSettings} />
                            </div>
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
    