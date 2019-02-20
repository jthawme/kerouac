import React from "react"
import { Link } from "gatsby"

import Image from "../components/Common/Image/Image";
import SEO from "../components/Common/SEO/SEO";
import Page from "../components/Common/Page/Page";

const IndexPage = () => (
  <Page>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Page>
)

export default IndexPage
