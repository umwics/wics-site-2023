---
title: Users
---

# Get Users

Gets a list of User objects.

The response is a JSON payload consisting of a `users` field containing an array of the user data.

#### Example Response

---

```json
{
    "users": [
        {
            "id": "6awm7AyVZdbnPdk6jdJiGWAJFr93",
            "email": "shroudedoasis@gmail.com",
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

#### Example Response

---

```json
{
    "id": "6awm7AyVZdbnPdk6jdJiGWAJFr93",
    "email": "shroudedoasis@gmail.com",
    "role": "owner",
    "username": "Username",
    "avatarURL": "https://animageurl.com",
    "provider": "google.com"
}
```
