/**
 * Generic Json Api Service Helper Methods
 * 
 * @class ApiService
 */
class ApiService {
  /* @ngInject */ 
  constructor($http, appConfig) {
    this.$http = $http;
    this.appConfig = appConfig;
  }

  /**
   * Generic Error Handler Method
   * 
   * @param {any} error 
   * @memberof ApiService
   */
  handleError(error) {
    console.error(`An error occurred with your request to .` + error);
  }

  /**
   * Default Headers to a Json Api
   * 
   * @returns 
   * @memberof ApiService
   */
  setHeaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    return headers;
  }

  /**
   * Makes a GET Request to the specified URL
   * 
   * @param {any} path 
   * @param {any} [params={}] 
   * @returns 
   * @memberof ApiService
   */
  get(path, params = {}) {    
    path = this._buildPath(path);
    return this.$http
      .get(path, {
        headers: this.setHeaders(),
        params: params
      })
      .then(res => res.data)
      .catch(this.handleError);
  }

  /**
   * Not Implemented
   * 
   * @memberof ApiService
   */
  post(path,params) {
    path = this._buildPath(path);

      return this.$http
          .post(path, params, this.setHeaders())
          .then(res => JSON.parse(res.data.d))
          .catch(this.handleError);
  }

  /**
   * Not Implemented
   * 
   * @memberof ApiService
   */
  put() {}

  /**
   * Not Implemented
   * 
   * @memberof ApiService
   */
  delete() {}

  _buildPath (path){
    if (!path.startsWith('http')){
      return this.appConfig.ApiUrl + path;
    }
    return path;
  }
}

export default ApiService;
