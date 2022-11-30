import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { RadioGroup } from '@headlessui/react';
import { useClassNames } from '../helpers/styleHelpers';
import { RadioCardsSmallSettings } from './Radio.d';

export const RadioCardsSmall = (props: RadioCardsSmallSettings) => {
    const [settings, setSettings] = useState<RadioCardsSmallSettings>(props);
    const [selected, setSelected] = useState((settings.default ? settings.options[settings.default] : settings.options[0]));
    
    useEffect(() => {
        settings.selected(selected);
    }, [selected]);

    return (
        <div className="mb-4">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-medium text-gray-900">{settings.label}</h2>
                {
                    (settings.link ? 
                        <Link 
                            to={(settings.link?.path ?? '')}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >{settings.link?.label}</Link>
                    : '')
                }
            </div>

            <RadioGroup value={selected} onChange={setSelected} className="mt-2">
                <RadioGroup.Label className="sr-only"> Choose a selectedory option </RadioGroup.Label>
                <div className={"grid grid-cols-" + (settings.options.length < 12 ? Math.round(settings.options.length / 2) : '12') + " gap-3 sm:grid-cols-" + (settings.options.length < 12 ? settings.options.length : '12')}>
                    {settings.options.map((option) => (
                        <RadioGroup.Option
                            key={option.label}
                            value={option}
                            className={({ active, checked }) =>
                                useClassNames(
                                    !option.disabled ? 'cursor-pointer focus:outline-none' : 'opacity-25 cursor-not-allowed',
                                    active ? 'ring-2 ring-offset-2 ring-indigo-500' : '',
                                    checked
                                        ? 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700'
                                        : 'bg-white border-gray-200 text-gray-900 hover:bg-gray-50',
                                    'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
                                )
                            }
                            disabled={option.disabled}
                        >
                            <RadioGroup.Label as="span">{option.label}</RadioGroup.Label>
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}
