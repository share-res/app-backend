#!/usr/bin/env node

import Koa from 'koa'
import serve from 'koa-static' 
import parser from 'koa-bodyparser'
import convert from 'koa-convert'
import passport from 'koa-passport'
import session from 'koa-generic-session'
import csrf from 'koa-csrf'
import MongoStore from 'koa-generic-session-mongo'
import Debug from 'debug'

import config from './config'
import mongoose from 'mongoose'
import {logger,wrapResponse} from './middlewares'

import api from './routes/api'
import common from './routes/common'
import secure from './routes/secure'

const debug = Debug('res-share:app')

const app = new Koa()
app.proxy = true


debug('init server...')
app.use(serve('public'))
app.use(logger())
app.keys = ['alex', 'lsj']
app.use(convert(session({
  store: new MongoStore({url:config.DB.mongoURL})//
})))
app.use(parser())

csrf(app)
app.use(convert(csrf.middleware))

// authentication
require('./auth')

app.use(passport.initialize())
app.use(passport.session())
app.use(common());
app.use(secure());

app.use(wrapResponse())
app.use(api());

app.listen(config.port, () => debug(`server started ${config.port}`))


export default app


