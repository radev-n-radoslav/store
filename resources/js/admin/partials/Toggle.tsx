import React, { useState, useEffect } from 'react';
import { useFormContext } from "react-hook-form";
import { useClassNames } from '../helpers/styleHelpers';
import { Switch } from '@headlessui/react';

export const ToggleSimple = () => {
    const [enabled, setEnabled] = useState(false);
    const { register, formState: {errors} } = useFormContext();

    return (
        <Switch
            checked={enabled}
            onChange={setEnabled}
            className={useClassNames(
                enabled ? 'bg-indigo-600' : 'bg-gray-200',
                'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            )}
            {...register(inputSettings.name, inputSettings.validationRules)}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={useClassNames(
                    enabled ? 'translate-x-5' : 'translate-x-0',
                    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                )}
            />
        </Switch>
    )
}

export const Toggle = () => {
    const [enabled, setEnabled] = useState(false)

    return (
        <Switch.Group as="div" className="flex items-center justify-between">
            <span className="flex flex-grow flex-col">
                <Switch.Label as="span" className="text-sm font-medium text-gray-900" passive>
                    Available to hire
                </Switch.Label>
                <Switch.Description as="span" className="text-sm text-gray-500">
                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
                </Switch.Description>
            </span>
            <Switch
                checked={enabled}
                onChange={setEnabled}
                className={useClassNames(
                    enabled ? 'bg-indigo-600' : 'bg-gray-200',
                    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                )}
            >
                <span
                    aria-hidden="true"
                    className={useClassNames(
                        enabled ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                    )}
                />
            </Switch>
        </Switch.Group>
    )
}

