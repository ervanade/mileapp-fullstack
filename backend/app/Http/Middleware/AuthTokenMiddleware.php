<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AuthTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->bearerToken();
        if (!$token) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Optional: allow any non-empty token, or restrict to a pattern:
        // if ($token !== 'mocked.jwt.token') return unauthorized;
        // We'll allow any non-empty token for the mock.
        return $next($request);
    }
}
