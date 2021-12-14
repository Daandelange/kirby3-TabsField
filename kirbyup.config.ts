import { resolve } from 'path'
import { defineConfig } from 'kirbyup'

export default defineConfig({
  alias: {
    '@KirbyPanel/': `${resolve(__dirname, '../../../kirby/panel/src')}/`,
    //'@/' : `${resolve(__dirname, '../../../kirby/panel/src')}/`, // Uncomment to resolve panel files further
  },
})