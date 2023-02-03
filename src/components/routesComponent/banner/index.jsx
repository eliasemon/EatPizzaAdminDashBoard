
import CreateBanner from "./CreateBanner";
import { HalfBox } from "../../UI/Shape.styled";
import { BannerContainer } from "./Banner.styled";
import TitleBar from "../../UI/TitleBar";

const Banner = () => {

  return (
    <BannerContainer>
      <HalfBox color="blue">
        <TitleBar title="Creation Section" color="blue" />
        <CreateBanner  />
      </HalfBox>
     
    </BannerContainer>
  );
};
export default Banner;
