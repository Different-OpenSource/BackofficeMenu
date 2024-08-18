import { getDataToken } from "@/utils/getDataToken";
import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest) {
  try {
    await getDataToken(request);
    const reqBody = await request.json();

    await prisma.menu.create({
      data: {
        name: reqBody.name,
        storeId: reqBody.storeId,
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

    await prisma.menu.update({
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
    const id = searchParams.get("menuId");
    if (!id) {
      return NextResponse.json(
        { error: "menuId is required" },
        { status: 400 }
      );
    }
    await prisma.menu.delete({ where: { id: id } });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
