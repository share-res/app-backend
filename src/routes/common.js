import Router from 'koa-router'
import fs from 'fs'
import * as mgr from '../controllers/users';
import Debug from 'debug'
import passport from 'koa-passport'

const debug = Debug('res-share:common')
const router = new Router()

router.get('/', function(ctx) {
  ctx.type = 'html'
  let body = fs.readFileSync(__dirname+'/../views/login.html', 'utf8')
  ctx.body = body.replace(/{csrfToken}/g, ctx.csrf)
})
router.post('/login', passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/'
 }))

router.get('/logout', function(ctx) {
  ctx.logout()
  ctx.redirect('/')
})

router.post('/register', async (ctx) => {
    const userData = ctx.request.body;
    debug(`register user:${userData.mobileNum}`)
	const result = await  mgr.register(userData);
     if (!result) {
        ctx.body = 'Not Found!'
        ctx.status = 404
      } else {
        ctx.body = { status: 'OK', data: result }
        ctx.status = 200
      }
})



export default (app)=> {
   return router.routes()
}
