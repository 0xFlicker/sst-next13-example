import { useTypedMutation } from "@example-sst-app/graphql/urql";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "./Button";

interface ArticleForm {
  url: string;
  title: string;
}

export default function Navbar() {
  const navigate = useRouter();
  const [result, createArticle] = useTypedMutation((opts: ArticleForm) => ({
    createArticle: [
      opts,
      {
        id: true,
      },
    ],
  }));

  return (
    <div>
      <div>
        <Link href="/">
          <span>&#128279;</span> Links
        </Link>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          const fd = new FormData(e.currentTarget);
          const url = fd.get("url")!.toString();
          const title = fd.get("title")!.toString();

          if (url.length > 0 && title.length > 0) {
            e.currentTarget.reset();
            const result = await createArticle({
              url,
              title,
            });
            navigate.push(`/article/${result.data?.createArticle.id}`);
          }
        }}
      >
        <input type="text" name="title" placeholder="Title" />
        <input name="url" type="text" placeholder="URL" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
