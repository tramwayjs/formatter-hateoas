import * as collections from './collections';
import * as entities from './entities';
import * as providers from './providers';
import { services } from './config';
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
    services,
    collections,
    entities,
    providers,
}