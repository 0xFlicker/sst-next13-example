import Link from "next/link";
import { Provider as UrqlProvider, createClient } from "urql";
import { useMemo } from "react";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import { useTypedQuery } from "@example-sst-app/graphql/urql";
import Navbar from "../components/Navbar";

const urql = createClient({
  url: process.env.NEXT_PUBLIC_GRAPHQL_URL ?? "/graphql",
});

function Content() {
  const context = useMemo(() => ({ additionalTypenames: ["Article"] }), []);
  const [articles] = useTypedQuery({
    query: {
      articles: {
        id: true,
        url: true,
        title: true,
      },
    },
    context,
  });
  return (
    <div>
      <Navbar />
      {articles.fetching ? (
        <Loading />
      ) : articles.data?.articles && articles.data?.articles.length > 0 ? (
        <ol>
          {articles.data?.articles.map((article) => (
            <li key={article.id}>
              <div>
                <h2>
                  <Link href={`/article/${article.id}`}>{article.title}</Link>
                </h2>
                &nbsp;
                <a target="_blank" href={article.url} rel="noreferrer">
                  ({article.url.replace(/(^\w+:|^)\/\//, "")})
                </a>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <Empty>&#10024; Post the first link &#10024;</Empty>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <UrqlProvider value={urql}>
      <Content />
    </UrqlProvider>
  );
}
