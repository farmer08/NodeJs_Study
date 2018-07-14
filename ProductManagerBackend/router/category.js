const categoryservice = require('../service/category-service');

const router = require('express').Router();
// http://localhost:4000/category?page=2
router.get('/', async (req, res) => {

    let categorys = await categoryservice.findCategoryByPage(req.query.page);
    res.success(categorys);

});
// 下面是这种方式http://localhost:4000/category/2
// router.get('/:page', async (req, res) => {
//     let categorys = await categoryservice.findCategoryByPage(req.params.page);
//     res.success(categorys);
//
// });

router.post('/', async (req, res) => {
    let result = await categoryservice.addCategory(req.body);
    res.success(result);

});

router.delete('/:id', async (req, res) => {
    await categoryservice.deleteCategory(req.params.id)
    res.success();
});

router.put('/:id', async (req, res) => {
    await categoryservice.updateCategory(req.params.id, req.body);
    res.success();


});

module.exports = router;