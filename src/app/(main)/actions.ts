"use server";

import { storageProvider } from "@/services/storage";
import { schemaUploadFormZod } from "./schema";
import { z } from "zod";

export async function submitFormAction(prevState: any, formData: FormData) {
  const img = formData.get("file") as File;

  try {
    const fileParse = schemaUploadFormZod.parse({ file: img });
    const { file } = fileParse;

    const url = await storageProvider.upload(file);

    return {
      url,
      error: "",
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        url: "",
        error: error.errors.map((err) => err.message),
      };
    }
  }
}
