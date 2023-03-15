class APIClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
  }

  async request(method, path, data) {
    const url = new URL(path, this.baseURL);
    const options = {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    const response = await fetch(url.toString(), options);
    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || response.statusText);
    }

    return json;
  }

  get(path) {
    return this.request('GET', path);
  }

  post(path, data) {
    return this.request('POST', path, data);
  }

  put(path, data) {
    return this.request('PUT', path, data);
  }

  delete(path) {
    return this.request('DELETE', path);
  }
}
