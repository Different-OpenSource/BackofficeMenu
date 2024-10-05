import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const store = await prisma.store.findFirst();
    if (!store) {
      return NextResponse.json(
        { success: true, exists: false },
        { status: 200 }
      );
    }
    return NextResponse.json({ success: true, exists: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
