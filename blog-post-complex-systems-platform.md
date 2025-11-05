# Building a Complex Systems Research Platform

A web platform for sharing dynamical systems research data—Lorenz attractors, logistic maps, chaos metrics—with public API access and interactive visualizations.

## Architecture

PostgreSQL database stores study metadata, trajectory data, bifurcation points, and computed chaos metrics. REST API endpoints expose the data. Next.js serves the frontend with Three.js for 3D visualizations and Canvas for high-performance 2D plots.

## Database Schema

The schema includes tables for studies, system parameters, initial conditions, trajectories, chaos metrics, bifurcation data, and universal constants. Migrations handle schema changes and initial data seeding.

## API Design

Endpoints follow REST conventions:
- `/api/studies/chaos` — List studies with filtering
- `/api/studies/lorenz/[id]/trajectory` — Retrieve trajectory data
- `/api/studies/logistic/[id]/bifurcation` — Get bifurcation points
- `/api/studies/logistic/[id]/metrics` — Fetch computed metrics

All endpoints return JSON with proper error handling and caching headers.

## Visualizations

**3D Lorenz Attractor:** Interactive Three.js rendering with orbit controls, auto-rotation, and gradient coloring based on trajectory position.

**Bifurcation Diagram:** Canvas-based plot supporting zoom, pan, and hover tooltips. Handles 10,000+ data points efficiently using optimized rendering paths.

**Lyapunov Exponent Chart:** Time series visualization of chaos metrics.

## Technical Challenges

**Database Connection:** Runtime environment variables required careful configuration. `DATABASE_URL` needed to be set for production deployments without quotes in the connection string.

**UUID Handling:** PostgreSQL's strict typing required explicit `::uuid` casts in all queries involving study identifiers.

**Dynamic Routing:** Pages using server-side `headers()` required `export const dynamic = 'force-dynamic'` to prevent static generation errors.

**Migration Strategy:** Database migrations run manually against production rather than during build, since environment variables are only available at runtime.

## Deployment

Vercel handles deployments with automatic builds on git push. Environment variables configured through the dashboard. Database hosted on Neon PostgreSQL with connection pooling.

## Result

A functional research data platform. Studies are accessible via API, visualizations render correctly, and the system scales to handle additional studies and data types.

The platform demonstrates how to structure research data for public access while maintaining performance and usability.










