import {Factory, Entity} from 'tramway-core-connection';
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

    createCollectionFromResponse(items) {
        const {_embedded, _links} = items;

        let decoratedCollection = new HATEAOSCollection();

        for (let key in _embedded) {
            _embedded[key].forEach(item => {
                decoratedCollection.add(key, this.createEntityFromResponse(item));
            })
        }

        for (let key in _links) {
            decoratedCollection.addLink(key, _links[key].href);
        }

        return decoratedCollection;
    }

    createEntityFromResponse(item) {
        const {_links, id, ...data} = item;

        let decoratedEntity = new HATEAOSEntity();

        let entity = new class extends Entity{
            getId() {
                return this.id;
            }

            setId(id) {
                this.id = id;
                return this;
            }
        }();

        entity.setId(id);

        for (let key in data) {
            entity[key] = data[key];
        }

        decoratedEntity.setEntity(entity);

        for (let key in _links) {
            decoratedEntity.addLink(key, _links[key].href);
        }

        return decoratedEntity;
    }

}