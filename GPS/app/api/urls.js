
export const authenticationUrl = () => {
  const url = `https://test.com`;
  return url;
};

const getBaseUrl = 'http://itinformatix.com/gpsapi/api/';

export const loginUrl = (email, password, type) => {
  const url = `${getBaseUrl}/del/login`;
  let param = null;
  if (email) {
    if (param) {
      param = `${param}&`;
    }
    param = `email=${email}`;
  }
  if (password) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}password=${password}`;
  }
  if (type) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}type=${type}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};
