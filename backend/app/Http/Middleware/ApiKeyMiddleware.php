<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class ApiKeyMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $apiKey = $request->header('X-API-KEY');
        if ($apiKey !== env('FRONTEND_API_KEY')) {
            return response()->json(['message' => 'Invalid API Key'], 403);
        }

        return $next($request);
    }
}
