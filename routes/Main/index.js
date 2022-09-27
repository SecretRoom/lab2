/* eslint-disable consistent-return */
const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const R = require('ramda');

const router = Router()


// eslint-disable-next-line consistent-return
router.post(
  '',
  [],
  async (req, res) => {

    try {
res.header("Access-Control-Allow-Origin", "*");
      res.status(200).json({ status: '0', items: 'Я post-запрос' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)

router.get(
  '',
  async (req, res) => {
    try {
      res.header("Access-Control-Allow-Origin", "*");
      res.status(200).json({ status: '0', items: 'Я get-запрос' })

    } catch (e) {
      res.status(500).json({ e, status: '1', message: 'Что-то пошло не так, попробуйте снова' })
    }
  }
)


module.exports = router
