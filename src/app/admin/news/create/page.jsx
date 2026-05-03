"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api, authHeader } from "@/lib/api";

export default function CreateNews() {
  const [form, setForm] = useState({});
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const data = new FormData();

      Object.keys(form).forEach((key) => {
        data.append(key, form[key]);
      });

      if (file) data.append("image", file);

      await api.post("/news", data, authHeader);
      alert("News created");
    } catch (err) {
      console.error(err);
      alert("Error creating news");
    }
  };

  return (
    <div className="p-6 space-y-4 max-w-3xl">
      <h1 className="text-2xl font-bold">Create News</h1>

      <Input name="title_bn" placeholder="Title BN" onChange={handleChange} />
      <Input name="title_en" placeholder="Title EN" onChange={handleChange} />

      <Textarea
        name="summary_bn"
        placeholder="Summary BN"
        onChange={handleChange}
      />
      <Textarea
        name="summary_en"
        placeholder="Summary EN"
        onChange={handleChange}
      />

      <Textarea
        name="content_bn"
        placeholder="Content BN"
        onChange={handleChange}
      />
      <Textarea
        name="content_en"
        placeholder="Content EN"
        onChange={handleChange}
      />

      <Input name="slug" placeholder="Slug" onChange={handleChange} />
      <Input
        name="category"
        placeholder="Category ID"
        onChange={handleChange}
      />
      <Input
        name="tags"
        placeholder="Tags (comma separated)"
        onChange={handleChange}
      />

      <Input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <Button onClick={handleSubmit}>Create</Button>
    </div>
  );
}
