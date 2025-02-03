import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

type Bindings = {
  DATABASE_URL: string;
};

type User = {
  email: string;
  password: string;
};

const app = new Hono<{ Bindings: Bindings }>();

// POST /api/v1/user/signup
app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
    
  } catch (error) {
    
  }



  return c.text("User signup");
});

// POST /api/v1/user/signin
app.post("/api/v1/user/signin", (c) => {
  return c.text("User signin");
});

// POST /api/v1/blog
app.post("/api/v1/blog", (c) => {
  return c.text("Blog post");
});

// PUT /api/v1/blog
app.put("/api/v1/blog", (c) => {
  return c.text("Blog put");
});

// GET /api/v1/blog/:id
app.get("/api/v1/blog/:id", (c) => {
  return c.text("Blog get");
});

// GET /api/v1/blog/bulk
app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Blog bulk");
});

export default app;
