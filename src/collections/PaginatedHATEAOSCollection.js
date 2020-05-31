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
        super.generateLinks(urlGenerator, req);

        this.addLink("self", urlGenerator.generatePage(req, {limit: this.limit, page: this.page, pages: this.pages}));

        if (this.page < this.pages) {
            this.addLink("next", urlGenerator.generateNext(req, {limit: this.limit, page: this.page, pages: this.pages}));
            this.addLink("last", urlGenerator.generateLast(req, {limit: this.limit, page: this.page, pages: this.pages}));
        }

        if (this.page > 1) {
            this.addLink("first", urlGenerator.generateFirst(req, {limit: this.limit, page: this.page, pages: this.pages}));
            this.addLink("previous", urlGenerator.generatePrevious(req, {limit: this.limit, page: this.page, pages: this.pages}));
        }
        
        return this;
    }
}