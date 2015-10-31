function BaseDao(model) {
    this.model = model;
}

BaseDao.prototype.save = function (obj, callback) {
    this.model.create(obj, callback);
}

BaseDao.prototype.delete = function () {
}

BaseDao.prototype.update = function () {
}

BaseDao.prototype.query = function () {
}

module.exports = BaseDao;