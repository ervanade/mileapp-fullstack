<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as Eloquent;


class Task extends Eloquent
{
    use HasFactory;
    protected $connection = 'mongodb';
    protected $collection = 'tasks';

    protected $fillable = [
        'title',
        'description',
        'status',
        'priority',
        'due_date',
        'user_id'
    ];

    protected $attributes = [
        'status' => 'open',
        'priority' => 'low'
    ];
}
