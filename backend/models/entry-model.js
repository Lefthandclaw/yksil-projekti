import promisePool from '../utils/database.js';

const insertEntry = async (entry) => {
  try {
    const [result] = await promisePool.query(
      'INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes) VALUES (?, ?, ?, ?, ? ,?)',
      [entry.user_id, entry.entry_date, entry.mood, entry.weight, entry.sleep_hours, entry.notes],
    );
    console.log('inserEntry', result);
    // return only first item of the result array
    return result.insertId;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectEntriesByUserId = async (userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries WHERE user_id=?',
      [userId],
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

const selectAllEntries = async () => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM DiaryEntries',
    );
    console.log(rows);
    return rows;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
}

const deleteEntryById = async (entryId) => {
  try {
    const [result] = await promisePool.query(
      'DELETE FROM DiaryEntries WHERE entry_id=?',
      [entryId],
    );
    return result;
  } catch (error) {
    console.error(error);
    throw new Error('database error');
  }
};

export {insertEntry, selectEntriesByUserId, selectAllEntries, deleteEntryById};