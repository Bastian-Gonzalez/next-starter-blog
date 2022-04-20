import Searchbar from '@/components/mollecules/Searchbar'
import BlogList from '@/components/organism/BlogList'
import Hero from '@/components/template/Hero'
import Layout from '@/components/template/Layout'

import { BlogProps } from '@/data/blog/blog.type'
import getBlog from '@/helpers/getBlog'
import useSearchBlogQuery from '@/hooks/useSearchBlogQuery'

import type { GetStaticProps, NextPage } from 'next'

const meta = {
  title: 'Blog',
  description: `I've been writing online since 2020, mostly about data science, machine learning and tech careers. On purpose for documentation while able to share my knowledge. Use the search below to filter by title.`
}

interface BlogPageProps {
  latestPost: Array<BlogProps & { slug: string }>
  allPost: Array<BlogProps & { slug: string }>
}

const BlogPage: NextPage<BlogPageProps> = ({ latestPost = [], allPost = [] }) => {
  const { query, handleChange, filteredBlog } = useSearchBlogQuery(latestPost)

  return (
    <Layout as='main' {...meta}>
      <Hero {...meta} />

      <Searchbar onChange={handleChange} value={query} placeholder='Search Posts..' />

      {query.length === 0 && <BlogList blogs={latestPost} title='Latest Post' className='mb-20' />}
      {query.length === 0 && <BlogList blogs={allPost} title='All Post' layout='column' />}

      {query.length > 0 && filteredBlog.length > 0 ? (
        <BlogList blogs={filteredBlog} title='Search Result' layout='column' />
      ) : null}

      {query.length > 0 && filteredBlog.length === 0 ? <p>No result found</p> : null}
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = () => {
  const blogs = getBlog()

  return {
    props: {
      latestPost: blogs
        // map the blogs and add slug property,
        .map((b) => ({ ...b.data, slug: b.slug }))
        // sort descending by date
        .sort((a, b) =>
          new Date(a.published) > new Date(a.published) ? 1 : new Date(a.published) < new Date(b.published) ? -1 : 0
        )
        // cut the first 3 and so on, leave only 2 latest post
        .slice(0, 2),
      allPost: blogs.map((b) => ({ ...b.data, slug: b.slug }))
    }
  }
}

export default BlogPage
