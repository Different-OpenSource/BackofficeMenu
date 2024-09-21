import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/utils/getDataToken";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    await getDataToken(request);

    const allItems = await prisma.item.findMany({
      include: {
        categoryItems: {
          include: {
            Item: true,
            Category: {
              include: {
                Menu: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({ allItems }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
