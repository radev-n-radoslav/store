import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Customer } from './Customer';
import { PageHeading } from '../../../components/PageHeading';



export const CustomerDetails = (props: any) => {
    const customerId = useParams().id;
    const [customerData, setCustomerData] = useState<Customer>();
    
    const fetchCustomerDetails = () => {
        axios.get('/admin/accounts/users/details/' + customerId)
            .then((response) => {
                setCustomerData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    useEffect(() => {
        fetchCustomerDetails();
    }, []);

    const renderActions = () => {
        return (
            <>
                <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                    <i className="fa fa-edit pr-4"></i> Edit
                </button>
                <button className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                    <i className="fa fa-trash pr-4"></i> Disable
                </button>
            </>
        );
    }

    const renderContent = () => {
        return (
            <>

            </>
        );
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Customer details" actions={renderActions()}/>
                
            </div>
        </>
    );
}