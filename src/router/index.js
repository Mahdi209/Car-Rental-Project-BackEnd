const express = require('express');
const role = require('./role.router');
const userRouter = require('./user.router');
const reviewsRouter = require('./reviews.router');
const carCompanyRouter = require('./carCompany.router');
const carTypeRouter = require('./carType.router');
const carRouter = require('./car.router');
const locationRouter = require('./location.router');
const carDetailsRouter = require('./carDetails.router');
const phoneRouter = require('../controller/phone');
const cityRouter = require('./city.router');
const router = express.Router();


router.use("/role", role);
router.use("/users", userRouter);
router.use("/reviews", reviewsRouter);
router.use("/carCompany", carCompanyRouter);
router.use("/carType", carTypeRouter);
router.use("/car", carRouter);
router.use("/location", locationRouter);
router.use("/carDetails", carDetailsRouter);
router.use("/phone", phoneRouter);
router.use("/city", cityRouter);

module.exports = router;
