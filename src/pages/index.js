import React from "react"
import { graphql } from "gatsby";

import Home from "../components/Home/Home";

const IndexPage = ({ data }) => <Home {...data}/>;

export default IndexPage

export const query = graphql`
  {
    site {
      siteMetadata {
        title
        description
        author
      }
    },
    people: allPersonYaml {
      list: edges {
        node {
          id,
          priority,
          media: image {
            node: childSourcedYaml {
              name,
              image {
                medium: childImageSharp {
                  fluid(maxWidth: 600, grayscale: true) {
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
                },
                large: childImageSharp {
                  fluid(maxWidth: 1500, grayscale: true) {
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
          },
          name,
          appearances {
            on_the_road
            the_subterraneans
            desolation_angels
            visions_of_gerard
            doctor_sax
            the_town_and_the_city
            maggie_cassidy
            vanity_of_duluoz
            visions_of_cody
            tristessa
            the_dharma_bums
            big_sur
            satori_in_paris
          },
          fields {
            slug
          }
        }
      }
    }
  }
`;
