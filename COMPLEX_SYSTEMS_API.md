# Complex Systems Studies API

A comprehensive API for storing and retrieving complex systems research data using Upstash Redis. This API supports various dynamical systems including Lorenz attractors, logistic maps, and other complex systems studies.

## Features

- **PostgreSQL + Redis caching** with intelligent cache invalidation
- **Rate limiting** with sliding window algorithm using Upstash Redis
- **TypeScript support** with full type definitions
- **CORS enabled** for public API access
- **Comprehensive error handling** with detailed error responses
- **Data sampling** for large trajectory datasets
- **Parameter filtering** for bifurcation analysis
- **Sample data seeding** for testing
- **Cache hit/miss tracking** in response headers
- **Rate limit headers** for client awareness

## API Endpoints

### 1. Get All Chaos Studies
```
GET /api/studies/chaos
```

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)
- `system_type` (optional): Filter by system type

**Response:**
```json
{
  "studies": [
    {
      "id": "uuid",
      "name": "Lorenz Attractor Analysis",
      "system_type": "lorenz",
      "description": "Classical Lorenz attractor...",
      "date_conducted": "2024-01-15",
      "metadata": {...},
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

### 2. Get Lorenz Study Details
```
GET /api/studies/lorenz/{id}
```

**Response:**
```json
{
  "study": {...},
  "parameters": [
    {
      "id": "uuid",
      "study_id": "uuid",
      "parameter_name": "sigma",
      "value": 10.0,
      "units": "dimensionless",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "initial_conditions": [...],
  "metrics": [...],
  "trajectory_count": 1000
}
```

### 3. Get Lorenz Trajectory Data
```
GET /api/studies/lorenz/{id}/trajectory
```

**Query Parameters:**
- `sample` (optional): Number of points to sample (for large datasets)

**Response:**
```json
{
  "study_id": "uuid",
  "points": [
    {
      "id": "uuid",
      "study_id": "uuid",
      "timestep": 0,
      "time": 0.0,
      "x": 1.0,
      "y": 1.0,
      "z": 1.0,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total_points": 1000,
  "sampled": true,
  "sample_size": 100
}
```

### 4. Get Chaos Metrics
```
GET /api/studies/lorenz/{id}/metrics
```

**Response:**
```json
{
  "study_id": "uuid",
  "metrics": [
    {
      "id": "uuid",
      "study_id": "uuid",
      "metric_name": "lyapunov_exponent",
      "value": 0.9056,
      "computation_method": "wolf_algorithm",
      "metadata": {...},
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total_metrics": 2
}
```

### 5. Get Logistic Map Study
```
GET /api/studies/logistic/{id}
```

**Response:**
```json
{
  "study": {...},
  "parameters": [...],
  "initial_conditions": [...],
  "bifurcation_count": 5000,
  "constants_count": 3
}
```

### 6. Get Bifurcation Data
```
GET /api/studies/logistic/{id}/bifurcation
```

**Query Parameters:**
- `r_min` (optional): Minimum parameter value
- `r_max` (optional): Maximum parameter value

**Response:**
```json
{
  "study_id": "uuid",
  "points": [
    {
      "id": "uuid",
      "study_id": "uuid",
      "parameter_value": 3.0,
      "state_value": 0.5,
      "iteration": 1000,
      "is_stable": true,
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "total_points": 5000,
  "r_min": 2.0,
  "r_max": 4.0
}
```

### 7. Get Feigenbaum Constants
```
GET /api/studies/logistic/{id}/feigenbaum
```

**Response:**
```json
{
  "study_id": "uuid",
  "constants": [
    {
      "id": "uuid",
      "study_id": "uuid",
      "constant_name": "feigenbaum_constant",
      "value": 4.669201609,
      "uncertainty": 0.000000001,
      "computation_method": "bifurcation_analysis",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ],
  "feigenbaum_constant": {...},
  "total_constants": 3
}
```

### 8. Seed Sample Data
```
POST /api/studies/seed
```

**Headers:**
- `Authorization: Bearer {SEED_AUTH_TOKEN}` (optional)

**Response:**
```json
{
  "success": true,
  "message": "Sample data seeded successfully",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

## Data Types

### System Types
- `lorenz`: Lorenz attractor
- `rossler`: Rössler attractor
- `chen`: Chen attractor
- `lorenz_96`: Lorenz 96 model
- `kuramoto`: Kuramoto model
- `cellular_automata`: Cellular automata
- `agent_based`: Agent-based models
- `network`: Network models
- `logistic`: Logistic map
- `other`: Other systems

### Chaos Metrics
- `lyapunov_exponent`: Largest Lyapunov exponent
- `correlation_dimension`: Correlation dimension
- `entropy`: Entropy measures
- `fractal_dimension`: Fractal dimension
- `hurst_exponent`: Hurst exponent
- `recurrence_rate`: Recurrence rate
- `determinism`: Determinism
- `laminarity`: Laminarity
- `trapping_time`: Trapping time
- `maxline`: Maximum line length

## Rate Limiting

The API implements rate limiting using a sliding window algorithm with Upstash Redis. Different endpoint types have different limits:

### Rate Limits by Endpoint Type

| Endpoint Type | Limit | Window | Examples |
|---------------|-------|--------|----------|
| **List** | 100 requests | 1 hour | `/api/studies/chaos` |
| **Detail** | 100 requests | 1 hour | `/api/studies/lorenz/{id}` |
| **Heavy Data** | 50 requests | 1 hour | `/api/studies/lorenz/{id}/trajectory` |
| **Metrics** | 100 requests | 1 hour | `/api/studies/lorenz/{id}/metrics` |

### Rate Limit Headers

All API responses include rate limiting information:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1640995200000
Retry-After: 3600  # Only present when rate limited
```

### Rate Limit Exceeded Response

When rate limits are exceeded, the API returns a 429 status:

```json
{
  "error": "Rate limit exceeded",
  "message": "Too many requests. Limit: 100 per hour. Try again in 3600 seconds.",
  "limit": 100,
  "remaining": 0,
  "reset": 1640995200000,
  "retryAfter": 3600
}
```

### Client IP Detection

The API detects client IPs from various headers:
- `X-Forwarded-For` (first IP in comma-separated list)
- `X-Real-IP`
- `CF-Connecting-IP` (Cloudflare)
- `X-Client-IP`

## Environment Variables

Add these to your `.env.local` file:

```bash
# Upstash Redis (required for caching and rate limiting)
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token

# PostgreSQL (primary database)
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DATABASE=complex_systems
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password

# Optional: Seed data protection
SEED_AUTH_TOKEN=your_secret_token
```

## Usage Examples

### JavaScript/TypeScript
```typescript
// Get all Lorenz studies
const response = await fetch('/api/studies/chaos?system_type=lorenz');
const data = await response.json();

// Get trajectory data with sampling
const trajectory = await fetch('/api/studies/lorenz/{id}/trajectory?sample=100');
const points = await trajectory.json();

// Get bifurcation data with parameter range
const bifurcation = await fetch('/api/studies/logistic/{id}/bifurcation?r_min=3.0&r_max=4.0');
const bifurcationData = await bifurcation.json();
```

### Python
```python
import requests

# Get chaos studies
response = requests.get('https://your-domain.com/api/studies/chaos')
studies = response.json()

# Get specific Lorenz study
lorenz_study = requests.get(f'https://your-domain.com/api/studies/lorenz/{study_id}')
data = lorenz_study.json()
```

## Error Handling

All endpoints return appropriate HTTP status codes and error messages:

- `400`: Bad Request (invalid parameters)
- `404`: Not Found (study doesn't exist)
- `500`: Internal Server Error

Error response format:
```json
{
  "error": "Error type",
  "message": "Human-readable error message",
  "details": "Additional error details (development only)"
}
```

## Performance Considerations

- **Trajectory sampling**: Use the `sample` parameter for large datasets
- **Parameter filtering**: Use `r_min`/`r_max` for bifurcation data
- **Pagination**: Use `page` and `limit` for studies listing
- **Caching**: Consider implementing client-side caching for frequently accessed data

## Development

### Seeding Data
```bash
# Seed sample data for testing
curl -X POST https://your-domain.com/api/studies/seed
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Test endpoints
curl http://localhost:3000/api/studies/chaos
```

## Contributing

1. Follow TypeScript best practices
2. Add proper error handling
3. Include comprehensive tests
4. Update documentation for new endpoints
5. Ensure CORS headers are properly set

## License

This API is part of the mileswaite.net portfolio project.
