import { enableProdMode, NgZone } from '@angular/core';
import 'zone.js/dist/zone';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Router, NavigationStart } from '@angular/router';
import { ɵAnimationEngine as AnimationEngine } from '@angular/animations/browser';

import { singleSpaAngular, getSingleSpaExtraProviders } from 'single-spa-angular';


import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { singleSpaPropsSubject } from './single-spa/single-spa-props';

if (environment.production) {
  enableProdMode();
}

const lifecycles = singleSpaAngular({
  // domElementGetter,
  bootstrapFunction: singleSpaProps => {
    singleSpaPropsSubject.next(singleSpaProps);
    return platformBrowserDynamic(getSingleSpaExtraProviders()).bootstrapModule(AppModule);
  },
  template: '<app2-root />',
  Router,
  NavigationStart,
  NgZone,
  AnimationEngine
});

export const bootstrap = lifecycles.bootstrap;
export const mount = lifecycles.mount;
export const unmount = lifecycles.unmount;

// function domElementGetter() {
//   let shouldCreateNew = false;
//   let el = document.getElementById('mf-ng');
//   if (!el) {
//     shouldCreateNew = true;
//     el = document.createElement('div');
//     el.id = "mf-ng";
//   }

//   if (shouldCreateNew) {
//     document.body.appendChild(el);
//   }

//   return el;
// }