import {insertEntry, selectEntriesByUserId, selectAllEntries, deleteEntryById} from '../models/entry-model.js';

const postEntry = async (req, res, next) => {
  // user_id, entry_date, mood, weight, sleep_hours, notes
  const newEntry = req.body;
  newEntry.user_id = req.user.user_id;
  try {
    await insertEntry(newEntry);
    res.status(201).json({message: "Entry added."});
  } catch (error) {
    next(error);
  }
};

/**
 * Get all entries of the logged in user
 * @param {*} req
 * @param {*} res
 */
const getEntries = async (req, res, next) => {
  try {
    const entries = await selectEntriesByUserId(req.user.user_id);
    // const entries = await selectAllEntries();
    res.json(entries);
  } catch (error) {
    next(error);
  }
};


/**
 * Delete an entry by id
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const deleteEntry = async (req, res, next) => {
  try {
    await deleteEntryById(req.params.id);
    res.json({message: "Entry deleted."});
  } catch (error) {
    next(error);
  }
}

export {postEntry, getEntries, deleteEntry};