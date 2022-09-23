import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { Admin } from './Admin';
import { PageHeading } from '../../../components/PageHeading';
import { DescriptionList, DescriptionListRows } from '../../../components/DescriptionList';

export const AdminDetails = (props: any) => {
    const adminId = useParams().id;
    const [adminData, setAdminData] = useState<Admin>();
    const navigate = useNavigate();
    
    const fetchAdminDetails = () => {
        axios.get('/admin/v1/accounts/admins/details/' + adminId)
            .then((response) => {
                setAdminData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    const formatAdminDetails = () => {
        let rows: DescriptionListRows[] = [
            {
                title: 'Name',
                content: adminData?.name
            },
            {
                title: 'Surname',
                content: adminData?.email
            },
            {
                title: 'Email',
                content: adminData?.email
            },
            {
                title: 'Created at',
                content: adminData?.created_at
            },
            {
                title: 'Last updated at',
                content: adminData?.updated_at
            }
        ];

        if (adminData?.deleted_at != null) {
            rows.push(
                {
                    title: 'Disabled at',
                    content: adminData?.deleted_at
                }
            );
        }

        return rows;
    }

    useEffect(() => {
        fetchAdminDetails();
    }, []);

    const disableAdmin = () => {
        axios.delete('/admin/v1/accounts/admins/delete/' + adminId)
            .then((response) => {
                if (response.status == 200) {
                    navigate('/admin/admins');
                }
            })
            .catch((error) => {

            });
    };

    const enableAdmin = () => {
        axios.post('/admin/v1/accounts/admins/restore/' + adminId)
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
                <Link to={'/admin/admins/edit/' + adminId}>
                    <button className="inline-flex items-center text-white bg-green-500 hover:bg-green-600 px-4 py-3 w-full rounded mr-4">
                        <i className="fa fa-edit pr-4"></i> Edit
                    </button>
                </Link>
                {
                    !adminData?.deleted_at ? 
                        <button onClick={() => disableAdmin()} className="inline-flex items-center text-white bg-red-500 hover:bg-red-600 px-4 py-3 w-full rounded ml-4">
                            <i className="fa fa-trash pr-4"></i> Disable
                        </button>
                    :
                    <button onClick={() => enableAdmin()} className="inline-flex items-center text-black bg-yellow-400 hover:bg-yellow-500 px-4 py-3 w-full rounded ml-4">
                        <i className="fas fa-redo pr-4"></i> Enable
                    </button>
                }
            </>
        );
    }

    return (
        <>
            <div className="px-4 sm:px-6 lg:px-8">
                <PageHeading title="Admin details" actions={renderActions()}/>
                <DescriptionList
                    title="Admin information"
                    description=""
                    rows={formatAdminDetails()}
                />
            </div>
        </>
    );
}