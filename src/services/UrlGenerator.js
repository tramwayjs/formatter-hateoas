export default class UrlGenerator {
    generateCurrent(req) {
        const {url} = req;
        return this.generateUrl(req, url);
    }

    generateUrl(req, path = '') {
        const host = req.header('host');
        const {protocol} = req;

        return `${protocol}://${host}${path}`
    }

    generateNext(req) {
        const {path, query = {}} = req;
        let {page = 0} = query;
        let url = this.generateUrl(req, path);
        return `${url}?page=${++page}`;
    }

    generatePrevious(req) {
        const {path, query = {}} = req;
        let {page = 2} = query;
        let url = this.generateUrl(req, path);
        return `${url}?page=${--page}`;
    }
}