import React, { FC, ReactNode } from "react";

import Banner from "../../components/Banner";
import banner from "../../images/banner.jpg";

/**
 * Application Main
 * @component
 *
 * @prop {ReactNode} children
 */
export const Main: FC<{ children: ReactNode }> = ({ children }) => (
  <main className="container">
    <div className="row">
      <div className="col">
        <Banner image={banner} header="К весне готовы!" />
        {children}
      </div>
    </div>
  </main>
);

export default Main;
