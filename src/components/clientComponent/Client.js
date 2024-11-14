import React from "react";
import styles from "./Client.module.css";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/navigation";
import "swiper/css/pagination";

export const Client = () => {
  return (
    <section className={styles.client_sec}>
      <div className="container mx-auto">
        <div className={styles.heading}>
          <h1>
            Clients We’ve <span>Partnered With</span>
          </h1>
        </div>
        <div className={styles.clients}>
          <Swiper
            breakpoints={{
              360: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              840: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1136: {
                slidesPerView: 6,
              },
            }}
            modules={[Pagination]}
            spaceBetween={20}
            slidesPerView={6}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 200,
              disableOnInteraction: false,
            }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client1.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client2.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client3.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client4.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client5.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client6.svg" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={styles.clientimg}>
                <img src="/client4.svg" />
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};
export default Client;
