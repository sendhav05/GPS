
export const authenticationUrl = () => {
  const url = 'https://test.com';
  return url;
};

const getBaseUrl = 'http://itinformatix.com/gpsapi/index.php/api/';

export const loginUrl = (email, password, type) => {
  const url = `${getBaseUrl}/login`;
  let param = '';
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

export const signupUrl = (email, password, type, phone, name) => {
  const url = `${getBaseUrl}/Registration`;
  let param = '';
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
  if (phone) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}phone=${phone}`;
  }
  if (name) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}name=${name}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const wareHoueUrl = 'http://itinformatix.com/gpsapi/index.php/api/warehouse';
