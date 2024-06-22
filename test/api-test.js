const chai = require("chai");
// const assert = require("chai");
const supertest = require("supertest");
const baseURL = "https://reqres.in";
const chaiJsonSchema = require("chai-json-schema");
const readJsonSchema = require("../helper/helper");

chai.use(chaiJsonSchema);
const expect = chai.expect;
const assert = chai.assert;


describe('reqres.in API test', () => {

    it('TC1 - GET object', async () => {

        const schema = readJsonSchema('get_single_object_schema.json');
        const response = await supertest(baseURL).get("/api/users/7")
        
        assert.equal(response.status, 200);
        // console.log(response.body);
        expect(response.body).to.be.jsonSchema(schema);

    });

    it('TC2 - POST object', async () => {
        const schema = readJsonSchema('get_users_schema.json');

        const body = {
            "name": "morpheus",
            "job": "leader"
        }
        const response = await supertest(baseURL)
        .post("/api/users")
        .send(body);

        expect(response.status === 200);
        // console.log(body)
        expect(response.body).to.be.jsonSchema(schema);
        
    });
    it('TC3 - UPDATE objects', async () => {
        const schema = readJsonSchema('get_users_schema.json');

        const body = {
            "name": "morpheus",
            "job": "leader"
        };
        // bikin user  yg mau di-update
        let createResponse = await supertest(baseURL)
            .post('/api/users')
            .send(body);
        
        expect(createResponse.status).to.equal(201); 
    
        const createdId = createResponse.body.id;
    
        // update user yang telah dibuat
        const updateBody = {
            "name": "morpheus",
            "job": "assistant manager"
        };
    
        const response = await supertest(baseURL)
            .put(`/api/users/${createdId}`)
            .send(updateBody);
    
        expect(response.status).to.equal(200); 
    
        expect(response.body.name).to.equal(updateBody.name);
        expect(response.body.job).to.equal(updateBody.job);
        expect(response.body).to.be.jsonSchema(schema);

        
    }).timeout(10000);;

    it('TC4 - DELETE objects', async () => {
        const body = {
            "name": "selvv",
            "job": "tunjungsih"
        };
        // bikin user  yg mau di-delete
        let createResponse = await supertest(baseURL)
            .post('/api/users')
            .send(body);
        
        expect(createResponse.status).to.equal(201); 
    
        const createdId = createResponse.body.id;

        const response = await supertest(baseURL)
            .delete(`/api/users/${createdId}`);

        expect(response.status).to.equal(204);
        // console.log(body);
        

    }).timeout(10000);
});