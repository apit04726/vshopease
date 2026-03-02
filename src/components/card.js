import React, { useState, useEffect, useMemo } from "react";
import { Button } from "../styles/Button";
import styled from "styled-components";

const Card = () => {
  // Full list of Amazon product data - memoized to prevent recreating on every render
  const allAmazonProducts = useMemo(() => [
  {
    id: 1,
    title: "Wireless Earbuds",
    description: "Premium sound quality with noise cancellation feature",
    image: "https://m.media-amazon.com/images/I/411NxOSWI5L._AC_SX569_.jpg",
    link: "https://www.amazon.com/All-new-Echo-Buds-2023-Release-True-Wireless-Earbuds/dp/B09JVG3TWX/ref=sr_1_1_ffob_sspa?crid=1YQUXVACW2C3R&dib=eyJ2IjoiMSJ9.I3H9EQhtqTErx_GPX0Eim3LwP-1WcNyiHdh3myi3XIqdY9IWg1UGPoG07l_7DqVsvrmqvk29IslgNDztXBIYbSAERVqcC3nnO-l4hQ3tgiNtviZ646KmRP9FKs24xEMGCWz35FbqHOyukZt7xuSmEb2qEo1wiYU0czqx0se5_DAQhUWvKK3wU-s144TlsU2MVcOW8KzNaNevBkpVBN6h67UrgaZPiPA5LHzoJRmvOfM._qPtpA6pYUrpX3DQIS7f_5HEsdaVe23mf8DQryuth5Y&dib_tag=se&keywords=Wireless%2BEarbuds&qid=1748413219&sprefix=wireless%2Bearbuds%2Caps%2C367&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
  },
  {
    id: 2,
    title: "Smart Watch",
    description: "Track your fitness and stay connected with notifications",
    image: "https://m.media-amazon.com/images/I/71QA9CUvpzL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    link: "https://www.amazon.com/Fitness-Function-Touchscreen-Waterproof-Compatible/dp/B0F3DDDM9D/ref=sr_1_3?crid=2DTWW07AI5VWT&dib=eyJ2IjoiMSJ9.ZawZsnHOZWdeJsaT8LuA_jciVaSVAvPslwgD11IEKzNj7DTLWyi1Wgz2oENGvug1l1RgJutLHkgFp8ycUf1l_1TRoWn6pU6XHAMGTL99WU-1YxKkHZ5EYe4sbxTk37DuXbacSymZ-3FNp2zSAiiL5XOcLnvnyFw4c6LCaYMzG3w78PG1_Jywtwbnyc8svfRoSaUTjgNhumPWNG-TqKRCINzNrXe0XKplQCDMF2BuyLA.gSx36ZD-I9VmqjqDXl4u1qtGYv-ekZhikpWdWkORUfs&dib_tag=se&keywords=Smart%2BWatch&qid=1748413305&sprefix=smart%2Bwatch%2Caps%2C314&sr=8-3&th=1"
  },
  {
    id: 3,
    title: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 20hrs battery life",
    image: "https://m.media-amazon.com/images/I/81l7mB5LhsL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    link: "https://www.amazon.com/Bluetooth-Waterproof-Playtime-Portable-Electronic/dp/B0BRKPVZB4/ref=sr_1_3?crid=3USENT8NAZH66&dib=eyJ2IjoiMSJ9.v9legbHuKwrqlntpkJhUOvFamTqsNMStagwMkIDJi7JGQCu8qq1HNu-43kTXv2g8_q2kqPBfvMcT85n5dX5J_kkQulgHEPNSpqv2MI20l4zhvua-5MKpl68-L2-9YFJFWrKZSV6eD0R3EOK6NkZlqgNJ40MLA-xJJKmF3y5HnPb35QVcYAnlnSMIpV0qSkf09IrjJfCwqmG1rhlFEF--s-RSRRch-vtpRKFSImWLfng.oiSLZ0ugMbfew59gVzK2A4BWPohGLohTLSXwLjfdHso&dib_tag=se&keywords=Bluetooth%2BSpeaker&qid=1748413364&sprefix=bluetooth%2Bspeaker%2Caps%2C365&sr=8-3&th=1"
  },
  {
    id: 4,
    title: "Wireless Handsfree Headset",
    description: "Water-resistant with USB charging port",
    image: "https://m.media-amazon.com/images/I/51Nvb4Dvu+L._AC_SX425_.jpg",
    link: "https://www.amazon.com/New-bee-Bluetooth-Cancelling-Headsetcase/dp/B07FMSJZ3R/ref=sr_1_9?crid=1P2EWFTI9ETST&dib=eyJ2IjoiMSJ9.0HdC_lqYxd4UtyYsmkeoMDPNFcbDi-xbdGq0YH40ClYFaFmcg094XHLfajnZcffu-y9A0ikuaK_iyCdvpR_l9NbWwaXmwDSVQ3U5mKLehE94Ep2BTXGImsknMMsLkCMVImN1B6JfbtkdnAEnc4hoc1Xu7tlb2aXJricaFeYPDZILMpwDgY7k2ETXqrKbFQOimNsj04x2vXCIaikPLSFwxaLer-QVnoQ3mg-WJOKK0us.hWff_oGGZWGttJ999kquktWg6c_BTt1iSsoaSH-XCBM&dib_tag=se&keywords=Bluetooth&qid=1748413502&sprefix=bluetooth%2Bspeaker%2Caps%2C4550&sr=8-9&th=1"
  },
  {
    id: 5,
    title: "Electric Kettle",
    description: "Fast-boiling 1.7L with auto shut-off",
    image: "https://m.media-amazon.com/images/I/712P2ppNcLL._AC_SY879_.jpg",
    link: "https://www.amazon.com/COMFEE-Electric-Stainless-Interior-Protection/dp/B0DZ6M2V1V/ref=sr_1_3_sspa?crid=2LO93P6ERHWCK&dib=eyJ2IjoiMSJ9.Zn3Ztsdh2H_fBtVDxnArSKMKl9kUURSFkO10Sl6AViE9iXCyPP6FzsY_7jVfe7Jcw5h1VKKCe9dL9xP_oY6jWe3ZxHUnr_85PN6orIOVbXyOlJD0TB4ZFFMhl2Z1GabyG705YJ02Kiq2m2QPlRTTOieLrH8GfbvKhnrV8UQ0TCwtwoRoWQ3qautHMYsXyzvCCwuyBCQw0CCFjzRSb0Cms5oxM3J4fmTLjrItBTkfhaoD37IaOLw7xEA2xY6JqZ4MpUv2DHL24frDt5dU8DDotdA_gfB20uRlV9bBw7U_nyI.xClGehsDZMpWgl50ui-jWhnWDy90pGG6WUW5OYAPoF0&dib_tag=se&keywords=Electric%2BKettle&qid=1748413645&sprefix=electric%2Bkettle%2Caps%2C604&sr=8-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
  },
  {
    id: 6,
    title: "Fitness Tracker",
    description: "Heart rate monitor with 14-day battery",
    image: "https://m.media-amazon.com/images/I/41Jm9ITCFCL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
    link: "https://www.amazon.com/Fitness-Waterproof-1-10AMOLED-Activity-Trackers/dp/B0DNXQHQFQ/ref=sr_1_4?crid=27LE14PJ0BS2I&dib=eyJ2IjoiMSJ9.y1-RD6oSvvlr7DQVIdCYJOH9986wEHWw7dnukxgWlz5o2xfcHBF5vxe9vSC3kQcPD6e_8pk0N9G8ebNa-4hcnl7sGPuqehrdyxQMN3Lc583Ndhd0YhT9SphDxKS84i1c8bn6Rpj0_qv_j5rY492w1RO1DFP_RrrSUMz-WXuok0RKfIC5NBGehDCJ29xOkGC0lC7oXqAF9t_2sGqxnTUpnUgG-pRVQHiUVt_GAzCJwVc.dNRNRsP57YR_RvTF_CaPHulfNChxlCYHxn-qi84sF6c&dib_tag=se&keywords=fitness%2Btracker&qid=1748413785&sprefix=Fitness%2BTracker%2Caps%2C576&sr=8-4&th=1"
  },
  {
    id: 7,
    title: "Air Fryer",
    description: "5.8QT digital with 7 presets",
    image: "https://m.media-amazon.com/images/I/71Ld+1SBc5L._AC_SX679_.jpg",
    link: "https://www.amazon.com/Chefman-Air-Fryer-Technology-Touchscreen/dp/B0CNY1F31S/ref=sr_1_2_sspa?crid=2KINJ4NG4MYWA&dib=eyJ2IjoiMSJ9.-1WWjEEVFyiLi6snw-GSYpu-CER0C9IxTm1lGXjrZT2xPFayqIKBVTMJiqjatQITNcnc4QFb0U66NvVA2Bl15-Ir3HVCk8gBMRtNPgsXJBG7J4KD4_c9J0zNB9eZN29Iirg0vXAZjmgaf_Hk9LxkLgT1wkrl57xuVlqsv1lSglDpciRfFmsqtw1SAW6ZoMxHNmMqI8qgaCSn_7rTuKLWo2qIkPhmQEl4mf566Zc-4Pc._0HWhVSc0c7Pj0IyH10Y0gAZd8J5YDdq8q07-HfelUE&dib_tag=se&keywords=Air%2BFryer&qid=1748413847&sprefix=air%2Bfryer%2Caps%2C352&sr=8-2-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
  },
  {
    id: 8,
    title: "Wireless Charger",
    description: "15W fast charging pad for Qi devices",
    image: "https://m.media-amazon.com/images/I/615E2JtQuEL._AC_SX425_.jpg",
    link: "https://www.amazon.com/MagSafe-Magnetic-Wireless-Charging-Compatible/dp/B0DLP157QH/ref=sr_1_1_sspa?crid=3SDH8NI8RY0QU&dib=eyJ2IjoiMSJ9.nft9H3se3vfdc4Y_eKZ7l41rK01xSavMqgHEwa15AnxJFgJSHa-5fi4wzCjfrP1k7wzLLGpdD2hgKtjd1en_4Z9D8Hm0_DwLAUf2LgETC4zTQMzn5WJ4tYWLjCnpjNQQKUKNAOb_r_uqdgHjnvnCKXgMAwO2HA4rItUOWef45spgDEu1mR4wd_njNTMguWzWda69OpQUjfCv6j0TiPD9JlkYh7PneIwwcXq_eGPK1CE.zpCwd87af3dQPk7Si8jMjsggfljR27X9MUO3CBvdhiM&dib_tag=se&keywords=Wireless%2BCharger&qid=1748413904&sprefix=wireless%2Bcharger%2Caps%2C383&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1"
  },
  {
    id: 9,
    title: "Smart Watches for Women",
    description: "Smart Watches for Women, Fitness Tracker with Heart Rate",
    image: "https://m.media-amazon.com/images/I/71FSGw72QpL._AC_SX425_.jpg",
    link: "https://www.amazon.com/KEEPONFIT-Waterproof-Activity-Compatible-Gray/dp/B0DDQ2L5XG/ref=sr_1_23?crid=18S2RWX50KCTC&dib=eyJ2IjoiMSJ9.ZawZsnHOZWdeJsaT8LuA_jciVaSVAvPslwgD11IEKzNj7DTLWyi1Wgz2oENGvug1l1RgJutLHkgFp8ycUf1l_1TRoWn6pU6XHAMGTL99WU-1YxKkHZ5EYe4sbxTk37DuXbacSymZ-3FNp2zSAiiL5XOcLnvnyFw4c6LCaYMzG3w78PG1_Jywtwbnyc8svfRoSaUTjgNhumPWNG-TqKRCINzNrXe0XKplQCDMF2BuyLA.gSx36ZD-I9VmqjqDXl4u1qtGYv-ekZhikpWdWkORUfs&dib_tag=se&keywords=smart%2Bwatch&qid=1748413987&sprefix=%2Caps%2C325&sr=8-23&th=1"
  }
], []);
  // State for currently displayed products (3 at a time)
  const [currentProducts, setCurrentProducts] = useState(allAmazonProducts.slice(0, 3));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Rotate products every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const newIndex = (prevIndex + 3) % allAmazonProducts.length;
        return newIndex;
      });
      // Get next 3 products (with wrap-around)
      const nextIndex = (currentIndex + 3) % allAmazonProducts.length;
      let nextProducts = [];
      
      if (nextIndex + 3 <= allAmazonProducts.length) {
        nextProducts = allAmazonProducts.slice(nextIndex, nextIndex + 3);
      } else {
        // Handle wrap-around case
        const remaining = allAmazonProducts.length - nextIndex;
        nextProducts = [
          ...allAmazonProducts.slice(nextIndex),
          ...allAmazonProducts.slice(0, 3 - remaining)
        ];
      }
      setCurrentProducts(nextProducts);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, allAmazonProducts]);

  // Display current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Wrapper className="container" style={{ marginTop: '-38px' }}>
      <div className="datetime">
        {currentDateTime.toLocaleDateString()} - {currentDateTime.toLocaleTimeString()}
      </div>

      <div className="products-grid">
        {currentProducts.map((product) => (
          <div className="card" key={product.id}>
            <div className="image-container">
              <img
                src={product.image}
                alt={product.title}
                className="img-style"
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">{product.title}</h3>
              <p className="card-text">{product.description}</p>
              <a 
                href={product.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="link-style"
              >
                <Button className="about-btn-card">Shop Now</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  position: relative;

  .datetime {
    position: absolute;
    top: -40px;
    right: 20px;
    font-size: 14px;
    color: #666;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .card {
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease-in-out;
  }

  .card:hover {
    transform: translateY(-5px);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }

  .image-container {
    height: 200px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img-style {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .card-body {
    padding: 1rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  .link-style {
    text-decoration: none;
    margin-top: auto;
    align-self: flex-start;
  }

  .about-btn-card {
    color: white; 
    border: none;
    padding: 0.5rem 20px;
    border-radius: 0.25rem;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  /* Responsive design */
  @media (max-width: 1200px) {
    .products-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 480px) {
    .datetime {
      position: static;
      text-align: center;
      margin-bottom: 10px;
    }
  }
`;

export default Card;