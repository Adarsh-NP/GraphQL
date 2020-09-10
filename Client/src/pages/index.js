import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import BookList from "../components/BookList"

const IndexPage = () => (
  <>
  <h1>New Book List</h1>
    <BookList />
  </>
)

export default IndexPage
