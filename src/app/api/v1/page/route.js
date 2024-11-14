import connectMongoDB from "../../../../../libs/mongodb";
import { NextResponse } from "next/server";
import Page from "../../../../models/accioFinancePage";
import Joi from "joi";
import auth from '../../../../middleware/adminauth';
import { headers } from "next/headers";

export async function POST(request) {
  try {

    const headersList = headers();
    const referer = headersList.get("authorization");
    console.log(referer,"aaaa");
    const verifytoken = await auth(referer);
    console.log("verifytoken", verifytoken);

    
    const requestBody = await request.json(); // Parse the entire request body
    console.log(requestBody);
    await connectMongoDB();

    // Define a Joi schema for URL validation
    const schema = Joi.object({
      name: Joi.string().required().label("name"),
      url: Joi.string().required().label("url"),
      content: Joi.string().label("content"),
      status: Joi.string().label("status"),
      pagestyle : Joi.string().label("pagestyle"),
      jsFilePaths: Joi.array().items(Joi.string(), Joi.allow(null)).label("jsFilePaths"),
      cssFilePaths: Joi.array().items(Joi.string(), Joi.allow(null)).label("cssFilePaths"),
      includeHeaderFooter: Joi.boolean().allow(null).label("includeHeaderFooter"),
    });

    // Validate the request body against the schema
    const { error } = schema.validate(requestBody);

    if (error) {
      return NextResponse.json(
        { error: true, message: error.details[0].message },
        { status: 400 }
      );
    }

    const pageWithName = await Page.findOne({ name: requestBody.name });

    if (pageWithName) {
      return NextResponse.json(
        { error: true, message: "Page with this name already exists" },
        { status: 400 }
      );
    }

    const pageWithUrl = await Page.findOne({ url: requestBody.url });
    if (pageWithUrl) {
      return NextResponse.json(
        { error: true, message: "Page with this URL already exists" },
        { status: 400 }
      );
    }

    await Page.create(requestBody); // Pass the entire body object
    return NextResponse.json(
      { error: false, message: "Page added successfully" },
      { status: 201 }
    );
  } catch (error) {
    if(error.authenticationError){
      return NextResponse.json(
              { message: error.message , error: error.message },
              { status: error.status }
            );
    }else{
    return NextResponse.json({ error: true, message: "internal server error", error }, { status: 500 });
  }
}
}

// catch (error) {
  //   console.error('Error fetching leads:', error);
  //   if(error.authenticationError){
  //     return NextResponse.json(
  //       { message: error.message , error: error.message },
  //       { status: error.status }
  //     );
  //   }else{
  //     return NextResponse.json(
  //       { message: 'Failed to fetch leads', error: error.message },
  //       { status: 500 }
  //     );
  //   }
    
  // }


export async function GET(request) {
  try {
    await connectMongoDB();
    const search = request.nextUrl.searchParams.get("search");
    const page = parseInt(request.nextUrl.searchParams.get("page")) || 1;
    const limit = parseInt(request.nextUrl.searchParams.get("limit")) || 10; // Use "limit" instead of "perPage"
    let query = {}; // Define the base query
    
    if (search) {
      if (search.toLowerCase() === "inactive") {
        // If the search term is "Inactive," search only for "Inactive" status
        query = { status: "Inactive" };
      } else {
        // For other search terms, search in other fields and exclude "Inactive" status
        query = {
          $or: [
            { name: { $regex: new RegExp(search, 'i') } },
            { url: { $regex: new RegExp(search, 'i') } },
            {
              $and: [
                { status: { $regex: new RegExp(search, 'i') } },
                { status: { $ne: "Inactive" } } // Exclude documents with "Inactive" status
              ]
            },
          ],
        };
      }
    }
    const totalItems = await Page.countDocuments(query);
    
    // Calculate the number of pages based on the total items and the specified limit
    const totalPages = Math.ceil(totalItems / limit);

    console.log(totalPages,"totalPages")

    // Ensure that the page number is within a valid range
    const validPage = Math.min(Math.max(1, page), totalPages);

    console.log(validPage,"validPage")

    // Calculate the skip value for pagination
    const skip = (validPage - 1) * limit >= 0?(validPage - 1) * limit:0 ;

    console.log(skip,"skip")
    
    const pages = await Page.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit); // Use "limit" instead of "perPage"

    // Get allowed origin from the environment variable
    const allowedOrigin = process.env.NEXT_PUBLIC_ALLOWED_ORIGIN || '';

    // Set CORS headers to allow requests from the specified origin
    request.headers.set('Access-Control-Allow-Origin', allowedOrigin);

    return NextResponse.json({
      message: "got page list successfully",
      pages,
      totalItems,
      totalPages,
      currentPage: page,
      itemsPerPage: limit, // Use "limit" instead of "perPage"
    }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: true, message: "Internal server error" },
      { status: 500 }
    );
  }
}





