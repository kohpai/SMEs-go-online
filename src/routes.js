'use strict'

// import
import { Router } from 'express'

var express = require('express');
var cookieParser = require('cookie-parser');

const fileUpload = require('express-fileupload')

// using
import AuthController from './controllers/authController.js'
import UsersController from './controllers/usersController.js'
import ProductsController from './controllers/productsController.js'
import NewsController from './controllers/newsController.js'
import CountryController from './controllers/countryController.js'
import FaqController from './controllers/faqController.js'
import ConsultController from './controllers/consultController.js'
import FileController from './controllers/fileController.js'
import OauthController from './controllers/oauthController.js'

// create router path
var router = new Router();

var api_version = '/api/dev';

router.use(fileUpload())

router.use(cookieParser())

router.use(api_version, AuthController);
router.use(api_version, UsersController);
router.use(api_version+'/news', NewsController);
router.use(api_version+'/country', CountryController);
router.use(api_version+'/faq', FaqController);
router.use(api_version+'/products', ProductsController);
router.use(api_version+'/consult', ConsultController);
router.use(api_version+'/file', FileController);
router.use(api_version+'/oauth', OauthController);

export default router;
