import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import PreviewSuspense from '../../components/PreviewSuspense';
import { client } from '../../lib/sanity.client';

import BlogList from '../../components/BlogList';
import PreviewBlogList from '../../components/PreviewBlogList';
const query = `
*[_type=='post']
{
  ...,
  author->,
   categories[]->,
} | order(_createdAt desc)`;

export const revalidate = 30;

async function HomePage() {
  if (previewData()) {
    return (
      <PreviewSuspense
        fallback={
          <div role='status'>
            <p className='text-center text-lg animate-plus text-[#F7AB0A]'>
              Loading preview data...
            </p>
          </div>
        }
      >
        <PreviewBlogList query={query} />
      </PreviewSuspense>
    );
  }

  const posts = await client.fetch(query);

  return <BlogList posts={posts} />;
}

export default HomePage;
