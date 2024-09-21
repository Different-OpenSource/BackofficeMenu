import { Item } from "@prisma/client";

export default interface ItemWithImage extends Item {
  imageFile: File | Blob;
}
