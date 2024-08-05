export default class HttpClient {
  #serverApi = null;
  #request = null;
  #requestConfig = null;
  #responseConfig = null;
  constructor({ serverApi }) {
    this.#serverApi = serverApi;
  }

  async #send(url, method = "GET", body = null, headers = {}) {
    let requestUrl = url;
    if (this.#serverApi) {
      requestUrl = `${this.#serverApi}${url}`;
    }
    const options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
    }
    this.#request = JSON.parse(JSON.stringify(options));
    const requestInit = this.#requestConfig(this.#request);

    try {
      let response = await fetch(requestUrl, requestInit);
      response = await this.#responseConfig(response);

      if (response instanceof HttpClient) {
        return this.#send(url, method, body, headers);
      }
      if (response.ok) {
        response.data = await response.json();
      }
      return response;
    } catch (e) {
      return e;
    }
  }

  request(callback) {
    this.#requestConfig = callback;
  }

  response(callback) {
    this.#responseConfig = callback;
  }

  get(url, headers = {}) {
    return this.#send(url, "GET", null, headers);
  }
  post(url, body, headers = {}) {
    return this.#send(url, "POST", body, headers);
  }
  put(url, body, headers = {}) {
    return this.#send(url, "PUT", body, headers);
  }
  patch(url, body, headers = {}) {
    return this.#send(url, "PATCH", body, headers);
  }
  delete(url, headers = {}) {
    return this.#send(url, "DELETE", null, headers);
  }
}

/*
const httpClient = new HttpClient();
const response = await httpClient.get("https://jsonplaceholder.typicode.com/todos/1");
const todo  = await response.data;
*/
