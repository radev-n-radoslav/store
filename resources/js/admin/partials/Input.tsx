import React, { useState, useEffect } from 'react';
import { InputSettings } from './Input.d';
import { useForm, Ref, MultipleFieldErrors, Message } from "react-hook-form";

export const Input = (props: any) => {
    const [inputSettings, setInputSettings] = useState<InputSettings>(props.settings);
    const { register, formState: {errors} } = useForm();

    return (
        <>
            <div>
                <label htmlFor={inputSettings.name} className="block text-sm font-medium text-gray-700">
                    {inputSettings.label}
                </label>
                <div className="relative mt-1 rounded-md shadow-sm">
                    <input
                        type={inputSettings.type}
                        name={inputSettings.name}
                        id={inputSettings.id}
                        className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
                        placeholder={inputSettings.placeholder}
                        defaultValue={inputSettings.defaultValue}
                        aria-invalid="true"
                        aria-describedby={inputSettings.name + '-error'}
                        {...register(inputSettings.name), inputSettings.validationRules}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                        <i className="fa fa-exclamation-circle h-5 w-5 text-red-500" aria-hidden="true"></i>
                    </div>
                </div>
                <p className="mt-2 text-sm text-red-600" id={inputSettings.name + '-error'}>
                    
                </p>
            </div>
        </>
    );
}