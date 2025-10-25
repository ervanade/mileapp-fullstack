<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::connection('mongodb')->create('tasks', function ($collection) {
            $collection->index('title');
            $collection->index('status');
            $collection->index(['created_at' => -1]);
        });
    }

    public function down(): void
    {
        Schema::connection('mongodb')->drop('tasks');
    }
};
