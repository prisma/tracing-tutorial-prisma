
import initializeTracing from "./tracing";
import { post, PrismaClient, user } from "@prisma/client";
import express, { request, Request, response, Response } from "express";

const tracer = initializeTracing("express-server")

const app = express();
const port = 4000;

const prisma = new PrismaClient({});

app.get("/users/random", async (_req: Request, res: Response) => {
    await tracer.startActiveSpan("GET /users/random", async (requestSpan) => {
        try {

            // define "users" along with its type. 
            let users: (user & { posts: post[]; })[] | undefined;

            await tracer.startActiveSpan("prisma.user.findmany", async (findManyQuerySpan) => {
                try {
                    users = await prisma.user.findMany({
                        include: {
                            posts: true
                        }
                    });
                } finally {
                    findManyQuerySpan.end()
                }
            });

            if (!users) {
                throw new Error("Failed to fetch users");
            }

            // select 10 users randomly
            const shuffledUsers = users.sort(() => 0.5 - Math.random());
            const selectedUsers = shuffledUsers.slice(0, 10);

            res.status(200).json(selectedUsers);
            requestSpan.setAttribute("http.status", 200);
        } catch (e) {
            requestSpan.setAttribute("http.status", 500);
            res.status(500).json({ error: 500, details: e });
        } finally {
            requestSpan.end();
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port: ${port}`);
});
