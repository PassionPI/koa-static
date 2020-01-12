const mimes = require('./mimes')
const { join, extname } = require('path')
const { existsSync, readFileSync } = require('fs')


const static = (public = '') => async (ctx, next) => {

  const path = ctx.path === '/' ? '/index.html' : ctx.path
  const name = join(public, path)

  if (existsSync(name)) {
    try {
      ctx.body = readFileSync(name)
      ctx.set('Content-Type', mimes[extname(name)] || 'text/plain')
    } catch (e) {
      console.error(e)
    }
  }

  await next()
  
}

module.exports = static