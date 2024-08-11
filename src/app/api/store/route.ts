import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { getDataToken } from "@/utils/getDataToken";

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const token = await getDataToken(request);
    const user = await prisma.user.findUnique({
      where: { email: token.email },
    });
    if (!user) {
      return NextResponse.json(
        { error: "Usuário não existe" },
        { status: 400 }
      );
    }
    const store = await prisma.store.findUnique({
      where: { id: user.storeId },
    });

    return NextResponse.json({ store }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
