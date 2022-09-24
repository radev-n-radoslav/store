import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

export interface TextAreaData {
    id: string,
    label: string,
    name: string,
    placeholder: string,
    defaultValue: string,
    validationRules: object
    readonly: boolean
    rows: number,
    rest?: any
}

export const TextArea = (props: any) => {
    const [data, setData] = useState<TextAreaData>(props.settings);
    const { register, formState: {errors} } = useFormContext();

    return (
        <div>
            <label htmlFor={data.name} className="block text-sm font-medium text-gray-700">
                {data.label}
            </label>
            <div className="mt-1">
                <textarea
                    rows={data.rows}
                    id={data.id}
                    placeholder={data.placeholder}
                    readOnly={data.readonly}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={data.defaultValue}
                    {...register(data.name, data.validationRules)}
                />
            </div>
            <p className="mt-2 text-sm text-red-600" id={data.name + '-error'}>
                {errors[data.name] ? String(errors[data.name]?.message) : ''}
            </p>
        </div>
    )
}