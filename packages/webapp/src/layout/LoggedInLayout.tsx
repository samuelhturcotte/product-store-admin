import React from "react";
import { Header } from "../components/shared/Header";
import { useGetMeQuery } from "../services/api";

type Props = {
  children?: React.ReactNode;
};

export const LoggedInLayout: React.FC<Props> = ({ children }) => {
  useGetMeQuery(null);
  return (
    <div
      style={{
        height: "100vh",
        maxWidth: "1440px"
      }}
    >
      <div>
        <Header key="header"/>
        {children}
      </div>
    </div>
  );
};
