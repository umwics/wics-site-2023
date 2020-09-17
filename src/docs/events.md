---
title: Events
---

# Get Events

Gets a list of Event objects.
The response is a JSON payload consisting of a `events` field containing an array of the event data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/events
```

#### Example Request

```bash
curl -X GET "https://umwics.vercel.app/api/v1/events"
```

#### Example Response

```json
{
    "events": [
        {
            "id": "UAcL3OxVSdyx5jD4Pwem",
            "name": "SkipTheDishes",
            "title": "2020 Winter SkipTheDishes",
            "term": "2020",
            "location": "SkipTheDishes, Winnipeg, MB",
            "description": "i am a description",
            "date": "2020-01-22T06:00:00.000Z",
            "photoCredits": ["@tylerloewenphotos"],
            "images": ["https://animageurl.com", "https://asecondimageurl.com"]
        }
    ]
}
```

# Get Event By Id

Gets an Event object by its ID.
The response is a JSON payload consisting of the event data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/events/[id]
```

#### Example Request

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/events/UAcL3OxVSdyx5jD4Pwem'
```

#### Example Response

```json
{
    "id": "UAcL3OxVSdyx5jD4Pwem",
    "name": "SkipTheDishes",
    "title": "2020 Winter SkipTheDishes",
    "term": "2020",
    "location": "SkipTheDishes, Winnipeg, MB",
    "description": "i am a description",
    "date": "2020-01-22T06:00:00.000Z",
    "photoCredits": ["@tylerloewenphotos"],
    "images": ["https://animageurl.com", "https://asecondimageurl.com"]
}
```
