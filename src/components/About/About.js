import React from 'react';
import PropTypes from 'prop-types';

// 3rd Party Modules
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

// Components
import SEO from '../Common/SEO/SEO';
import BtnLink from '../Common/BtnLink/BtnLink';

// CSS, Requires
import styles from "./About.module.scss";

const renderSource = ({ node }) => (
  <div key={node.name} className={styles.sourcesItem}>
    <BtnLink className={styles.sourcesLink} to={`${node.source}?ref=friends-of-kerouac`}>{ node.name }</BtnLink>
  </div>
);

const About = () => (
  <StaticQuery
    query={graphql`
      {
        sources: allSourcedYaml {
          edges {
            node {
              name,
              source
            }
          }
        },
        footerImage: file(relativePath: { eq: "the-beatniks.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 700, grayscale: true) {
              base64
              tracedSVG
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
    `}
    render={({ sources, footerImage }) => {
      return (
        <div className={styles.root}>
          <SEO title="About"/>
          <header className={`${styles.grid} ${styles.header}`}>
            <div className={styles.headerTitleArea}>
              <h1 className={styles.headerTitle}>About<br/>Friends of Kerouac</h1>
              <p className={styles.headerSubtitle}>Letter from the Editor</p>
            </div>
            <p className={styles.headerDescription}>
              Friends of Kerouac is a small homage to an author that has now long since inspired me in my life and work. I wanted to create a visual compendium that ties up a lot of the books into the real web of characters that Kerouac lived with and ultimately immortalised in his work.
              <br/><br/>
              Kerouac was advised by his publishers to change the names of his characters to be fictitious, a move made to avoid lawsuits in a time where literature of similar ilk had already come under fire. The names in each book then subsequently became a code to crack, as no events or personality was changed, simply the names themselves.
              <br/><br/>
              This site maps the names and the apperances of his major characters, so that you as a reader can start to understand and piece together, who it was that was sculpting this world with Jack.
            </p>
          </header>

          <div className={`${styles.grid} ${styles.sources}`}>
            <h2 className={styles.sourcesTitle}>Sources</h2>
            <div className={styles.sourcesList}>
              { sources.edges.map(renderSource) }
            </div>
          </div>

          <div className={`${styles.grid} ${styles.quote}`}>
            <p className={styles.quoteText}>
              My fault, my failure, is not in the passions I have, but in my lack of control of them.
            </p>
          </div>

          <footer className={`${styles.grid} ${styles.footer}`}>
            <div className={styles.footerSite}>
              <BtnLink to="https://jthaw.me">Made by jthawme</BtnLink>
            </div>
            <div className={styles.footerContact}>
              <BtnLink to="mailto:hi@jthaw.me?subject=Friends of Kerouac">Contact</BtnLink>
            </div>
            <div className={styles.footerTwitter}>
              <BtnLink to="https://twitter.com/jthawme">Twitter</BtnLink>
            </div>
            <Img {...footerImage.childImageSharp} backgroundColor="#000" className={styles.footerImage}/>
          </footer>
        </div>
      )
    }}/>
);

About.propTypes = {
  className: PropTypes.string,
}

About.defaultProps = {
  className: null,
}

export default About;
