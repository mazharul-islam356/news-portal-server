"use client";

import { useEffect, useState } from "react";
import { api, authHeader } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function EditNews({ params }) {
  const [form, setForm] = useState({});

  const fetchSingle = async () => {
    const res = await api.get("/news");
    const found = res.data.find((n) => n._id === params.id);
    setForm(found || {});
  };

  useEffect(() => {
    fetchSingle();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/news/${params.id}`, form, authHeader);
      alert("Updated");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-3xl">
      <h1 className="text-xl font-bold">Edit News</h1>

      <Input
        name="title_bn"
        value={form.title_bn || ""}
        onChange={handleChange}
      />
      <Input
        name="title_en"
        value={form.title_en || ""}
        onChange={handleChange}
      />

      <Textarea
        name="content_bn"
        value={form.content_bn || ""}
        onChange={handleChange}
      />
      <Textarea
        name="content_en"
        value={form.content_en || ""}
        onChange={handleChange}
      />

      <Button onClick={handleUpdate}>Update</Button>
    </div>
  );
}
