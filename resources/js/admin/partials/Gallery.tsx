import React, { useState, useEffect } from 'react';

export interface GalleryImage {
    url: string
}

export interface GalleryProps {
    images: GalleryImage[]
}

export const GallerySimple = (props: GalleryProps) => {
    const [images, setImages] = useState<GalleryImage[]>(props.images);
    const imageComponents = images.map((image) => {
        return (
            <div className="flex flex-wrap w-1/3">
                <div className="w-full p-1 md:p-2">
                    <img 
                        className="block object-cover object-center w-full h-full rounded-lg"
                        src={image.url} 
                    />
                </div>
            </div>
        );
    });

    useEffect(() => {
        setImages(props.images);
    }, [props]);

    return (
        <section className="overflow-hidden text-gray-700 ">
            <div className="flex flex-wrap -m-1 md:-m-2">
                {imageComponents}
            </div>
        </section>
    )
}