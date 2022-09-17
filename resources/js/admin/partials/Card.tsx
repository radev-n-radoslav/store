import React from 'react';

export interface CardProps {
    title?: string,
    description?: string,
    actions?: any,
    content?: any
}

export const Card = (props: CardProps) => {

    return (
        <>
            <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6 rounded-t">
                <div className="-ml-4 -mt-4 flex flex-wrap items-center justify-between sm:flex-nowrap">
                    <div className="ml-4 mt-4">
                        <h3 className="text-lg font-medium leading-6 text-gray-900">{props.title}</h3>
                        <p className="mt-1 text-sm text-gray-500">
                            {props.description}
                        </p>
                    </div>
                    <div className="ml-4 mt-4 flex-shrink-0">
                        {props.actions}
                    </div>
                </div>
            </div>
            <div className="bg-white px-4 py-5 sm:px-6 rounded-b">
                {props.content}
            </div>
        </>
    );
}