#!/usr/bin/env bash
set -e

# composer install (Render usually does this via build, but safe)
composer install --no-interaction --prefer-dist --optimize-autoloader

php artisan key:generate --force

# Run migrations (if any). Use --force in production env
php artisan migrate --force || true

# Create MongoDB indexes (artisan command)
php artisan mongo:indexes || true

# Cache config (optional)
php artisan config:cache || true

# Start server on PORT env var for Render
php -S 0.0.0.0:${PORT:-8000} -t public
