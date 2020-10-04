---
title: Carousels
---

# Get Carousels

Gets a list of Carousel objects.
The response is a JSON payload consisting of a `carousels` field containing an array of the carousel data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/carousels
```

#### Example Request

```bash
curl -X GET "https://umwics.vercel.app/api/v1/carousels"
```

#### Example Response

```json
{
    "carousels": [
        {
            "id": "H6E4D6iJOinPCRYYjlZQ",
            "name": "name",
            "autoplay": true,
            "indicators": true,
            "interval": 4000,
            "timeout": 500,
            "startAt": 0,
            "slides": [
                {
                    "title": "title",
                    "subtitle": "subtitle",
                    "body": "body",
                    "linkName": "cool site",
                    "linkHref": "https://umwics.vercel.app",
                    "linkAs": "",
                    "position": 0,
                    "alt": "animage",
                    "image": "https://animageurl.com"
                }
            ]
        }
    ]
}
```

# Get Carousel By Id

Gets a Carousel object by its ID.
The response is a JSON payload consisting of the carousel data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/carousels/[id]
```

#### Example Request

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/carousels/H6E4D6iJOinPCRYYjlZQ'
```

#### Example Response

```json
{
    "id": "H6E4D6iJOinPCRYYjlZQ",
    "name": "name",
    "autoplay": true,
    "indicators": true,
    "interval": 4000,
    "timeout": 500,
    "startAt": 0,
    "slides": [
        {
            "title": "title",
            "subtitle": "subtitle",
            "body": "body",
            "linkName": "cool site",
            "linkHref": "https://umwics.vercel.app",
            "linkAs": "",
            "position": 0,
            "alt": "animage",
            "image": "https://animageurl.com"
        }
    ]
}
```
