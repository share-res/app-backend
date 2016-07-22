import ErrorResult from '../util/errorResult';

export default  () =>  {
  return async (ctx, next) => {
    try {
      const result = await next();
      // console.log(result)
      if (!result) {
        ctx.body = 'Not Found!'
        ctx.status = 404
      } else {
        ctx.body = { status: 'OK', data: result }
        ctx.status = 200
      }
    } catch (err) {
      //  参考github v3 api 设计结构:https://developer.github.com/v3/
      const error = { message: '服务端返回错误,请联系相关客服', status: 'error' };
      if (err instanceof ErrorResult) {
        Object.assign(error, {
          message: err.message,
          errors: err.errors
        });
      }
      ctx.body = error;
      ctx.status = err.status || 500;
    }
  }
}

