'use strict';
const fs = require('fs');
const moment = require('moment');
const mkdirp = require('mkdirp');
const path = require('path');

const Controller = require('egg').Controller;

class UploadController extends Controller {
  async upload() {
    const { ctx } = this;
    const file = ctx.request.files[0];
    let uploadDir = '';
    try {
      // 二进制文件
      const f = fs.readFileSync(file.filepath);
      console.log(f, 'fffffffffffff');
      const day = moment(new Date()).format('YYYYMMDD');
      // 创建路径名
      // app/public/upload 20221011 app\public\upload\20221011 this.config.uploadDir, day, dir
      const dir = path.join(this.config.uploadDir, day);
      const date = Date.now();
      await mkdirp(dir);
      // 创建路径名
      // app\public\upload\20221011 1665494942624 .png dir, date + path.extname(file.filename)
      uploadDir = path.join(dir, date + path.extname(file.filename));
      fs.writeFileSync(uploadDir, f);
    } finally {
      ctx.cleanupRequestFiles();
    }
    ctx.body = {
      code: 200,
      msg: '上传成功',
      data: uploadDir.replace(/app/g, ''),
    };
  }
}
module.exports = UploadController;
