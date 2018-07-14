const Productservice = require('../service/product-service');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const products = await Productservice.getProductByPage(req.query.page);
    res.success(products)
});

router.post('/', async (req, res) => {
    res.success(await Productservice.addProduct(req.body));

});

router.delete('/:id', async (req, res) => {
    await Productservice.deleteProduct(req.params.id);
    res.success()
});

router.put('/:id', async (req, res) => {
    await Productservice.updateProduct(req.params.id,req.body);
    res.success()
});

module.exports = router;