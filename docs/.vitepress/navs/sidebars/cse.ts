import { default as PATHS } from '../paths';

const SIDEBAR_DEFAULT_CSE = [
      { 
        // text: 'Overview',
        items: [
          { text: 'Overview', link: PATHS.CSE_INDEX },
        ] 
      },
      { 
        // text: 'Overview',
        items: [
          { text: 'Data Structures', link: PATHS.CSE_DS },
          { text: 'Algorithms', link: PATHS.CSE_ALGO },
        ] 
      },
      { 
        // text: 'Overview',
        items: [
          { text: 'Operating Systems (OS)', link: PATHS.CSE_OS },
          { text: 'DBMS', link: PATHS.CSE_DBMS },
          { text: 'Computer Networks', link: PATHS.CSE_CN },
        ] 
      },
      { 
        // text: 'Overview',
        items: [
          { text: 'Programming', link: PATHS.CSE_PROG_BASIC },
          { text: 'Cheat Sheet', link: PATHS.CSE_CHEATSHEET },
          { text: 'Puzzles', link: PATHS.CSE_PUZZLES },
        ] 
      },
    ]

export default SIDEBAR_DEFAULT_CSE;