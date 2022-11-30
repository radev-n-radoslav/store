import React from 'react';

export interface DescriptionListRows {
    title: string,
    content?: string
}

export interface DescriptionListSettings {
    title: string,
    description?: string,
    rows: DescriptionListRows[]
}

export const DescriptionList = (props: DescriptionListSettings) => {
    return (
        <div className="overflow-hidden bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">{props.description}</p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    {
                        props.rows.map((element, index) => {
                            return (
                                <div key={element.title + index} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">{element.title}</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{element.content}</dd>
                                </div>
                            );
                        })
                    }
                </dl>
            </div>
        </div>
    )
}
