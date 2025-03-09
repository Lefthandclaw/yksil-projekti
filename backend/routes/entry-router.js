import express from 'express';
import {getEntries, postEntry, deleteEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {body} from 'express-validator';
import {validationErrorHandler} from '../middlewares/error-handler.js';

const entryRouter = express.Router();

entryRouter
  .route('/')
  .post(
    authenticateToken,
    body('entry_date').notEmpty().isDate(),
    body('mood').trim().notEmpty().isLength({min: 3, max: 25}).escape(),
    body('weight', 'must be number between 2-200').isFloat({min: 2, max: 200}),
    body('sleep_hours').isInt({min: 0, max: 24}),
    body('notes').trim().escape().custom((value, {req}) => {
      console.log('custom validator', value);
      return !(req.body.mood === value);
    }),
    validationErrorHandler,
    postEntry,
  )
  .get(authenticateToken, getEntries);
  
  
  entryRouter
  .route('/:id').delete(authenticateToken, deleteEntry);

export default entryRouter;