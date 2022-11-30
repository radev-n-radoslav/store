<?php

namespace App\Services\FileStorage;

use App\Models\File;
use App\Models\FileType;
use Illuminate\Support\Facades\Storage;

class FileStorage  
{   
    /**
     * Store files
     */
    public static function storeFiles($request)
    {
        $files = [];

        foreach($request->files as $key => $fileArr){
            $path = Storage::disk('files')
                ->putFile('/', $request->file($key));
            
            // Get original file name (as sent by client)
            $fileName = $request->file($key)->getClientOriginalName();

            // Get file name as stored on filesystem
            $storedName = function () use ($path)
            {
                return pathinfo($path, PATHINFO_BASENAME);
            };

            // Get file extension ID or if non existent create it
            $extension = function () use ($path)
            {
                $extension = pathinfo($path, PATHINFO_EXTENSION);
                $type = FileType::where('name', $extension)
                    ->first();
                
                // Create file type if doesnt exist
                if(!$type){
                    $type = FileType::create([
                        'name' => $extension
                    ]);
                }

                return $type->id;
            };

            $files[] = File::create([
                'name' => $fileName,
                'stored_name' => $storedName(),
                'extension' => $extension(),
                'path' => $path
            ]);
        }

        return $files;
    }
}
