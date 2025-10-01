import { ScrollIndicator } from "../../components";
import FullHeightSection from "../../layouts/FullHeightSection";

function Hero(): React.JSX.Element {
  return (
    <FullHeightSection id="hero">
      <h1 className="heroTitle">
        <div>Natural</div>
        <div>Language</div>
        <div>Processing</div>
      </h1>
      <ScrollIndicator targetId="overview" />
    </FullHeightSection>
  );
}

export default Hero;
