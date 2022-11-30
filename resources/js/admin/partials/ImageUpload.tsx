import React, { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

// export const ImageUpload = () => {

// }

export interface ImageUploadSingleSettings {
    id: string,
    label: string,
    name: string,
    validationRules: object
}

export const ImageUploadSingle = (props: any) => {
    const [settings, setSettings] = useState<ImageUploadSingleSettings>(props.settings);
    const [imgData, setImgData] = useState<any>(null);
    const { register, formState: {errors} } = useFormContext();
    
    // Display image that user tries to upload
    const setThumbnail = (e: any) => {
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <div className="grid grid-cols-1 space-y-2 mb-4">
            <label className="text-sm font-bold text-gray-500 tracking-wide">{settings.label}</label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col rounded-lg border-4 border-dashed w-full h-60 p-10 group text-center cursor-pointer">
                    <div className="h-full w-full text-center flex flex-col items-center justify-center">
                        <div className="flex flex-auto max-h-48 w-2/5 mx-auto items-center">
                            <img 
                                className="has-mask h-auto max-w-full object-center" 
                                src={(imgData ? imgData : 'https://img.freepik.com/free-vector/image-upload-concept-landing-page_52683-27130.jpg?size=338&ext=jpg')}
                            />
                        </div>
                        <p className="pointer-none text-gray-500 ">
                            <span className="text-sm">Click to upload an image</span>
                        </p>
                    </div>
                    <input
                        type="file"
                        id={settings.id}
                        className='hidden'
                        {...register(settings.name, {
                            ...settings.validationRules,
                            onChange: (e) => {
                                setThumbnail(e);
                            }
                        })}
                    />
                </label>
            </div>
        </div>
    )
}