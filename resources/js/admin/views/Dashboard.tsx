import React, { useState, useEffect } from 'react';
import { PageHeadingSimple } from '../components/PageHeading';
import Chart from 'react-apexcharts';

export const Dashboard = () => {

    const series = [
        {
            name: "Temperature in Fahrenheit", //will be displayed on the y-axis
            data: [43, 53, 50, 57]
        }
    ];
    const options = {
        chart: {
            id: "simple-bar"
        },
        xaxis: {
            categories: [1, 2, 3, 4] //will be displayed on the x-asis
        }
    };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <PageHeadingSimple 
                title="Dashboard"
                description="An overview of your store"
            />
            <div className="grid grid-cols-12">
                <div className="col-span-12 lg:col-span-6">

                </div>
                <div className="col-span-12 lg:col-span-6">
                    <div className="grid grid-cols-12">
                        <div className="col-span-12 lg:col-span-6">
                            <Chart
                                type="area"
                                options={options}
                                series={series}
                                width="100%"
                            />
                        </div>
                        <div className="col-span-12 lg:col-span-6">

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}