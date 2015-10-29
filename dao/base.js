function BaseDao(model) {
    this.model = model;
}

BaseDao.prototype.save = function (obj, callback) {
    this.model.create(obj, function (error) {
        if (error) {
            return callback(error)
        };
        return callback(obj);
    });
}

BaseDao.prototype.delete = function () {}

BaseDao.prototype.update = function () {}

BaseDao.prototype.query = function () {}