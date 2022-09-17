import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputSettings } from '../../../partials/Input.d';
import { Input } from '../../../partials/Input';
import { Card } from '../../../partials/Card';


export const CustomerCreate = () => {
    const firstNameSettings: InputSettings ={
        type: 'text',
        label: 'First name',
        name: 'name',
        id: 'firstName',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        }
    };

    const surnameSettings: InputSettings ={
        type: 'text',
        label: 'Surname',
        name: 'surname',
        id: 'surname',
        placeholder: '',
        defaultValue: '',
        validationRules: {
            required: 'This field is required'
        }
    };

    const renderPage = () => {
        return (
            <>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                        <Input settings={firstNameSettings} />
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                        <Input settings={surnameSettings} />
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4 lg:mr-4">
                        <Input settings={firstNameSettings} />
                    </div>
                    <div className="col-span-12 md:col-span-6 mb-4">
                        <Input settings={surnameSettings} />
                    </div>
                </div>
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-4"></div>
                    <div className="col-span-12 lg:col-span-4">
                        <button className="text-white bg-blue-600 hover:bg-blue-800 px-3 py-3 rounded w-full">
                            <i className="fa fa-save"></i> Save
                        </button>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <div className="px-4">
                <Card
                    title='Create a customer account'
                    description={
                        <Link to="/admin/customers" className="pt-4">
                            <i className="fa fa-arrow-left"></i> Return back to customers
                        </Link>
                    }
                    content={renderPage()}
                />
            </div>
        </>
    )
}
    