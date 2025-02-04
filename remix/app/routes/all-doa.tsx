import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Doa, DataTable } from "../components/data-table";
import fs from "fs/promises";
import path from "path";

export async function loader() {
  try {
    const filePath = path.join(process.cwd(), "app", "data", "doa.json");
    const fileContents = await fs.readFile(filePath, "utf-8");
    const doaList = JSON.parse(fileContents);
    return json(doaList);
  } catch {
    return json([]);
  }
}

export default function DoaTable() {
  const data = useLoaderData<Doa[]>();
  return (
    <div className="bg-blue-50 min-h-screen p-4">
      <header className="flex justify-center pb-4">
        <Link to="/">
          <img src="/logo.svg" alt="GetDoa Logo" className="h-auto w-full " />
        </Link>
      </header>
      <h1 className="text-2xl font-bold mb-4 text-center">Doa List</h1>
      <DataTable data={data} />
    </div>
  );
}
