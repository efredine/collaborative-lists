import fetch from 'isomorphic-fetch';
import Auth from './Auth';

function authorizedFetch(url, options, authorize=true) {
  if(options) {
    if(authorize) {
      options.headers = Object.assign({}, options.headers || {}, {
          'Authorization': `JWT ${Auth.getToken().token}`
        });
      return fetch(url, options);
    } else {
      return fetch(url, options);
    }
  } else {
    return fetch(url);
  }
}

export default authorizedFetch;