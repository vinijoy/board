function apiAjax(type, url, params) {
  if (!params) {
    params = {};
  }

  if (!params.data) {
    params = {};
  }

  if (!params.success) {
    params.success = function () {};
  }

  if (!params.fail) {
    params.fail = function () {};
  }

  const headers = {};
  const accessToken = localStorage.getItem('access-token');

  if (type !== 'GET') {
    headers['Content-type'] = 'application/json; charset=UTF-8';
  }

  if (accessToken) {
    headers['authorization-admin'] = 'Bearer ' + accessToken;
  }

  $.ajax(url, {
    method: type,
    headers,
    data: type === 'GET' ? params.data : JSON.stringify(params.data),
    success: params.success,
    error: function (error) {
      if (error.responseJSON) {
        params.fail(error.responseJSON);
      } else {
        params.fail(error);
      }
    },
  });
}

function apiGet(url, data = {}, success = function () {}, fail = function () {}) {
  apiAjax('GET', url, {
    data,
    success,
    fail,
  });
}

function apiPost(url, data = {}, success = function () {}, fail = function () {}) {
  apiAjax('POST', url, {
    data,
    success,
    fail,
  });
}

function apiPatch(url, data = {}, success = function () {}, fail = function () {}) {
  apiAjax('PATCH', url, {
    data,
    success,
    fail,
  });
}

function apiDelete(url, data = {}, success = function () {}, fail = function () {}) {
  apiAjax('DELETE', url, {
    data,
    success,
    fail,
  });
}

function logout() {
  removeCookie(KEY_ACCESS_TOKEN);
  localStorage.removeItem(KEY_ACCESS_TOKEN);

  location.href = '/login';
}

function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function removeCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}
