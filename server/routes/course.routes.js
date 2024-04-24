import { Router } from "express";
import { addLectureToCourseById, createCourse, getAllCourses, getLecturesByCourseId, removeCourse, updateCourse } from "../controllers/course.controller.js";
import { isLoggedIn } from "../middlewares/auth.middlewares.js";
import upload from "../middlewares/multer.middleware.js";
import { authorizedRoles, authorizedSubscriber } from "../middlewares/auth.middlewares.js";

const router = Router();

router.route('/')
.get( getAllCourses)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    upload.single('thumbnail'),
    createCourse
);




router.get('/:id')
 .get(isLoggedIn, authorizedSubscriber ,getLecturesByCourseId)
 .put(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    updateCourse
)
 .delete(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    removeCourse
)
.post(
    isLoggedIn,
    authorizedRoles('ADMIN'),
    addLectureToCourseById
);

export default router;
