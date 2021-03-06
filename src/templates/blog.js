import React from 'react';
import { Link, graphql } from 'gatsby';
import Layout from "../components/layout";
import Container from "../components/container";
import MetaTags from '../components/Metatags'
import withSubNav from '../components/NavSub';
import Img from 'gatsby-image';
import {FaAngleDoubleLeft, FaAngleDoubleRight} from 'react-icons/fa';

const NavLink = props => {
  if (!props.test) {
    return <Link className={props.className} to={props.url}>{props.text}</Link>
  } else {
    return <span className={props.className}>{props.text}</span>
  }
}

const BlogPage = ({ pageContext}) => {
  console.log(pageContext);
  const { group, index, first, last, pageCount, pathPrefix } = pageContext
  const previousUrl = index - 1 == 1 ? pathPrefix : pathPrefix + '/'+(index - 1).toString()
  const nextUrl = pathPrefix + '/'+(index + 1).toString()

    return (
        <Layout>
            <MetaTags
                title="Blog"
                description="Retainful Blog"
            />
            <div className="blog-list-container">
                <Container type="s">
                    { group.map(post => (
                        <div className="blog-post" key={post.node.fields.slug}>
                            <div className="image-section">
                                <Link to={post.node.fields.slug}>
                                    { post.node.frontmatter.image &&
                                    <img src={post.node.frontmatter.image} alt={post.node.frontmatter.title} />
                                    }
                                </Link>
                            </div>
                            <div className="content-section">
                                <h3><Link to={post.node.fields.slug}>{post.node.frontmatter.title}</Link></h3>
                                <p>
                                    <small>Posted by {post.node.frontmatter.author} on {post.node.frontmatter.date} in
                                        <Link to={'blog/category/'+ post.node.frontmatter.category}> {post.node.frontmatter.category}</Link></small>
                                </p>
                                { console.log(post.node.frontmatter.description) }
                                <p>
                                    {post.node.frontmatter.description}
                                </p>
                                <p>
                                    {post.node.excerpt}
                                </p>
                                <Link to={post.node.fields.slug}>Read more</Link>
                            </div>
                        </div>
                    )) }
                    <div className="pagination-links">
                        <NavLink className="previousLink" test={first} url={previousUrl} text={<FaAngleDoubleLeft/>} />
                        {Array.from({ length: pageCount }, (_, i) => (
                          <Link key={`pagination-number${i + 1}`} className="pagination-number" to={`blog/${i === 0 ? "" : i + 1}`}>
                            {i + 1}
                          </Link>
                        ))}
                        <NavLink className="nextLink" test={last} url={nextUrl} text={<FaAngleDoubleRight/>} />
                    </div>
                </Container>
            </div>
        </Layout>
    )
}

export const PostQuery = graphql`
    query BlogIndexQuery {
        allMarkdownRemark(
            filter: { fileAbsolutePath: { regex: "/blog/" } }
            sort: {fields: [frontmatter___date], order: DESC}, limit: 10
        ) {
            edges {
                node {
                    frontmatter {
                        title
                        description
                        date(formatString: "DD MMMM, YYYY")
                        author
                        image
                        category
                    }
                    excerpt
                    fields{
                        slug
                    }
                }
            }
        }
    }
`

export default BlogPage
