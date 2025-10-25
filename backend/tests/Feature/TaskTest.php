<?php

namespace Tests\Feature;

use App\Models\Task;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TaskTest extends TestCase
{
    use RefreshDatabase;

    // Set header default untuk semua request
    protected $headers = [];

    protected function setUp(): void
    {
        parent::setUp();

        // API key & mock token untuk testing
        $this->headers = [
            'X-API-KEY' => env('FRONTEND_API_KEY', 'test-key'),
            'Authorization' => 'Bearer test-token',
        ];
    }

    /** @test */
    public function can_create_task()
    {
        $data = [
            'title' => 'Test Task',
            'description' => 'Description',
            'status' => 'open',
            'priority' => 'high',
        ];

        $response = $this->postJson('/api/tasks', $data, $this->headers);

        $response->assertStatus(201)
            ->assertJsonFragment([
                'title' => 'Test Task',
                'status' => 'open'
            ]);
    }

    /** @test */
    public function can_update_task()
    {
        $task = Task::factory()->create();

        $response = $this->putJson("/api/tasks/{$task->_id}", [
            'title' => 'Updated Task',
            'status' => 'done',
            'priority' => 'high'
        ], $this->headers);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Task']);
    }

    /** @test */
    public function can_delete_task()
    {
        $task = Task::factory()->create();

        $response = $this->deleteJson("/api/tasks/{$task->_id}", [], $this->headers);

        $response->assertStatus(200)
            ->assertJson(['message' => 'Task deleted successfully']);
    }

    /** @test */
    public function can_list_tasks_with_pagination_and_filters()
    {
        Task::factory()->count(15)->create(['status' => 'open']);
        Task::factory()->count(5)->create(['status' => 'done']);

        $response = $this->getJson('/api/tasks?per_page=10&status=open', $this->headers);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'status',
                'data',
                'meta' => [
                    'total',
                    'per_page',
                    'current_page',
                    'last_page',
                    'next_page_url',
                    'prev_page_url',
                    'from',
                    'to'
                ]
            ]);
    }
}
