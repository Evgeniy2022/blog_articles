import { FC } from "react";

import styles from "./ArticlePsot.module.css";
import { useNavigate } from "react-router-dom";
import { AticleType } from "../../articleType";
import Like from "../../../public/Vector.png";
import RedLike from "../../../public/redLike.svg";
import { deleteSlugArticle, favoriteSlugArticle } from "../../api";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

interface ArticlePsotsProps {
  article: AticleType;
  saveSlugs: string[];
  setSaveSlugs: (arg: string[])=> void;
}



export const ArticlePsot: FC<ArticlePsotsProps> = ({
  article,
  saveSlugs,
  setSaveSlugs,
}) => {
  const articleSlug = useSelector(
    (state: RootState) => state.articleSlice.articles
  ).find((item) => item.slug === article.slug);

  const slug: string = articleSlug?.slug ? articleSlug.slug : "";

  const navigate = useNavigate();
  //   const auth = UseAuth();

  const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const str = new Date(article.createdAt);
  const dayOfMonth = str.getDate();
  const monthDate = str.getMonth() + 1;
  const year = str.getFullYear();
  let month;

  for (let i = 0; i < monthOfYear.length; i++) {
    if (i === monthDate) {
      month = monthOfYear[i - 1];
    }
  }

  async function favoriteWithSlug() {
    if (slug && !saveSlugs.includes(slug)) {
      const res = await favoriteSlugArticle(slug);

      if (res.ok) {
        setSaveSlugs([...saveSlugs, slug]);
        localStorage.setItem("fovoriteSlugs", JSON.stringify(saveSlugs));
      }
    } else {
      const res = await deleteSlugArticle(slug);
      if (res.ok) {
        saveSlugs.splice(
          saveSlugs.findIndex((item) => item === slug),
          1
        );

        setSaveSlugs(saveSlugs);
        localStorage.setItem("fovoriteSlugs", JSON.stringify(saveSlugs));
      }
    }
  }
  console.log(saveSlugs);

  return (
    <div className={styles.article}>
      <div className={styles.body}>
        <div className={styles.top}>
          <h1
            className={styles.title}
            onClick={() => navigate(`/articles/${article.slug}`)}
          >
            {article.title}
          </h1>
          <button className={styles.btn} onClick={favoriteWithSlug}>
            {saveSlugs.includes(article.slug) ? (
              <img src={RedLike} alt="" />
            ) : (
              <img src={Like} alt="" />
            )}
          </button>
          <div className={styles.likes}>
            {saveSlugs.includes(article.slug)
              ? article.favoritesCount + 1
              : article.favoritesCount}
          </div>
        </div>

        <div className={styles.tags}>
          {article.tagList.map((tag, index) => {
            return (
              <div key={index} className={styles.tag}>
                {tag}
              </div>
            );
          })}
        </div>
        <p className={styles.description}>{article.description}</p>
      </div>
      <div className={styles.card}>
        <div className={styles.user}>
          <p className={styles.name}>{article.author.username}</p>
          <p className={styles.born}>{`${month} ${dayOfMonth}, ${year}`} </p>
        </div>
        <img className={styles.avatar} src={article.author.image} alt="" />
      </div>
    </div>
  );
};
