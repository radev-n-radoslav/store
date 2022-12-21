import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

export const CatalogProductsCreate = () => {
    const methods = useForm();
    const navigate = useNavigate();
    const [thumbnailType, setThumbnailType] = useState();
    const [catalogCategories, setCatalogCategories] = useState<ComboBoxOption[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<ComboBoxOption>();
    const [editorContents, setEditorContents] = useState<string>();

    const fetchCatalogCategories = () => {
        axios.get('/admin/v1/catalog/categories', {
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
                setCatalogCategories(categories);
            })
            .catch((errors) => {

            });
    }

    useEffect(() => {
        fetchCatalogCategories();
    }, []);

    const storeProduct = (data: any) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('category_id', String(selectedCategory?.value));
        formData.append('content', String(editorContents));
        if(thumbnailType == 'upload'){
            formData.append('thumbnail', data.thumbnail[0]);
        }else{
            formData.append('thumbnail_url', data.thumbnail_url);
        }
        

        axios.post('/admin/v1/catalog/products/store', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((response) => {
                navigate('/admin/catalog/products/details/' + response.data.data.id);
            })
            .catch((errors) => {

            });
    }

    const nameSettings: InputSettings ={
        type: 'text',
        label: 'Product name',
        name: 'name',
        id: 'name',
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
                    <form onSubmit={methods.handleSubmit(storeProduct)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12">
                                <Input settings={nameSettings} />
                            </div>
                            <div className="col-span-12">
                                <ComboBox
                                    label='Select product category'
                                    optionsArr={catalogCategories}
                                    getSelected={getSelectedCategory}
                                    defaultSelected={null}
                                />
                            </div>
                            <div className="col-span-12">
                                <TinyMCE
                                    initialValue={''} 
                                    getContents={getContents}
                                />
                            </div>
                            <div className="col-span-12 md:col-span-12">
                                <RadioCardsSmall 
                                    label='Thumbnail'
                                    options={thumbnailUploadTypes}
                                    selected={getSelectedThumbnailType}
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
                    title='Create a product'
                    description={
                        <Link to="/admin/catalog/products" className="pt-4">
                            <i className="fa fa-arrow-left"></i> Return back to products
                        </Link>
                    }
                    content={renderPage()}
                />
            </div>
        </>
    )
}
    