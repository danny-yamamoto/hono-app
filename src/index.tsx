import { Hono } from 'hono'
import { Page } from './pages/page'
import { Top } from './pages/top'
import { Experience } from './pages/experience'

const app = new Hono()

// Model
export type Post = {
  id: string
  title: string
  body: string
}

const posts: Post[] = [
  { id: '1', title: 'Good Morning', body: 'Let us eat breakfast' },
  { id: '2', title: 'Good Afternoon', body: 'Let us eat Lunch' },
  { id: '3', title: 'Good Evening', body: 'Let us eat Dinner' },
  { id: '4', title: 'Good Night', body: 'Let us drink Beer' },
  { id: '5', title: 'こんにちは', body: '昼からビールを飲みます' },
  { id: '6', title: 'こんばんわ', body: '寝ます' },
]

export type iExperience = {
  id: string;
  company: string;
  position: string;
}

// Logic
const getPosts = () => posts

const getPost = (id: string) => {
  return posts.find((post) => post.id == id)
}

const getExperience = () => {
  const experience: iExperience[] = [
    {
        id: '2022-09',
        company: 'Retail AI X Inc.',
        position: 'Lead Engineer',
    },
    {
        id: '2021-06',
        company: 'Retail AI X Inc.',
        position: 'Software Engineer',
    },
    {
        id: '2020-06',
        company: 'Retail AI Engineering Inc.',
        position: 'Software Engineer',
    }
  ]
  return experience;
}

// Controller
app.get('/', (c) => {
  const posts = getPosts()
  return c.html(<Top posts={posts} />)
})

app.get('/post/:id{[0-9]+}', (c) => {
  const id = c.req.param('id')
  const post = getPost(id)
  if (!post) return c.notFound()
  return c.html(<Page post={post} />)
})

app.get('/experience/', (c) => {
  const experience = getExperience()
  return c.html(<Experience title="Experience" detail={experience}/>)
})

app.fire()
