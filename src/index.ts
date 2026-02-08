import "dotenv/config";
import { serve } from "@hono/node-server";
import { Hono } from "hono";

import { createClient } from "@supabase/supabase-js";
import { error } from "console";

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
const app = new Hono();
app.get("/todos", async (c) => {
  const { data, error } = await supabase.from("todos").select("*").order("id");
  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json({
    data,
    total: data.length,
  });
});

app.post("/todos", async (c) => {
  const body = await c.req.json();
  const { title, content } = body;
  if (!title || !content) {
    return c.json({ error: "Title and content are required" }, 400);
  }
  const { data, error } = await supabase
    .from("todos")
    .insert([{ title, content }])
    .select()
    .single();
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json(data, 201);
});

app.get("/todos/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  if (!data) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(data);
});

app.put("/todos/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const body = await c.req.json();
  const { data, error } = await supabase
    .from("todos")
    .update({
      title: body.title,
      content: body.content,
      isDone: body.isDone,
    })
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  if (!data) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json(data);
});

app.delete("/todos/:id", async (c) => {
  const id = Number(c.req.param("id"));
  const { data, error } = await supabase
    .from("todos")
    .delete()
    .eq("id", id)
    .select()
    .single();
  if (error) {
    return c.json({ error: error.message }, 500);
  }
  if (!data) {
    return c.json({ error: "Todo not found" }, 404);
  }
  return c.json({ message: "Todo deleted successfully" });
});

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
