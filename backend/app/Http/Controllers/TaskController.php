<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;



class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Task::query();

        // 🔍 Search
        if ($search = $request->query('q')) {
            $query->where(function ($q2) use ($search) {
                $q2->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        // 🧭 Filtering
        if ($status = $request->query('status')) {
            $query->where('status', $status);
        }

        if ($priority = $request->query('priority')) {
            $query->where('priority', $priority);
        }

        // 🔽 Sorting
        $allowedSort = ['title', 'due_date', 'priority', 'status', 'created_at'];
        $sort = $request->query('sort', 'due_date');
        $direction = 'asc';

        if (str_starts_with($sort, '-')) {
            $direction = 'desc';
            $sort = ltrim($sort, '-');
        }

        if (in_array($sort, $allowedSort)) {
            $query->orderBy($sort, $direction);
        }

        // 📄 Pagination
        $perPage = (int) $request->query('limit', 10);
        $tasks = $query->paginate($perPage);

        return response()->json([
            'status' => 'success',
            'data' => $tasks->items(),
            'meta' => [
                'total' => $tasks->total(),
                'per_page' => $tasks->perPage(),
                'current_page' => $tasks->currentPage(),
                'last_page' => $tasks->lastPage(),
                'next_page_url' => $tasks->nextPageUrl(),
                'prev_page_url' => $tasks->previousPageUrl(),
                'from' => $tasks->firstItem(),
                'to' => $tasks->lastItem(),
            ]
        ], 200);
    }



    // POST /tasks
    public function store(TaskRequest $request)
    {
        $data = $request->validated();
        $task = Task::create($data);

        return response()->json([
            'status' => 'success',
            'data' => $task
        ], 201);
    }


    // PUT /tasks/{id}
    public function update(TaskRequest $request, $id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->update($request->validated());

            return response()->json([
                'status' => 'success',
                'data' => $task
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
    }


    // DELETE /tasks/{id}
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'Task deleted successfully'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Task not found'
            ], 404);
        }
    }
}
