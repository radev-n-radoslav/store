import axios from 'axios';
import React, { useState, useEffect } from "react";
import { PageStaticData, Logo, Footer as FooterData, Socials, NavigationLink, Navigation } from '../../App.d';

export const Footer = (props: any) => {

    const [logo, setLogo] = useState<Logo>(props.logo);
    const [footer, setFooterData] = useState<FooterData>(props.footer);
    
    const legalLogoStyle = {
        height: '100px'
    };

    return (
        <footer className="bg-gray-800" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8 xl:col-span-1">
                        <img className="h-10" src={ logo.url } alt="Company name" />
                        <p className="text-gray-400 text-base">{ logo.memo }</p>
                        <div className="flex space-x-6">
                            {footer.socials.map((item) => (
                                <a key={ item.name } href={ item.href } className="text-gray-400 hover:text-gray-400">
                                    <span className="sr-only">{ item.name }</span>
                                    <i className={ 'h-6 w-6 ' + item.icon } aria-hidden="true"></i>
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 xl:mt-0 col-span-6 xl:col-span-2">
                        {footer.navigation.map((column: Navigation) => (
                            <div className="md:gap-8" v-for="column in navigation" key={ column.title }>
                                <div>
                                    <h3 className="text-base font-medium text-white">{column.title}</h3>
                                    <ul role="list" className="mt-4 space-y-4">
                                        {column.links.map((navLink: NavigationLink) => (
                                            <li key={navLink.name}>
                                                <a href={navLink.href} className="text-base text-gray-400 hover:text-white">
                                                    {navLink.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12 pt-8">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 md:col-span-10">
                            <p className="text-bold text-white text-left">
                                При възникнало съмнение за здравословен проблем или нужда от лечение, моля винаги се обръщайте за медицинска консултация към квалифициран и правоспособен лекар или фармацевт. В никакъв случай не възприемайте дадената Ви чрез сайта информация като абсолютно достоверна и правилна, дори и същата да се окаже такава.
                            </p>
                        </div>
                        <div className="col-span-12 md:col-span-2 mx-auto">
                            <a href="http://www.bda.bg/images/stories/documents/registers/Spisak_LP_Internet%20apteki-%D0%B0%D0%BA%D1%82%D1%83%D0%B0%D0%BB%D0%B5%D0%BD.xls">
                                <img src="https://www.afya-pharmacy.bg/images/legal.jpg" className="img-fluid" style={legalLogoStyle} />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="mt-12 border-t border-gray-200 pt-8">
                    <p className="text-base text-gray-400 xl:text-center">&copy; 2020 Workflow, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};