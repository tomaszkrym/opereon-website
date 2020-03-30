const THEMES = [
  {
    label: 'Light theme',
    css: 'theme-light',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
    </svg>
    `.trim()
  },
  {
    label: 'Dark theme',
    css: 'theme-dark',
    icon: `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
    `.trim()
  }
]

const theme = process.isClient ? localStorage.getItem('theme') || 'theme-dark' : 'theme-dark';

export default {
  state: {
    themes: THEMES,
    theme: THEMES.find(t => t.css === theme),
  },
  getters: {
    themes: state => state.themes,
    theme: state => state.theme,
  },
  mutations: {
    theme (state, theme) {
      if (state.themes.indexOf(theme) !== -1) {
        state.theme = theme
        localStorage.setItem('theme', theme.css)
      } else {
        throw new Error(`Unrecognized theme: '${theme.css}'`)
      }
    }
  }
}
