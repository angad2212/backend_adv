const express = require('express');
const { createClient } = require('redis');

const app = express();
app.use(express.json());

const client = createClient();
client.on('error', (err) => console.log('Redis Client Error', err));

app.post("/submit", async (req, res) => {
    const problemId = req.body.problemId;
    const code = req.body.code;
    const language = req.body.language;

    //ideally storing in database is teh next step
    //but since we are using redis for practice, 
    //no database involved

    try {
        await client.lPush("problems", JSON.stringify({ code, language, problemId }));
        // Store in the redis database
        res.status(200).send("Submission received and stored.");
    } catch (error) {
        console.error("Redis error:", error);
        res.status(500).send("Failed to store submission.");
    }
});

async function startServer() {
    try {
        await client.connect();
        console.log("Connected to Redis");

        app.listen(3001, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Failed to connect to Redis", error);
    }
}

startServer();

//to check teh data in redis cache:
//get inside the redis docker via: docker exec -t <cont-id> /bin/bash
//get inside cli: redis-cli
//do a RPOP and check if correct