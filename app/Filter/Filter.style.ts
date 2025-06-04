import styled from "styled-components"

export const FilterContainer = styled.div`
  width: 100%;
  max-width: 400px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin-top: 50px;
  font-family: 'Inter', sans-serif;
`

export const FilterHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const FilterTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 20px;
  color: #666;
`

export const SelectGroup = styled.div`
  margin-bottom: 16px;
`

export const SelectLabel = styled.label`
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
  color: #333;
`

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
`

export const Select = styled.select`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  appearance: none;
  background-color: white;
  font-size: 14px;
  color: #999;
`

export const SelectArrow = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
`

export const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`

export const SwitchLabel = styled.span`
  font-size: 14px;
  color: #333;
`

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
`

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + span {
    background-color: #6366f1;
  }

  &:checked + span:before {
    transform: translateX(20px);
  }
`

export const SwitchSlider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #e0e0e0;
  transition: .4s;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
  }
`

export const ConditionContainer = styled.div`
  margin-bottom: 16px;
`

export const ConditionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
`

export const ConditionTitle = styled.span`
  font-size: 14px;
  color: #333;
`

export const ConditionValue = styled.span`
  font-size: 14px;
  color: #666;
`

export const BrandContainer = styled.div`
  margin-bottom: 16px;
`

export const BrandInputGroup = styled.div`
  display: flex;
  gap: 8px;
`

export const BrandInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
`

export const BrandButton = styled.button`
  padding: 10px 12px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`

export const ColorContainer = styled.div`
  margin-bottom: 24px;
`

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
  margin-top: 8px;
`

export const ColorSwatch = styled.button<{ bgColor: string; isSelected: boolean }>`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  background-color: ${(props) => props.bgColor};
  border: ${(props) => (props.isSelected ? "2px solid #6366f1" : "none")};
  cursor: pointer;
`

export const ButtonGroup = styled.div`
  display: flex;
  gap: 8px;
`

export const ResetButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
  cursor: pointer;
`

export const ApplyButton = styled.button`
  flex: 1;
  padding: 12px;
  background-color: #6366f1;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  color: white;
  cursor: pointer;
`