import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import DBTemporarySubstitute from "../DBTemporarySubstitute";

export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const data = await request.json();
        const encyptedPassword = await bcrypt.hash(
            data.password,
            1
        );
        DBTemporarySubstitute.push({ password: encyptedPassword, email: data.email });
        return NextResponse.json({ message: "User created" }, { status: 201 });
    } catch (error: any) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 400 });
    }
}
