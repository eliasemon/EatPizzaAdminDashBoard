import { styled } from "@mui/system";
import { useState } from "react";

const SelectOptionStyle = styled("div")`
  background: rgba(255, 255, 255, 0.56);
  border-radius: 5px;
  overflow: hidden;
  height: 40px;
  width: ${(props) => props.width};
  display: flex;
  justify-content: space-between;
  gap: 1px;
`;

const Option = styled("div")`
  background-color: ${(props) =>
    props.isActive
      ? props.theme.palette.primary.dark
      : props.theme.palette.primary.light};
  flex: 1;
  height: 40px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover {
    border: 1px solid white;
    cursor: pointer;
  }
`;

const SelectOption = ({ width, option, activeItem, setActiveItem }) => {
  const handleClick = (index) => {
    setActiveItem(index);
  };

  return (
    <SelectOptionStyle width={width}>
      {option.map((item, index) => (
        <Option
          key={index}
          isActive={index == activeItem}
          onClick={() => handleClick(index)}
        >
          {item}
        </Option>
      ))}
    </SelectOptionStyle>
  );
};

export default SelectOption;
