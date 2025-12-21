import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
import SlideOneImg from '../../assets/images/banner-1.jpg';
import SlideTwoImg from '../../assets/images/banner-2.jpg';

const Hero = () => {
  return (
    <section className="section-1">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 2800,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={800}
          loop={true}
          modules={[Autoplay]}      
          breakpoints={{
              1024: {
                slidesPerView: 1,
                spaceBetween: 0,
              }
            }}
          >               
            <SwiperSlide>
              <div className="content" style={{ backgroundImage: `url(${SlideOneImg})` }}>                        
              </div>                   
            </SwiperSlide>
            <SwiperSlide>
              <div className="content" style={{ backgroundImage: `url(${SlideTwoImg})` }}>                        
              </div>
            </SwiperSlide>                
        </Swiper>
    </section>
  )
}

export default Hero