---
title: Users
---

# Get Users

Gets a list of User objects.
The response is a JSON payload consisting of a `users` field containing an array of the user data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/users
```

#### Example Request

```bash
curl -X GET "https://umwics.vercel.app/api/v1/users"
```

#### Example Response

```json
{
    "users": [
        {
            "id": "6awm7AyVZdbnPdk6jdJiGWAJFr93",
            "email": "thisaintanemail@test.com",
            "role": "owner",
            "username": "Username",
            "avatarURL": "https://animageurl.com",
            "provider": "google.com"
        }
    ]
}
```

# Get User By Id

Gets a User object by its ID.
The response is a JSON payload consisting of the user data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/users/[id]
```

#### Example Request

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/users/6awm7AyVZdbnPdk6jdJiGWAJFr93'
```

#### Example Response

```json
{
    "id": "6awm7AyVZdbnPdk6jdJiGWAJFr93",
    "email": "thisaintanemail@test.com",
    "role": "owner",
    "username": "Username",
    "avatarURL": "https://animageurl.com",
    "provider": "google.com"
}
```
