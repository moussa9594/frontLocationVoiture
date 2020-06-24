import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Images } from './models/images';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private url = '//locationvoiture.cfapps.io/';

  imageSubject = new Subject<Images>();
  getImage: Images;
  emitGetImage() {
    this.imageSubject.next(this.getImage);
  }
  constructor(private http: HttpClient) { }

  // methode pour creer une voiture
  // tslint:disable-next-line: ban-types
  creerImages(newImages: Object): Observable<Object> {
    return this.http.post(this.url + 'creerImages', newImages);
  }

  // recupération des images d'une voiture
  // tslint:disable-next-line: variable-name
  getImages(id_voiture: number) {
    this.http.get<Images>(this.url + 'getImages/' + id_voiture).subscribe(
      (image: Images) => {
        this.getImage = image;
        this.emitGetImage();
      },
      (error: any) => {
        console.log(error);
      },
      () => {}
    );
  }
}
