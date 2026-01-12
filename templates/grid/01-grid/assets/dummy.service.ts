import { Injectable, Injector } from "@angular/core";
import { AppConfig, AuthService, FilterExpressionUtils, Observable, OntimizeEEService, ServiceResponse, Util } from "ontimize-web-ngx";
import { Subscriber } from "rxjs";

@Injectable()
export class DummyService extends OntimizeEEService {

  entity: string;

  static mappings: object = {
    employeeTypes: '/employee-types.json'
  }

  constructor(protected injector: Injector) {
    super(injector);
  }

  public getDefaultServiceConfiguration(serviceName?: string): Object {

    const authService = this.injector.get(AuthService);
    const configuration = this.injector.get(AppConfig).getServiceConfiguration();

    let servConfig = {};
    if (serviceName && configuration.hasOwnProperty(serviceName)) {
      servConfig = configuration[serviceName];
    }
    servConfig['session'] = authService.getSessionInfo();
    return servConfig;
  }

  public configureService(config: any): void {
    super.configureService(config);
    this._urlBase = './assets/dummy-data';

    if (config.entity !== undefined) {
      this.entity = config.entity;
    }
  }

  public query(kv?: object, av?: Array<string>, entity?: string, sqltypes?: object): Observable<any> {
    entity = (Util.isDefined(entity)) ? entity : this.entity;

    const url = this._urlBase + DummyService.mappings[entity];
    const options = {
      headers: this.buildHeaders()
    };
    return this.doRequest({
      method: 'GET',
      url,
      options,
      successCallback: (resp, subscriber) => {
        const filtered = resp.data.filter(item => {
          const equal = Object.keys(kv).every(key => item[key] === kv[key]);
          return equal;
        });
        resp.data = filtered;
        this.customParseSuccessfulQueryResponse(kv, resp, subscriber);
      },
      errorCallBack: this.parseUnsuccessfulQueryResponse
    });
  }

  private customParseSuccessfulQueryResponse(kv: any, resp: ServiceResponse, subscriber: Subscriber<ServiceResponse>) {
    if (resp && resp.isUnauthorized()) {
      this.clientErrorFallback(401);
    } else if (resp && resp.isFailed()) {
      subscriber.error(resp.message);
    } else if (resp && resp.isSuccessful()) {
      resp.data = this.filterResponse(kv, resp);
      subscriber.next(resp);
    } else {
      subscriber.error('Service unavailable');
    }
  }

  private filterResponse(kv: object, resp) {
    if (kv.hasOwnProperty(FilterExpressionUtils.FILTER_EXPRESSION_KEY)) {
      return this.fetchRoots(resp);
    }
    const result = [];
    const emptyObject = {};
    // If the user wants all the data the kv parameter should be empty
    if (JSON.stringify(kv) == JSON.stringify(emptyObject)) {
      resp.data.forEach(element => {
        result.push(element);
      });
    }
    return result;
  }

  private fetchRoots(resp: any): Array<any> {
    const rootsArray = [];
    resp.data.forEach(element => {
      if (!element.hasOwnProperty('PARENT')) {
        rootsArray.push(element);
      }
    });
    return rootsArray;
  }
}