const categoryModel = require('../models/CategoryModel');

exports.getAllCategories = async function() {
    return await categoryModel.find();
};
exports.getOneCategory = async function(_id) {
    return await categoryModel.findById(_id)
};

// insert into value
exports.insert = async function (category) {
    const c = new categoryModel(category)
    await c.save();
};
exports.update = async function (category) {
   

  let document = await categoryModel.findById(category._id)

  if (document)
  {
    document.name = category.name;
    await document.save();
  }

};
exports.delete = async function (_id) {
    await categoryModel.remove({_id: _id});
};