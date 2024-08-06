import { NextRequest, NextResponse } from "next/server";
import { getDataToken } from "@/utils/getDataToken";

export async function GET(request: NextRequest) {
  try {
    await getDataToken(request);
    return NextResponse.json({ authenticated: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, status: 500 },
      { status: 500 }
    );
  }
}
