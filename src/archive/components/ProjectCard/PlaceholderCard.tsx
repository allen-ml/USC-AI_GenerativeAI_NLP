import React from "react";
import { publicUrl } from "../../../utils/config";

const PlaceholderCard: React.FC = () => {
  return (
    <div className="col-lg-4 col-md-6 col-sm-12">
      <div className="project-card">
        <img
          src={publicUrl("/archive/tbp.png")}
          className="project-image d-block w-100"
          alt="To be published"
        />
      </div>
    </div>
  );
};

export { PlaceholderCard };
