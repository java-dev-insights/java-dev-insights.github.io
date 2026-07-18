# Bootstrap 5

Open Source front-end framework for fast development.
- pre-made HTML/CSS teplates and classes
- js widgets and plugins
- mobile first responsive layout (no need to explicitly write media queries)
- [Official Documentation](https://getbootstrap.com/docs){target="_blank"}

**New in Bootstrap 5?**

- Grid system uses flex-box
- rem and em units instead of pixels
- moved from LESS to SASS (css precompiler)
- glyphicons dropped - recommended font awesome icons

## Ways to setup

- Download and include file
- Include CDN
- Package managers - npm/yarn

### Include CDN

CDN - content delivery network

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- CSS only -->
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
      crossorigin="anonymous"
    />
    <!-- Icons -->
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css"
    />
  </head>
  <body>
    <header></header>
    <main></main>
    <footer></footer>
    <!-- JavaScript Bundle with Popper -->
    <script
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
      integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
      crossorigin="anonymous"
    ></script>
  </body>
</html>
```

### Package managers - npm/yarn

```js
npm install bootstrap
```

## Responsive Layout

### Font Size Units

- 1 rem - relevant to font size of `html` tag, usually `1 rem = 16 px`
- 1 em - relevant to parent div font size, if parent div has font size 20 px then `2 em = 40px`

### Breakpoints

```css
$grid-breakpoints: (
  xs: 0,
  sm: 576px,
  md: 768px,
  lg: 992px,
  xl: 1200px,
  xxl: 1400px
);
```


## UI Utilities

- Grid System
- [Typography](https://getbootstrap.com/docs/5.1/content/typography){:target="\_blank"}
- [Text](https://getbootstrap.com/docs/5.1/utilities/text/){:target="\_blank"}
  - [text transform](https://getbootstrap.com/docs/5.1/utilities/text/#text-transform){:target="\_blank"}
  - [vertical align](https://getbootstrap.com/docs/5.1/utilities/vertical-align/){:target="\_blank"}
- Positioning, spacing, sizing and alignment
- colors
- images
- responsive utilities
- shadows

## CSS Components

- Forms and Input groups
- Tables
- List Groups
- Cards
- Progress Bars
- Alerts
- Navbar and Menus
- Buttons and Buttons Groups
- Pagination
- Media Objects
- Jumbotron
- Badges

## JS Widgets

- Caraousel Slider
- Collapsible accordion
- Modals
- Tooltips
- Pop overs
- Scrollspy

## Youtube Videos

<YouTubeEmbed video-id="PwWHL3RyQgk" /><br/>

<YouTubeEmbed video-id="dgKSqz3it50" /><br/>

<YouTubeEmbed video-id="V_lAhqLXT9A" /><br/>

