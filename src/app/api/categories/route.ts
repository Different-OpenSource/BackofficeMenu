import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/utils/getDataToken";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await getDataToken(request);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("menuId");
    const categories = await prisma.category.findMany({
      where: { menuId: id },
    });
    return NextResponse.json({ categories }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
