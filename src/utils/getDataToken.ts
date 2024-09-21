import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataToken = (request: NextRequest) => {
  try {
    const token = request.headers.get("Authorization")?.split(" ")[1] || "";
    const tokenInfo: any = jwt.verify(token, process.env.JWT_KEY!);
    return tokenInfo;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
