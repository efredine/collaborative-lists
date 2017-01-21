import fetch from 'isomorphic-fetch';

const config = {
  credentials: 'include'
}

function authorizedFetch(url, options, authorized=true) {
  if(options) {
    if(authorized) {
      return fetch(url, Object.assign({}, options, config));
    } else {
      return fetch(url, options);
    }
  } else {
    return fetch(url);
  }
}

export default authorizedFetch;