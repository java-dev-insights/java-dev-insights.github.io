# Angular

- JS Framework to create reactive SPAs.
  - for building client application (primarily browser-based) using Component Based Design Pattern.
  - **SPA** – *Single Page Application* – On click of link, no page change only the component is changed.
- Transcompiler - for [typescript](www.typescriptlang.org) to javascript
  - [babeljs.io](https://babeljs.io/) - https://babeljs.io/
- Task Managers 
  – They are just like event managers.
  - preferred options: Grunt, gull, webpack (webpack used for angular, this has babel transcompiler)
- webpack
  - open-source JavaScript module bundler.
  - made primarily for JavaScript, but it can transform front-end assets like HTML, CSS, and images if the corresponding loaders are included.
  - webpack takes modules with dependencies and generates static assets representing those modules.
  - main purpose is to bundle JavaScript files for usage in a browser.
  - example - you define styles and scripts in angular.json, they are included on \<head> automatically.
- angular-cli
  - Handles dev to deployment, debugging to testing
  - needs nodejs
  - contains webpack

**Angular History**

* Angular v1.x (AngularJS) - based on an MVC architecture.
* Angular 2 - based on a component/services architecture. 
* What happened to Angular v3? Skipped, to have consistent version numbering due to @angular/router version 4.

**Angular Enhancements**

* Considerable improvements in bundle size as much as 60%.
* ngc, AOT compiler for angular and typescript are much faster.
* Compatible with latest version of typescript with better type checking and enhanced IDE features.
* IDE detect missing imports, removing unused declarations, unintentionally missing “this” operator etc.

## References

* [Angular Cheatsheet](https://angular.io/guide/cheatsheet){target="_blank"}
* [Online reference of topic list](https://www.java2aspire.com/courses/angular-online-training/){target="_blank"}
* [Angular 5 Interview Questions and Answers](https://www.code-sample.com/2017/08/angular-5-interview-questions-and.html?m=1){target="_blank"}
* [JavaScript Best Practices and node_modules](https://julie.io/writing/javascript-node-modules/){target="_blank"}
* [How to Add Bootstrap to an Angular CLI project](https://loiane.com/2017/08/how-to-add-bootstrap-to-an-angular-cli-project/){target="_blank"}

## ECMA Script and TypeScript

### ECMA Script 
* European Computer Manufacturers Association Script
* ECMAScript is object-oriented and conceived as a **core language** to which can be added the objects of any specific domain or context such as the idea of a "document." (for example, the World Wide Web Consortium's Document Object Model). 
* ECMAScript together with the Document Object Model corresponds closely to the current implementations of JavaScript and JScript. Although likely to be used mainly as a standard script language for the World Wide Web, ECMAScript could also be used for any scripted application.

### TypeScript
- Superset of js
- more features than plain vanilla js, eg. types, classes, interfaces
- used by developers for writing code, but eventually compiled to js for running.

## Installation

### Steps
* Download [node](https://nodejs.org/en/)
* Environment variable – pointing to node folder
* Download Visual Studio and got to empty folder
* open console (ctrl+`)

### Command Line instructions
* saves time and makes it easy for development process by making scaffolding for components, services, routing etc.
* **Scaffold** – component, directive, pipe, service, class, guard, interface, enum, module
* `ng new projectName --skip-install`
  - --skip-install is used to avoid that npm dependencies are installed automatically.

**Install angular cli**
```
node –v 
npm –v
npm install –g @angular/cli@latest
ng –-version
```
```
npm i underscore -g
npm uninstall -g @angular/cli@latest
npm cache clean
```
**create single project workspace**
```
ng new <project> --skip-install
cd <project>
```
**create multi-project workspace**
```
ng new my-workspace --skip-install --createApplication="false"
cd my-workspace
ng generate application my-first-app
```
**adding bootstrap4**
```
// --save ==> updates package.json with dependency
npm install jquery@latest popper.js@latest bootstrap@latest --save
// now, you need to manually add entry to angular.json styles and scripts
npm install bootstrap@latest ngx-bootstrap@latest --save
```
**generate commands**
```
ng g c <component-name>
ng g directive my-new-directive 
ng g pipe my-new-pipe 
ng g service my-new-service 
ng g class my-new-class 
ng g guard my-new-guard 
ng g interface my-new-interface 
ng g enum my-new-enum 
ng g module my-module
```
```
npm start (calls ng serve automatically)
npm config set https-proxy <proxy>
npm config set http-proxy <proxy>
ng serve
ng generate
ng build – dist file
ng lint – check coding standards
ng test
```


## Architecture

* ***Component Based Design Pattern*** as it gives reusability of components.
* Hierarchical structure of views is a key factor in the way Angular detects and responds to changes in the DOM and app data.
- 5 Pillars of Angular (Angular Ecosystem) - ***Component***, ***Services***, ***Directives***, ***Pipes***, ***Routers***.

<ImageComponent image-path='/angular/ng-architecture.png' title='ng-architecture' />

### Object Oriented Design v/s Component Based Design

<ImageComponent image-path='/angular/browser-development.png' />

## Folder Structure
- [understanding folder structure](https://overflowjs.com/posts/Angular-8-Understanding-Directory-Structure-and-Creating-CRUD-App){:target="_blank"}
- [Structure](https://www.c-sharpcorner.com/blogs/folder-structure-of-angular-5-project){:target="_blank"}

<ImageComponent image-path='/angular/folder-structure.png' />

**package.json**
- scripts
  - `ng serve` - Angular deployment live server is angular’s inhouse server and it looks for index.html on startup.
- dependencies (***npm install*** added here)
- devDependencies

<ImageComponent image-path='/angular/package-json.png' />

**angular.json**
- bootstrapping (image on below page)
- build configs of project architect
  - bootstrap, jquery and popper
  - aot flag

<ImageComponent image-path='/angular/angular-json.png' />

* index.html
  - file that hosts your bootstrap component and its hierarchy
* app.module.ts :
  - @NgModule
  - declarations – AppComponent, available for use to other components of this module without any import
  - imports – BrowserModule, AppRoutingModule, other modules
  - exports – components exported to other modules.
  - bootstrap – AppComponent, 1st component to be launched as it is available for index.html.
  - providers – service, pipe, validator

export classs MyComp{ } : `export` tells the module that it is available and can be imported to use.

* Webpack Configuration files: The webpack.conf.js is at the root of the project. It branches to three more configuration files
  - webpack.dev.js
  - webpack.prod.js
  - webpack.common.js.
* Use the start script to run webpack dev server using dev configuration. 

```
"scripts": {
     "start": "webpack-dev-server --inline --progress --port 8080",
```

* Webpack creates three bundles, with the application bundled into app.js

```
entry: {
 'polyfills': './src/polyfills.ts',
 'vendor': './src/vendor.ts',
 'app': './src/main.ts'
},
```

## How Angular App Bootstraps
1. main.ts ==> `platformBrowserDynamic().bootstrapModule(AppModule)`
2. AppModule ==> `@NgModule({... bootstrap: [AppComponent]})`
3. AppComponent ==> Will host all other custom components created

## Core Concepts

[Core Conacepts](core-concepts)

## Routers

* Routers and router outlet
* Route – multiple path vars or query params
* define navigation paths among views ie. sophisticated in-browser navigational capabilities.
* maps URL-like paths to views instead of pages. 
* When a user performs an action, such as clicking a link, that would load a new page in the browser, the router intercepts the browser's behavior, and shows or hides view hierarchies.
* Router logs activity in the browser's history journal, so the back and forward buttons work as well.
* `router` can *lazy-load* the module on demand.

### Routing Strategy

> Read full article on [Routing Strategies](https://codecraft.tv/courses/angular/routing/routing-strategies/)

### Parameterized Routes

> Read full article on [Parameterized Routes](https://codecraft.tv/courses/angular/routing/parameterised-routes/)

### Nested Routes

> Read full article on [Nested Routes](https://codecraft.tv/courses/angular/routing/nested-routes/)

### Router Guards

> Read full article on [Router Guards](https://codecraft.tv/courses/angular/routing/router-guards/) here.

* To check permissions and return a 403 error page if the user didn’t have permissions, or perhaps redirect them to a login/register page if they were not signed up. with Router Guards we can use this functionality.
* 403 is a HTTP error code - Permission Denied
* For a given route we can implement zero or any number of Guards.

**Use Cases**
- Maybe the user must login (authenticate) first.
- Perhaps the user has logged in but is not authorized to navigate to the target component.
- We might ask the user if it’s OK to discard pending changes rather than save them.

### Types of Router Guards

* **CanActivate** - Checks if a user can visit a route.
  - **CanActivateChild** - Checks if a user can visit a route’s children.
* **CanDeactivate** - used to warn people if they are navigating away from a page where they have some unsaved changes.
* **Resolve** - Performs route data retrieval before route activation.
* **CanLoad** - Checks if a user can route to a module that lazy loaded.

```ts
import {CanActivate} from "@angular/router";

@Injectable
class AlwaysAuthGuard implements CanActivate {
  canActivate() {
    console.log("AlwaysAuthGuard");
    return true;
  }
}

@Injectable()
class OnlyLoggedInUsersGuard implements CanActivate {
  constructor(private userService: UserService) {};
  canActivate() {
    console.log("OnlyLoggedInUsers");
    if (this.userService.isLoggedIn()) {   return true;  } 
    else {
      window.alert("You don't have permission to view this page");
      return false;
    }
  }
}
```
```ts
@NgModule({
  ...
  providers: [    AlwaysAuthGuard  ]
})
```
```ts
const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'find', redirectTo: 'search'},
  {path: 'home', component: HomeComponent},
  {path: 'search', component: SearchComponent},
  {
    path: 'artist/:artistId',
    component: ArtistComponent,
    canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard],
    children: [
      {path: '', redirectTo: 'tracks'},
      {path: 'tracks', component: ArtistTrackListComponent},
      {path: 'albums', component: ArtistAlbumListComponent},
    ]
  },
  {path: '**', component: HomeComponent}
];
```

### Guard Function Parameters

To help determining whether or not a guard should accept or deny access the guard function can be passed certain arguments:
* **component**: Component this is the component itself.
* **route**: ActivatedRouteSnapshot — this is the future route that will be activated if the guard passes, we can use it’s params property to extract the route params.
* **state**: RouterStateSnapshot — this is the future RouterState if the guard passes, we can find the URL we are trying to navigate to from the url property.

```ts
class UnsearchedTermGuard implements CanDeactivate<SearchComponent> {
  canDeactivate(component: SearchComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    console.log(route.params);
    console.log(state.url);
    return component.canDeactivate() || window.confirm("Are you sure?");
  }
}
```

* CanDeactivate interface is a generic interface.
* Guard functions can return either a boolean or an `Observable<boolean>` or `Promise<boolean>` which resolves to a boolean at some point in the future.

Firstly lets create a function called canDeactivate on our SearchComponent, it should be the component that decides whether or not it has unsaved changes.

```ts
canDeactivate() {
  return this.itunes.results.length > 0;
}
```

## RxJS

<ImageComponent image-path='/angular/rxjs.png' />

### Promise vs Observable

<ImageComponent image-path='/angular/promise-vs-observable.png' />

| Promise                                                            | Observable                                                                   |
| ------------------------------------------------------------------ | ---------------------------------------------------------------------------- |
| handles a single event when an async operation completes or fails. | stream of zero or more events where the callback is called for each event.   |
| Has only one pipeline  | Streams data in multiple pipelines  |
| Only .then()           | Provides chaining and subscription  |
| Not Lazy               | Lazy - emits values when time progresses |
| Not cancellable   | Cancellable – heavy operations that are not needed anymore by .unsubscribe() |
| possible decisions– Reject, Resolve |
| Cannot be retried   | retry(), or replay() or retryWhen       |
|                      | operators like map, forEach, reduce, filter    |
| Push errors to child promises  | Subscribe method for centralized and predictable error handling.  |

<ImageComponent image-path='/angular/observalble-code.png' />

### Http Calls using RxJs

<ImageComponent image-path='/angular/rxjs-http.png' />

```ts
import { HttpClientModule } from '@angular/common/http';
@NgModule(
{ imports: [// import HttpClientModule after BrowserModule.
   HttpClientModule, 
],
//Component
showConfig() {
  this.configService.getConfig()
    .subscribe(
      (data: Config) => this.config = {
        heroesUrl: data['heroesUrl'],
        textfile:  data['textfile']
       }, // success path
      (error) => this.error = error // error path
     );
}
```
```ts
//Json
{ "heroesUrl": "api/heroes", "textfile": "assets/textfile.txt" }
```
```ts
//Service
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ConfigService {
  constructor(private http: HttpClient) { }
  configUrl = 'assets/config.json';
  getConfig() {   return this.http.get(this.configUrl); }
  //return this.http.get<Config>(this.configUrl);  //Observable
}
```
```ts
//Config structure
export interface Config {
  heroesUrl: string;
  textfile: string;
}
```

#### Get Request

* The HttpClient.get() method parsed the JSON server response into the anonymous Object type. It doesn't know what the shape of that object is.
* You can tell HttpClient the type of the response to make consuming the output easier and more obvious. `get<Config>`

##### Reading the full response
The response body doesn't return all the data you may need. Sometimes servers return special headers or status codes to indicate certain conditions that are important to the application workflow.

```ts
getConfigResponse(): Observable<HttpResponse<Config>> {
  return this.http.get<Config>(
    this.configUrl, { observe: 'response' });
}
```

* observe option: Tell HttpClient that you want the full response
* Now HttpClient.get() returns an Observable of typed HttpResponse rather than just the JSON data.

```ts
showConfigResponse() {
  this.configService.getConfigResponse()
    // resp is of type `HttpResponse<Config>`
    .subscribe(resp => {
      // display its headers
      const keys = resp.headers.keys();
      this.headers = keys.map(key =>
        `${key}: ${resp.headers.get(key)}`);
      // access the body directly, which is typed as `Config`.
      this.config = { ... resp.body };
    });
}
```

* HttpClient captures both kinds of errors in its HttpErrorResponse and you can inspect that response to figure out what really happened.
* Error inspection, interpretation, and resolution is something you want to do in the service, not in the component.

```ts
private handleError(error: HttpErrorResponse) {
  if (error.error instanceof ErrorEvent) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.message);
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    console.error(
      `Backend returned code ${error.status}, ` +
      `body was: ${error.error}`);
  }
  // return an observable with a user-facing error message
  return throwError(
    'Something bad happened; please try again later.');
};
```
```ts
getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      catchError(this.handleError)
    );
}

getConfig() {
  return this.http.get<Config>(this.configUrl)
    .pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
}
```


#### POST request

```ts
/** POST: add a new hero to the database */
addHero (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}
```
```ts
import { HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};
```
```ts
this.heroesService.addHero(newHero).subscribe(hero => this.heroes.push(hero));
```

#### PUT Request

```ts
/** PUT: update the hero on the server. Returns the updated hero upon success. */
updateHero (hero: Hero): Observable<Hero> {
  return this.http.put<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('updateHero', hero))
    );
}
```

##### Update headers

```ts
httpOptions.headers = httpOptions.headers.set('Authorization', 'my-new-auth-token');
```

##### URL Parameters

api/heroes/?name=foo.

```ts
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  term = term.trim();
  // Add safe, URL encoded search parameter if there is a search term
  const options = term ?
   { params: new HttpParams().set('name', term) } : {};
  return this.http.get<Hero[]>(this.heroesUrl, options)
    .pipe(
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
}
```

#### DELETE Request

```ts
/** DELETE: delete the hero from the server */
deleteHero (id: number): Observable<{}> {
  const url = `${this.heroesUrl}/${id}`; // DELETE api/heroes/42
  return this.http.delete(url, httpOptions)
    .pipe(
      catchError(this.handleError('deleteHero'))
    );
}
```
```ts
this.heroesService.deleteHero(hero.id).subscribe();
```

* An HttpClient method does not begin its HTTP request until you call subscribe() on the observable returned by that method. This is true for all HttpClient methods.

#### Debouncing Request

Sending a request for every keystroke could be expensive. It's better to wait until the user stops typing and then send a request. That's easy to implement with RxJS operators.
*	debounceTime(500) - wait for the user to stop typing (1/2 second in this case).
*	distinctUntilChanged() - wait until the search text changes.
*	switchMap() - send the search request to the service.

```ts
withRefresh = false;
packages$: Observable<NpmPackageInfo[]>;
private searchText$ = new Subject<string>();

search(packageName: string) {
  this.searchText$.next(packageName);
}

ngOnInit() {
  this.packages$ = this.searchText$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap(packageName =>
      this.searchService.search(packageName, this.withRefresh))
  );
}

constructor(private searchService: PackageSearchService) { }
```

### Security - XSRF Protection

-	[Cross-Site Request Forgery (XSRF)]( https://en.wikipedia.org/wiki/Cross-site_request_forgery) is an attack technique by which the attacker can trick an authenticated user into unknowingly executing actions on your website. HttpClient supports a common mechanism used to prevent XSRF attacks. When performing HTTP requests, an interceptor reads a token from a cookie, by default XSRF-TOKEN, and sets it as an HTTP header, X-XSRF-TOKEN. Since only code that runs on your domain could read the cookie, the backend can be certain that the HTTP request came from your client application and not an attacker.
-	By default, an interceptor sends this header on all mutating requests (POST, etc.) to relative URLs but not on GET/HEAD requests or on requests with an absolute URL.
-	To take advantage of this, your server needs to set a token in a JavaScript readable session cookie called XSRF-TOKEN on either the page load or the first GET request. On subsequent requests the server can verify that the cookie matches the X-XSRF-TOKEN HTTP header, and therefore be sure that only code running on your domain could have sent the request. The token must be unique for each user and must be verifiable by the server; this prevents the client from making up its own tokens. Set the token to a digest of your site's authentication cookie with a salt for added security.
-	In order to prevent collisions in environments where multiple Angular apps share the same domain or subdomain, give each application a unique cookie name.

### Testing HTTP requests

```ts
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

// Other imports
import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HttpClient testing', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  /// Tests begin ///
});
```

TestBed.get() to inject the [HttpClient](https://angular.io/api/common/http/HttpClient) service and the mocking controller so they can be referenced during the tests.

```ts
it('can test HttpClient.get', () => {
  const testData: Data = {name: 'Test Data'};

  // Make an HTTP GET request
  httpClient.get<Data>(testUrl)
    .subscribe(data =>
      // When observable resolves, result should match test data
      expect(data).toEqual(testData)
    );

  // The following `expectOne()` will match the request's URL.
  // If no requests or multiple requests matched that URL
  // `expectOne()` would throw.
  const req = httpTestingController.expectOne('/data');

  // Assert that the request is a GET.
  expect(req.request.method).toEqual('GET');

  // Respond with mock data, causing Observable to resolve.
  // Subscribe callback asserts that correct data was returned.
  req.flush(testData);

  // Finally, assert that there are no outstanding requests.
  httpTestingController.verify();
});
```

The last step, verifying that no requests remain outstanding, is common enough for you to move it into an afterEach() step:
```ts
afterEach(() => {
  // After every test, assert that there are no more pending requests.
  httpTestingController.verify();
});
```
```ts
// Expect one request with an authorization header
const req = httpTestingController.expectOne(
  req => req.headers.has('Authorization')
);  //match() for more than 1
```

### Testing for errors
```ts
it('can test for 404 error', () => {
  const emsg = 'deliberate 404 error';
  httpClient.get<Data[]>(testUrl).subscribe(
    data => fail('should have failed with the 404 error'),
    (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(emsg, 'message');
    }
  );
  const req = httpTestingController.expectOne(testUrl);
  // Respond with mock error
  req.flush(emsg, { status: 404, statusText: 'Not Found' });
});
```


## ngrx

>Read more about ngrx
>* [Angular: NGRX a clean and clear Introduction](https://medium.com/frontend-fun/angular-ngrx-a-clean-and-clear-introduction-4ed61c89c1fc) 
>* [Angular Service Layers: Redux, RxJs and Ngrx Store - When to Use a Store And Why?](
https://blog.angular-university.io/angular-2-redux-ngrx-rxjs/)

* NGRX, Reactive State for Angular.
* NGRX is a group of libraries.
* NGRX <-- Redux pattern <-- Flux pattern. 
* The main purpose of this pattern is to provide a predictable state container, based on three main principles.
    - **Single source of truth** - state of your whole application is stored in an object tree within a single store.
    - **State is read-only** – you are never going to change the state directly instead you are going to dispatch actions. These actions describe what’s happening (can be things like getting, adding, removing, updating the state).
    - **Changes are made with pure functions** - reducers (remember that they are just pure functions) receive an action and the state, depending on the action dispatched (usually with a switch statement) they execute an operation and return a new state object.
* State in a redux app is immutable. So, when a reducer changes something in the state, it returns a new state object.
* pure functions – for same arguments you are going to get the same result.

***The main benefit, in my opinion, is that by binding all our components inputs to state properties we can change the change detection strategy to on push, and this is going to be a boost on performance for the application.***

<ImageComponent image-path='/angular/ngrx-state-diagram.png' />

<ImageComponent image-path='/angular/ngrx-code-action.png' />

<ImageComponent image-path='/angular/ngrx-code-reducer.png' />

## Checklist Topics
- Directives
  * Custom Attribute Directive
  * Custom Structural Directive
- Services and DI
  - Services Overview
  - Creating a Service
  - Injecting a Service
  - Example: Calculator Service
  - Dependency Injection
  - Why Dependency Injection?
  - Injection API
  - Component Multi Providers
  - Injection Multi Providers
  - Injector in angular works
  - Scoping the beans – singleton and prototype
  - Lifecycle hooks – ngOnChange, ngOnInit, ngDoCheck, ngAfterContentInit, ngAfterContentCheck, ngAfterViewInit, ngAfterViewCheck, ngOnDestroy
- Routing
  * Introduction and Use
  * Creating and configuring Routes
  * Imperative Routing
  * Routing Parameters
  * Child Routes
  * Routing Lifecycle Hooks
  * Setting up Firebase
  * HTTP POST Request
  * HTTP GET Request
  * Routers
  * Router Guards - https://codecraft.tv/courses/angular/routing/router-guards/
- Observables
  * Promises - still available, still useful
  * Calling an API via HTTP
  * Introduction to Observables
  * Observable Bindings
  * Observables Operators
- Forms
  * Controls
  * Control groups
  * FormBuilder
  * Template Driven Approach
  * Data Driven Approach
- Pipes
  * Pure impure functions
  * Pure impure pipes
  * Custom Pipes and declarations
  * Using Pipes
  * Creating Pipes
  * Built-in Pipes
  * Chaining Pipes
  * Custom Pipes
  * Stateful Pipes
- http
  * calls to service
- authentication
  * ngRX store - component, action, reducer, store
  * JWT on angular side
  * Stateful angular
  * Session Store
- optimizations and ngmodules
  * @NgModule
- deployment
  * --prod jit vs --prod --aot
- animations and testing
  * Unit Testing
  * End to End Testing

Node JS Training Outline
* Introduction to the Node.js framework
* Installing Node.js
* Using Node.js to execute scripts
* The Node Package Manager
* The package.json configuration file
* Global vs. local package installation
* Automating tasks with Gulp.
* The HTTP protocol
* Building an HTTP server
* Rendering a response
* Using Representational State Transfer
* Express Framework
* Connecting to Mongo databases
* Performing CRUD operations

## Future Bookmarks
- Parent to Child – Content Projection
  - content projection – ng-content
  - multiblock content projection - selector
  -	multiblock content projection - selector
- Preparing for TypeScript
  - Brief Intro to TypeScript
  - The TypeScript Module System
  - Getting Setup
  - Project Setup
  - String Templates
  - Const
  - Let
  - Debugging
  - Rest & Spread Operators
  - Arrow Functions
  - For...of
  - Maps
  - Sets
  - Class
  - Interface
  - Generics
  - New Object Features
  - Destructuring
  - Angular 4 with TypeScript and Modules
  - TypeScript decorators
