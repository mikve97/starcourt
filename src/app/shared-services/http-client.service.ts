import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  private httpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json'
    // 'Token': localStorage.getItem('jwtoken')
  });
  private urlStart = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  onGet(urlEnd: string): Observable<any> {
    return this.http.get(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }

  onPost(urlEnd: string, body: any): Observable<any> {
    return this.http.post<any>(this.urlStart + urlEnd, JSON.stringify(body), {headers: this.httpHeaders});
  }

  onPut(urlEnd: string, body: any): Observable<any> {
    return this.http.put<any>(this.urlStart + urlEnd, JSON.stringify(body), {headers: this.httpHeaders});
  }

  onDelete(urlEnd: string): Observable<any> {
    return this.http.delete(this.urlStart + urlEnd, {headers: this.httpHeaders});
  }
}
