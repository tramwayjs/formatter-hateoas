import Url from 'url';

export default class UrlGenerator {
    generateCurrent(req) {
        const {url} = req;
        return this.generateUrl(req, Url.parse(url).pathname);
    }

    generateUrl(req, path = '') {
        const host = req.header('host');
        const {protocol} = req;

        return `${protocol}://${host}${path}`
    }

    generateAppended(req, path) {
        return `${this.generateCurrent(req)}/${path}`;
    }

    generateTemplated(req, path, args = {}) {
        let base = this.generateUrl(req, path);

        for (let arg in args) {
            base = base.replace(`:${arg}`, args[arg]);
        }

        return base;
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