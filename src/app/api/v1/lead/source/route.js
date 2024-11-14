import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lead from "../../../../../models/lead";
import auth from '../../../../../middleware/adminauth';
import { headers } from "next/headers";

export async function GET(request) {
  try {
    const headersList = headers();
    const referer = headersList.get("authorization");
    const verifytoken = await auth(referer);
    console.log("verifytoken", verifytoken);

    await connectMongoDB();

    const distinctSources = await Lead.distinct("source");

    const sourceArray = distinctSources.map((source) => ({ name: source }));

    return NextResponse.json(
      {
        message: "Distinct source names list retrieved successfully",
        sources: sourceArray,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    if (error.authenticationError) {
      return NextResponse.json(
        { message: error.message, error: error.message },
        { status: error.status }
      );
    } else {
      return NextResponse.json(
        { error: true, message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
  }
}
