import PageContent from "@/components/displayHTMLContent/displayHTMLContent";
import NotFound from "./not-found";
import { headers } from "next/headers";
import Script from "next/script";

async function fetchPageByUrlmask(urlmask) {
  console.log(
    "ddafdasf",
    `${process.env.API_BASE_URL}/api/v1/page/url?url=${urlmask}`
  );
  const pageResponse = await fetch(
    `${process.env.API_BASE_URL}/api/v1/page/url?url=${urlmask}`,
    {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
    }
  );

  console.log("pageResponse", pageResponse);
  // await wait(4000);

  return pageResponse.json();
}

async function fetchMetaByUrlmask(url) {
  console.log("page-url", url);
  const fetchMetaByUrlmaskResponse = await fetch(
    `${process.env.API_BASE_URL}/api/v1/seo/pageUrl?pageUrl=${url}`,
    {
      // cache: "force-cache", ///< SSG getStaticSideProps
      cache: "no-store", ///< SSR getServerSideProps
      // next: {
      //   revalidate: 20, ///< ISR revalidate
      // },
    }
  );

  // await wait(4000);

  return fetchMetaByUrlmaskResponse.json();
}

export default async function Page({ params }) {

  const page = await fetchPageByUrlmask(params.pageUrlMask);
  const html = page?.page?.content || page.message;
  const name = page?.page?.name;
  const status = page?.page?.status;
  // const pagestyle = page?.page?.pagestyle || ``
  console.log("html: ", html);
  const aboutUsUrl = process.env.API_BASE_URL + "/about-us";
  console.log("aboutus url", aboutUsUrl);

  const clients = [
    {
      image: "/sebastian.png",
      name: "Sebastian Schaffarczyk",
      desg: "Director, AdStart Media Pte. Ltd., Singapore",
      desc: "I highly recommend Komal for her exceptional guidance and expertise in implementing our Phantom Stock Option (PSOP) scheme. Our initial uncertainty about phantom stock options was quickly dispelled thanks to her insightful explanations, which effectively clarified the distinctions between employee stock options and phantom stock options. She played a pivotal role in drafting our customized Phantom Stock Option scheme, ensuring it aligned perfectly with our organizational goals and requirements. Furthermore, when questions arose from our staff regarding the intricacies of phantom stock options, Komal provided invaluable assistance, leaving no query unanswered. I would highly recommend her.",
    },
    {
      image: "/christina.png",
      name: "Christina Sok",
      desg: "Founder, Classbubs Pte. Ltd., Singapore",
      desc: "Komal helped us with our investment transaction and completing our ESOP plan. She delivered the work quickly and efficiently and was there to clarify any doubts that we had. She understands these topics very well. I would certainly recommend her for any work related to ESOPs.",
    },
    {
      image: "/bhavuk.png",
      name: "Bhavuk Chawla",
      desg: "Founder, DataCouch",
      desc: "Quite a few founders are looking to use ESOPs as retention tools, and if you are looking to set up and install an ESOP plan in your company, Komal and the guys at AccioESOPs will take care of all the requirements right from planning to completing all filings. I would recommend them to any founder who is looking to implement ESOPs in their companies.",
    },
  ];

  const isThankYouPage = params.pageUrlMask === "thank-you";
  return (
    <div>

      {html !== "Page not found" && status === "Active" ? (
        <div className={params.pageUrlMask}>
          <div className="bannerWrepp">
            <div className="mx-auto container pl-4 pr-4">
              <h2>{name}</h2>
            </div>
          </div>
          <div className="MainContentPage">
            <div>
              <div className="mx-auto container pl-4 pr-4">
                <div className="md:flex width-100">
                  <div className="pt-4 pb-4 width-100">
                    <PageContent html={html} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </div>
  );
}

export async function generateMetadata({ params }) {
  const headersList = headers();
  const currentPageURL = headersList.get("referer") || "";

  // Use currentPageURL as needed
  console.log("Current Pages URL:", currentPageURL);
  // const pageMetadata = await fetchMetaByUrlmask(currentPageURL);
  // console.log("metadata", pageMetadata)
  // const seoKeywordsString = pageMetadata?.seo?.seoKeywords || ''; // Ensure it's not undefined
  // const seoKeywordsArray = seoKeywordsString.split(',');

  // console.log(seoKeywordsArray);

  // return {

  //     title: pageMetadata?.seo?.seoTitle || '',
  //     description: pageMetadata?.seo?.seoDescription || '',
  //     keywords: seoKeywordsArray,
  //     openGraph: {
  //         title: pageMetadata?.seo?.ogTitle || '',
  //         // description: 'The React Framework for the Web',
  //         url: pageMetadata?.seo?.ogUrl || '',
  //         // siteName: 'Next.js',
  //         images: [
  //             {
  //                 url: pageMetadata?.seo?.ogImageUrl,
  //                 // width: 800,
  //                 // height: 600,
  //             }
  //         ],
  //         // locale: 'en_US',
  //         type: 'website',
  //     },
  // }
}
