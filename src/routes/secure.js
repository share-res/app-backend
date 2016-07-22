import Router from 'koa-router'
import fs from 'fs'
import * as mgr from '../controllers/users';
import Debug from 'debug'
const debug = Debug('res-share:secure')
const router = new Router()
/*
router.post('/update', function(ctx, next) {
  return passport.authenticate('local', function(user, info, status) {
    if (user === false) {
      ctx.status = 401
      ctx.body = { success: false }
    } else {
      ctx.body = { success: true }
      return ctx.login(user)
    }
  })(ctx, next)
})*/


function guard(ctx, next) {
  if (ctx.isAuthenticated()) {
    return next()
  } else {
    ctx.redirect('/')
  }
}
router.use(guard)
router.get('/app', function(ctx) {
  ctx.type = 'html'
  let body = fs.readFileSync(__dirname+'/../views/app.html', 'utf8')
  ctx.body = body.replace('{csrfToken}', ctx.csrf)
 // ctx.body = fs.createReadStream(__dirname+'/../views/app.html')//__dirname
})
export default ()=> {
   return router.routes()
}