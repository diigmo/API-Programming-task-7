import request from 'supertest'
import app from '../apicalls.js'

describe('Test GET with the path /data', () => {
    test("Response to the GET", async () => {
        const response = await request(app)
            .get("/data")
        
            expect(response.status).toEqual(200)
            expect(response.headers['content-type']).toMatch(/json/)
    })
})

describe('POST /search', () => {

  test('Should return 200 and user by name', async () => {
    const res = await request(app)
      .post('/data/search')
      .send({ forename: 'Roy' });

    expect(res.statusCode).toBe(200);
    
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ forename: 'Roy' })
      ])
    );
  });

  test('should return 404 if the user is not found and "User not found"', async () => {
    const res = await request(app)
      .post('/data/search')
      .send({ forename: 'Nonexistent' });

    expect(res.statusCode).toBe(404);
    expect(res.body.error).toEqual( "User not found" );
  });
});
