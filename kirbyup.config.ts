import { resolve } from 'path'
import { defineConfig } from 'kirbyup/config'

export default defineConfig({
  alias: {
    '@KirbyPanel/': `${resolve(__dirname, '../../../kirby/panel/src')}/`,
    //'@/' : `${resolve(__dirname, '../../../kirby/panel/src')}/`, // Uncomment to resolve panel files further
  },
  vite: {
    // Custom Vite options to be merged with the default config
  }
})