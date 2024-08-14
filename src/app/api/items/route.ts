import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/utils/getDataToken";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await getDataToken(request);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("categoryId");
    if (!id) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }
    const items = await prisma.item.findMany({
      where: { categoryId: id },
    });
    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
