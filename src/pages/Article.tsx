import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IArticle } from "../types";

import { getArticleBySlug } from "../api";
import { ArticleWithoutAuth } from "../components/ArticleWithoutAuth/ArticleWithoutAuth";

export const Article: FC = () => {
  const [slug, setSlug] = useState<IArticle>({});
  const params = useParams();
//   console.log(typeof slug);

  useEffect(() => {
    getArticleBySlug(params.slug).then((data) => setSlug(data.article));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <ArticleWithoutAuth slug={slug} />;
};
