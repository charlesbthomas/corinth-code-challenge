import React from "react";
import { Card } from "semantic-ui-react";

export const ProfileCard = ({ label, value }) => (
  <Card
    className="ProfileCard"
    meta={label}
    header={value || "unknown"}
    fluid
  />
);
