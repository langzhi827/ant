/**
 * 响应数据规则
 *
 * @param status 响应状态
 * @param msg 响应信息
 * @param data 响应
 * @returns {*}
 */
function responseFun(status, msg, data) {
    var result = {status: status, msg: "", data: {}};
    if (msg) {
        result.msg = msg;
    }
    if (data) {
        result.data = data;
    }
    return result;
}
/**
 * 失败
 * @param msg
 * @param data
 * @returns {*}
 */
exports.failure = function (msg, data) {
    return responseFun('failure', msg, data);
}
/**
 * 错误
 * @param msg
 * @param data
 * @returns {*}
 */
exports.error = function (msg, data) {
    return responseFun('error', msg, data);
}
/**
 * 成功
 * @param msg
 * @param data
 * @returns {*}
 */
exports.success = function (msg, data) {
    return responseFun('success', msg, data);
}