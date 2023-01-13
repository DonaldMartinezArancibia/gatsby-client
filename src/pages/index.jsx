import * as React from "react"
import { graphql } from "gatsby"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"
import { formatDate } from "../utils"
import { Layout } from "../components"

// const links = [
//   {
//     text: "Tutorial",
//     url: "https://www.gatsbyjs.com/docs/tutorial",
//     description:
//       "A great place to get started if you're new to web development. Designed to guide you through setting up your first Gatsby site.",
//   },
//   {
//     text: "Examples",
//     url: "https://github.com/gatsbyjs/gatsby/tree/master/examples",
//     description:
//       "A collection of websites ranging from very basic to complex/complete that illustrate how to accomplish specific tasks within your Gatsby sites.",
//   },
//   {
//     text: "Plugin Library",
//     url: "https://www.gatsbyjs.com/plugins",
//     description:
//       "Learn how to add functionality and customize your Gatsby site or app with thousands of plugins built by our amazing developer community.",
//   },
//   {
//     text: "Build and Host",
//     url: "https://www.gatsbyjs.com/cloud",
//     description:
//       "Now you’re ready to show the world! Give your Gatsby site superpowers: Build and host on Gatsby Cloud. Get started for free!",
//   },
// ]

// const samplePageLinks = [
//   {
//     text: "Page 2",
//     url: "page-2",
//     badge: false,
//     description:
//       "A simple example of linking to another page within a Gatsby site",
//   },
//   { text: "TypeScript", url: "using-typescript" },
//   { text: "Server Side Rendering", url: "using-ssr" },
//   { text: "Deferred Static Generation", url: "using-dsg" },
// ]

// const moreLinks = [
//   { text: "Join us on Discord", url: "https://gatsby.dev/discord" },
//   {
//     text: "Documentation",
//     url: "https://gatsbyjs.com/docs/",
//   },
//   {
//     text: "Starters",
//     url: "https://gatsbyjs.com/starters/",
//   },
//   {
//     text: "Showcase",
//     url: "https://gatsbyjs.com/showcase/",
//   },
//   {
//     text: "Contributing",
//     url: "https://www.gatsbyjs.com/contributing/",
//   },
//   { text: "Issues", url: "https://github.com/gatsbyjs/gatsby/issues" },
// ]

// const utmParameters = `?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter`

const IndexPage = ({ data: { allGraphCmsPost: allPost, featuredPost } }) => {
  const postF = featuredPost.nodes[0]
  const allPostcms = allPost.nodes

  const elementoLista = []
  for (var i = 0; i < allPostcms.length; i++) {
    elementoLista.push(<li>{allPostcms[i]}</li>)
  }
  console.log(allPostcms)
  console.log({ elementoLista })

  return (
    <Layout>
      <section className="sm:grid md:grid-cols-2 container mx-auto xl:px-24 items-center justify-between">
        <h1 className="font-bold text-5xl self-end xl:px-20">
          Tu blog para aprender˗ˏˋ☕ˎˊ˗
        </h1>
        <p className="text-2xl place-self-start xl:px-20 text-slate-400 mt-5 col-start-1">
          Cody te enseña con posts
        </p>
        <StaticImage
          src="../images/facilito-code.jpg"
          loading="eager"
          quality={100}
          formats={["auto", "webp", "avif"]}
          alt=""
          className="col-start-2 row-[1/3] w-11/12 xl:w-full xl:h-96"
        />
      </section>
      <article className="p-24">
        <div className="sm:grid md:grid-cols-[27%_27%_46%] md:grid-rows-3 ring-opacity-5 ring-black ring-1 shadow-lg rounded border border-gray-200">
          <h2 className="col-[1/3] px-24 self-center font-bold">
            {postF.title}
          </h2>
          <p className="col-[1/3] px-24 text-slate-400">
            {postF.seo.description}
          </p>
          <p className="row-start-3 pl-24 self-start text-slate-400">
            {formatDate(postF.publishedAt, "EEEE, LLLL yyyy")}
          </p>
          <Link
            to={`/blog/${postF.slug}`}
            className="col-start-2 row-start-3 justify-self-center font-bold"
          >
            Read More
          </Link>
          <img
            src={postF.cover.url}
            className="col-start-3 row-[1/4] w-11/12 xl:w-auto bg-green-300"
          ></img>
        </div>
      </article>
      <section className="flex flex-wrap container mx-auto xl:px-24 justify-between">
        {allPostcms.map(item => (
          <article
            key={item.id}
            className="max-w-sm overflow-hidden m-4 flex-1 ring-opacity-5 ring-black ring-1 shadow-lg rounded border border-gray-200"
          >
            <img className="w-full h-44" src={item.cover.url} />
            <div className="px-6 py-4">
              <div className="font-medium text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.seo.description}</p>
            </div>
            <div className="px-6 py-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-medium text-gray-700 mr-2">
                {formatDate(item.publishedAt, "EEEE, LLLL yyyy")}
              </span>
              <Link
                to={`/blog/${item.slug}`}
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-full"
              >
                Read More
              </Link>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  )
}

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

export const query = graphql`
  query HomePosts {
    featuredPost: allGraphCmsPost(limit: 1, sort: { publishedAt: ASC }) {
      nodes {
        ...PostInfo
      }
    }
    allGraphCmsPost(skip: 1, limit: 3, sort: { publishedAt: ASC }) {
      nodes {
        ...PostInfo
      }
    }
  }

  fragment PostInfo on GraphCMS_Post {
    id
    title
    slug
    cover {
      url
    }
    seo {
      ... on GraphCMS_Seo {
        title
        description
        image {
          url
        }
      }
    }
    publishedAt
  }
`

export default IndexPage
