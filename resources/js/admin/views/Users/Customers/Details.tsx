import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Customer } from './Customer';
import { PageHeading } from '../../../components/PageHeading';
import { DescriptionList, DescriptionListRows } from '../../../components/DescriptionList';

export const CustomerDetails = (props: any) => {
    const customerId = useParams().id;
    const [customerData, setCustomerData] = useState<Customer>();
    const navigate = useNavigate();
    
    const fetchCustomerDetails = () => {
        axios.get('/admin/v1/accounts/users/details/' + customerId)
            .then((response) => {
                setCustomerData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const formatCustomerDetails = () => {
        let rows: DescriptionListRows[] = [
            {
                title: 'Name',
                content: customerData?.name
            },
            {
                title: 'Surname',
                content: customerData?.email
            },
            {
                title: 'Phone',
                content: customerData?.phone
            },
            {
                title: 'Email',
                content: customerData?.email
            },
            {
                title: 'Email verified at',
                content: String(customerData?.email_verified_at)
            },
            {
                title: 'Created at',
                content: customerData?.created_at
            },
            {
                title: 'Last updated at',
                content: customerData?.updated_at
            }
        ];

        if (customerData?.deleted_at != null) {
            rows.push(
                {
                    title: 'Disabled at',
                    content: customerData?.deleted_at
                }
            );
        }

        return rows;
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, []);

    const disableUser = () => {
        axios.delete('/admin/v1/accounts/users/delete/' + customerId)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/admin/customers');
                }
            })
            .catch((error) => {

            });
    };

    const enableUser = () => {
        axios.post('/admin/v1/accounts/users/restore/' + customerId)
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
                <Link to={'/admin/customers/edit/' + customerId}>
                    <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                        <i className="fa fa-edit pr-4"></i> Edit
                    </button>
                </Link>
                {
                    !customerData?.deleted_at ? 
                        <button onClick={() => disableUser()} className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                            <i className="fa fa-trash pr-4"></i> Disable
                        </button>
                    :
                    <button onClick={() => enableUser()} className="inline-flex items-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-3 w-full rounded ml-4">
                        <i className="fas fa-redo pr-4"></i> Enable
                    </button>
                }
            </>
        );
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Customer details" actions={renderActions()}/>
                <DescriptionList
                    title="Customer information"
                    description=""
                    rows={formatCustomerDetails()}
                />
            </div>
        </>
    );
}