const express = require('express'),
    { createCategory, listCategories } = require('./category.controller'),
    router = express.Router()

/**
 * @typedef category
 * @property {string} name - - eg: Name of category
 */
/**
 * @typedef categoryResponse
 * @property {integer} id - - eg: Id of category
 * @property {string} name - - eg: Name of category
 */
/**
 * @route POST /category/create
 * @group Categories
 * @produces application/json
 * @consumes application/json
 */
router.post('/create', createCategory)

/**
 * @route GET /category/list
 * @group Categories
 */
router.get('/list', listCategories)

module.exports = router
