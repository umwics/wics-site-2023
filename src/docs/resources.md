---
title: Resources
---

# Get Resources

Gets a list of Resource objects.
The response is a JSON payload consisting of a `resources` field containing an array of the resource data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/resources
```

#### Example Request

```bash
curl -X GET "https://umwics.vercel.app/api/v1/resources"
```

#### Example Response

```json
{
    "resource": [
        {
            "id": "UAcL8OxVSdyx5jD4Owem",
            "name": "name",
            "title": "title",
            "description": "i am a description",
            "types": ["learnToCode"],
            "link": "https://umwics.vercel.app",
            "image": "https://animageurl.com"
        }
    ]
}
```

# Get Resource By Id

Gets a Resource object by its ID.
The response is a JSON payload consisting of the resource data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/resources/[id]
```

#### Example Request

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/resources/UAcL8OxVSdyx5jD4Owem'
```

#### Example Response

```json
{
    "id": "UAcL8OxVSdyx5jD4Owem",
    "name": "name",
    "title": "title",
    "description": "i am a description",
    "types": ["learnToCode"],
    "link": "https://umwics.vercel.app",
    "image": "https://animageurl.com"
}
```
