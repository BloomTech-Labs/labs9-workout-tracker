const request = require("supertest");
const server = require("../../api/server");
const firebase = require("../firebaseApp");

let headers;
beforeAll(async done => {
  headers = {
    Authorization: await firebase.getToken,
    "Content-Type": "application/json"
  };
  done();
});

describe("userRoute", () => {

  describe("/api/user/all", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server)
        .get(`/api/user/all`)
        .set(headers);
      expect(res.status).toEqual(expected);
    });
  });

  describe("/api/user/", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server)
        .get(`/api/user`)
        .set(headers);
      expect(res.status).toEqual(expected);
    });

    it("should return JSON", async () => {
      const res = await request(server)
        .get(`/api/user`)
        .set(headers);
      expect(res.type).toEqual("application/json");
    });

    it("should return 401 when no user", async () => {
      const expected = 401;
      const res = await request(server)
        .get(`/api/user`)
      expect(res.status).toEqual(expected);
    });
  });

  describe("/api/user/edit", () => {
    it("should return status code 200 OK", async () => {
      const expected = 200;
      const res = await request(server)
        .put(`/api/user/edit`)
        .send({ name :"New Test Name" })
        .set(headers);
      expect(res.status).toEqual(expected);
    });

    it("should return status code 400 when no data is passed", async () => {
      const expected = 400;
      const res = await request(server)
        .put(`/api/user/edit`)
        .set(headers);
      expect(res.status).toEqual(expected);
    });

    it("should return status code 401 when no token is passed", async () => {
      const expected = 401;
      const res = await request(server)
        .put(`/api/user/edit`)
      expect(res.status).toEqual(expected);
    });
  });
});
