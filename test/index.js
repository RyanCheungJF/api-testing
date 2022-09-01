let server = require('../index')
let chai = require('chai')
let chaiHttp = require('chai-http')

const data = require('../utils/data')

chai.should()
chai.use(chaiHttp)

describe('REST APIs test', () => {
  describe('Test GET for all results', () => {
    it('Expects to return all results', (done) => {
      chai
        .request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql(data.initialData)
          done()
        })
    })
  })

  describe('Test GET for a valid id', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .get('/user/2')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql(data.initialData[1])
          done()
        })
    })
  })

  describe('Test GET for an id that does not exist', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .get('/user/5')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.eql({ message: 'User does not exist' })
          done()
        })
    })
  })

  describe('Test GET without specifying id', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(server)
        .get('/user/')
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })

  describe('Test POST for a valid payload', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .post('/user/5')
        .send(data.newUser)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.eql(data.createdUser)
          done()
        })
    })
  })

  describe('Test POST for a pre existing id', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(server)
        .post('/user/3')
        .send(data.newUser)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.eql({ message: 'User exists' })
          done()
        })
    })
  })

  describe('Test POST for an invalid payload', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(server)
        .post('/user/6')
        .send(data.invalidUser)
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.eql({ message: 'Missing fields!' })
          done()
        })
    })
  })

  describe('Test PUT for a valid payload', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .put('/user/5')
        .send(data.editUser)
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql(data.editedUser)
          done()
        })
    })
  })

  describe('Test GET for newly added and edited user', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .get('/user/5')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.eql(data.editedUser)
          done()
        })
    })
  })

  describe('Test DELETE for a valid id', () => {
    it('Expects to return a result', (done) => {
      chai
        .request(server)
        .delete('/user/5')
        .end((err, res) => {
          res.should.have.status(204)
          done()
        })
    })
  })

  describe('Test DELETE for an invalid id', () => {
    it('Expects to return an error', (done) => {
      chai
        .request(server)
        .delete('/user/5')
        .end((err, res) => {
          res.should.have.status(404)
          res.body.should.be.eql({
            message: 'User does not exist, did not delete',
          })
          done()
        })
    })
  })
})
