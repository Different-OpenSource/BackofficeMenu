import { getDataToken } from "@/utils/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await getDataToken(request);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const id = searchParams.get("itemId");
    if (!id) {
      return NextResponse.json(
        { error: "itemId is required" },
        { status: 400 }
      );
    }
    const categoriesItems = await prisma.categoryItem.findMany({
      where: { itemId: id },
      include: { Category: true },
    });
    return NextResponse.json({ categoriesItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await getDataToken(request);
    const reqBody = await request.json();

    const categoryItem = await prisma.categoryItem.findFirst({
      where: {
        categoryId: reqBody.categoryId,
        itemId: reqBody.itemId,
      },
    });

    if (categoryItem) {
      return NextResponse.json(
        { error: "categoryItem already exists" },
        { status: 400 }
      );
    }

    await prisma.categoryItem.create({
      data: {
        categoryId: reqBody.categoryId,
        itemId: reqBody.itemId,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, status: 500 },
      { status: 500 }
    );
  }
}
