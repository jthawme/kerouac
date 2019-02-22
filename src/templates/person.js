import React from "react"

import Person from "../components/Person/Person";
import { graphql } from "gatsby";

const PersonPage = ({ data }) => <Person {...data.person}/>;

export default PersonPage

export const query = graphql`
  query($slug: String!) {
    person: personYaml(fields: { slug: { eq: $slug } }) {
      id,
      name,
      title,
      description,
      location,
      image {
        header: childImageSharp {
          fluid(maxWidth: 1600, maxHeight: 1100, grayscale: true) {
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
            originalImg
            originalName
            presentationWidth
            presentationHeight
          }
        }
      },
      appearances {
        on_the_road
        the_subterraneans
        desolation_angels
        the_town_and_the_city
        vanity_of_duluoz
        visions_of_cody
        the_dharma_bums
        big_sur
        visions_of_gerard
        doctor_sax
        maggie_cassidy
        tristessa
        satori_in_paris
        the_subterranean
      }
    }
  }
`;
