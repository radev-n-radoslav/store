import React, { useState, useEffect, Fragment } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Product } from './Product';
import { PageHeading } from '../../../components/PageHeading';
import { DescriptionList, DescriptionListRows } from '../../../components/DescriptionList';
import { Card } from '../../../partials/Card';
import { render } from '../../../../../../public/js/ui';
import { GalleryImage, GallerySimple } from '../../../partials/Gallery';

export const CatalogProductsDetails = (props: any) => {
    const productId = useParams().id;
    const [productData, setProductData] = useState<Product>();
    const navigate = useNavigate();
    
    const fetchProductDetails = () => {
        axios.get('/admin/v1/catalog/products/details/' + productId)
            .then((response) => {
                setProductData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const formatProductDetails = () => {
        let rows: DescriptionListRows[] = [
            {
                title: 'Name',
                content: productData?.name
            },
            {
                title: 'Description',
                content: productData?.description
            },
            {
                title: 'SKU',
                content: productData?.sku
            },
            {
                title: 'Quantity',
                content: String(productData?.quantity)
            },
            {
                title: 'Created at',
                content: productData?.created_at
            },
            {
                title: 'Last updated at',
                content: productData?.updated_at
            }
        ];

        if (productData?.deleted_at != null) {
            rows.push(
                {
                    title: 'Disabled at',
                    content: productData?.deleted_at
                }
            );
        }

        return rows;
    }

    const formatProductCategories = () => {
        let rows: DescriptionListRows[] = [];
        productData?.categories.map((category) => {
            rows.push({
                title: 'Name',
                content: category.name
            });
        });

        return rows;
    }

    useEffect(() => {
        fetchProductDetails();
    }, []);

    const disableProduct = () => {
        axios.delete('/admin/v1/catalog/products/delete/' + productId)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/admin/catalog/products');
                }
            })
            .catch((error) => {

            });
    };

    const enableProduct = () => {
        axios.post('/admin/v1/catalog/products/restore/' + productId)
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
                <Link to={'/admin/products/edit/' + productId}>
                    <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                        <i className="fa fa-edit pr-4"></i> Edit
                    </button>
                </Link>
                {
                    !productData?.deleted_at ? 
                        <button onClick={() => disableProduct()} className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                            <i className="fa fa-trash pr-4"></i> Delete
                        </button>
                    :
                    <button onClick={() => enableProduct()} className="inline-flex items-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-3 w-full rounded ml-4">
                        <i className="fas fa-redo pr-4"></i> Restore
                    </button>
                }
            </>
        );
    }

    const formatImages = () => {
        let images = new Array();

        productData?.images.map((image) => {
            images.push({
                url: image.url
            });
        });

        return images;
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Product details" actions={renderActions()}/>
                <DescriptionList
                    title="Product information"
                    description=""
                    rows={formatProductDetails()}
                />
                <div className="my-4"></div>
                <Card 
                    title="Images"
                    description="All product images"
                    content={<GallerySimple images={formatImages()} />}
                />
                <div className="my-4"></div>
                <DescriptionList
                    title="Parent categories"
                    description="Categories which include this product"
                    rows={formatProductCategories()}
                />
            </div>
        </>
    );
}