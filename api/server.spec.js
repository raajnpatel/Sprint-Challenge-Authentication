const request = require("supertest");
const server = require("./server");

describe("server.js accessing routes", () => {

    describe("Attempt Register", () => {
        // Register Normally
        it("returns 200 ok", async () => {
            const res = await request(server)
                .post("/api/auth/register")
                .send({
                    username: Date.now(),
                    password: "test"
                });
            expect(res.status).toBe(201);
        });

        // Attempt to Register with NO credentials
        it("throws error if registration info is missing", async () => {
            const res = await request(server).post("/api/auth/register");
            expect(res.status).toBe(500);
        });
    });

    describe("Attempt Login", () => {
        // Login Normally with an account currently registered.
        it("returns 200 ok", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "raajn",
                    password: "test"
                });
            expect(res.status).toBe(200);
        });

        // Attempt to Login with NO credentials
        it("throws error if login info is missing", async () => {
            const res = await request(server).post("/api/auth/login");
            expect(res.status).toBe(500);
        });

        // Attempt to Login with INCORRECT credentials
        it("throws error if login info is incorrect", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "raajnp",
                    password: "testing"
                });
            expect(res.status).toBe(401);
        });
    });

    describe("Login and attempt getting some jokes", () => {
        //Login using token recieved upon login
        it("Use Token received and Receive Jokes", async () => {
            const res = await request(server)
                .post("/api/auth/login")
                .send({
                    username: "raajn",
                    password: "test"
                });
            token = res.body.token;

            // manually pulled joke for testing purposes
            const expectedJoke = [
                {
                    id: "0189hNRf2g",
                    joke:
                        "I'm tired of following my dreams. I'm just going to ask them where they are going and meet up with them later."
                }
            ];
            const resJoke = await request(server)
                .get("/api/jokes")
                .set("Authorization", `${token}`);
            expect(resJoke.status).toBe(200);
            expect(resJoke.body).toEqual(expect.arrayContaining(expectedJoke));
        });

        // Apply manual fake Authorization to check if token is working and valid
        it("Deny Jokes if no token or invalid token is used for request", async () => {
            const resJoke = await request(server)
                .get("/api/jokes")
                .set("Authorization", 'BAD_TOKEN');
            expect(resJoke.status).toBe(401);
        });
    });
});