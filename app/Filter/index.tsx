"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import {
  FilterContainer,
  FilterHeader,
  FilterTitle,
  CloseButton,
  SelectGroup,
  SelectLabel,
  SelectWrapper,
  Select,
  SelectArrow,
  SwitchContainer,
  SwitchLabel,
  Switch,
  SwitchInput,
  SwitchSlider,
  ConditionContainer,
  ConditionHeader,
  ConditionTitle,
  ConditionValue,
  BrandContainer,
  BrandInputGroup,
  BrandInput,
  BrandButton,
  ColorContainer,
  ColorGrid,
  ColorSwatch,
  ButtonGroup,
  ResetButton,
  ApplyButton,
} from "./Filter.style"

export default function FilterComponent() {
  const [topOnly, setTopOnly] = useState(false)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const colors = [
    { id: "black", color: "#000000" },
    { id: "white", color: "#f5f5f5" },
    { id: "teal", color: "#2dd4bf" },
    { id: "yellow", color: "#fbbf24" },
    { id: "red", color: "#f87171" },
    { id: "purple", color: "#8b5cf6" },
    { id: "blue", color: "#3b82f6" },
  ]

  return (
    <FilterContainer className="container">
      <FilterHeader>
        <FilterTitle>Фильтр</FilterTitle>
        <CloseButton>x</CloseButton>
      </FilterHeader>

      <SelectGroup>
        <SelectLabel>Регион</SelectLabel>
        <SelectWrapper>
          <Select defaultValue="">
            <option value="" disabled>Не указан</option>
            <option value="moscow">Москва</option>
            <option value="spb">Санкт-Петербург</option>
          </Select>
          <SelectArrow><ChevronDown size={16} /></SelectArrow>
        </SelectWrapper>
      </SelectGroup>

      <SwitchContainer>
        <SwitchLabel>Только TOP объявления</SwitchLabel>
        <Switch>
          <SwitchInput type="checkbox" checked={topOnly} onChange={() => setTopOnly(!topOnly)} />
          <SwitchSlider />
        </Switch>
      </SwitchContainer>

      <ConditionContainer>
        <ConditionHeader>
          <ConditionTitle>Состояние</ConditionTitle>
          <ConditionValue>5/9</ConditionValue>
        </ConditionHeader>
        <SelectWrapper>
          <Select defaultValue="new">
            <option value="new">Новый</option>
            <option value="used">Б/У</option>
          </Select>
          <SelectArrow><ChevronDown size={16} /></SelectArrow>
        </SelectWrapper>
      </ConditionContainer>

      <BrandContainer>
        <SelectLabel>Бренд</SelectLabel>
        <BrandInputGroup>
          <BrandInput placeholder="Выбрать" />
          <BrandButton>Ввести вручную</BrandButton>
        </BrandInputGroup>
      </BrandContainer>

      <SelectGroup>
        <SelectLabel>Память</SelectLabel>
        <SelectWrapper>
          <Select defaultValue="">
            <option value="" disabled>Не указан</option>
            <option value="64">64 ГБ</option>
            <option value="128">128 ГБ</option>
            <option value="256">256 ГБ</option>
          </Select>
          <SelectArrow><ChevronDown size={16} /></SelectArrow>
        </SelectWrapper>
      </SelectGroup>

      <ColorContainer>
        <SelectLabel>Цвет</SelectLabel>
        <ColorGrid>
          {colors.map((color) => (
            <ColorSwatch
              key={color.id}
              bgColor={color.color}
              isSelected={selectedColor === color.id}
              onClick={() => setSelectedColor(color.id)}
            />
          ))}
        </ColorGrid>
      </ColorContainer>

      <ButtonGroup>
        <ResetButton>Сбросить</ResetButton>
        <ApplyButton>Применить</ApplyButton>
      </ButtonGroup>
    </FilterContainer>
  )
}
