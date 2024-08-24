import { getDataToken } from "@/utils/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

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

export async function DELETE(request: NextRequest) {
  try {
    await getDataToken(request);
    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.searchParams);
    const categoryId = searchParams.get("categoryId");
    const itemId = searchParams.get("itemId");
    if (!categoryId || !itemId) {
      return NextResponse.json(
        { error: "categoryId and itemId is required" },
        { status: 400 }
      );
    }
    const categoryItem = await prisma.categoryItem.findFirst({
      where: { categoryId: categoryId, itemId: itemId },
    });
    if (!categoryItem) {
      return NextResponse.json(
        { error: "categoryItem not found" },
        { status: 404 }
      );
    }
    await prisma.categoryItem.delete({
      where: { id: categoryItem?.id },
    });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
