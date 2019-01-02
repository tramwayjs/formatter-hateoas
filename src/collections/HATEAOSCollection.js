import {Collection} from 'tramway-core-connection';
import HATEOASItem from '../HATEOASItem';

export default class HATEAOSCollection extends HATEOASItem {
    _embedded = {};

    add(resource, entity) {
        if (!(resource in this._embedded)) {
            this._embedded[resource] = [];
        }

        this._embedded[resource].push(entity);
        return this;
    }

    getCollection(resource) {
        let collection = new Collection();

        if (!this._embedded[resource]) {
            return collection;
        }
        
        this._embedded[resource].forEach(item => {
            collection.add(item);
        });
        
        return collection;
    }    

    generateLinks(urlGenerator, req) {
        this.addLink("self", urlGenerator.generateCurrent(req));

        for (let resource in this._embedded) {
            this._embedded[resource] = this._embedded[resource].map(item => item.generateLinks(urlGenerator, req, true))
        }

        return this;
    }
}