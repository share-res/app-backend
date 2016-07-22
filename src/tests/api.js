import test from 'ava'
import supertest from 'supertest'
import app from '../app'


const request = supertest.agent(app.listen())

test('user api', async (t) => {
  const res = await request.get('/api/users');
  //console.log(res.body)
    t.is(res.body.status,'OK');
})
test('user api post', async (t) => {
	request.post('/users/register')
		//	.set('Authorization','Bearer ' + token)
			.send({
				mobileNum:'123456',
				password:'test'
			})
			.expect(200,()=>{
        t.pass()

      })
})