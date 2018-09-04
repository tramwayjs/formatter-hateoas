import {HttpStatus} from 'tramway-core-router';

export default class MimeTypeResolver {
    format(response, content, options = {}) {
        const {template} = options;

        let format = {
            'application/json': () => response.json(content),
            'application/javascript': () => response.jsonp(content),
            'default': () => response.sendStatus(HttpStatus.NOT_ACCEPTABLE),
        };

        if (template) {
            format['html'] = () => response.render(template, {content: content});
        }

        return format;
    }
}