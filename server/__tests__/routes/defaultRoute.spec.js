const request = require('supertest');
const server = require('../../api/server');

describe("server.js", () => {
  describe("root endpoint (/)", () => {

    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server).get("/alive");
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server).get("/alive");
      expect(res.type).toEqual("application/json");
    });

    it("should return object that looks like {api:running} ", async () => {
      const expected = {api: 'Alive at port 9001'};
      const res = await request(server).get("/alive");
      expect(res.body).toEqual(expected);
    });
    
  })
});