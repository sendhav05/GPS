
export const authenticationUrl = () => {
  const url = 'https://test.com';
  return url;
};

const getBaseUrl = 'http://itinformatix.com/gpsapi/index.php/api/';

export const loginUrl = (email, password, type, deviceToken, deviceType) => {
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
  if (deviceToken) { if (param) { param = `${param}&`; } param = `${param}device_token=${deviceToken}`; }
  if (deviceType) { if (param) { param = `${param}&`; } param = `${param}device_type=${deviceType}`; }


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
  totallamount, customerid, itemid, warehouseid, lat, lng
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
  if (lat) { if (param) { param = `${param}&`; } param = `${param}lat=${lat}`; }
  if (lng) { if (param) { param = `${param}&`; } param = `${param}lng=${lng}`; }

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

export const reserveOrderURl = (driverid, totalorder, warehouseid) => {
  const url = `${getBaseUrl}/order/reserveOrders`;
  let param = '';
  if (driverid) {
    if (param) {
      param = `${param}&`;
    }
    param = `driver_id=${driverid}`;
  }
  if (totalorder) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}total_order=${totalorder}`;
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

export const sendDriverLocationToserverURl = (reserveID, lat, lng) => {
  const url = `${getBaseUrl}/order/driverLocation`;
  let param = '';
  if (reserveID) {
    if (param) {
      param = `${param}&`;
    }
    param = `reserve_order_id=${reserveID}`;
  }
  if (lat) {
    if (param) {
      param = `${param}&`;
    }
    param = `${param}lat=${lng}`;
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

export const addressListUrl = (customerid) => {
  const url = `${getBaseUrl}/customer/listAddress`;
  let param = '';
  if (customerid) {
    if (param) {
      param = `${param}&`;
    }
    param = `customer_id=${customerid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const addAddressListUrl = (
  type, city, pincode, state, address, landmark, customerid, shippingpincode, shippingstate, shippingaddress, shippinglandmark, shippingcity,
) => {
  const url = `${getBaseUrl}/customer/deliveryAddress`;
  let param = '';
  if (type) { if (param) { param = `${param}&`; } param = `${param}type=${type}`; }
  if (customerid) { if (param) { param = `${param}&`; } param = `${param}customer_id=${customerid}`; }

  if (city) { if (param) { param = `${param}&`; } param = `${param}city=${city}`; }
  if (pincode) { if (param) { param = `${param}&`; } param = `${param}pin_code=${pincode}`; }
  if (state) { if (param) { param = `${param}&`; } param = `${param}state=${state}`; }
  if (address) { if (param) { param = `${param}&`; } param = `${param}address=${address}`; }
  if (landmark) { if (param) { param = `${param}&`; } param = `${param}landmark=${landmark}`; }

  if (shippingcity) { if (param) { param = `${param}&`; } param = `${param}shipping_city=${shippingcity}`; }
  if (shippingpincode) { if (param) { param = `${param}&`; } param = `${param}shipping_pin_code=${shippingpincode}`; }
  if (shippingstate) { if (param) { param = `${param}&`; } param = `${param}shipping_state=${shippingstate}`; }
  if (shippingaddress) { if (param) { param = `${param}&`; } param = `${param}shipping_address=${shippingaddress}`; }
  if (shippinglandmark) { if (param) { param = `${param}&`; } param = `${param}shipping_landmark=${shippinglandmark}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const deleteAddressListUrl = (type, deliveryid) => {
  const url = `${getBaseUrl}/customer/deliveryAddress`;
  let param = '';
  if (type) { if (param) { param = `${param}&`; } param = `${param}type=${type}`; }
  if (deliveryid) { if (param) { param = `${param}&`; } param = `${param}delivery_id=${deliveryid}`; }


  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const orderPutBackUrl = (driverid, warehouseid) => {
  const url = `${getBaseUrl}/order/orderPutBack`;
  let param = '';
  if (driverid) { if (param) { param = `${param}&`; } param = `${param}driver_id=${driverid}`; }
  if (warehouseid) { if (param) { param = `${param}&`; } param = `${param}warehouse_id=${warehouseid}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const cutomerCompleteOrdersUrl = (customerid) => {
  const url = `${getBaseUrl}/order/cutomerCompleteOrders`;
  let param = '';
  if (customerid) {
    if (param) {
      param = `${param}&`;
    }
    param = `customer_id=${customerid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const cutomerPendingOrdersURl = (customerid) => {
  const url = `${getBaseUrl}/order/cutomerPendingOrders`;
  let param = '';
  if (customerid) {
    if (param) {
      param = `${param}&`;
    }
    param = `customer_id=${customerid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const driverPendingOrdersURl = (driverid) => {
  const url = `${getBaseUrl}/order/driverPendingOrders`;
  let param = '';
  if (driverid) {
    if (param) {
      param = `${param}&`;
    }
    param = `driver_id=${driverid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const driverCompleteOrdersURl = (driverid) => {
  const url = `${getBaseUrl}/order/driverCompleteOrders`;
  let param = '';
  if (driverid) { if (param) { param = `${param}&`; } param = `${param}driver_id=${driverid}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const notificationUrl = (userid) => {
  const url = `${getBaseUrl}/notification`;
  let param = '';
  if (userid) {
    if (param) {
      param = `${param}&`;
    }
    param = `user_id=${userid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const cancelOrderUrl = (orderid) => {
  const url = `${getBaseUrl}/order/cancelOrder`;
  let param = '';
  if (orderid) {
    if (param) {
      param = `${param}&`;
    }
    param = `order_id=${orderid}`;
  }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const feedbackUrl = (type, orderid, customerid, driverid, feedback, userRating) => {
  const url = `${getBaseUrl}/order/feedback`;
  let param = '';
  if (type) { if (param) { param = `${param}&`; } param = `${param}type=${type}`; }
  if (orderid) { if (param) { param = `${param}&`; } param = `${param}order_id=${orderid}`; }
  if (customerid) { if (param) { param = `${param}&`; } param = `${param}customer_id=${customerid}`; }
  if (driverid) { if (param) { param = `${param}&`; } param = `${param}driver_id=${driverid}`; }
  if (feedback) { if (param) { param = `${param}&`; } param = `${param}feedback=${feedback}`; }
  if (userRating) { if (param) { param = `${param}&`; } param = `${param}user_rating=${userRating}`; }


  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const pickupedOrderUrl = (orderid) => {
  const url = `${getBaseUrl}/order/pickupedOrder`;
  let param = '';
  if (orderid) { if (param) { param = `${param}&`; } param = `${param}order_id=${orderid}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const completedOrderUrl = (orderid) => {
  const url = `${getBaseUrl}/order/completeOrder`;
  let param = '';
  if (orderid) { if (param) { param = `${param}&`; } param = `${param}order_id=${orderid}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};

export const uploadDocumentUrl = (driverid, type, name) => {
  const url = `${getBaseUrl}/customer/driver_document`;
  let param = '';
  if (driverid) { if (param) { param = `${param}&`; } param = `${param}driver_id=${driverid}`; }
  if (type) { if (param) { param = `${param}&`; } param = `${param}type=${type}`; }
  if (name) { if (param) { param = `${param}&`; } param = `${param}name=${name}`; }

  if (param) {
    return `${url}?${param}`;
  }
  return url;
};
