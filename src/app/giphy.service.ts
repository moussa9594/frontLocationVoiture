import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyService {

  giphyApi = '//api.giphy.com/v1/gifs/search?api_key=vUEXRODMC2P2TMl44hOmm0K8ac9LEcAd&limit=1&q=';
  constructor(private http: HttpClient,
               ) { }

  gif(searchTerm) {
    const apiLink = this.giphyApi + searchTerm;
    return this.http.get(apiLink).pipe(map((response: any) => {
        if (response.data.length > 0) {
          // console.log(response.data[0].images.original.url);
          return response.data[0].images.original.url;
        } else {
          return 'https://media.giphy.com/media/WXB88TeARFVvi/giphy.gif';
        }
    }));
  }

  // gif(searchTerm: string): Observable<any> {
  //   return this.http.get(this.giphyApi + searchTerm);
  // }
}
