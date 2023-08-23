import { Injectable, RendererFactory2, Renderer2 } from '@angular/core';
import { Observable, of, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
declare let cloudinary: any; // declare js widget variable

const widgetUrl = 'https://widget.cloudinary.com/v2.0/global/all.js';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  // create the upload widget
  createUploadWidget(data: any, callback: (error: any, result: any) => void): Observable<any> {
    return this.skriptExists(widgetUrl)
      // js is embeded -> call js function directly
      ? of(cloudinary.createUploadWidget(data, callback))
      // js isn't embeded -> embed js file and wait for it to load
      : fromEvent(this.addJsToElement(widgetUrl), 'load').pipe(
        // map to call of js function
        map(e => cloudinary.createUploadWidget(data, callback))
      );
  }

  // check if js file is already embeded
  private skriptExists(jsUrl: string): boolean {
    return document.querySelector(`script[src="${jsUrl}"]`) ? true : false;
  }

  // embed external js file in html
  private addJsToElement(jsUrl: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = jsUrl;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}