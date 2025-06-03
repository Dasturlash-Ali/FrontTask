import React, { useRef, useState } from "react";
import { HomeWrapper } from "./Home.styled";
import { VscSettings } from "react-icons/vsc";
import { SearchButton } from "../../components/Button/Button.style";
import { IoIosSearch } from "react-icons/io";
import Card from "../../components/Cards";
import LargeCard from "../../components/Cards/LargeCard";
import { title } from "process";
import { useGetAllPhones } from "../../hooks";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Home = () => {
  const { data: phones } = useGetAllPhones();
  const images = [
    { img: "/images/apple.svg", title: "Apple" },
    { img: "/images/huawei.svg", title: "Huawei" },
    { img: "/images/xiaomi.svg", title: "Xiaomi" },
    { img: "/images/samsung.svg", title: "Samsung" },
    { img: "/images/blackview.svg", title: "Blackview" },
    { img: "/images/philips.svg", title: "Philips" },
    { img: "/images/xiaomi.svg", title: "Xiaomi" },
    { img: "/images/apple.svg", title: "Apple" },
    { img: "/images/blackview.svg", title: "Blackview" },
    { img: "/images/samsung.svg", title: "Samsung" },
    { img: "/images/huawei.svg", title: "Huawei" },
    { img: "/images/smotretvse.svg", title: "Смотреть все" },
  ];

  const phone = [
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
    {
      imgs: "/images/phono.svg",
      labels: [
        "Xiaomi Redmi Note 12",
        "Состояние: Новый",
        "Память: 64 GB",
        "1 680 000 UZS",
      ],
    },
  ];

  const router = useRouter();

  const handleClick = (id: number) => {
    router.push(`/productDetail/${id}`);
  };

  const productSectionRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Qidiruv funksiyasi uchun state
  const [searchQuery, setSearchQuery] = useState(""); // Qidiruv so‘rovi
  const [results, setResults] = useState<string[]>([]); // Qidiruv natijalari
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true); // ✅ qidiruv bo‘ldi deb belgilaymiz
  
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
  
    const mockResults = [
      "Telefon 1",
      "Telefon 2",
      "Telefon 3",
      "Telefon 4",
    ].filter((item) => item.toLowerCase().includes(searchQuery.toLowerCase()));
  
    if (mockResults.length === 0) {
      toast.info("Natija mavjud emas");
    }
  
    setResults(mockResults);
  };

  
  

  return (
    <div className="container">
      <ToastContainer />
      <HomeWrapper>
        <div className="search-input container">
          <IoIosSearch className="searchIcon" />
          <input
            type="text"
            placeholder="Type e.g Slots games"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="settings-icon">
            <VscSettings />
          </div>
          <SearchButton onClick={handleSearch}>Поиск</SearchButton>
        </div>

        {/* Qidiruv natijalarini ko‘rsatish */}
        <div className="search-results">
          {results.length > 0 ? (
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
          ) : hasSearched ? (
            <p></p>
          ) : null}
        </div>


        <h3>Категории</h3>
        <div onClick={scrollToProducts} className="cards-group container">
          {images.map((item, i) => (
            <div key={i} className="card-container">
              {/* Card komponenti */}
              <Card img={item.img} alt={`Card ${i + 1}`} />
              {/* Carddan tashqarida joylashgan p elementi */}
              <p>{item.title}</p>
            </div>
          ))}
        </div>
        <h3>Объявления</h3>
        <div className="product-cards container" ref={productSectionRef}>
          {phone.map((item, i) => (
            <div
              onClick={() => handleClick(14)}
              key={i}
              className="product-container container"
            >
              <LargeCard
                img={item.imgs}
                alt={`Card ${i + 1}`}
                labels={item.labels}
              />
            </div>
          ))}
        </div>
      </HomeWrapper>
    </div>
  );
};

export default Home;

// ---------------------------------Api dan olish

/**
 * import React, { useEffect, useState } from 'react';
import { HomeWrapper } from './Home.styled';
import { VscSettings } from 'react-icons/vsc';
import { SearchButton } from '../../components/Button/Button.style';
import { IoIosSearch } from "react-icons/io";
import Card from '../../components/Cards';
import LargeCard from '../../components/Cards/LargeCard';
import axios from 'axios';

const Home = () => {
  const [brands, setBrands] = useState([]);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    // Brendlarni olish
    axios.get('http://3.72.3.67:4007/api/brand')
      .then(res => setBrands(res.data))
      .catch(err => console.error('Brand fetch error:', err));

    // Telefonlarni olish
    axios.get('http://3.72.3.67:4007/api/phone')
      .then(res => setPhones(res.data))
      .catch(err => console.error('Phone fetch error:', err));
  }, []);

  return (
    <div className='container'>
      <HomeWrapper>

        <div className='search-input container'>
          <IoIosSearch className='searchIcon' />
          <input type="text" placeholder='Type e.g Slots games' />
          <div className='settings-icon'>
            <VscSettings />
          </div>
          <SearchButton>Поиск</SearchButton>
        </div>

        <h3>Бренды</h3>
        <div className='cards-group container'>
          {brands.map((item: any, i: number) => (
            <div key={i} className="card-container">
              <Card
                img={`http://3.72.3.67:4007${item.image}`}
                alt={item.name}
              />
              <p>{item.name}</p>
            </div>
          ))}
        </div>


        <h3>Телефоны</h3>
        <div className='product-cards container'>
          {phones.map((item: any, i: number) => (
            <div key={i} className='product-container'>
              <LargeCard
                img={`http://3.72.3.67:4007${item.image}`}
                alt={item.title}
                labels={item.labels || []}
              />
            </div>
          ))}
        </div>
      </HomeWrapper>
    </div>
  );
};

export default Home;
 */
