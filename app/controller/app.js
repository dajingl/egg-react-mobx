module.exports = app => {

  return class AppController extends app.Controller {

    async client() {
      const { ctx } = this;
      await ctx.renderClient('client.js', {});
    }

    async list() {
      const pageIndex = this.ctx.query.pageIndex;
      const pageSize = this.ctx.query.pageSize;
      this.ctx.body = Model.getPage(pageIndex, pageSize);
    }
  
    async detail() {
      const id = this.ctx.query.id;
      this.ctx.body = Model.getDetail(id);
    }
  
    async status() {
      this.ctx.body = 'ok';
    }
    
  };
};