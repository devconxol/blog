import React from "react"
import Layout from "../components/layout"
import { graphql, useStaticQuery, Link } from 'gatsby'

import BlogStyles from './blog.module.scss'

import Head from '../components/head'


const BlogPage = () => {
 /*   const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                edges {
                    node {
                        frontmatter {
                            title
                            date
                        }

                        fields {
                            slug
                        }

                         
                    }
                }
            }
        }
    `)*/

    const data = useStaticQuery(graphql`
    query {
        allContentfulBlogPost (
          sort: {
            fields: publishedDate,
            order: DESC
          }
        ) {
          edges {
            node {
              title
              slug
              publishedDate(formatString: "MMMM Do, YYYY")
            }
          }
        }
      }
      
    `)
   

    return (

        <Layout>  
              <Head title="Blog"/>
            <h1>Blog</h1>

            <ol className={BlogStyles.posts}>
                {
                    //data.allMarkdownRemark.edges.map(renderPost)
                    data.allContentfulBlogPost.edges.map(renderPost)

                    
                }
            </ol>
        </Layout>
    )
}

function renderPost (post) {
    const url = `/blog/${post.node.slug}`
    return (
        <li className={BlogStyles.post} key={post.node.title}>
        <Link to={url} > 
            <h2>  {post.node.title}  </h2> 
            <p>{post.node.publishedDate}</p> 
        </Link> 
        </li>
    )
}

/*function renderMarkPost (post) {
    const url = `/blog/${post.node.fields.slug}`
    return (
        <li className={BlogStyles.post} key={post.node.frontmatter.title}>
        <Link to={url} > 
            <h2>  {post.node.frontmatter.title}  </h2> 
            <p>{post.node.frontmatter.date}</p> 
        </Link> 
        </li>
    )
}*/

export default BlogPage