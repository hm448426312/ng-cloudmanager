import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
export declare class HttpService {
    private http;
    passHeader: Headers;
    constructor(http: Http);
    getData(conf: any): Observable<Response>;
    postData(conf: any): Observable<Response>;
    deleteData(conf: any): Observable<Response>;
    patchData(conf: any): Observable<Response>;
    putData(conf: any): Observable<Response>;
    getHeader(newHeader?: any): Headers;
    setHttpMath(obj: any): any;
    updateHeaderStorage(response: any): void;
    private requestFn(method, conf);
}
