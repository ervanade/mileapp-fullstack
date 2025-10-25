<?php

namespace App\Swagger;

/**
 * @OA\Post(
 *     path="/api/login",
 *     summary="User login (mock)",
 *     tags={"Auth"},
 *     @OA\RequestBody(
 *         required=true,
 *         @OA\JsonContent(
 *             required={"email","password"},
 *             @OA\Property(property="email", type="string", format="email", example="test@mile.app"),
 *             @OA\Property(property="password", type="string", format="password", example="password")
 *         )
 *     ),
 *     @OA\Response(
 *         response=200,
 *         description="Login successful, returns token",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="token", type="string", example="d8f7e2a1b0c4d6f5e9a2b3c1d4e5f6a7b8c9d0e1"),
 *             @OA\Property(property="token_type", type="string", example="bearer"),
 *             @OA\Property(property="expires_in", type="integer", example=3600),
 *             @OA\Property(
 *                 property="user",
 *                 type="object",
 *                 @OA\Property(property="id", type="string", example="user-1"),
 *                 @OA\Property(property="email", type="string", example="test@mile.app"),
 *                 @OA\Property(property="name", type="string", example="Mile Mock User")
 *             )
 *         )
 *     ),
 *     @OA\Response(
 *         response=401,
 *         description="Invalid credentials",
 *         @OA\JsonContent(
 *             type="object",
 *             @OA\Property(property="message", type="string", example="Invalid credentials")
 *         )
 *     )
 * )
 */
class AuthApi {}
