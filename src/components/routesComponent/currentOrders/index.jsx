import { HalfBox } from "../../UI/Shape.styled";
import TitleBar from "../../UI/TitleBar";
import { CurrentOrdersContainer } from "./CurrentOrders.styled";

const CurrentOrders = () => {
  return (
    <CurrentOrdersContainer>
      <HalfBox color="blue">
        <TitleBar title="PENDING" color="blue" />
      </HalfBox>
      <HalfBox color="orange">
        <TitleBar title="COOKING" color="orange" />
      </HalfBox>
      <HalfBox color="green">
        <TitleBar title="READY" color="green" />
      </HalfBox>
    </CurrentOrdersContainer>
  );
};

export default CurrentOrders;
