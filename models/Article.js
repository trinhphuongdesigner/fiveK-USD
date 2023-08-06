const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const articleSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: [50, 'Tên sản phẩm không được vượt quá 50 ký tự'],
    },
    description: {
      type: String,
      maxLength: [500, 'Mô tả sản phẩm không được vượt quá 500 ký tự'],
    },
    content: {
      type: String,
      maxLength: [3000, 'Mô tả sản phẩm không được vượt quá 3000 ký tự'],
    },
    type: {
      type: String,
      enum: ['LONG_ARTICLE', 'SHORT_ARTICLE', 'TIL', 'QUOTE'],
      default: 'LONG_ARTICLE'
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    versionKey: false,
    timeStamp: true,
  },
);

// Virtual with Populate
articleSchema.virtual('categories', {
  ref: 'Category',
  localField: 'categoryId',
  foreignField: '_id',
  justOne: true,
});

articleSchema.virtual('users', {
  ref: 'User',
  localField: 'UserId',
  foreignField: '_id',
  justOne: true,
});

articleSchema.set('toJSON', { virtuals: true });
articleSchema.set('toObject', { virtuals: true });

articleSchema.plugin(mongooseLeanVirtuals);

const Article = model('articles', articleSchema);
module.exports = Article;
