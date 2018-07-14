const oService = require('../service/order-service');
const router = require('express').Router();

router.get('/', async (req, res) => {
    const orderResult = await oService.getAllOrder(req.query.page)
    res.success(orderResult);

});

router.post('/', async (req, res) => {
    const orderResult = await oService.addOrder(req.body)
    res.success(orderResult);
});

module.exports = router;