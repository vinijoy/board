const KEY_ACCESS_TOKEN = 'access-token';

$(document).ready(function () {
  if (location.pathname !== '/login') {
    const accessToken = localStorage.getItem(KEY_ACCESS_TOKEN);

    if (!accessToken) {
      location.href = '/login';
    }

    apiPost(
      '/api/board/renew-token',
      {},
      function () {},
      function () {
        location.href = '/login';
      },
    );
  }
});

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

function modalOpen(id) {
  var scrollTop = $('#content').scrollTop();
  $('#content').addClass('modalOpen');
  $('.modal-wrap')
    .addClass('active')
    .css({ top: scrollTop + 'px' });
  $('#' + id).addClass('active');
}

function modalClose() {
  $('.modal-wrap').removeClass('active');
  $('#content').removeClass('modalOpen');
  $('.modal').removeClass('active');
}

function subModalClose(id) {
  $('#' + id).removeClass('active');
}

function setCookie(name, value, exp) {
  var date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);

  document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
}

function removeCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}

function downloadURI(uri, name) {
  var _xhr = new XMLHttpRequest();
  var _a = document.createElement('a');

  _xhr.open('GET', uri, true);
  _xhr.responseType = 'blob';
  _xhr.onload = function () {
    const file = new Blob([_xhr.response], { type: 'application/octet-stream' });
    _a.href = window.URL.createObjectURL(file);
    _a.download = name;
    _a.click();
  };
  _xhr.send();
}

function GUID() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

function numberPad(x) {
  if (x < 10) {
    return `0${x}`;
  }

  return x.toString();
}
