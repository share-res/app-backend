import Router from 'koa-router';
import * as mgr from '../../controllers/users';
import Debug from 'debug'
const debug = Debug('res-share:api:user')
const router = new Router({prefix: '/users'});

router
  .get('/', async () => {return await mgr.getUsers()})
  .get('/:id', async (ctx) => {
      debug(`load user id:${ctx.params.id}`)
      return await mgr.getUserById(ctx.params.id)
  })
  .delete('/:id', async (ctx) => {
    debug(`delete user id:${ctx.params.id}`)
    return await mgr.remove(ctx.params.id);
  })

export default router
