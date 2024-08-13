import { getDataToken } from "@/utils/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await getDataToken(request);
    const reqBody = await request.json();

    await prisma.category.create({
      data: {
        name: reqBody.name,
        menuId: reqBody.menuId,
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

export async function PATCH(request: NextRequest) {
  try {
    await getDataToken(request);
    const reqBody = await request.json();

    await prisma.category.update({
      where: { id: reqBody.id },
      data: {
        name: reqBody.name,
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
    const id = searchParams.get("categoryId");
    if (!id) {
      return NextResponse.json(
        { error: "categoryId is required" },
        { status: 400 }
      );
    }
    await prisma.category.delete({ where: { id: id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
