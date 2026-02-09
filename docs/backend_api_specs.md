# Backend API Specifications

This document outlines the API specifications for the backend services required by the Undermine React Web frontend. The API is designed to support the core functionalities: User Authentication, Contest Management, Lineup Submission, and Live Scoring.

## Base URL
All API requests should be prefixed with `/api/v1`.

## Authentication

### Register
Create a new user account.

- **URL:** `/auth/register`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword",
    "username": "CoolUser123"
  }
  ```
- **Response:** `201 Created`
  ```json
  {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "username": "CoolUser123",
      "joinedAt": "2023-10-27T10:00:00Z",
      "stats": {
        "rank": 0,
        "totalPoints": 0,
        "activeContests": 0,
        "pointsThisWeek": 0
      }
    },
    "token": "jwt_token_string"
  }
  ```

### Login
Authenticate an existing user.

- **URL:** `/auth/login`
- **Method:** `POST`
- **Request Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "user": { ... }, // User object as above
    "token": "jwt_token_string"
  }
  ```

### Get Current User
Retrieve the currently authenticated user's profile.

- **URL:** `/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
  ```json
  {
    "id": "user_123",
    "email": "user@example.com",
    ...
  }
  ```

## Contests

### List Contests
Retrieve a list of available contests.

- **URL:** `/contests`
- **Method:** `GET`
- **Query Params:**
  - `status`: Filter by status (`open`, `locked`, `completed`)
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "c1",
      "title": "Premier League Gameweek 24",
      "status": "open",
      "entryFee": 25,
      "prizePool": "$50,000",
      "entrants": 1247,
      "maxEntrants": 5000,
      "startTime": "2023-10-28T12:00:00Z",
      "endTime": "2023-10-29T18:00:00Z",
      "salaryCap": 100000,
      "matches": ["Man City vs Liverpool", ...]
    },
    ...
  ]
  ```

### Get Contest Details
Retrieve detailed information about a specific contest.

- **URL:** `/contests/:id`
- **Method:** `GET`
- **Response:** `200 OK`
  ```json
  {
    "id": "c1",
    "title": "Premier League Gameweek 24",
    ...
  }
  ```

### Join Contest
Enter a contest.

- **URL:** `/contests/:id/join`
- **Method:** `POST`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
  ```json
  {
    "id": "entry_123",
    "userId": "user_123",
    "contestId": "c1",
    "joinedAt": "2023-10-27T10:05:00Z",
    "hasSubmittedLineup": false
  }
  ```

### Get User Entries
Get the list of contests the current user has joined.

- **URL:** `/users/me/entries`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "entry_123",
      "contestId": "c1",
      ...
    }
  ]
  ```

## Lineups

### Get Lineup
Retrieve the user's lineup for a specific contest.

- **URL:** `/contests/:contestId/lineup`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <token>`
- **Response:** `200 OK`
  ```json
  {
    "id": "lineup_123",
    "userId": "user_123",
    "contestId": "c1",
    "lineup": [
      {
        "position": "FWD",
        "player": { "id": "p1", "name": "Haaland", ... }
      },
      ...
    ],
    "submittedAt": "2023-10-27T10:10:00Z",
    "locked": false,
    "totalSalary": 98000
  }
  ```

### Submit Lineup
Submit or update a lineup for a contest.

- **URL:** `/contests/:contestId/lineup`
- **Method:** `POST` (or `PUT`)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "lineup": [
      {
        "position": "FWD",
        "playerId": "p1"
      },
      {
        "position": "MID",
        "playerId": "p3"
      },
      ...
    ],
    "totalSalary": 98000
  }
  ```
- **Response:** `200 OK`
  ```json
  {
    "id": "lineup_123",
    "status": "submitted",
    ...
  }
  ```

## Players

### List Players
Retrieve a list of all players available for drafting.

- **URL:** `/players`
- **Method:** `GET`
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "p1",
      "name": "Erling Haaland",
      "team": "Man City",
      "position": "FWD",
      "salary": 12000,
      "stats": { "points": 24, "goals": 12, ... },
      "imageUrl": "..."
    },
    ...
  ]
  ```

## Live Updates

### Live Contest Events
Get live events for scoring updates.

- **URL:** `/live/events`
- **Method:** `GET` (or WebSocket)
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "e1",
      "type": "GOAL",
      "player": "Haaland",
      "match": "MCI vs LIV",
      "team": "Man City",
      "minute": 24,
      "points": 10
    },
    ...
  ]
  ```

## Statistics & Analytics

### Get League Table
Retrieve the current season's league standings.

- **URL:** `/stats/league-table`
- **Method:** `GET`
- **Response:** `200 OK`
  ```json
  [
    {
      "pos": 1,
      "name": "Liverpool",
      "gp": 24,
      "w": 16,
      "d": 6,
      "l": 2,
      "gf": 55,
      "ga": 23,
      "gd": 32,
      "pts": 54
    },
    ...
  ]
  ```

### Get Top Performing Players
Retrieve list of top players by fantasy points.

- **URL:** `/stats/top-players`
- **Method:** `GET`
- **Query Params:**
  - `limit`: Number of players to return (default: 10)
- **Response:** `200 OK`
  ```json
  [
    {
      "id": "p1",
      "name": "Erling Haaland",
      "team": "Man City",
      "position": "FWD",
      "points": 142
    },
    ...
  ]
  ```

### Get User Statistics
Retrieve performance statistics for a specific user.

- **URL:** `/users/:id/stats`
- **Method:** `GET`
- **Response:** `200 OK`
  ```json
  {
    "rank": 1245,
    "totalPoints": 2450,
    "activeContests": 2,
    "pointsThisWeek": 156
  }
  ```

## Admin Analytics

### Get Admin Dashboard Stats
Retrieve high-level platform metrics for the admin dashboard.

- **URL:** `/admin/stats`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`
  ```json
  {
    "totalUsers": 3412,
    "activeContests": 14,
    "completionRate": 0.88,
    "mobileUsers": 0.62
  }
  ```

### Get System Health
Retrieve status of system components.

- **URL:** `/admin/system-health`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`
  ```json
  [
    {
      "label": "Scoring Engine",
      "status": "Operational",
      "lastRun": "2023-10-27T10:30:00Z"
    },
    ...
  ]
  ```

### Get Activity Log
Retrieve recent administrative actions and system events.

- **URL:** `/admin/activity-log`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <admin_token>`
- **Response:** `200 OK`
  ```json
  [
    {
      "text": "Scoring completed for Premier League WK24",
      "time": "2023-10-27T10:30:00Z",
      "user": "Admin (Sergio)"
    },
    ...
  ]
  ```

## Data Types

### User
| Field | Type | Description |
|---|---|---|
| id | String | Unique user ID |
| email | String | User email |
| username | String | Display name |
| joinedAt | String (ISO 8601) | Registration usage date |
| stats | Object | User performance stats |

### Contest
| Field | Type | Description |
|---|---|---|
| id | String | Unique contest ID |
| title | String | Contest name |
| status | Enum | `draft`, `open`, `locked`, `completed` |
| entryFee | Number | Cost to enter |
| prizePool | String | Total prize pool |
| salaryCap | Number | Max salary for lineup |

### Player
| Field | Type | Description |
|---|---|---|
| id | String | Unique player ID |
| name | String | Player name |
| team | String | Real-world team |
| position | Enum | `GK`, `DEF`, `MID`, `FWD` |
| salary | Number | Cost to draft |
