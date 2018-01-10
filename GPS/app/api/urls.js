
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

export const categoryListUrl = (id) => {
  const url = `${getBaseUrl}/category?warehouse_id=${id}`;
  return url;
};

export const productListUrl = (id) => {
  const url = `${getBaseUrl}/product?category_id=${id}`;
  return url;
};

export const orderPlaceUrl = (
  name, contectno, email, pincode, state,
  city, address, landmark, paymentid, paymenttype, paymentstatus,
  totallamount, customerid, itemid, warehouseid,
) => {
  const url = `${getBaseUrl}/order`;
  let param = '';
  if (name) { if (param) { param = `${param}&`; } param = `${param}name=${name}`; }
  if (contectno) { if (param) { param = `${param}&`; } param = `${param}contact_no=${contectno}`; }
  if (email) { if (param) { param = `${param}&`; } param = `${param}email=${email}`; }
  if (pincode) { if (param) { param = `${param}&`; } param = `${param}pin_code=${pincode}`; }
  if (state) { if (param) { param = `${param}&`; } param = `${param}state=${state}`; }
  if (city) { if (param) { param = `${param}&`; } param = `${param}city=${city}`; }
  if (address) { if (param) { param = `${param}&`; } param = `${param}address=${address}`; }
  if (landmark) { if (param) { param = `${param}&`; } param = `${param}landmark=${landmark}`; }
  if (paymentid) { if (param) { param = `${param}&`; } param = `${param}payment_id=${paymentid}`; }
  if (paymenttype) { if (param) { param = `${param}&`; } param = `${param}payment_type=${paymenttype}`; }
  if (paymentstatus) { if (param) { param = `${param}&`; } param = `${param}payment_status=${paymentstatus}`; }
  if (totallamount) { if (param) { param = `${param}&`; } param = `${param}totall_amount=${totallamount}`; }
  if (customerid) { if (param) { param = `${param}&`; } param = `${param}customer_id=${customerid}`; }
  if (itemid) { if (param) { param = `${param}&`; } param = `${param}item_id=${itemid}`; }
  if (warehouseid) { if (param) { param = `${param}&`; } param = `${param}warehouse_id=${warehouseid}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const driverWareHouseList = (lat, lng) => {
  const url = `${getBaseUrl}/order/warehouseOrder`;
  let param = '';
  if (lat) {
    if (param) {
      param = `${param}&`;
    }
    param = `lat=${lat}`;
  }
  if (lng) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}lng=${lng}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const driverOrderListUrl = (lat, lng, warehouseid) => {
  const url = `${getBaseUrl}/order/orderListForDriver`;
  let param = '';
  if (lat) {
    if (param) {
      param = `${param}&`;
    }
    param = `lat=${lat}`;
  }
  if (lng) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}lng=${lng}`;
  }
  if (warehouseid) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}warehouse_id=${warehouseid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const reserveOrderURl = (driverid, orderids, warehouseid) => {
  const url = `${getBaseUrl}/order/reserveOrders`;
  let param = '';
  if (driverid) {
    if (param) {
      param = `${param}&`;
    }
    param = `driver_id=${driverid}`;
  }
  if (orderids) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}order_ids=${orderids}`;
  }
  if (warehouseid) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}warehouse_id=${warehouseid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const sendDriverLocationToserverURl = (reserveOrderid, lat, lng) => {
  const url = `${getBaseUrl}/order/driverLocation`;
  let param = '';
  if (reserveOrderid) {
    if (param) {
      param = `${param}&`;
    }
    param = `reserve_order_id=${reserveOrderid}`;
  }
  if (lat) {
    if (param) {
      param = `${param}&`;
    }
    param = `lat=${lat}`;
  }
  if (lng) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}lng=${lng}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};
