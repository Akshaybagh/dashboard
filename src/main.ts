// main.ts

import 'zone.js'; // ✅ Required for Angular's change detection
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app'; // ✅ Your standalone root component
import { appConfig } from './app/app.config'; // ✅ Assuming providers are there

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));
