import {ResponseFormatter} from 'tramway-core-router';
import UrlGenerator from './UrlGenerator';
import MimeTypeResolver from './MimeTypeResolver';
import HATEOASItem from '../HATEOASItem';

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
     * @param {HATEOASItem} content 
     * @param {Object} options
     */
    send(response, content, options = {}) {
        const {req} = response;
        content.generateLinks(this.urlGenerator, req);

        let {links = [], embedded} = options;

        links = Array.isArray(links) ? links : Object.values(links);
        
        if (links.length) {
            links.forEach(({link, label, formatted = false}) => {
                content.addLink(label, formatted ? link : this.urlGenerator.generateAppended(req, link));
            });
        }

        if (embedded) {
            content.setEmbedded(embedded);
        }

        let format = this.mimeTypeResolver.format(response, content);

        return response
            .links(content.getLinksHeader())
            .format(format);
    }
}