import { Box } from "@mui/material";
import { styled } from "@mui/system";

const SelectOptionStyle = styled(Box)`
  background: rgba(255, 255, 255, 0.56);
  overflow: hidden;
  /* height: 30px; */
  width: ${(props) => props.width};
  display: flex;
  justify-content: space-between;
`;

const Option = styled(Box)`
  background-color: ${(props) =>  props.activecolor};
  flex: 1;
  height: 30px;
  transition: 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;

  &:hover {
    /* outline: 1px solid white; */
    cursor: pointer;
  }
`;

const SelectOption = ({ width, options, activeItem, setActiveItem, sx }) => {
  const handleClick = (index) => {
    setActiveItem(index);
    options[index].cb();
  };

  return (
    <SelectOptionStyle width={width} sx={sx}>
      {options.map((option, index) => (
        <Option
          key={index}
          activecolor={index == activeItem ? "#292929" : "#2020202"  }
          onClick={() => {
            handleClick(index);
          }}
        >
          {option.title}
        </Option>
      ))}
    </SelectOptionStyle>
  );
};

export default SelectOption;
