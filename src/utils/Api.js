class Api {
  constructor({ url, headers }) {
    this._baseUrl = url;
    this._headers = headers;
    fetch(this._baseUrl + "users/me", { headers: this._headers })
      .then((res) => this._isResultOk(res))
      .then((result) => (this._myId = result._id));
  }

  _isResultOk(res) {
    if (res.ok) {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return res.json();
      } else {
        return res.text();
      }
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._isResultOk(res));
  }

  getProfile() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers,
    }).then((res) => this._isResultOk(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._isResultOk(res));
  }

  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    });
  }

  setUserInfo(info) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(info),
    });
  }

  patchProfile(values) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(values),
    }).then((res) => this._isResultOk(res));
  }

  postCard({ name, link }) {
    return this._request(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    });
  }

  deleteCard(card) {
    return this._request(`${this._baseUrl}/cards/${card}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  putLike(card) {
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  removeLike(card) {
    return this._request(`${this._baseUrl}/cards/likes/${card}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeAvatar(avatar) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar)
    });
  }
}



const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: '8b7f26ff-df87-4fed-b7d8-0d5c2987dff7',
    'content-type': 'application/json',
  },
});

export default api;
