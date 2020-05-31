import {HATEAOSEntityFactory, PaginatedHATEAOSEntityFactory} from '../../factories';
import {HATEAOSFormatter, MimeTypeResolver, UrlGenerator} from '../../services';

export default {
    "hateoas.service.formatter": {
        "class": HATEAOSFormatter,
        "constructor": [
            {"type": "service", "key": "hateoas.factory.basic"}
        ]
    },
    "hateoas.service.formatter:paginated": {
        "class": HATEAOSFormatter,
        "constructor": [
            {"type": "service", "key": "hateoas.factory.paginated"},
            {"type": "service", "key": "hateoas.service.mimetyperesolver"},
            {"type": "service", "key": "hateoas.service.urlgenerator"},
        ]
    },
    "hateoas.service.mimetyperesolver": {
        "class": MimeTypeResolver,
        "constructor": []
    },
    "hateoas.service.urlgenerator": {
        "class": UrlGenerator,
        "constructor": []
    },
    "hateoas.factory.basic": {
        "class": HATEAOSEntityFactory,
    },
    "hateoas.factory.paginated": {
        "class": PaginatedHATEAOSEntityFactory,
    },
};
