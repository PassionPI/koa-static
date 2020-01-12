const mimes = require('./mimes')
const { join, extname } = require('path')
const { existsSync, readFileSync } = require('fs')


const static = (public = '') => async (ctx, next) => {
  const name = join(public, ctx.path)
  
  let body
  if (existsSync(name)) {
    try {
      body = readFileSync(name)
      ctx.set('Content-Type', mimes[extname(name)] || 'text/plain')
    } catch {
      body = '[404] Not Found.'
      ctx.status = 404
    }
  } else {
    body = '[404] Not Found.'
    ctx.status = 404
  }

  ctx.body = body
  await next()

}

module.exports = static