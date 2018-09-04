import * as collections from './collections';
import * as entities from './entities';
import {
    HATEAOSEntityFactory,
    PaginatedHATEAOSEntityFactory,
} from './factories';
import {
    HATEAOSFormatter,
    MimeTypeResolver,
    UrlGenerator,
} from './services';

export default HATEAOSFormatter;

export {
    HATEAOSEntityFactory,
    PaginatedHATEAOSEntityFactory,
    MimeTypeResolver,
    UrlGenerator,
    collections,
    entities,
}