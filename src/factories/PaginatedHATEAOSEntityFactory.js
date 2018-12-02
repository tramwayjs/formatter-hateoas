import HATEAOSEntityFactory from './HATEAOSEntityFactory';
import {PaginatedHATEAOSCollection} from '../collections';
import pluralize from 'pluralize';

/**
 * @abstract
 * @export
 * @class PaginatedHATEAOSEntityFactory
 */
export default class PaginatedHATEAOSEntityFactory extends HATEAOSEntityFactory {

    /**
     * 
     * @param {Collection} collection 
     * @returns {PaginatedHATEAOSCollection}
     */
    createCollection(collection) {
        let items = new PaginatedHATEAOSCollection()
            .setPage(collection.getPage())
            .setLimit(collection.getLimit())
            .setPages(collection.getPages())
            .setTotal(collection.getTotal());

        for (let entity of collection.getEntities()) {
            let name = entity.constructor.name.toLowerCase();
            items.add(pluralize.plural(name), this.create(entity));
        }

        return items;
    }

}