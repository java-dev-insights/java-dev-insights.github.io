
# Core Concepts

## Data Binding

- binding component ts data to its template.
- **Interpolation** - Angular evaluates all expressions in double curly braces, converts the expression results to strings, and links them with neighboring literal strings. Finally, it assigns this composite interpolated result to an element or directive property.
- Angular processes all data bindings once per JavaScript event cycle, from the root of the application component tree through all child components.

|Data Binding||
|---|---|
|String Interpolation|`<li>{ {hero.name}}</li>`|
|property binding|`<app-hero-detail [disabled]="!isEnabled()"></app-hero-detail>`|
|event binding|`<li (click)="selectHero(hero)"></li>`|
|2-way binding|`<input [(ngModel)]="hero.name">`, requires FormsModule for ngModel directive.|
|Class Binding|`[class.active = “isActive”]`|
|Style Binding|[style.*]|

<ImageComponent image-path='/angular/data-binding.png' />

<ImageComponent image-path='/angular/data-bindings.png' />

```
<input type="text" class="form-control" (input)="onUpdateServerName($event)">
<p>{ {serverName}}</p>

onUpdateServerName(event:Event){
  this.serverName = (<HTMLInputElement>event.target).value;
}
```

### Custom Binding
1. **Custom Attribute Binding** - `@Input()` to pass attribute from parent to child
2. **Custom Event Binding** - `@Output()` to pass attribute from child to parent

## Decorators

* Allows us to **decorate** classes and functions, similar to annotations in java 
* Functions that attaches metadata to TypeScript classes, so compiler knows what those classes mean and how they should work.

### Decorator Types
* Class decorators, e.g. `@Component` and `@NgModule`
* Property decorators for properties inside classes, e.g. `@Input` and `@Output`
* Method decorators for methods inside classes, e.g. `@HostListener`
* Parameter decorators for parameters inside class constructors, e.g. `@Inject`

| List of Decorators |                  |              |               |
| ------------------ | ---------------- | ------------ | ------------- |
| @NgModule          | @Component       | @Directive   |
| @Injectable        | @Pipe            |
| @Input             | @Output          | @HostBinding | @HostListener |
| @ContentChild      | @ContentChildren | @ViewChild   | @ViewChildren |

### @NgModule

<ImageComponent image-path='/angular/modules-app-diagram.png' />


* Angular app is a set of NgModules.
* declares a compilation context for closely related set of capabilities.
* By default **AppModule (app.module.ts)** is the root module from where bootstrapping happens.
* Distinct functional modules helps with reusability and *lazy-loading* (minimize amount of code to be loaded at startup)

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,  FormsModule, HttpClientModule ],
  exports:[],
  entryComponents: [SomeComponent, OtherComponent],
  providers: [Service, Pipes],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

**providers**
* global collection of services accessible in all parts of app. 
* You can also specify providers at the component level, which is often preferred.

**bootstrap**
* root component, which hosts all other app views. Only the root NgModule should set this property.

**declarations** 
* components, [directives](https://angular.io/guide/attribute-directives) and [pipes](https://angular.io/guide/pipes)
* declared classes are visible within the module but invisible to components in a different module unless they are exported from this module and the other module imports this one.

| NgModule | Import from | Why use it |
|---|---|---|
| [BrowserModule](https://angular.io/api/platform-browser/BrowserModule)  | @angular/platform-browser | When you want to run your app in a browser|
| [CommonModule](https://angular.io/api/common/CommonModule)              | @angular/common           | When you want to use [NgIf](https://angular.io/api/common/NgIf), NgFor|
| [FormsModule](https://angular.io/api/forms/FormsModule)                 | @angular/forms            | When you want to build template driven forms (includes [NgModel](https://angular.io/api/forms/NgModel))   |
| [ReactiveFormsModule](https://angular.io/api/forms/ReactiveFormsModule) | @angular/forms            | When you want to build reactive forms|
| [RouterModule](https://angular.io/api/router/RouterModule)              | @angular/router           | When you want to use [RouterLink]( https://angular.io/api/router/RouterLink), .forRoot(), and .forChild() |
| [HttpClientModule](https://angular.io/api/common/http/HttpClientModule) | @angular/common/http      | When you want to talk to a server|

### @Component

```
Component = template + class (typescript)
```

root component connects a component hierarchy with the page DOM.

Template 
* combines HTML with Angular markup that can modify the HTML elements before they are displayed.
* Together, **a component and template define an Angular view**.

```ts
import { Component } from '@angular/core';
@Component({
  selector: 'app-root', // as selector
  // selector: '[app-root]', // as attribute <div app-root/>
  // selector: '.app-root', // as class <div class="app-root"/>
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
}
```

#### @Component Attributes

```ts
@Component({ 
  changeDetection?: ChangeDetectionStrategy
  viewProviders?: Provider[]
  moduleId?: string
  templateUrl?: string
  template?: string
  styleUrls?: string[]
  styles?: string[]
  animations?: any[]
  encapsulation?: ViewEncapsulation // Emulated (default), None, Native
  interpolation?: [string, string]
  entryComponents?: Array<Type<any> | any[]>
  preserveWhitespaces?: boolean
  // inherited from core/Directive
  selector?: string
  inputs?: string[]
  outputs?: string[]
  providers?: Provider[]
  exportAs?: string
  queries?: {...}
  host?: {...}
  jit?: boolean
})
```

<ImageComponent image-path='/angular/component.png' />

|properties|  |
|---|---|
| changeDetection | change the detection strategy used by this component.                                                                        |
| viewProviders   | list of providers available for this component and the view of their children.                                               |
| inputs          | it is property within one component (child component) to receive a value from another component (parent component).          |
| outputs         | it is property of a component to send data from one component (child component) to calling component (parent component).     |
| providers       | Providers are usually singleton objects (an instance), to which other objects have access through dependency injection (DI). |
| jit             | if true, the AOT compiler will ignore this directive/component and will therefore always be compiled using JIT.              |

##### View Encapsulation
- component.css styles are applied to elements of that component only, known as Style encapsulation.
- All elements of a component are assigned a specific attribute, ex. _ngcontent-ejo-2.
- this is how angular emulates shadow DOM, as shadow DOM is not supported by all browsers.
- encapsulation
  - *ViewEncapsulation.Emulated* - default
  - *ViewEncapsulation.None* - css applied globally
  - *ViewEncapsulation.Native* - view encapsulation only for browsers supporting shadow DOM technology.

### @Directive

- Directives are instructions in the DOM to render templates.
- Directives can optionally have a template of themselves.
- @Component is also a directive, which extends the @Directive with template-oriented features.

```html
<p appTurnGreen>Receives a green background!</p>
```
```ts
@Directive({
  selector:'[appTurnGreen]'
})
export class TurnGreenDirective{
  ...
}
```

<ImageComponent image-path='/angular/directive.png' />

#### Structural Directives

Alter layout structure by adding, removing, and replacing elements in DOM.

```html
<p *ngIf="heroSelected; else heroNotSelected">You have selected a hero - { {hero}}</p>
<ng-template #heroNotSelected>
  <p>No hero selected.</p>
</ng-template>
```

```html
if (foo === 1) {
  ...
} else if (bar === 99) {
  ...
} else if (foo === 2) {
  ...
} else {
  ...
}
```

```html
<ng-container *ngIf="foo === 1; else elseif1">foo === 1</ng-container>
<ng-template #elseif1>
    <ng-container *ngIf="bar === 99; else elseif2">bar === 99</ng-container>
</ng-template>
<ng-template #elseif2>
    <ng-container *ngIf="foo === 2; else else1">foo === 2</ng-container>
</ng-template>
<ng-template #else1>else</ng-template>
```

```html
<li *ngFor="let hero of heroes; let i = index">
  <a href=hero.url>i - {{hero.name}}</a>
</li>
```

```html
<div [ngSwitch]="conditionExpression">
 	<ng-template [ngSwitchCase]="case1Exp">...</ng-template>
 	<ng-template ngSwitchCase="case2LiteralString">...</ng-template>
 	<ng-template ngSwitchDefault>...</ng-template>
</div>
```

#### Attribute Directives

* Alter the appearance or behavior of an existing element.

```html
<input [(ngModel)]="hero.name">	// 2 way binding

<!-- Binds presence of css classes to the truthiness of associated map values. 
right-hand expression should return {class-name: true/false} map.-->
<div [ngClass]="{'activeClass': (isActive === 'true'), 'disabledClass': isDisabled}">

<!-- Allows you to assign styles to an HTML element using CSS. -->
<div [ngStyle]="{'backgroung-color': 'green'}">
<div [ngStyle]="{backgroundColor: getColor()}">
<div [ngStyle]="dynamicStyles()">
```

### @Injectable

* Both components and services are simply classes, with decorators that mark their type and provide metadata that tells Angular how to use them.
* `@Injectable` decorator provides the metadata that allows your service to be injected into client components as a dependency.
* For data or logic that is not associated with a specific view, and that you want to share across components.
* Dependency injection (or DI) lets you keep your component classes lean and efficient. components don't fetch data from the server, validate user input, or log directly to the console; they delegate such tasks to services.
* Template, component and services are loosely coupled and have separation of concerns.
* Services can depend on other services.

```ts
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class HeroService { 
private heroes: Hero[] = []; 
constructor( private backend: BackendService, private logger: Logger) {} 
getHeroes() { 
  this.backend.getAll(Hero)
  .then((heroes: Hero[])=>{this.logger.log(`Fetched ${heroes.length} heroes.`); 
  this.heroes.push(...heroes); // fill cache }); 
  return this.heroes; }
}
```

#### Dependency Injection

*	`@Injectable` decorator provide the metadata that allows Angular to inject it into a component as a dependency.
*	Similarly, use the @Injectable decorator to indicate that a component or other class (such as another service, a pipe, or an NgModule) has a dependency. A dependency doesn't have to be a service—it could be a function, for example, or a value.
*	Dependency injection (often called DI) is wired into the Angular framework and used everywhere to provide new components with the services or other things they need.
  -	The **injector** is the main mechanism. Angular creates an application-wide injector for you during the bootstrap process.
  -	The injector maintains a container of dependency instances that it has already created, and reuses them if possible.
  -	A provider is a recipe for creating a dependency. 
  -	For any dependency you need in your app, you must register a provider with the app's injector, so that the injector can use it to create new instances.
*	When Angular creates a new instance of a component class, it determines which services or other dependencies that component needs by looking at the types of its constructor parameters. 

```ts
constructor(private service: HeroService) { }
```

*	When Angular discovers that a component depends on a service, it first checks if the injector already has any existing instances of that service. If a requested service instance does not yet exist, the injector makes one using the registered provider, and adds it to the injector before returning the service to Angular.
*	When all requested services have been resolved and returned, Angular can call the component's constructor with those services as arguments. The process of HeroService injection looks something like this:

<ImageComponent image-path='/angular/dependency-injection.png' />

<ImageComponent image-path='/angular/hierarchial-di.png' />

#### Providing services

* You must register at least one provider of any service you are going to use. You can register providers in modules or in components.
*	When you add providers to the root module, the same instance of a service is available to all components in your app.
*	When you register a provider at the component level, you get a new instance of the service with each new instance of that component.

```ts
providers: [ BackendService, HeroService, Logger ],
@Component({
 	selector: 'app-hero-list', 
	templateUrl: './hero-list.component.html', 
	providers: [ HeroService ] 
})
```

##### Change Scope of Service

***How to change Scope of Service? or make it singleton?***

```ts
// Option 1
providers: [ { provide: MyService, singleton: true  } ],
or
providers: [ { provide: MyService, scope: 'singleton'  } ],
```
```ts
// Option 2
@Injectable({ singleton: true })
export class MyserviceService {
  constructor() { }
}
```
```ts
// Option 3
@Injectable({ scope: 'singleton' })
export class MyserviceService {
  constructor() { }
}
```

### @Pipe

* templates use pipes to improve the user experience by transforming values for display. 
* Use pipes to display, for example, dates and currency values in a way appropriate to the user's locale. 
* `@Pipe` decorator defines a function that transforms input values to output values for display in a view.
* Angular defines various predefined  pipes, such as the date pipe and currency pipe. You can also define new pipes.
* You can chain pipes, sending the output of one pipe function to be transformed by another pipe function.
* A pipe can also take arguments that control how it performs its transformation. For example, you can pass the desired format to the date pipe:

```ts
// Pipe definition
import { Pipe, PipeTransform } from '@angular/core';  
@Pipe({
name: ‘Multiplier’, 
pure: false/true     // (default is `true`)
}) 
export class MultiplierPipe implements PipeTransform { 
   transform(value: number, multiply: string): number { 
      let mul = parseFloat(multiply); 
      return mul * value 
   } 
} 
```
```ts
// Add to NgModule declarations
@NgModule ({…
   declarations: [AppComponent, MultiplierPipe],
```
```html
<!-- Default format: output 'Jun 15, 2015'--> 
<p>Today is { {today | date} }</p> 
<!-- fullDate format: output 'Monday, June 15, 2015'--> 
<p>The date is { {today | date:'fullDate'} }</p> 
<!-- shortTime format: output '9:43 AM'--> 
<p>The time is { {today | date:'shortTime'} }</p>
<!-- Using Custom Pipe -->
<p>Multiplier: { {2 | Multiplier: 10} }</p> // : for more params
```

#### Stateful Pipes - pure vs impure

| Pure Functions | Impure Functions |
|---|---|
| Doesn’t have a state.  | Have an internal state. |
| same input parameters produce same output.  |
| can be safely shared with many instances.   |
| pure pipe is only called when Angular detects a change in the value or the parameters passed to a pipe. | impure pipe is called for every change detection cycle no matter whether the value or parameters changes. |

```ts
/** Pure Functions **/
const addPure = (v1, v2) => { return v1 + v2; };
addPure(1, 1); // 2
addPure(1, 1); // 2
addPure(1, 1); // 2
```

```ts
/** Impure Functions **/
const addImpure = (() => {
    let state = 0;
    return (v) => { return state += v; }
})();

addImpure(1); // 1
addImpure(1); // 2
addImpure(1); // 3
```

## Content Projection

```
import { Input, ... } from '@angular/core';
```

<ImageComponent image-path='/angular/content-projection.png' />

### Custom Binding - Property and Event

- app-root - contains servers array, app-server-edit, list of app-server-element
- app-server-element - takes property as input
- app-server-creator - output event on addition of server to app-root

> Here, app-server-creator emits event to app-root and then app-root pushes it down to app-server-element, this creates a chain of output and input.

> For lengthy chains, use of service to share data is recommended.

#### @Input()

* *Read more about [@Input](https://angular.io/api/core/Input){target="_blank"}*
* Parent to Child communication.
* Makes property bind-able from outside the component.
* Declares an input property that you can update via property binding.
* (example: <my-cmp [myProperty]="someExpression">).
* Custom Attribute Binding

```ts
/* app-root */
<app-server-element *ngFor="let server of servers" [element]="server"></app-server-element>
<app-server-element *ngFor="let server of servers" [srvElement]="server"></app-server-element> // with alias srvElement
/* app-server-element @Component */
@Input() element: {type: string, name:string, content:string};
@Input('srvElement') element: {type: string, name:string, content:string}; // with alias srvElement
```

#### @Output()

@Output() myEvent = new EventEmitter();
* [@Output()](https://angular.io/api/core/Output){target="_blank"}
* [Event Emitter](https://angular.io/api/core/EventEmitter){target="_blank"}
* Declares an output property that fires events that you can subscribe to with an event binding.
* (example: <my-cmp (myEvent)="doSomething()">).
* Custom Event Binding.

```ts
/* app-root */
<app-server-creator (onServerCreated)="onServerAdded($event)"></app-server-creator>
<app-server-creator (onServerCreatedAlias)="onServerAdded($event)"></app-server-creator> // with alias
```
```ts
/* app-root @Component*/
onServerAdded(serverData: {name:string, content:string}){
  this.serverElement.push({
    type: 'server',
    name: serverData.name,
    content: serverData.content
  });
}
```
```ts
/* app-server-creator */
@Output() onServerCreated = new EventEmitter<{name:string, content:string}>();
@Output('onServerCreatedAlias') onServerCreated = new EventEmitter<{name:string, content:string}>(); // with alias
newServerName = '';
newServerContent = '';
onCreateServer(){
  this.onServerCreated.emit({
    name: this.newServerName,
    content: this.newServerContent
  });
}
```

### Using Local References in Templates

- Can be used only in template, not in typescript.
- Type is `HTMLInputElement`

```html
<!-- Normal definition -->
<input type="text" class="form-control" [(ngModel)]="newServerContent">
<!-- Local References -->
<input type="text" class="form-control" #serverNameInput>
<button class="btn btn-primary" (click)="onAddServer(serverNameInput)">Add Server</button>
<!-- app-root.ts -->
onAddServer(serverNameInput: HTMLInputElement){
  console.log(serverNameInput.value);
}
```

#### @ViewChild()

- Can get access to any local reference or any other element directly from the ts code.
- Earlier we passed local reference to method, but sometimes you may need to get the element before method call.
- Type is `ElementRef`
@ViewChild(myPredicate) myChildComponent;
* [@ViewChild](https://angular.io/api/core/ViewChild)
* Binds the first result of the component view query (myPredicate) to a property (myChildComponent) of the class. Not available for directives.
* The same change (add { static: true } as a second argument) needs to be applied to ALL usages of @ViewChild() (and also @ContentChild(), IF you plan on accessing the selected element inside of ngOnInit().
* If you DON'T access the selected element in ngOnInit (but anywhere else in your component), set static: false instead!
* Can be accessed only after View Init.
* Here, you access something from a child component in your view.

```html
<!-- Normal definition -->
<input type="text" class="form-control" [(ngModel)]="newServerContent">
<!-- Element to be accessed as view child -->
<input type="text" class="form-control" #serverNameInput>
<!-- app-root.ts -->
<!-- by selector -->
@ViewChild('serverNameInput', {static: true}) serverNameInput: ElementRef; 
<!-- by component name -->
<!-- Gets First Element of that component type -->
@ViewChild(ServerCreatorComponent, {static: true}) serverNameInput: ElementRef;
var text = this.serverNameInput.nativeElement.value;
<!-- can be used to modify DOM and output data like below, but not recommended. -->
<!-- Instead use String interpolation or property binding to output the data. -->
this.serverNameInput.nativeElement.value = "new value";
```

#### @ViewChildren()

@ViewChildren(myPredicate) myChildComponents;
* [@ViewChildren](https://angular.io/api/core/ViewChildren)
* Binds the results of the **component view query** (myPredicate) to a property (myChildComponents) of the class. Not available for directives.

#### @ContentChild()

@ContentChild(myPredicate) myChildComponent;
* [@ContentChild](https://angular.io/api/core/ContentChild)
* Binds the first result of the component content query (myPredicate) to a property (myChildComponent) of the class.
* Here, you are the child and want to access content passed from parent to you inside ng-content.

#### @ContentChildren()

@ContentChildren(myPredicate) myChildComponents;
* [@ContentChildren](https://angular.io/api/core/ContentChildren)
* Binds the results of the **component content query** (myPredicate) to a property (myChildComponents) of the class.

### @HostBinding()

@HostBinding('class.valid') isValid;
* [@HostBinding](https://angular.io/api/core/HostBinding)
* Binds a host element property (here, the CSS class valid) to a directive/component property (isValid).

### @HostListener()

@HostListener('click', ['$event']) onClick(e) {...}
* [@HostListener](https://angular.io/api/core/HostListener)
* Subscribes to a host element event (click) with a directive/component method (onClick), optionally passing an argument ($event).

### @ng-content()

- contents passed within the ng component selectors are projected in the component view.
- Can be used to make reusable widgets like tab widget.

```html
<!-- anything passed within the element is ignored, and no error msg is shown -->
<app-server-element></app-server-element>

<app-server-element>
  <p *ngIf="serverAdded.type === ''server">serverAdded.name</p>
</app-server-element>
<!-- app-server-element.html -->
<div>
  <ng-content></ng-content>
</div>
```

## Change Detection

* Change Detection means updating the DOM every time the data is changed.
* A model in Angular can change as a result of one of the following scenarios:
  -	DOM events (click, hover over, etc.)
  -	AJAX requests
  -	Timers (setTimer(), setInterval())
*	All angular applications consist of a hierarchical tree of components. At runtime, Angular creates a change detector class separately for each tree component, which then eventually forms a hierarchy of change detectors similar to the hierarchy tree components.
*	When change tracking is activated, Angular goes through this tree of change detectors to determine if any of them have changed.
*	The change detection cycle is always performed once for each detected change and starts from the root change detector and is sequentially reduced. 

```ts
import { Component, OnInit, Input , ChangeDetectionStrategy } from '@angular/core';
@Component({
  selector: 'app-message',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: ‘’
})
export class MessageComponent implements OnInit {
  @Input() company;
  constructor() { }
  ngOnInit() {  }
}
```

<ImageComponent image-path='/angular/change-detector-hierarchy.png' />

### Change Detection Strategies

#### Default Strategy
*	Every time you put or edit any data, Angular will run the change detector to update the DOM.
*	By default, Angular makes no assumptions about what the component depends on. Therefore, it must be prudent and will check every time something has changed, this is called dirty checking. 
*	In a more concrete way, it will perform checks for every browser event, timer, XHR and promises.
*	It is problematic when you start having a big application with many components, especially if you have focused on performance.

#### onPush
*	Angular only performs the change detector when a new reference to the data of @Input () is passed.
*	Each component is provided its own change detector, which is responsible for tracking changes and updating the DOM.
*	Based only on the modification of the input references, some events activated by themselves (the component) or one of his children.
*	Developer, can explicitly ask Angular to do it with the componentRef.markForCheck () method.
*	With onPush, the component depends only on its inputs and covers immutability, the change detection strategy will be activated when:
  -	The input reference changes;
  -	An event originating from the member or one of his children;
  -	Execute change detection explicitly (componentRef.markForCheck ());
  -	Use the async pipe in the view.

#### To be remember
*	If the Angular ChangeDetector is configured by default, for any change in any model properties, Angular will track changes through the component structure to update the DOM.
*	If the Angular ChangeDetetor is set to onPush, Angular only runs the change detector when a new reference to the component is passed.
*	If you pass observable to the onPush change detector's enabled component, Angular ChangeDetctor must be called manually to update the DOM.

## LifeCycle Hooks

* Component lifecycle managed by Angular.
* Angular creates it, renders it, creates and renders its children, checks it when its data-bound properties change, and destroys it before removing it from the DOM.
* Angular offers lifecycle hooks that provide visibility into these key life moments and the ability to act when they occur.
* A directive has the same set of lifecycle hooks.

<ImageComponent image-path='/angular/lifecycle-of-directive-vs-component.png' />

### ngOnChanges()
* Respond when Angular (re)sets data-bound input properties. (@Input)
* The method receives a SimpleChanges object of current and previous property values.
* Called before ngOnInit() and whenever one or more data-bound input properties change.

```ts
export class ServerElementComponent implements onInit, onChnages{
  @Input('serverElement') element: {name: string, content:string};
  ngOnChanges(changes: SimpleChanges){
    console.log('ngOnChanges called!');
    console.log(changes);
    // SimpleChange contains @Input element
  }
}
```

### ngOnInit()	
* Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
* When it is Initialized but not displayed in the DOM.
* Called once, after the first ngOnChanges().
* Runs after the constructor.

### ngDoCheck()
* Detect and act upon changes that Angular can't or won't detect on its own.
* Called during every change detection run, immediately after ngOnChanges() and ngOnInit().
* Runs on every check run by angular, irrespective of any changes made.
* Very powerful tool, can be used in cases where you have to do something manually as angular didn't pick up the changes.

### ngAfterContentInit()
*	Respond after Angular projects external content into the component's view / the view that a directive is in.
*	Called only once ie. after the first ngDoCheck().
* Called after content (in ng-content) has been projected into the view.

### ngAfterContentChecked()
* Respond after Angular checks the content projected into the directive/component.
* Called after the ngAfterContentInit() and every subsequent ngDoCheck().

### ngAfterViewInit()
*	Respond after Angular initializes the component's views and child views / the view that a directive is in.
*	Called once after the first ngAfterContentChecked().

### ngAfterViewChecked()
*	Respond after Angular checks the component's views and child views / the view that a directive is in.
*	Called after the ngAfterViewInit() and every subsequent ngAfterContentChecked().

### ngOnDestroy()
*	Cleanup just before Angular destroys the directive/component. 
*	Unsubscribe Observables and detach event handlers to avoid memory leaks.
*	Called just before Angular destroys the directive/component.

<ImageComponent image-path='/angular/lifecycle-hooks.png' />

<ImageComponent image-path='/angular/ngOnChanges-example.png' />


## JIT vs AOT

The main differences between JIT and AOT in Angular are:
*	The time when the compilation takes place.
*	JIT generates JavaScript however, AoT usually generates TypeScript.
* `ng build` command creates a dist folder with deployables.

```ts
ng build --prod --jit
ng build --prod --aot
```

<ImageComponent image-path='/angular/jit-vs-aot.png' />

<ImageComponent image-path='/angular/jit-vs-aot-points.png' />

<ImageComponent image-path='/angular/jit-vs-aot-flow.png' />


### Flow of events with Just-in-Time Compilation

*	Development of Angular application with TypeScript.
*	Compilation of the application with tsc.
*	Bundling.
*	Minification.
*	Deployment.

Once we’ve deployed the app and the user opens her browser, she will go through the following steps (without strict CSP):
-	Download all the JavaScript assets.
-	Angular bootstraps.
-	Angular goes through the JiT compilation process, i.e. generation of JavaScript for each component in our application.
The application gets rendered.


### Flow of events with Ahead-of-Time Compilation
In contrast, with AoT we get through the following steps:
*	Development of Angular application with TypeScript.
*	Compilation of the application with ngc.
*	Performs compilation of the templates with the Angular compiler and generates (usually) TypeScript.
*	Compilation of the TypeScript code to JavaScript.
*	Bundling.
*	Minification.
*	Deployment.

Although the above process seems lightly more complicated the user goes only through the steps:
*	Download all the assets.
*	Angular bootstraps.
* The application gets rendered.

## Forms

### Template-driven forms

> Further Reads - [NgModule](https://angular.io/api/core/NgModule), [BrowserModule](https://angular.io/api/platform-browser/BrowserModule), [FormsModule](https://angular.io/api/forms/FormsModule), [FormControl](https://angular.io/api/forms/FormControl)

*	Bind data properties to each form control using the ngModel two-way data-binding syntax.
*	Add a name attribute to each form-input control.
*	Handle form submission with `ngSubmit`.
*	Template reference variables are used.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
@NgModule({
imports: [ BrowserModule, FormsModule ],
export class AppModule { }
```

```html
<div class="container">
  <div [hidden]="submitted">
    <h1>Hero Form</h1>
    <form (ngSubmit)="onSubmit()" #heroForm="ngForm">
      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" class="form-control" id="name" required [(ngModel)]="model.name" name="name" #name="ngModel">
        <div [hidden]="name.valid || name.pristine" class="alert alert-danger">Name is required</div>
      </div>
       <div class="form-group">
        <label for="alterEgo">Alter Ego</label>
        <input type="text" class="form-control" id="alterEgo" [(ngModel)]="model.alterEgo" name="alterEgo">
      </div>
 
      <div class="form-group">
        <label for="power">Hero Power</label>
        <select class="form-control" id="power" required [(ngModel)]="model.power" name="power" #power="ngModel">
          <option *ngFor="let pow of powers" [value]="pow">{{pow}}</option>
        </select>
        <div [hidden]="power.valid || power.pristine" class="alert alert-danger">Power is required</div>
      </div>
 
      <button type="submit" class="btn btn-success" [disabled]="!heroForm.form.valid">Submit</button>
      <button type="button" class="btn btn-default" (click)="newHero(); heroForm.reset()">New Hero</button>
    </form>
  </div>
 
  <div [hidden]="!submitted">
    <h2>You submitted the following:</h2>
    <div class="row">
      <div class="col-xs-3">Name</div>
      <div class="col-xs-9">{{ model.name }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Alter Ego</div>
      <div class="col-xs-9">{{ model.alterEgo }}</div>
    </div>
    <div class="row">
      <div class="col-xs-3">Power</div>
      <div class="col-xs-9">{{ model.power }}</div>
    </div>
    <br>
    <button class="btn btn-primary" (click)="submitted=false">Edit</button>
  </div>
</div>
```

#### Validator functions

*	**Sync validators**: functions that take a control instance and immediately return either a set of validation errors or null. You can pass these in as the second argument when you instantiate a FormControl.
*	**Async validators**: functions that take a control instance and return a Promise or Observable that later emits a set of validation errors or null. You can pass these in as the third argument when you instantiate a FormControl.
*	styles.css ==> @import url('https://unpkg.com/bootstrap@3.3.7/dist/css/bootstrap.min.css');
*	**Why check dirty and touched?** Don’t want want to display errors before user edit the form.

| Properties |                                                                                       |
| ---------- | ------------------------------------------------------------------------------------- |
| valid      | This property returns true if the element’s contents are valid and false otherwise.   |
| invalid    | This property returns true if the element’s contents are invalid and false otherwise. |
| pristine   | This property returns true if the element’s contents have not been changed.           |
| dirty      | This property returns true if the element’s contents have been changed.               |
| untouched  | This property returns true if the user has not visited the element.                   |
| touched    | This property returns true if the user has visited the element.                       |

#### Validation Template Driven

```html
<input id="name" name="name" class="form-control" required 
	minlength="4" appForbiddenName="bob" [(ngModel)]="hero.name" #name="ngModel" >
  <div *ngIf="name.invalid && (name.dirty || name.touched)" class="alert alert-danger">
  <div *ngIf="name.errors.required">Name is required.</div>
  <div *ngIf="name.errors.minlength">Name must be at least 4 characters long.</div>
  <div *ngIf="name.errors.forbiddenName">Name cannot be Bob.</div>
</div>
```

### Data Driven Form/ Reactive Form

```html
<form [formGroup]="profileForm" (ngSubmit)="onSubmit()>
   <label>First Name:<input type="text" formControlName="firstName"></label>
   <label>Last Name:<input type="text" formControlName="lastName"></label>
   <div formGroupName="address">
      <h3>Address</h3>
      <label>Street:<input type="text" formControlName="street"></label>
      <label>City:<input type="text" formControlName="city"></label>  
      <label>State:<input type="text" formControlName="state"></label>
      <label>Zip Code:<input type="text" formControlName="zip"></label>
   </div>
   <button type="submit" [disabled]="!profileForm.valid">Submit</button>
</form>
```

```ts
export class ProfileEditorComponent {
  profileForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    address: new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
      state: new FormControl(''),
      zip: new FormControl('')
    })
  });
}
```

```html
<input id="name" class="form-control"
      formControlName="name" required >
<div *ngIf="name.invalid && (name.dirty || name.touched)"
    class="alert alert-danger">
  <div *ngIf="name.errors.required">
    Name is required.
  </div>
  <div *ngIf="name.errors.minlength">
    Name must be at least 4 characters long.
  </div>
  <div *ngIf="name.errors.forbiddenName">
    Name cannot be Bob.
  </div>
</div>
```
```ts
ngOnInit(): void {
  this.heroForm = new FormGroup({
    'name': new FormControl(this.hero.name, [
      Validators.required,
      Validators.minLength(4),
      forbiddenNameValidator(/bob/i)
    ]),
    'alterEgo': new FormControl(this.hero.alterEgo),
    'power': new FormControl(this.hero.power, Validators.required)
  });
}
get name() { return this.heroForm.get('name'); }
get power() { return this.heroForm.get('power'); }
/** A hero's name can't match the given regular expression */
export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? {'forbiddenName': {value: control.value}} : null;
  };
}
```
