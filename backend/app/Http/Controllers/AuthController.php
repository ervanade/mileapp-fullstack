<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(LoginRequest $request)
    {
        $data = $request->validated();

        // Mock check user
        if ($data['email'] === 'test@mile.app' && $data['password'] === 'password') {
            $token = Str::random(40);

            return response()->json([
                'token' => $token,
                'token_type' => 'bearer',
                'expires_in' => 3600,
                'user' => [
                    'id' => 'user-1',
                    'email' => 'test@mile.app',
                    'name' => 'Mile Mock User',
                ]
            ]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }
}
