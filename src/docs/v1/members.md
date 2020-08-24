---
title: Members
---

# Get Members

Gets a list of Member objects.

The response is a JSON payload consisting of a `members` field containing an array of the member data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/members
```

#### Example Request

---

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/members'
```

#### Example Response

---

```json
{
    "members": [
        {
            "id": "UAcL9OxVSdyx5jD4Owem",
            "description": "i am a description",
            "name": "name",
            "facts": ["i am a fact"],
            "email": "thisaintanemail@test.com",
            "title": "title",
            "displayName": "docs",
            "links": [{ "title": "cool site", "link": "https://umwics.vercel.app" }],
            "image": "https://animageurl.com"
        }
    ]
}
```

# Get Member By Id

Gets a Member object by its ID.

The response is a JSON payload consisting of the member data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/members/[id]
```

#### Example Request

---

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/members/UAcL9OxVSdyx5jD4Owem'
```

#### Example Response

---

```json
{
    "id": "UAcL9OxVSdyx5jD4Owem",
    "description": "i am a description",
    "name": "name",
    "facts": ["i am a fact"],
    "email": "thisaintanemail@test.com",
    "title": "title",
    "displayName": "docs",
    "links": [{ "title": "cool site", "link": "https://umwics.vercel.app" }],
    "image": "https://animageurl.com"
}
```
