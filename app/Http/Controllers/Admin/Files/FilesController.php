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
use App\Services\FileStorage\FileStorage;

class FilesController extends Controller
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
        $files = FileStorage::storeFiles($request);

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
