import connectMongoDB from "../../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Lead from "../../../../../models/lead";
import auth from "../../../../../middleware/adminauth";
import { headers } from "next/headers";

function isSameDate(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}

export async function GET(request) {
  try {
    //auth implementation
    const headersList = headers();
    const referer = headersList.get("authorization");
    console.log(referer, "aaaa");
    const verifytoken = await auth(referer);
    console.log("verifytoken", verifytoken);

    await connectMongoDB();

    const leadsDescription = request.nextUrl.searchParams.get("leadsDescription");
    const fromDate = request.nextUrl.searchParams.get("fromDate");
    const toDate = request.nextUrl.searchParams.get("toDate");
    const search = request.nextUrl.searchParams.get("search");
    const sourceFilter = request.nextUrl.searchParams.getAll("source");

    // Build the query based on the provided filters
    const query = {};

    if (leadsDescription) {
      query.leadsDescription = { $regex: new RegExp(leadsDescription, "i") };
    }

    if (sourceFilter.length > 0) {
      // If there are multiple source filters, build an array for the query
      query.source = { $in: sourceFilter };
    }

    if (fromDate && toDate) {
      const fromDateTime = new Date(fromDate);
      const toDateTime = new Date(toDate);

      if (
        isSameDate(fromDateTime, toDateTime) &&
        isSameDate(fromDateTime, new Date())
      ) {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        query.createdAt = {
          $gte: todayStart,
          $lte: todayEnd,
        };
      } else {
        query.createdAt = {
          $gte: fromDateTime,
          $lte: new Date(toDateTime.getTime() + 86399000), // Adjust the toDate to the end of the day
        };
      }
    }

    if (search) {
      const regexSearch = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");

      // Log the search query and regexSearch
      console.log("Search Query:", search);
      console.log("Regex Search:", regexSearch);

      // Check if the search query represents a range like "1-10"
      const isRange = search.match(/^(\d+)-(\d+)$/);
      if (isRange) {
        // If the search query is in the format of a range like "1-10"
        const [lowerBound, upperBound] = isRange.slice(1).map(Number);

        // Log the lower and upper bounds
        console.log("Lower Bound:", lowerBound);
        console.log("Upper Bound:", upperBound);

        query.companySize = `${lowerBound}-${upperBound}`;
      } else {
        const combinedPhoneNo = regexSearch.replace(/\D/g, "");
        // Build an array with the phone number and its variant with a leading '+'
        const phoneNumbers = [combinedPhoneNo, `+${combinedPhoneNo}`];

        query.$or = [
          { name: { $regex: new RegExp(regexSearch, "i") } },
          { email: { $regex: new RegExp(regexSearch, "i") } },
          {
            combinedPhoneNo: {
              $in: phoneNumbers,
            },
          },
          { leadsDescription: { $regex: new RegExp(regexSearch, 'i') } },
        ];
      }
    }

    const leads = await Lead.find(query, null).sort({ createdAt: -1 });
    const totalLeads = await Lead.countDocuments(query);

    return NextResponse.json({
      status: 1,
      message: "Got All Lead successfully",
      noOfLeads: totalLeads,
      leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    if (error.authenticationError) {
      return NextResponse.json(
        { message: error.message, error: error.message },
        { status: error.status }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to fetch leads", error: error.message },
        { status: 500 }
      );
    }
  }
}
