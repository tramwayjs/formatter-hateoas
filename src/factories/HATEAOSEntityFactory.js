import {Factory} from 'tramway-core-connection';
import { HATEAOSEntity } from '../entities';
import { HATEAOSCollection } from '../collections';
import pluralize from 'pluralize';

/**
 * @abstract
 * @export
 * @class HATEAOSEntityFactory
 */
export default class HATEAOSEntityFactory extends Factory {

    /**
     * @param {Entity} item
     * @returns {HATEAOSEntity}
     * 
     * @memberOf HATEAOSEntityFactory
     */
    create(item) {
        return new HATEAOSEntity().setEntity(item);
    }

    /**
     * 
     * @param {Collection} collection 
     * @returns {HATEAOSCollection}
     */
    createCollection(collection) {
        let items = new HATEAOSCollection();

        for (let entity of collection.getEntities()) {
            let name = entity.constructor.name.toLowerCase();
            items.add(pluralize.plural(name), this.create(entity));
        }

        return items;
    }

}