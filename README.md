Tramway HATEAOS Formatter is a request formatter that can be used with the Tramway Router to create a HAL/HATEAOS formatted REST API. It includes:

1. A HATEAOSFormatter for requests.
2. A MimeTypeResolver to add formats for different content-type headers.
3. A paginated variant to handle pagination.

# Installation:
1. `npm install --save tramway-formatter-hateaos`
2. Requires `tramway-core-router` to be already installed.

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

# Advanced Configuration

The `HATEAOSFormatter` can take additional parameters: `MimeTypeResolver, UrlGenerator`. Both of these are automatically set if they aren't explicitly added to the constructor arguments. The `MimeTypeResolver` handles the output for different content-type headers. The `UrlGenerator` handles the generation of urls for the HATEAOS decorators' links.