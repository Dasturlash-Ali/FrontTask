import React, { useEffect, useState } from "react";
import {
  ButtonWrapper,
  ChatButtonWrapper,
  Color,
  ColorWrapper,
  DescriptionSection,
  DetailWrapper,
  ImageWrapper,
  InfoDetailWrapper,
  InputWrapper,
  LocationWrapper,
  MainTabsWrapper,
  MainWrapper,
  ParamWrapper,
  PhoneInfoWrapper,
  Price2Wrapper,
  PriceWrapper,
  ProductDetailWrapper,
  ProductSectionWrapper,
  SearchWrapper,
  Tab,
  TabsContainer,
  TextWrapper,
  ThumbnailsRow,
  TitleWrapper,
  TorgWrapper,
} from "./productDetail.style";
import ImageSlider from "./components/imageSlider";
import { useRouter } from "next/router";
import { useGetPhoneById } from "../../hooks";

interface Review {
  id: number;
  date?: string;
  review: string;
  phoneId: number;
}

const ProductDetail = () => {
  const { productId } = useRouter().query;
  const { data: phoneData, isLoading } = useGetPhoneById(Number(productId));
  const [text, setText] = useState("Показать номер");
  const [activeTab, setActiveTab] = useState("description");
  const [liked, setLiked] = useState(false);

  const handleLikeClick = () => {
    setLiked(!liked);
  };

  if (isLoading) return <p>Загрузка...</p>;

  console.log(phoneData);
  const images = [
    { url: phoneData?.Images[0]?.url },
    { url: phoneData?.Images[4]?.url },
    { url: phoneData?.Images[5]?.url },
    { url: phoneData?.Images[6]?.url },
    { url: phoneData?.Images[7]?.url },
  ];

  const handleClick = () => {
    setText("+998901234567");
  };
  return (
    <MainWrapper className="container">
      <SearchWrapper>
        <InputWrapper>
          <img src="/search.png" alt="" />
          <input type="text" placeholder="Type e.g Slots games" />
        </InputWrapper>
        <ParamWrapper>
          <img src="/param.png" alt="" />
        </ParamWrapper>
        <button>Поиск</button>
      </SearchWrapper>
      <ProductSectionWrapper>
        <TextWrapper>
          <p>Главная</p>
          <img src="/arrow.png" alt="" />
          <p>Объявления</p>
        </TextWrapper>
        <ProductDetailWrapper>
          <ImageWrapper>
            <ImageSlider images={images} />
            <ThumbnailsRow>
              <img src={phoneData?.Images[1]?.url} alt="" />
              <img src={phoneData?.Images[2]?.url} alt="" />
              <img src={phoneData?.Images[3]?.url} alt="" />
            </ThumbnailsRow>
          </ImageWrapper>
          <DetailWrapper>
            <TitleWrapper>
              <p>{phoneData?.title}</p>
              <img
                src={liked ? "/redlike.png" : "/like.png"}
                alt=""
                onClick={handleLikeClick}
              />
            </TitleWrapper>
            <PriceWrapper>
              <Price2Wrapper>
                <p>{phoneData?.price}</p>
                <p>{phoneData?.Currency?.name}</p>
              </Price2Wrapper>
              {!phoneData?.is_negotiable && (
                <TorgWrapper>
                  <p>Торг есть</p>
                </TorgWrapper>
              )}
            </PriceWrapper>
            <LocationWrapper>
              <img src="/locat.png" alt="" />
              <p>
                {phoneData?.Region?.name} {phoneData?.District?.name}
              </p>
            </LocationWrapper>
            <ButtonWrapper>
              <ChatButtonWrapper>
                <img src="/chat.png" alt="" />
                Написать
              </ChatButtonWrapper>
              <button onClick={handleClick}>{text}</button>
            </ButtonWrapper>
            <PhoneInfoWrapper>
              <InfoDetailWrapper>
                <span>Состояние</span>
                {phoneData?.is_new ? (
                  <h3>Новый</h3>
                ) : (
                  <h3>Бывший в употреблении</h3>
                )}
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>RAM</span>
                <h3>{phoneData?.ram}</h3>
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>ROM</span>
                <h3>{phoneData?.rom}</h3>
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>Год выпуска</span>
                <h3>{phoneData?.year}</h3>
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>Цвет</span>
                <ColorWrapper>
                  <Color color={phoneData?.Color?.code}></Color>
                  <h3>{phoneData?.Color?.name}</h3>
                </ColorWrapper>
              </InfoDetailWrapper>{" "}
              <InfoDetailWrapper>
                <span>Коробка c документами</span>
                {phoneData?.box_with_document ? <h3>Есть</h3> : <h3>Нет</h3>}
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>Размещено</span>
                <h3>{phoneData?.posted_date.slice(0, 10)}</h3>
              </InfoDetailWrapper>
              <InfoDetailWrapper>
                <span>Просмотров</span>
                <h3>{phoneData?.views}</h3>
              </InfoDetailWrapper>
            </PhoneInfoWrapper>
          </DetailWrapper>
        </ProductDetailWrapper>
      </ProductSectionWrapper>
      <MainTabsWrapper>
        <TabsContainer>
          <Tab
            active={activeTab === "description"}
            onClick={() => setActiveTab("description")}
          >
            Описание
          </Tab>
          <Tab
            active={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          >
            Отзывы
          </Tab>
        </TabsContainer>

        <DescriptionSection>
          {activeTab === "description" && <p>{phoneData?.description}</p>}
          {activeTab === "reviews" &&
            (phoneData?.Reviews?.length > 0 ? (
              phoneData.Reviews.map((item: Review) => (
                <p key={item.id}>{item.review}</p>
              ))
            ) : (
              <p>Отзывы пока отсутствуют</p>
            ))}
        </DescriptionSection>
      </MainTabsWrapper>
    </MainWrapper>
  );
};

export default ProductDetail;
