---
title: Social Links
---

# Get Social Links

Gets a list of Social Link objects.
The response is a JSON payload consisting of a `links` field containing an array of the link data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/sociallinks
```

#### Example Request

```bash
curl -X GET "https://umwics.vercel.app/api/v1/sociallinks"
```

#### Example Response

```json
{
    "links": [
        {
            "id": "UAcL8OxVSdyx5mD4Oxem",
            "title": "title",
            "subheader": "subheader",
            "body": "body",
            "linkName": "https://linktr.ee/umwics",
            "linkHref": "https://linktr.ee/umwics"
        }
    ]
}
```

# Get Social Link By Id

Gets a Social Link object by its ID.
The response is a JSON payload consisting of the link data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/sociallinks/[id]
```

#### Example Request

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/sociallinks/UAcL8OxVSdyx5mD4Oxem'
```

#### Example Response

```json
{
    "id": "UAcL8OxVSdyx5mD4Oxem",
    "title": "title",
    "subheader": "subheader",
    "body": "body",
    "linkName": "https://linktr.ee/umwics",
    "linkHref": "https://linktr.ee/umwics"
}
```
