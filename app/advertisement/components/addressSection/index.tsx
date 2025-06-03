import React, { useState } from "react";
import {
  SectionWrapper,
  SectionWrapper2,
  TabWrapper,
} from "./addressSection.style";
import { useDistrict, useRegions } from "../../../../hooks";

const AddressSection = (props: any) => {
  const { formData, setFormData } = props;
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [clicked, setClicked] = useState(true);
  const { data: regions } = useRegions();
  const { data: districts } = useDistrict();

  const defaultCenter: [number, number] = [41.3111, 69.2797];

  const [selectedCoords, setSelectedCoords] = useState<[number, number] | null>(
    null
  );

  const handleMapClick = (e: any) => {
    const coords = e.get("coords");
    setSelectedCoords(coords);

    setFormData({
      ...formData,
      lat: coords[0],
      long: coords[1],
    });
  };

  return (
    <>
      <h2>Адрес продажи</h2>
      <TabWrapper>
        <button
          onClick={() => setClicked(true)}
          className={clicked ? "active" : ""}
        >
          Выбрать
        </button>
        <button
          onClick={() => setClicked(false)}
          className={!clicked ? "active" : ""}
        >
          Выбрать на карте
        </button>
      </TabWrapper>

      {clicked ? (
        <>
          <SectionWrapper>
            <h3>Выбрать регион</h3>
            <select
              value={formData.regionId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  regionId: +e.target.value,
                });
              }}
              required={clicked}
            >
              <option value="">Выберите регион</option>
              {regions?.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </SectionWrapper>
          <SectionWrapper>
            <h3>Выбрать город или район</h3>
            <select
              value={formData.districtId}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  districtId: +e.target.value,
                });
              }}
              required={clicked}
            >
              <option value="">Выберите город или район</option>
              {districts?.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </SectionWrapper>
        </>
      ) : (
        <SectionWrapper2>
          <h3>Выберите на карте</h3>
          <div
            style={{
              width: "70%",
              height: "400px",
              marginTop: "15px",
              position: "relative",
            }}
          >
            
          </div>
        </SectionWrapper2>
      )}
    </>
  );
};

export default AddressSection;
