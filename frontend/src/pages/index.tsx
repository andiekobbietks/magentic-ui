import * as React from "react";
import MagenticUILayout from "../components/layout";
import { graphql } from "gatsby";

// markup
const AppPage = ({ data }: any) => {
  return (
    <MagenticUILayout meta={data.site.siteMetadata} title="Console" link={"/app"}>
      <main style={{ height: "100%" }} className=" h-full ">
      </main>
    </MagenticUILayout>
  );
};

export const query = graphql`
  query AppPageQuery {
    site {
      siteMetadata {
        description
        title
      }
    }
  }
`;

export default AppPage;
