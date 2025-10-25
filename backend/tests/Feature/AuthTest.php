<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function login_with_correct_credentials_returns_token()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'test@mile.app',
            'password' => 'password'
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'token',
                'token_type',
                'expires_in',
                'user' => ['id', 'email', 'name']
            ]);
    }

    /** @test */
    public function login_with_wrong_credentials_returns_401()
    {
        $response = $this->postJson('/api/login', [
            'email' => 'wrong@mile.app',
            'password' => 'wrongpass'
        ]);

        $response->assertStatus(401)
            ->assertJson(['message' => 'Invalid credentials']);
    }
}
