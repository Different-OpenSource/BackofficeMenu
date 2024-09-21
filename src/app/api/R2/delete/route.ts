import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";
import S3Client from "../S3Client";
import { getDataToken } from "@/utils/getDataToken";

export async function POST(request: NextRequest) {
  try {
    await getDataToken(request);
    const reqBody = await request.json();
    const { key } = reqBody;

    if (!key) {
      return NextResponse.json(
        { error: "File key is required.", status: 400 },
        { status: 400 }
      );
    }

    await S3Client.send(
      new DeleteObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: key })
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message, status: 500 },
      { status: 500 }
    );
  }
}
