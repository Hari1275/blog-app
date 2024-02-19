import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';
import Image from 'next/image';
import urlFor from '../../../../lib/urlFor';
import category from '../../../../schemas/category';
import { PortableText } from '@portabletext/react';
import { RichTextComponents } from '../../../../components/RichTextComponents';
import { Post } from '../../../../typings';
type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;
export async function generateStaticParams() {
  const query = groq`*[_type=='post']
  {

    slug
  }
  
  `;

  const slugs: Post[] = await client.fetch(query);

  const slugRoutes = slugs.map((slug) => slug.slug.current);

  return slugRoutes.map((slug) => ({
    slug, //id : slug pages/slug
  }));
}

async function page({ params: { slug } }: Props) {
  const query = groq`
*[_type=='post' && slug.current==$slug][0] 
{
  ...,
  author->,
  categories[]->,
}`;

  const post = await client.fetch(query, { slug });
  //   console.log(post.categories.map((category: any) => category._id));
  return (
    <article className='px-10 pb-28'>
      <section className='space-y-2 border-[#F7AB0A] text-white'>
        <div className='relative min-h-56 flex  flex-col md:flex-row justify-between'>
          <div className='absolute top-0 w-full h-full opacity-10 blur-sm p-10'>
            <Image
              className='object-cover object-left lg:object-center'
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className='p-5 bg-[#F7AB0A] w-full'>
            <div className='flex flex-col md:flex-row justify-between gap-y-5'>
              <div>
                <h1 className='text-4xl font-extrabold'>{post.title}</h1>

                <p>
                  {new Date(post._createdAt).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>

              <div className='flex items-center space-x-2'>
                <Image
                  className='rounded-full'
                  src={
                    post.author.image
                      ? urlFor(post.author.image).url()
                      : 'https://images.unsplash.com/photo-1673468488507-1c8b71314b75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1035&q=80'
                  }
                  alt={post.author.name}
                  width={40}
                  height={40}
                />

                <div className='w-64'>
                  <h3 className='text-lg font-bold'>{post.author.name}</h3>
                  {/* author */}
                  <div></div>
                </div>
              </div>
            </div>
            {/* description */}
            <div>
              <h2 className='italic pt-10'>{post.description}</h2>

              <div className='flex  items-center justify-end mt-auto space-x-2'>
                {post.categories.map((category: any) => {
                  return (
                    <p
                      key={category._id}
                      className='bg-gray-800 text-white px-3 py-1 rounded-full text-sm font-semibold mt-4'
                    >
                      {category.title}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </section>
      <PortableText value={post.body} components={RichTextComponents} />
    </article>
  );
}

export default page;
