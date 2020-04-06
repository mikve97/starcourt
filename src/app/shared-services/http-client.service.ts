import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private defaultHeader = new HttpHeaders({
    'Content-Type' : 'application/json'
  });


  private urlStart = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  onGet(urlEnd: string): Observable<any> {
    return this.http.get(this.urlStart + urlEnd, {headers: this.defaultHeader});
  }

  onPost(urlEnd: string, body: any): Observable<any> {
    return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(body), {headers: this.defaultHeader});
  }

  onGetWithHeader(urlEnd: string): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      Token: localStorage.getItem('token')
    });
    return this.http.get(this.urlStart + urlEnd, {headers: httpHeaders});
  }

  onPostWithHeader(urlEnd: string, body: any): Observable<any> {
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      Token: localStorage.getItem('token')
    });
    return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(body), {headers: httpHeaders});
  }

}
