import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'

export interface PageHeadingSettings {
    title: string,
    actions?: any
}

export interface Breadcrumb {
    title: string,
    link: string
}

export const PageHeading = (props: PageHeadingSettings) => {
    const pagePath = useLocation();
    const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

    const getBreadcrumbs = () => {
        let path = pagePath.pathname.substring(7);
        let elements = path.split(/\//);
        let crumbs: Breadcrumb[] = [];

        elements.map((element: string, index: number) => {
            if(index == 0){
                crumbs.push({
                    title: element.charAt(0).toUpperCase() + element.slice(1),
                    link: '/admin/' + element
                });
                return;
            }
            
            if(!Number.isNaN(Number(element))){
                return;
            }

            crumbs.push({
                title: element.charAt(0).toUpperCase() + element.slice(1),
                link: crumbs[index - 1].link + '/' + element
            });
        });

        setBreadcrumbs(crumbs);
        console.log(crumbs);
    }

    useEffect(() => {
        getBreadcrumbs();
    }, []);

    const renderCrumb = (element: Breadcrumb, index: number) => {
        return (
            <>
                <div className={"flex" + (index != 0 ? ' items-center' : '')}>
                    {index != 0 ? <ChevronRightIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" /> : ''}
                    <Link to={(index + 1 == breadcrumbs.length? '#' : element.link)} className={(index != 0 ? 'ml-4 ' : '') + "text-sm font-medium text-gray-500 hover:text-gray-700"}>
                        {element.title}
                    </Link>
                </div>
            </>
        );
    }

    return (
        <div>
            <div>
                <nav className="sm:hidden" aria-label="Back">
                    <Link to={'breadcrumbs[breadcrumbs.length - 1].link'} className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-700">
                        <ChevronLeftIcon className="-ml-1 mr-1 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                        Back
                    </Link>
                </nav>
                <nav className="hidden sm:flex" aria-label="Breadcrumb">
                    <ol role="list" className="flex items-center space-x-4">
                        {
                            breadcrumbs.map((element, index) => {
                                return (
                                    <li key={element.title}>
                                        {renderCrumb(element, index)}
                                    </li>
                                );
                            })
                        }
                    </ol>
                </nav>
            </div>
            <div className="mt-2 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
                        { props.title }
                    </h2>
                </div>
                <div className="mt-4 flex flex-shrink-0 md:mt-0 md:ml-4">
                    { props.actions }
                </div>
            </div>
        </div>
    )
}