function BaseDao(model) {
    this.model = model;
}
/**
 * 创建
 * @param doc
 * @param callback
 */
BaseDao.prototype.create = function (doc, callback) {
    this.model.create(doc, callback);
}
/**
 * 保存
 * @param doc
 * @param callback
 */
BaseDao.prototype.save = function (doc, callback) {
    var user = new this.model(doc);
    user.save(callback)
}
/**
 * 查询
 * @param doc
 * @param callback
 */
BaseDao.prototype.find = function (doc, callback) {
    this.model.find(doc, callback);
}
/**
 * 查询单个
 * @param doc
 * @param callback
 */
BaseDao.prototype.findOne = function (doc, callback) {
    this.model.findOne(doc, callback);
}
/**
 * 根据_id查询
 * @param id
 * @param callback
 */
BaseDao.prototype.findById = function (id, callback) {
    this.model.findById(id, callback);
}
/**
 * 根据_id更新
 * @param id
 * @param doc
 * @param callback
 */
BaseDao.prototype.findByIdAndUpdate = function (id, doc, callback) {
    this.model.findByIdAndUpdate(id, doc, callback);
}
/**
 * 更新
 * @param conditions
 * @param doc
 * @param callback
 */
BaseDao.prototype.update = function (conditions, doc, callback) {
    this.model.update(conditions, doc, callback);
}
/**
 * 更新某一个
 * @param conditions
 * @param doc
 * @param callback
 */
BaseDao.prototype.findOneAndUpdate = function (conditions, doc, callback) {
    this.model.findOneAndUpdate(conditions, doc, callback);
}
/**
 * 计算数量值
 * @param doc
 * @param callback
 */
BaseDao.prototype.count = function (doc, callback) {
    this.model.count(doc, callback);
}
/**
 * 删除
 * @param doc
 * @param callback
 */
BaseDao.prototype.remove = function (doc, callback) {
    this.model.remove(doc, callback);
}
/**
 * 根据_id删除
 * @param id
 * @param callback
 */
BaseDao.prototype.findByIdAndRemove = function (id, callback) {
    this.model.findByIdAndRemove(id, callback);
}
/**
 * 删除单个
 * @param conditions
 * @param callback
 */
BaseDao.prototype.findOneAndRemove = function (conditions, callback) {
    this.model.findOneAndRemove(conditions, callback);
}

module.exports = BaseDao;