import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const data = await request.json();
    const encryptedPassword = await bcrypt.hash(data.password, 1);
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "Usuário já existe" }, { status: 400 });
    }

    await prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: encryptedPassword,
      },
    });
    return NextResponse.json(
      { message: "User created", success: true },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
