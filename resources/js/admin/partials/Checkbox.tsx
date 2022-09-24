import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";

export interface CheckboxData{
    id: string,
    name: string,
    label: string,
    description: string
    validationRules: object
}

export interface CheckboxList{
    legend: string,
    items: CheckboxData[]
}

export const Checkbox = (props: any) => {
    const [settings, setSettings] = useState<CheckboxList>(props.settings);
    const { register, formState: {errors} } = useFormContext();

    return (
        <fieldset className="space-y-5">
            <legend className="sr-only">{settings.legend}</legend>
            {
                <>
                    {
                        settings.items.map((item) => {
                            <div>
                                <div className="relative flex items-start">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id={item.id}
                                            aria-describedby={item.id + "-description"}
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            {...register(item.name, item.validationRules)}
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="comments" className="font-medium text-gray-700">
                                            {item.label}
                                        </label>
                                        <p id="comments-description" className="text-gray-500">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-2 text-sm text-red-600" id={item.name + '-error'}>
                                    {errors[item.name] ? String(errors[item.name]?.message) : ''}
                                </p>
                            </div>
                        })
                    }
                </>
            }
        </fieldset>
    )
}
