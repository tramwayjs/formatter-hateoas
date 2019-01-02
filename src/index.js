import * as collections from './collections';
import * as entities from './entities';
import * as providers from './providers';
import {
    HATEAOSEntityFactory,
    PaginatedHATEAOSEntityFactory,
} from './factories';
import {
    HATEAOSFormatter,
    MimeTypeResolver,
    UrlGenerator,
} from './services';
import HATEOASItem from './HATEOASItem';

export default HATEAOSFormatter;

export {
    HATEAOSEntityFactory,
    PaginatedHATEAOSEntityFactory,
    MimeTypeResolver,
    UrlGenerator,
    HATEOASItem,
    collections,
    entities,
    providers,
}