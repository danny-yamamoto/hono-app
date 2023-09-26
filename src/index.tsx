import { Hono } from 'hono'
import { Page } from './pages/page'
import { Top } from './pages/top'
import { Experience } from './pages/experience'
import { Articles } from './pages/articles'
//import { serveStatic } from 'hono/cloudflare-workers'

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

export type iArticles = {
  title: string;
  url: string;
  id: string;
};

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

const getArticles = async (count: number): Promise<iArticles[]> => {
  const response = await fetch(`https://qiita.com/api/v2/users/daisuke-yamamoto/items?page=1&per_page=${count}`);
  const qiitaItems: any[] = await response.json();
  const articles: iArticles[] = qiitaItems.map(item => ({
    title: item.title,
    url: item.url,
    id: item.id,
  }));
  return articles;
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

app.get('/articles/', async (c) => {
  const articles = await getArticles(20)
  return c.html(<Articles title='Top 20 Articles' detail={articles} />)
})

app.fire()
