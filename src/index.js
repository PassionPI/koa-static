const mimes = require('./mimes')
const { join, extname } = require('path')
const { existsSync, readFileSync } = require('fs')


const static = (public = '') => async (ctx, next) => {

  const name = join(public, ctx.path)

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