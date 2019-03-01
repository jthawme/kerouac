import React from "react"

import { graphql } from "gatsby";
import PageTransition from 'gatsby-plugin-page-transitions';

import Person from "../components/Person/Person";

const PersonPage = ({ data }) => <PageTransition><Person {...data.person}/></PageTransition>;

export default PersonPage

export const query = graphql`
  query($slug: String!) {
    person: personYaml(fields: { slug: { eq: $slug } }) {
      id,
      name,
      title,
      description,
      location,
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
      },
      media: image {
        node: childSourcedYaml {
          name,
          image {
            file: childImageSharp {
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
          }
        }
      }
    }
  }
`;
