import React from "react";
import styles from "./SatisfiedClientSlider.module.css";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
// import "swiper/css/pagination";

const SatisfiedClientSlider = () => {
  const chunkClients = (size) => {
    const chunked = [];
    for (let i = 0; i < clients.length; i += size) {
      chunked.push(clients.slice(i, i + size));
    }
    return chunked;
  };

  const getItemsToShow = () => {
    if (window.innerWidth <= 767) {
      return 1;
    } else if (window.innerWidth <= 1260) {
      return 1;
    } else {
      return 1;
    }
  };

  const [itemsToShow, setItemsToShow] = React.useState(getItemsToShow());

  React.useEffect(() => {
    const handleResize = () => {
      setItemsToShow(getItemsToShow());
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className={styles.clientsuccesssection}>
      <div className="container mx-auto">
        <div className={styles.storywrap}>
          <div className={styles.heading}>
            <h1>
              Trusted Expertise: <span>Client Success Stories</span>
            </h1>
            <p>
              Don’t just take our word for it—see how our expertise has made a
              difference. Our clients share their firsthand experiences,
              showcasing the genuine impact of our tailored solutions and
              dedicated support in achieving their goals.
            </p>
          </div>
          <div className={styles.clientslider}>
            <Swiper
              breakpoints={{
                360: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 1,
                },
                576: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                840: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2.5,
                },
                1136: {
                  slidesPerView: 2.5,
                },
              }}
              modules={[Navigation]}
              spaceBetween={20}
              slidesPerView={2.5}
              navigation
              loop={true}
              // pagination={{ clickable: true }}
              autoplay={{
                delay: 200,
                disableOnInteraction: false,
              }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={() => console.log("slide change")}
            >
              <SwiperSlide>
                <div className={styles.review}>
                  <div className="coma">
                    <img src="/quote.png" />
                  </div>
                  <div className={styles.reviewcont}>
                    <p>
                      I hired Sapna from Accio Finance to file a US BEA survey,
                      She did the job expeditiously and sufficiently. Highly
                      recommend!
                    </p>
                    <h4>Sudhir A</h4>
                    <span>President, Sudhirahluwalia, Inc</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.review}>
                  <div className="coma">
                    <img src="/quote.png" />
                  </div>
                  <div className={styles.reviewcont}>
                    <p>
                      Sapna from Accio Finance did a fantastic job analysing
                      bank records in connection with fraudulent transfer
                      litigation. Her report on the transactions was clear and
                      fit for inclusion with court filings, I also really
                      appreciated her responsiveness throughout the project and
                      the quick turnaround time.
                    </p>
                    <h4>Mathew H.</h4>
                    <span>Professional, United States</span>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styles.review}>
                  <div className="coma">
                    <img src="/quote.png" />
                  </div>
                  <div className={styles.reviewcont}>
                    <p>
                      Sapna from Accio Finance did a fantastic job analysing
                      bank records in connection with fraudulent transfer
                      litigation. Her report on the transactions was clear and
                      fit for inclusion with court filings, I also really
                      appreciated her responsiveness throughout the project and
                      the quick turnaround time.
                    </p>
                    <h4>Sudhir A</h4>
                    <span>President, Sudhirahluwalia, Inc</span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatisfiedClientSlider;
