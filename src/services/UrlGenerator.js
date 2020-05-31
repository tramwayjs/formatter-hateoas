import Url from 'url';
import querystring from 'querystring';

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

    generatePage(req, {limit, page, pages}) {
        const {path} = req;
        let url = this.generateUrl(req, path);
        const qs = querystring.stringify({page, limit});
        return `${url}?${qs}`;
    }

    generateFirst(req, {limit, page, pages}) {
        return this.generatePage(req, {limit, page: 1, pages});
    }

    generateLast(req, {limit, page, pages}) {
        return this.generatePage(req, {limit, page: pages, pages});
    }

    generateNext(req, {limit, page = 0, pages}) {
        return this.generatePage(req, {limit, page: ++page, pages});
    }

    generatePrevious(req, {limit, page = 2, pages}) {
        return this.generatePage(req, {limit, page: --page, pages});
    }
}
