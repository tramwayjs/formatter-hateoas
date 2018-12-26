Tramway HATEAOS Formatter is a request formatter that can be used with the Tramway Router to create a HAL/HATEAOS formatted REST API. It includes:

1. A HATEAOSFormatter for requests.
2. A MimeTypeResolver to add formats for different content-type headers.
3. A paginated variant to handle pagination.

# Installation:
1. `npm install --save tramway-formatter-hateaos`
2. Requires `tramway-core-router` version 3.3.0+ to be already installed.

# Getting Started

With dependency injection you can add the following entries to your services config files.

Add the `HATEAOSFormatter` to `src/config/services/services.js`

```javascript
import HATEAOSFormatter from 'tramway-formatter-hateaos';

export default {
    "service.formatter": {
        "class": HATEAOSFormatter,
        "constructor": [
            {"type": "service", "key": "factory.hateaos"}
        ]
    }
};
```

Add the `HATEAOSEntityFactory` or `PaginatedHATEAOSEntityFactory` to `src/config/services/factories.js`

> Note, the `PaginatedHATEAOSEntityFactory` may not yield expected results at this time because it will require adding pagination support to tramway-core-connection.

```javascript
import { HATEAOSEntityFactory, PaginatedHATEAOSEntityFactory } from 'tramway-formatter-hateaos';

export default {
    "factory.hateaos": {
        "class": HATEAOSEntityFactory,
    },
};
```

Finally, ensure your `RestfulController` in `src/config/services/controllers.js`

```javascript
import {
    SampleController,
} from '../../controllers';

export default {
    "controller.sample": {
        "class": SampleController,
        "constructor": [
            {"type": "service", "key": "router"},
            {"type": "service", "key": "service.sample"},
            {"type": "service", "key": "service.formatter"},
        ],
        "functions": []
    },
};
```

If you intend to use the library to process responses from APIs using HATEAOS format, add the Provider decorator to your `src/config/services/providers.js`:

```javascript
import {providers} from 'tramway-formatter-hateaos';
const {HATEAOSAPIProvider} = providers;

export default {
    "provider.hateaos": {
        "class": HATEAOSAPIProvider,
        "constructor": [
            {"type": "service", "key": "provider.api"},
            {"type": "service", "key": "factory.hateaos"},
            {"type": "parameter", "key": "api_resource"},
        ],
        "functions": []
    }
}
```

Then in the repository where you'd normally use `provider.api`, use `provider.hateaos` instead. Note that this requires you set up the `tramway-connection-rest-api` and set up the provider for it as indicated by `provider.api`. The `api_resource` parameter is a string with the name of the key under the `_embedded` object of the response.

# Usage

In a `RestfulController` that has access to the Formatter you can:

Format an entity

```javascript
let formattedItem = this.formatter.formatEntity(entity);
```

Format a collection

```javascript
let formattedItem = this.formatter.formatCollection(collection)
```

To send a response with the formatted item.

```javascript
this.formatter.send(res, formattedItem, options);
```

In an API context, you can process REST API responses that use HATEAOS by using the included `HATEAOSAPIProvider` decorator on the `APIProvider`. This will automatically convert all HATEAOS responses from the host API to the standard `Collection`s and `Entity`s that are expected from the `Provider`.

## Adding additional links
The `HATEAOSFormatter` will automatically generate entities and collections with their respective self and paginated properties. However, more complex APIs will have additional links for other resources and sub-resources.

The `HATEAOSEntity` and `HATEAOSCollection` both have `addLink` methods which let you assign a link and label as part of this metadata. However, in most cases, these objects will not be accessible in the controller action since the formatting has been abstracted at that point.

To solve this problem, the `send` method now includes a third parameter to pass options. The `HATEAOSFormatter` takes a `links` option which will accept an array of the following form and add each link to the links of the respective item.

```javascript
[
    {"label": "subresources", "link": "subresources", "formatted": false}
]
```

The link itself is intended to be relative so in the case of a subresource, the url formatting will just append the link. In more custom situations, the link can be given an absolute url and it will be used as long as `formatted` is set to true.

When using the additional links with the `RestfulController`, it will not be possible to access the action directly so in that case the aforementioned configuration would need to be assigned to the route in the configuration, except in cases where a controller action is custom.

```javascript
{
    "arguments": ["id"],
    "methods": ["get"],
    "path": "resource",
    "controller": "controllers.resource",
    "action": "getOne",
    "links": [
        {"label": "subresources", "link": "subresources", "formatted": false},
        {"label": "custom", "link": "http://localhost/resource/1/custom/5", "formatted": true}
    ]
},
```

This routing config will produce the following result when called `GET http://localhost/resource/1`:

```json
{
    "id": 1,
    "_links": {
        "self": {
            "href": "http://localhost/resource/1"
        },
        "subresources": {
            "href": "http://localhost/resource/1/subresources"
        },
        "custom": {
            "href": "http://localhost/resource/1/custom/5"
        }
    }
}
```

Gives:

# Advanced Configuration

The `HATEAOSFormatter` can take additional parameters: `MimeTypeResolver, UrlGenerator`. Both of these are automatically set if they aren't explicitly added to the constructor arguments. The `MimeTypeResolver` handles the output for different content-type headers. The `UrlGenerator` handles the generation of urls for the HATEAOS decorators' links.