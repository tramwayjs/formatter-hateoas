import {Entity} from 'tramway-core-connection';
import HATEOASItem from '../HATEOASItem';

export default class HATEAOSEntity extends HATEOASItem {
    getId() {
        return this.id;
    }

    setEntity(entity) {
        for (let key in entity) {
            this[key] = entity[key];
        }

        this.id = entity.getId();

        return this;
    }

    getEntity() {
        let entity = new class extends Entity {
            getId() {
                return this.id;
            }
        }();

        for (let key in this) {
            if ('_links' === key || 'function' === typeof this[key] || this[key] instanceof Function) {
                continue;
            }

            entity[key] = this[key];
        }
        return entity;
    }

    generateLinks(urlGenerator, req, appendId = false) {
        let link = urlGenerator.generateCurrent(req);

        if (appendId) {
            link += `/${this.getId()}`;
        }

        this.addLink("self", link);
        return this;
    }
}