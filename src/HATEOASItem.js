export default class HATEOASItem {
    _links = {};
    _embedded;

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

    getEmbedded(label) {
        return this._embedded && this._embedded[label];
    }

    setEmbedded(embedded) {
        if (!this._embedded) {
            this._embedded = {};
        }

        for (let key in embedded) {
            this._embedded[key] = embedded[key];
        }

        return this;
    }

    addEmbedded(label, item) {
        if (!this._embedded) {
            this._embedded = {};
        }

        this._embedded[label] = item;
        return this;
    }
}