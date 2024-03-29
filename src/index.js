import { Component } from 'react';
import PropTypes from 'prop-types';

import { useProductFruits, selectIsProductFruitsReady } from './hooks';

export {
    useProductFruits,
    selectIsProductFruitsReady
}

const isDOMReady = window && window.document && window.document.createElement;

export default class ProductFruits extends Component {
    static propTypes = {
        projectCode: PropTypes.string.isRequired,
        language: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        environment: PropTypes.string
    };

    componentDidUpdate() {
        if (!isDOMReady) return;

        this.setUserConfig(this.props);
    }

    setUserConfig(reactProps) {
        const {
            projectCode,
            language,
            username,
            email,
            firstname,
            lastname,
            signUpAt,
            role,
            props
        } = reactProps;

        if (!username) throw new Error('The "username" prop is required. Also, DO NOT hard code it. Use conditional rendering if user info is loaded asynchronously.');

        if (!window.productFruits || !window.productFruits.identifyUser) {
            window.productFruitsUser = { username: username, email: email, firstname: firstname, lastname: lastname, signUpAt: signUpAt, role: role, props: props };
        } else {
            window.productFruits.identifyUser({
                username,
                email,
                firstname,
                lastname,
                signUpAt,
                role,
                props
            });
        }

        window.productFruits = window.productFruits || {};

        const fireLanguageChangedEvent = window.productFruits.language && window.productFruits.language !== language;

        window.productFruits.language = language;
        window.productFruits.code = projectCode;

        if (fireLanguageChangedEvent) {
            document.dispatchEvent(new CustomEvent('pf:language_changed'));
        }
    }

    componentDidMount() {
        const {
            projectCode,
            language,
            environment
        } = this.props;

        if (!projectCode || !language || !isDOMReady) {
            console.info('PF - dom is not ready, projectCode is not set or language is not set');
            return;
        }

        let scriptPath = 'https://app.productfruits.com/static/script.js';
        if (environment) {
            window.productFruitsEnv = environment;
            scriptPath = `https://app.${environment}.productfruits.com/static/script.js`;
        }

        if (!window.productFruits) {
            this.setUserConfig(this.props);

            ((w, d, u, c) => {
                var a = d.getElementsByTagName('head')[0];
                var r = d.createElement('script'); r.async = 1;
                r.src = u + '?c=' + c;
                this.scriptElement = r;
                a.appendChild(r);
            })(window, document, scriptPath, projectCode);
        }

        if (window.productFruitsUnmounted && window.productFruitsInit) {
            window.productFruitsInit();

            delete window.productFruitsUnmounted;
        }
    }

    componentWillUnmount() {
        if (!isDOMReady || !window.productFruits || !window.productFruits.services) return false;

        window.productFruits.services.destroy();

        delete window.productFruits;
        delete window.productFruitsUser;

        window.productFruitsUnmounted = true;

        this.scriptElement && this.scriptElement.remove();
    }

    render() {
        return false;
    }
}
