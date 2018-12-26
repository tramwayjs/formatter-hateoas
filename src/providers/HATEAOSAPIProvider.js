import {Provider, Collection} from 'tramway-core-connection';

/**
 * @abstract
 * @export
 * @class HATEAOSAPIProvider
 */
export default class HATEAOSAPIProvider extends Provider {
    constructor(apiProvider, hateaosFactory, resource) {
        super();
        this.apiProvider = apiProvider;
        this.hateaosFactory = hateaosFactory;
        this.resource = resource;
    }

    /**
     * @param {number|string} id
     * @returns {Promise<Object>}
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async getOne(id) {
        let decoratedEntity = await this.apiProvider.getOne(id);
        decoratedEntity = this.hateaosFactory.createEntityFromResponse(decoratedEntity);

        if (!decoratedEntity) {
            return;
        }

        return decoratedEntity.getEntity();
    }

    /**
     * @param {string[] | number[]} ids
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async getMany(ids) {
        let decoratedCollection = await this.apiProvider.getMany(ids);
        decoratedCollection = this.hateaosFactory.createCollectionFromResponse(decoratedCollection);
        return this.createCollection(decoratedCollection);
    }

    /**
     * @memberOf HATEAOSAPIProvider
     */
    async get() {
        let decoratedCollection = await this.apiProvider.get();
        decoratedCollection = this.hateaosFactory.createCollectionFromResponse(decoratedCollection);
        return this.createCollection(decoratedCollection);
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async find(conditions) {
        let decoratedCollection = await this.apiProvider.find(conditions);
        decoratedCollection = this.hateaosFactory.createCollectionFromResponse(decoratedCollection);
        return this.createCollection(decoratedCollection);
    }

    /**
     * @param {number|string} id
     * @returns {Promise<boolean>}
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async has(id) {
        return await this.apiProvider.has(id);
    }

    /**
     * @param { string[] | number[] } ids
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async hasThese(ids) {
        return await this.apiProvider.hasThese(ids);
    }

    /**
     * @param {string | Object} conditions
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async count(conditions) {
        return await this.apiProvider.count(conditions);
    }

    /**
     * @param {Object} item
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async create(item) {
        return await this.apiProvider.create(item);
    }

    /**
     * @param {number|string} id
     * @param {Object} item
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async update(id, item) {
        return await this.apiProvider.update(id, item);
    }

    /**
     * @param {number|string} id
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async delete(id) {
        return await this.apiProvider.delete(id);
    }

    /**
     * @param { number[] | string[]} id
     * 
     * @memberOf HATEAOSAPIProvider
     */
    async deleteMany(ids) {
        return await this.apiProvider.deleteMany(ids);
    }

    createCollection(hateaosCollection) {
        let collection = new Collection();

        hateaosCollection.getCollection(this.resource).forEach(item => {
            collection.add(item.getEntity());
        })

        return collection;
    }

}