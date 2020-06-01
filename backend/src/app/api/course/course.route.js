const express = require('express'),
    { createCourse, listCourses, updateCourse, findCourse, deleteCourse } = require('./course.controller'),
    router = express.Router()

router.post('/create', createCourse)

router.post('/list', listCourses)

router.put('/update/:id', updateCourse)

router.get('/get/:id', findCourse)

router.delete('/delete/:id', deleteCourse)

module.exports = router
