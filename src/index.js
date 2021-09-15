import { Component } from 'react';
import PropTypes from 'prop-types';

const isDOMReady = window && window.document && window.document.createElement;

export default class ProductFruits extends Component {
  static propTypes = {
    projectCode: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
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

    if (!window.productFruits) {
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

    const fireLanguageChangedEvent = window.productFruits && window.productFruits.language && window.productFruits.language !== language;

    window.productFruits.language = language;
    window.productFruits.code = projectCode;

    if (fireLanguageChangedEvent) {
      document.dispatchEvent(new CustomEvent('pf:language_changed'));
    }
  }

  componentDidMount() {
    const {
      projectCode,
      language
    } = this.props;

    if (!projectCode || !language || !isDOMReady) {
      console.info('PF - dom is not ready');
      return;
    }

    if (!window.productFruits) {
      this.setUserConfig(this.props);

      ((w, d, u, c) => {
        var a = d.getElementsByTagName('head')[0];
        var r = d.createElement('script'); r.async = 1;
        r.src = u + '?c=' + c;
        this.scriptElement = r;
        a.appendChild(r);
      })(window, document, 'https://app.productfruits.com/static/script.js', projectCode);
    }
  }

  componentWillUnmount() {
    if (!isDOMReady || !window.productFruits || !window.productFruits.services) return false;

    window.productFruits.services.destroy();

    delete window.productFruits;
    delete window.productFruitsUser;

    this.scriptElement && this.scriptElement.remove();
  }

  render() {
    return false;
  }
}
