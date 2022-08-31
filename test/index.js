let server = require('../index')
let chai = require('chai')
let chaiHttp = require('chai-http')

let data = require('../utils/data')

chai.should()
chai.use(chaiHttp)

