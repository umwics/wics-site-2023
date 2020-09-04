---
title: Docs v1
---

# UMWics API Docs

---

## Introduction

The UMWics API provieds access to the data for this, <https://umwics.vercel.app>, website. Although the API was built for our site, we allow anyone to use the API as it's a great way to learn how to interface with API's. You don't need an API key to make "read" API calls (GET requests), however if you want to write data with our API you will need to request access from the WICS Website committee.

---

## Setup

To make calls to the API you just need to specify the URL to the data you wish to access. For example if you want to access all the UMWics members you can send a request to `https://umwics.vercel.app/api/v1/members` and you will get a JSON response with a list of our members.

---

## Sample Code

Below is some sample code in various languages showing how to use our API.

---

#### Python

```python
import requests

url = "https://umwics.vercel.app/api/v1/members"
response = requests.get(url)

print(response.status_code) # 200
print(response.json()) # { 'members': [ { 'id': 'UAcL...', ... }, ... ] }
```

---

#### Java

```java
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.net.URI;

import org.json.JSONObject;

public class Main {
    public static void main(String[] args) {
        String url = "https://umwics.vercel.app/api/v1/members";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .build();
        client.sendAsync(request, BodyHandlers.ofString())
            .thenApply(HttpResponse::body)
            .thenApply(JSONObject::new) // If you want to work with JSON
            .thenAccept(System.out::println) // { "members": [ { "id": "UAcL...", ... }, ... ] }
            .join();
    }
}
```

---

#### Javascript

```javascript
const url = "https://umwics.vercel.app/api/v1/members";

fetch(url)
    .then(response => response.json())
    .then(console.log) // { members: [ { id: "UAcL...", ... }, ... ] }
    .catch(console.error);
```

---

#### Javascript (Node.js)

```javascript
const fetch = require("node-fetch"); // import fetch from "node-fetch"; if you are using esm

const url = "https://umwics.vercel.app/api/v1/members";

fetch(url)
    .then(response => response.json())
    .then(console.log) // { members: [ { id: "UAcL...", ... }, ... ] }
    .catch(console.error);
```

---

#### With curl

```bash
curl -X GET "https://umwics.vercel.app/api/v1/members" # { "members": [ { "id": "UAcL...", ... }, ... ] }
```

---

## What's Next?

Now that you have a way to request the data, you can checkout the specific endpoints in the sidebar for further details in what form the data is served in.
