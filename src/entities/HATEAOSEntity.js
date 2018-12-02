import {Entity} from 'tramway-core-connection';

export default class HATEAOSEntity extends Entity {
    _links = {};

    getId() {
        return this.id;
    }

    addLink(label, href) {
        this._links[label] = {href};
        return this;
    }

    getLinks() {
        return this._links;
    }

    getLinksHeader() {
        let links = {};

        for (let label in this._links) {
            links[label] = this._links[label].href;
        }
        
        return links;
    }

    getLink(label) {
        if (!(label in this._links)) {
            return null;
        }

        return this._links[label].href;
    }

    setEntity(entity) {
        for (let key in entity) {
            this[key] = entity[key];
        }

        this.id = entity.getId();

        return this;
    }

    getEntity() {
        let entity = new Entity();
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