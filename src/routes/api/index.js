
import Router from 'koa-router'
import userRoute from './users'

const router = new Router()

function protect(ctx, next) {
  if (ctx.isAuthenticated()&&'DELETE'!=ctx.method) { //todo : should be admin
    console.log(ctx.method) //delete need admin role
    return next()
  } else {
    ctx.redirect('/')
  }
}
router.use(protect)

export default ()=> {
  const routes = [userRoute];
  routes.forEach(item=> {
    router.use('/api', item.routes())
  })
  return router.routes()
}
