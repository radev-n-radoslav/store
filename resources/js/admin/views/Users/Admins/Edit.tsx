import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { InputSettings } from '../../../partials/Input.d';
import { Input } from '../../../partials/Input';
import { Card } from '../../../partials/Card';
import { useForm, FormProvider } from 'react-hook-form';
import axios from 'axios';
import { Admin } from './Admin';


export const AdminsEdit = () => {
    const adminId = useParams().id;
    const [adminData, setAdminData] = useState<Admin>();
    const methods = useForm();
    const navigate = useNavigate();

    const updateAdmin = (data: any) => {
        axios.put('/admin/v1/accounts/admins/update/' + adminId, data)
            .then((response) => {
                navigate('/admin/admins/details/' + response.data.data.id);
            })
            .catch((errors) => {

            });
    }

    const firstNameSettings: InputSettings ={
        type: 'text',
        label: 'First name',
        name: 'name',
        id: 'firstName',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        readonly: false
    };

    const emailSettings: InputSettings ={
        type: 'email',
        label: 'Email',
        name: 'email',
        id: 'email',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        },
        icon: <i className="fa far fa-envelope h-5 w-5"></i>,
        readonly: false
    };

    const fetchAdminData = () => {
        axios.get('/admin/v1/accounts/admins/details/' + adminId)
            .then((response) => {
                firstNameSettings.defaultValue = response.data.data.name;
                emailSettings.defaultValue = response.data.data.email;
                setAdminData(response.data.data);
            })
            .catch((errors) => {

            });
    }

    useEffect(() => {
        fetchAdminData();
    }, []);

    const renderPage = () => {
        return (
            <>
                <FormProvider {...methods}>
                    <form onSubmit={methods.handleSubmit(updateAdmin)}>
                        <div className="grid grid-cols-12">
                            <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                                <Input settings={firstNameSettings} />
                            </div>
                            <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                                <Input settings={emailSettings} />
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
                {
                    <Card
                        title='Edit admin account'
                        description={
                            <Link to="/admin/admins" className="pt-4">
                                <i className="fa fa-arrow-left"></i> Return back to admins
                            </Link>
                        }
                        content={renderPage()}
                    />
                }
            </div>
        </>
    )
}
    