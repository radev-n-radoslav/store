import React, { useState, useEffect } from 'react';
import { InputSettings } from './Input.d';
import { useFormContext } from "react-hook-form";

export const Input = (props: any) => {
    const [inputSettings, setInputSettings] = useState<InputSettings>(props.settings);
    const { register, formState: {errors} } = useFormContext();

    return (
        <div>
            <label htmlFor={inputSettings.name} className="block text-sm font-medium text-gray-700">
                {inputSettings.label}
            </label>
            <div className="relative mt-1 rounded-md shadow-sm">
                <input
                    type={inputSettings.type}
                    id={inputSettings.id}
                    className={"block w-full rounded-md sm:text-sm" + (errors[inputSettings.name] ? ' border-red-300 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 pr-10' : ' border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500' + (inputSettings.icon ? ' pr-10' : ''))}
                    placeholder={inputSettings.placeholder}
                    defaultValue={inputSettings.defaultValue}
                    aria-invalid="true"
                    aria-describedby={inputSettings.name + '-error'}
                    readOnly={inputSettings.readonly}
                    {...register(inputSettings.name, inputSettings.validationRules)}
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 pt-1">
                    {
                        errors[inputSettings.name] ? 
                            <i className="fa fa-exclamation-circle h-5 w-5 text-red-500" aria-hidden="true"></i>
                        : (
                            inputSettings.icon ? inputSettings.icon : ''
                        )
                    }
                </div>
            </div>
            <p className="mt-2 text-sm text-red-600" id={inputSettings.name + '-error'}>
                {errors[inputSettings.name] ? String(errors[inputSettings.name]?.message) : ''}
            </p>
        </div>
    );
}