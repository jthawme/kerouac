import React from "react"
import PropTypes from "prop-types"

import './Page.scss';

function Page({ children }) {
  return <main>{ children }</main>
}

Page.defaultProps = {
}

Page.propTypes = {
  children: PropTypes.node
}

export default Page;