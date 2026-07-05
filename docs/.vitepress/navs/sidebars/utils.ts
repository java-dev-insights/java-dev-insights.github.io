import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_UTILS = [
  { 
    collapsed: true,
    text: 'Media', 
    items: [
      { text: 'Images', link: PATHS.UTILS+'/images' },
      { text: 'Youtube', link: PATHS.UTILS+'/youtube' },
    ] 
  },
  { 
    collapsed: true,
    text: 'Diagrams', 
    items: [
      { text: 'Mermaid', link: PATHS.UTILS+'/mermaid' },
      { text: 'Maths', link: PATHS.UTILS+'/maths' },
    ] 
  }
];

export default SIDEBAR_DEFAULT_UTILS;