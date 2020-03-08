//const { NODE_ENV } = process.env
const { NODE_ENV } = 'test'
const table = `students_${NODE_ENV}`


// Deixamos esses helpers para ficar mais fácil escrever as queries e executálas de formas assíncrona. 🚀 
const { insertFormatter, queryHelper, updateFormatter } = require('../../db/helper')

const getAll = async (request, response, next) => {
  // Implemente o método correspondete a rota GET /v1/students
  queryHelper("SELECT * FROM students_test")
    .then(result => 
      response.status(200).json(
        //total: (Object.keys(result)).length,
        //data: result
        result)
    ).catch(next)
}

const getById = async (request, response, next) => {
  // Implemente o método correspondete a rota GET /v1/students/:id
  const id = request.params.studentId
  queryHelper(`SELECT * FROM students_test WHERE id = '${id}'`)
  .then(result => 
    response.status(200).json(result)
  ).catch(next)
}

const create = async (request, response) => {
  // Implemente o método correspondete a rota POST /v1/students
  const {body} = request
  queryHelper(`INSERT INTO students_test (${insertFormatter(body).columns}) VALUES (${insertFormatter(body).values})`)
  .then(result =>
    response.status(201).json({
      success: 'A new record has been created.'
    }))
}

const updateById = async (request, response) => {
  // Implemente o método correspondete a rota PATCH /v1/students/:id
  const {body} = request
  const id = request.params.studentId
  queryHelper(`UPDATE students_test SET ${updateFormatter(body)} WHERE id = '${id}'`)
  .then(result =>
    response.status(200).json({
      success: 'The record has been updated.'
    }))
}

const deleteById = async (request, response) => {
  // Implemente o método correspondete a rota DELETE /v1/students/:id
  const id = request.params.studentId
  queryHelper(`DELETE FROM students_test WHERE id = '${id}'`)
  .then(result =>
    response.status(204).json({
    }))
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
}
