<?php

namespace App\Models;

use App\Models\Traits\SerializeDate;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class File extends Model
{
    use HasFactory, SerializeDate;

    protected $table = 'files';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'stored_name',
        'extension',
        'path'
    ];

    /**
     * Return file extension type
     * 
     * @return App\Models\EntityFileType
     */
    public function type()
    {
        return $this->belongsTo(FileType::class, 'extension');
    }
}
