import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import DBTemporarySubstitute from "../DBTemporarySubstitute";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        const user = DBTemporarySubstitute.find((user) => user.email === email);

        if (!user) {
            return NextResponse.json(
                { error: "Usuário ou senha inválidos", status: 400 },
                { status: 400 }
            );
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Usuário ou senha inválidos", status: 400 }, { status: 400 });
        }

        const tokenData = {
            email: user.email,
        };

        const token = await jwt.sign(tokenData, process.env.NEXT_PUBLIC_JWT_KEY!, {
            expiresIn: "1h",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            token: token,
        });

        response.cookies.set("token", token, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message, status: 500 }, { status: 500 });
    }
}
