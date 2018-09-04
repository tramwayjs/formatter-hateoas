import {ResponseFormatter} from 'tramway-core-router';
import UrlGenerator from './UrlGenerator';
import MimeTypeResolver from './MimeTypeResolver';

export default class HATEAOSFormatter extends ResponseFormatter {
    constructor(factory, mimeTypeResolver, urlGenerator) {
        super();
        this.factory = factory;
        this.mimeTypeResolver = mimeTypeResolver || new MimeTypeResolver();
        this.urlGenerator = urlGenerator || new UrlGenerator();
    }

     /**
     * 
     * @param {Entity} entity 
     */
    formatEntity(entity) {
        return this.factory.create(entity);
    }

    /**
     * 
     * @param {Collection} collection 
     */
    formatCollection(collection) {
        return this.factory.createCollection(collection);
    }

    /**
     * 
     * @param {Response} response 
     * @param {Object} content 
     */
    send(response, content) {
        const {req} = response;
        content.generateLinks(this.urlGenerator, req);

        let format = this.mimeTypeResolver.format(response, content);

        return response
            .links(content.getLinksHeader())
            .format(format);
    }
}