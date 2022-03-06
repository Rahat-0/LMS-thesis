const libBooks = require('express').Router()
const bookSchema = require('../../models/bookSchema')

libBooks.get('/', async (req, res)=>{
    try {
        await bookSchema
          .find()
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            console.log(err);
            res.send(err);
          });
      } catch (err) {
        res.send(err);
        console.log(err);
      }
})

module.exports = libBooks;