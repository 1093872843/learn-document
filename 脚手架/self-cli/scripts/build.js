import fs from 'node:fs'
import path from 'node:path'
import * as esbuild from 'esbuild'


await esbuild.build({
  bundle: true,
  entryPoints: ['index.ts'],
  external: ['locales/*'],
  outfile: 'outfile.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node14',

  plugins: [
    {
      name: 'alias',
      setup({ onResolve, resolve }) {
        onResolve({ filter: /^prompts$/, namespace: 'file' }, async ({ importer, resolveDir }) => {
          // we can always use non-transpiled code since we support 14.16.0+
          const result = await resolve('prompts/lib/index.js', {
            importer,
            resolveDir,
            kind: 'import-statement'
          })
          return result
        })
      }
    },

    {
      name: '@vue/create-eslint-config fix',
      setup(build) {
        // Update esbuild to support the import attributes syntax in this PR is too risky.
        // TODO: update esbuild and remove the hack.
        build.onLoad({ filter: /@vue.create-eslint-config.index.js$/ }, (args) => {
          const text = fs.readFileSync(args.path, 'utf8')
          return {
            contents: text.replace(`with { type: 'json' }`, ''),
            loader: 'js'
          }
        })

        // The renderEjsFile.js module uses file system APIs therefore after bundling it will not work.
        // So we need to preprocess it to remove the file system APIs.
        build.onLoad({ filter: /@vue.create-eslint-config.renderEjsFile\.js$/ }, (args) => {
          const pkgDir = path.dirname(args.path)
          const templatesDir = path.resolve(pkgDir, './templates')

          const allTemplateFileNames = fs.readdirSync(templatesDir)
          const templateFiles = Object.fromEntries(
            allTemplateFileNames.map((fileName) => {
              const content = fs.readFileSync(path.resolve(templatesDir, fileName), 'utf8')
              return [`./templates/${fileName}`, content]
            })
          )

          return {
            contents: `
              import ejs from 'ejs'
              const templates = ${JSON.stringify(templateFiles)}
              export default function renderEjsFile(filePath, data) {
                return ejs.render(templates[filePath], data, {})
              }
            `,
            loader: 'js'
          }
        })
      }
    },
  ]
})
