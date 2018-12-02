export default class HATEAOSCollection {
    _embedded = {};
    _links = {};

    add(resource, entity) {
        if (!(resource in this._embedded)) {
            this._embedded[resource] = [];
        }

        this._embedded[resource].push(entity);
        return this;
    }

    getCollection(resource) {
        return this._embedded[resource];
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

    generateLinks(urlGenerator, req) {
        this.addLink("self", urlGenerator.generateCurrent(req));

        for (let resource in this._embedded) {
            this._embedded[resource] = this._embedded[resource].map(item => item.generateLinks(urlGenerator, req, true))
        }

        return this;
    }
}