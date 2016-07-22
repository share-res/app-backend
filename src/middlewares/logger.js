
import Debug from 'debug'
const debug = Debug('res-share:logger')

export default  () =>  {
    return async (ctx, next)=> {
        const start = new Date();
        await next();
        const ms = new Date() - start;
        debug(`${ctx.method} ${ctx.url} [${ms}ms]`);
    }
}