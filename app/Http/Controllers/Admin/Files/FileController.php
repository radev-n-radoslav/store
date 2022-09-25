<?php

namespace App\Http\Controllers\Admin\Files;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Files\DeleteRequest;
use App\Http\Requests\Admin\Files\DetailsRequest;
use App\Http\Requests\Admin\Files\DownloadRequest;
use App\Http\Requests\Admin\Files\IndexRequest;
use App\Http\Requests\Admin\Files\StoreRequest;
use Illuminate\Support\Facades\Storage;
use App\Models\File;
use App\Models\FileType;

class FileController extends Controller
{
    /**
     * Get all Files
     */
    public function index(IndexRequest $request)
    {
        $files = File::orderBy('id', $request->sort ?? 'desc')
            ->with([
                'type'
            ])
            ->paginate(20);
        
        return response([
            'data' => $files
        ], 200);
    }

    /**
     * Get details about file
     */
    public function details($id, DetailsRequest $request)
    {
        $file = File::findOrFail($id);

        return response([
            'data' => $file
        ], 200);
    }

    /**
     * Download a file
     */
    public function download($id, DownloadRequest $request)
    {
        $file = File::findOrFail($id);

        return Storage::disk('files')->download($file->path);
    }

    /**
     * Store a file
     */
    public function store(StoreRequest $request)
    {
        $files = [];

        foreach($request->files as $key => $fileArr){
            $path = Storage::disk('files')
                ->putFile($request->file($key));
            
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

        return response([
            'data' => $files
        ], 200);
    }

    /**
     * Delete a file
     */
    public function delete($id, DeleteRequest $request)
    {
        $file = File::findOrFail($id);

        Storage::disk('files')->delete($file->path);

        return response([
            
        ], 200);
    }
}
