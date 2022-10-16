'use strict';
const Service = require('egg').Service;
class BillService extends Service {
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('bill', params);
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  // 获取账单列表
  async list(id) {
    const { app } = this;
    const QUERY_STR = 'id, pay_type, amount, date, type_id, type_name, remark';
    const sql = `select ${QUERY_STR} from bill where user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async detail(id, user_id) {
    const { app } = this;
    try {
      const result = await app.mysql.get('bill', { id, user_id });
      console.log(result, 'hahahahaha');
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('bill', {
        ...params,
      }, {
        id: params.id,
        user_id: params.user_id,
      });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  }
  async delete(id, user_id) {
    const { app } = this;
    try {
      await app.mysql.delete('bill', {
        id,
        user_id,
      });
    } catch (e) {
      console.log(e);
      return null;
    }
  }
}

module.exports = BillService;
