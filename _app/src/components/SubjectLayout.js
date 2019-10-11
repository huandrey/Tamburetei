import { useStaticQuery, graphql, Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Layout from './Layout'
import styles from './SubjectLayout.module.css'

const SubjectLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
  query AllSubjects {
    subjects: allMarkdownRemark(
      filter: { 
        fileAbsolutePath: { regex: "/README\\.md/" },
        fields: { slug: { regex: "/^\\/[\\w]+\\/$/" } }
      },
      sort: { fields: [frontmatter___title], order: DESC }
    ) {
      edges {
        node {
          id
          fields {
            slug
            slugPath
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`)

  return (
    <Layout>
      <div className={styles.container}>
        <section className={styles.content}>{children}</section>
        <aside className={styles.sideNav}>
          <nav className={styles.innerNav}>
            {data.subjects.edges.map(subject => (
              <Link
                className={styles.linkWrapper}
                key={subject.node.id}
                to={subject.node.fields.slugPath}
              >
                {subject.node.frontmatter.title}
              </Link>
            ))}
          </nav>
        </aside>
      </div>
    </Layout>
  )
}

SubjectLayout.propTypes = {
  children: PropTypes.node,
}

export default SubjectLayout
