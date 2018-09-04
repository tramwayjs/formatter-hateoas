import HATEAOSCollection from './HATEAOSCollection';

export default class PaginatedHATEAOSCollection extends HATEAOSCollection {
    page;
    limit;
    pages;
    total;

    getPage() {
        return this.page;
    }

    getLimit() {
        return this.limit;
    }

    getPages() {
        return this.pages();
    }

    getTotal() {
        return this.total;
    }

    setPage(page) {
        this.page = page;
        return this;
    }

    setLimit(limit) {
        this.limit = limit;
        return this;
    }

    setPages(pages) {
        this.pages = pages;
        return this;
    }

    setTotal(total) {
        this.total = total;
        return this;
    }

    generateLinks(urlGenerator, req) {
        this.addLink("self", urlGenerator.generateCurrent(req));

        if (this.page < this.pages) {
            this.addLink("next", urlGenerator.generateNext(req));
        }

        if (this.page > 1) {
            this.addLink("previous", urlGenerator.generatePrevious(req));
        }
        
        return this;
    }
}