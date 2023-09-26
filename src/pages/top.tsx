import { Layout } from '../components/Layout'
import type { Post } from '../index'
import { Footer } from './footer'

const List = (props: { post: Post }) => (
  <li>
    <a href={`/post/${props.post.id}`}>{props.post.title}</a>
  </li>
)
const Experience = () => (
  <h2><a style="color: #fff;" href={`/experience/`}>Experience</a></h2>
)

const Articles = () => (
  <h2><a style="color: #fff;" href={`/articles/`}>Top 20 Articles</a></h2>
)

export const Top = (props: { posts: Post[] }) => {
  return (
    <Layout title={'Top'}>
      <main>
        <h2>Posts</h2>
        <ul>
          {props.posts.map((post) => (
            <List post={post} />
          ))}
        </ul>
        <Experience />
        <Articles />
        <Footer title='Daisuke Yamamoto' />
      </main>
    </Layout>
  )
}
