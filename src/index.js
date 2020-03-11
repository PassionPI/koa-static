const mimes = require('./mimes')
const { join, extname } = require('path')
const { existsSync, createReadStream } = require('fs')


const static = (public = '') => async (ctx, next) => {

  if (['HEAD', 'GET'].includes(ctx.method)) {
    const path = ctx.path === '/' ? '/index.html' : ctx.path
    const name = join(public, path)
  
    if (existsSync(name)) {
      try {
        ctx.body = createReadStream(name)
        ctx.type = mimes[extname(name)] || 'text/plain'
      } catch (e) {
        console.error(e)
      }
    }
  }

  await next()
  
}

module.exports = static