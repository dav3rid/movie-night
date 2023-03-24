# movie-night

Available endpoints

- GET /api ❌

- GET /api/genres ✅
  - Queries
    - `sort_by` - `genre`
    - `order` - `asc`, `desc`
- POST /api/genres

  - Request Body
    - `{ "genre": "new genre name" }`

- GET /api/genres/:genre_id
- PATCH /api/genres/:genre_id

  - Request Body
    - `{ "genre": "updated genre name" }`

- GET /api/certificates

- GET /api/directors

  - Queries
    - `sort_by` - `name`
    - `order` - `asc`, `desc`

- POST /api/directors

  - Request Body
    - `{ "name": "new director name" }`

- GET /api/directors/:director_id
- PATCH /api/directors/:director_id

  - Request Body
    - `{ "name": "updated director name" }`

- GET /api/movies

  - Queries
    - `sort_by` - `title`, `runtime`, `genre`, `director`, `certificate`
    - `order` - `asc`, `desc`
    - `genre` - string
      - 200 if exists, otherwise 404
    - `certificate` - `U`, `PG`, `12`, `15`, `18`
      - 200 if exists, otherwise 404
    - `director` - string
      - 200 if exists, otherwise 404

- POST /api/movies

  - Request Body
    - `{ "title": string, "runtime": number, "genre_id": existing genre_id, "director_id": existing director_id, "certificate": existing certificate_id }`

- GET /api/movies/:movie_id
- PATCH /api/movies/:movie_id
  - Request Body
    - `{ "title": string, "runtime": number, "genre_id": existing genre_id, "director_id": existing director_id, "certificate": existing certificate_id }`
    - All fields optional

musical is genre with no associated movies
hosted at: https://movie-night-bfro.onrender.com
