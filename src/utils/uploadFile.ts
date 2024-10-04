export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file!);

  try {
    throw new Error("Not implemented");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FILE_UPLOAD_PATH}/api/uploadFile`,
      {
        method: "POST",
        mode: "no-cors",
        body: formData,
      }
    );
    const data = await response.json();
    return data.url;
  } catch (error) {
    return "https://occ-0-8407-2219.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABf9HCQwc6Epz3CArWHNpM-yiybdhZPyg5w47F_0HLHLrufr65Chh-G9s2St_VimDQMhclKLrKaGn0LZfAiv8kdrPNgaYF2Gju5iIIgWaQChx.png?r=73a";
  }
}
