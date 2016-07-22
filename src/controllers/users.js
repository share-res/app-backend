
//import ErrorResult, {ErrorOption} from '../util/errorResult';
import models from  '../models'
/**
 * 根据条件查询账户信息
 * @param options object类型 查询用户条件
 * @returns {*}
 */
export async function getUsers(query) {
  return await models.User.find(query);//.select('userInfo');
}

/**
 *  根据用户Id获取某个用户
 * @param userId 用户id
 * @returns {*}
 */
export async function getUserById(userId) {
  let data= await models.User.findById(userId);
  //console.log(data);
  return data;
}

/**
 * 用户注册
 * @param userData 用户注册数据
 * @returns {*}
 */
export async function register( userData) {
 /* if (!userData.hasOwnProperty('mobileNUm')) {
    const errorOptions = [new ErrorOption('account', 'mobileNUm', 'missing_field')];
    throw new ErrorResult('必须要有手机号码才能注册', 422, errorOptions);
  }
  if (!userData.hasOwnProperty('password')) {
    const errorOptions = [new ErrorOption('account', 'password', 'missing_field')];
    throw new ErrorResult('缺少密码字段', 422, errorOptions);
  }*/
  const user = new models.User(userData);
  return await user.save();
}

/**
 * 删除某个用户
 * @param userId 用户Id
 * @returns {Query}
 */
export async function remove(userId) {
  return await models.User.findByIdAndRemove(userId);
}
