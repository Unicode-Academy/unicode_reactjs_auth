export default class HttpClient {
  #serverApi = null;
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
    let options = {
      method,
      headers,
    };
    if (body) {
      options.body = JSON.stringify(body);
      options.headers["Content-Type"] = "application/json";
    }
    if (
      typeof this.#requestConfig === "function" &&
      this.#requestConfig(this.#copyObject(options))
    ) {
      options = this.#requestConfig(this.#copyObject(options));
    }

    try {
      let response = await fetch(requestUrl, options);
      if (response.ok) {
        response.data = await response.json();
      }
      if (
        typeof this.#responseConfig === "function" &&
        this.#responseConfig(response)
      ) {
        response = await this.#responseConfig(response);

        if (response instanceof HttpClient) {
          return this.#send(url, method, body, headers);
        }
      }
      return response;
    } catch (e) {
      return e;
    }
  }

  #copyObject(obj) {
    return JSON.parse(JSON.stringify(obj));
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
