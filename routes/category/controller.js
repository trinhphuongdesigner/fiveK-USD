
const { Category } = require('../../models');

module.exports = {
  getAll: async (req, res, next) => {
    try {
      const conditionFind = { isDeleted: false };

      let result = await Category.find(conditionFind)

      return res.send({ code: 200, message: 'success', payload: result });
    } catch (err) {
      return res.status(500).json({ code: 500, message: 'fail', error: err });
    }
  },

  getDetail: async (req, res, next) => {
    try {
      const { id } = req.params;
      const conditionFind = { isDeleted: false, _id: id };

      let result = await Category.findOne(conditionFind);

      if (result) {
        return res.send({ code: 200, message: 'success', payload: result });
      }

      return res.status(410).send({ code: 404, message: 'Not found' });
    } catch (err) {
      res.status(404).json({
        message: 'Get detail fail!',
        payload: err,
      });
    }
  },

  create: async function (req, res, next) {
    try {
      const data = req.body;

      const newItem = new Category(data);

      let result = await newItem.save();

      return res.send({ code: 200, message: 'Tạo thành công', payload: result });
    } catch (err) {
      console.log('««««« err »»»»»', err);
      return res.status(500).json({ code: 500, error: err });
    }
  },

  remove: async function (req, res, next) {
    try {
      const { id } = req.params;

      let found = await Category.findByIdAndDelete(id);

      if (found) {
        return res.send({ code: 200, payload: found, message: 'Xóa thành công' });
      }

      return res.status(410).send({ code: 404, message: 'Không tìm thấy' });
    } catch (err) {
      return res.status(500).json({ code: 500, error: err });
    }
  },

  update: async function (req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const found = await Category.findByIdAndUpdate(id, updateData, {
        new: true,
      });

      if (found) {
        return res.send({
          code: 200,
          message: 'Cập nhật thành công',
          payload: found,
        });
      }

      return res.status(410).send({ code: 400, message: 'Không tìm thấy' });
    } catch (error) {
      return res.status(500).json({ code: 500, error: err });
    }
  },
};
