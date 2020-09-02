---
title: Companies
---

# Get Companies

Gets a list of Company objects.

The response is a JSON payload consisting of a `companies` field containing an array of the company data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/companies
```

#### Example Request

---

```bash
curl -X GET "https://umwics.vercel.app/api/v1/companies"
```

#### Example Response

---

```json
{
    "companies": [
        {
            "id": "eaMkbb2IALVzRBcw4p4y",
            "name": "name",
            "displayName": "company",
            "email": "thisaintanemail@test.com",
            "description": "i am a description",
            "links": [{ "title": "cool site", "link": "https://umwics.vercel.app" }],
            "members": [
                {
                    "memberId": "UAcL9OxUSdyx5jD4Owem",
                    "term": "2019",
                    "tools": ["React", "Docker", "Terraform", "Kafka"]
                }
            ],
            "image": "https://animageurl.com"
        }
    ]
}
```

# Get Company By Id

Gets a Company object by its ID.

The response is a JSON payload consisting of the company data.

### URL

```bash
GET https://umwics.vercel.app/api/v1/companies/[id]
```

#### Example Request

---

```bash
curl -X GET 'https://umwics.vercel.app/api/v1/companies/eaMkbb2IALVzRBcw4p4y'
```

#### Example Response

---

```json
{
    "id": "eaMkbb2IALVzRBcw4p4y",
    "name": "name",
    "displayName": "company",
    "email": "thisaintanemail@test.com",
    "description": "i am a description",
    "links": [{ "title": "cool site", "link": "https://umwics.vercel.app" }],
    "members": [
        {
            "memberId": "UAcL9OxUSdyx5jD4Owem",
            "term": "2019",
            "tools": ["React", "Docker", "Terraform", "Kafka"]
        }
    ],
    "image": "https://animageurl.com"
}
```
