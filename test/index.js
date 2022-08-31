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
})
