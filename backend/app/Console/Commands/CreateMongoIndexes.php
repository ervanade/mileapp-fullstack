<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class CreateMongoIndexes extends Command
{
    protected $signature = 'mongo:indexes';
    protected $description = 'Create MongoDB indexes for tasks collection';

    public function handle()
    {
        $collection = DB::connection('mongodb')->collection('tasks');

        $this->info('🔧 Creating MongoDB indexes...');

        // Text index for search
        $collection->raw(function ($collection) {
            $collection->createIndex([
                'title' => 'text',
                'description' => 'text',
            ]);
        });

        // Separate single-field indexes
        $collection->raw(function ($collection) {
            $collection->createIndex(['status' => 1]);
            $collection->createIndex(['priority' => 1]);
            $collection->createIndex(['due_date' => 1]);
        });

        // Composite index (for filtering/sorting)
        $collection->raw(function ($collection) {
            $collection->createIndex([
                'status' => 1,
                'priority' => 1,
                'due_date' => -1,
            ]);
        });

        $this->info('✅ Index creation done.');
    }
}
