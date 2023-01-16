import { useTypedQuery } from "@example-sst-app/graphql/urql";
import { Provider as UrqlProvider, createClient } from "urql";
import Empty from "../../components/Empty";
import Navbar from "../../components/Navbar";
import Loading from "../../components/Loading";
import { useRouter } from "next/router";

const urql = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/graphql",
});

function Content() {
  let {
    query: { id = "" },
  } = useRouter();
  id = Array.isArray(id) ? id[0] : id;

  const [article] = useTypedQuery({
    query: {
      article: [
        { articleID: id },
        {
          id: true,
          url: true,
          title: true,
        },
      ],
    },
  });

  return (
    <div>
      <Navbar />
      {article.fetching ? (
        <Loading />
      ) : article.data?.article ? (
        <div>
          <h1>{article.data.article.title}</h1>
          <p>
            <a target="_blank" href={article.data.article.url} rel="noreferrer">
              {article.data.article.url}
            </a>
          </p>
        </div>
      ) : (
        <Empty>Not Found</Empty>
      )}
    </div>
  );
}

export default function Article() {
  return (
    <UrqlProvider value={urql}>
      <Content />
    </UrqlProvider>
  );
}
