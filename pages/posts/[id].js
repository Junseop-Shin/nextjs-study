import Layout from "../../components/Layout";
// import Button from "../../components/Button";
import CodeBlock from "../../components/CodeBlock";
import Head from "next/head";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Date from "../../components/Date";
import utilStyles from "../../styles/utils.module.css";
import { useRouter } from "next/router";
import { MDXRemote } from "next-mdx-remote";
import dynamic from "next/dynamic";
import { siteTitle } from "../_document";

const Button = dynamic(() =>
  import("../../components/Button", {
    loading: () => <div>loading...</div>,
  })
);

export async function getStaticPaths() {
  const paths = getAllPostIds();
  // const paths = [
  //   {
  //     params: {
  //       id: "ssg-ssr",
  //     },
  //   },
  // ];
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params, preview }) {
  console.log(`>>>>>>>>>>>>${preview}`);
  const postData = await getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

const ErrorComponent = () => {
  const [error, setError] = useState(false);

  if (error) {
    throw new Error("Error occured");
  }
  return (
    <button onClick={setError(true)} className="rounded px-2 bg-green-500">
      Error Fire
    </button>
  );
};

const components = { Button, CodeBlock };

export default function Post({ postData }) {
  const router = useRouter();

  if (router.isFallback == true) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Head>
        <title>{`${postData.title} - ${siteTitle}`}</title>
      </Head>
      <ErrorComponent />
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {postData.contentHtml && (
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        )}
        {postData.mdxSource && (
          <MDXRemote {...postData.mdxSource} components={components} />
        )}
      </article>{" "}
    </>
  );
}
