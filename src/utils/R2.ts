import APICaller from "./APICaller";
import Compressor from "compressorjs";

export async function deleteImage(fileName: string) {
  await APICaller("/api/R2/delete", "POST", { key: fileName });
}

export async function getImage(fileName: string) {
  const response = await APICaller("/api/R2/get", "POST", { key: fileName });
  const { signedUrl } = response;

  const fetchResponse = await fetch(signedUrl, {
    method: "GET",
  });
  return await fetchResponse.blob();
}

export async function pushImage(file: File) {
  const result = await reduceSize(file);
  const compressedFile = new File([result], file.name);
  const uniqueFileName = `${crypto.randomUUID()}-${compressedFile.name}`;

  const response = await APICaller("/api/R2/put", "POST", {
    key: uniqueFileName,
  });

  const { signedUrl } = response;

  return {
    fileName: uniqueFileName,
    uploadFile: async () => {
      await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
    },
  };
}

function reduceSize(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      convertSize: 100_000,
      quality: 0.6,
      maxWidth: 1000,
      maxHeight: 1000,
      convertTypes: ["image/jpeg", "image/png", "image/webp", "image/jpg"],
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}
