import { ScrollIndicator } from "../../components/ScrollIndicator/ScrollIndicator";
import { FullHeightSection } from "../../layouts/FullHeightSection/FullHeightSection";

const Hero: React.FC = () => {
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
};

export { Hero };
