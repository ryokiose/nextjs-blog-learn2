import Layout from "src/components/layout";
import { getAllPostIds, getPostData, PostData } from "@/src/lib/posts";
import Head from "next/head";
import Date from "src/components/date";
import utilStyles from "../../styles/utils.module.css";
import { Params, PostProps } from "@/src/types/src/posts/[id]";

const Post = ({ postData }: PostProps) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingx1}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <br />
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export default Post;