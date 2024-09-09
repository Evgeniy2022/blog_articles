import { FC, useState } from "react";
import Markdown from "react-markdown";

import { IArticle } from "../../types";
import styles from "./ArticleWithoutAuth.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteArticle } from "../../api";
import { useNavigate } from "react-router-dom";
import { deleteArticleBySlag } from "../../redux/slices/articlesSlice";
import Like from "../../../public/Vector.png";
import RedLike from "../../../public/redLike.svg";


interface ArticleWithoutAuthProps {
  slug: IArticle;
}

export const ArticleWithoutAuth: FC<ArticleWithoutAuthProps> = ({ slug }) => {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isAuth = useSelector((state: RootState) => state.userSlice.isAuth);
  const [isLike, setIsLike] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  const str = new Date(slug.createdAt);
  const dayOfMonth = str.getDate();
  const monthDate = str.getMonth() + 1;
  const year = str.getFullYear();
  let month: string = "";

  for (let i = 0; i < monthOfYear.length; i++) {
    if (i === monthDate) {
      month = monthOfYear[i - 1];
    }
  }

  async function deleteArticleFunction() {
    const res = await deleteArticle(slug.slug);
    if (res.ok) {
      dispatch(deleteArticleBySlag(slug.slug));
      navigate("/articles");
    }
  }
  async function editMyArticle() {
    navigate(`/edit/${slug.slug}`);
  }

  return (
    <div className={styles.article}>
      <div className={styles.container}>
        <div className={styles.body}>
          <div className={styles.top}>
            <h1 className={styles.title}>{slug.title}</h1>
            <button className={styles.btn} onClick={() => setIsLike(!isLike)}>
              {isLike ? (
                <img src={RedLike} alt="" />
              ) : (
                <img src={Like} alt="" />
              )}
            </button>
            <div className={styles.likes}>
              {isLike ? slug.favoritesCount + 1 : slug.favoritesCount}
            </div>
          </div>

          <div className={styles.tags}>
            {slug.tagList ? (
              slug.tagList.map((tag, index) => {
                return (
                  <div key={index} className={styles.tag}>
                    {tag}
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
          <p className={styles.description}>{slug.description}</p>
        </div>
        <div>
          <div className={styles.card}>
            <div className={styles.user}>
              <p className={styles.name}>{slug?.author?.username}</p>
              <p className={styles.born}>{`${month} ${dayOfMonth}, ${year}`}</p>
            </div>
            <img className={styles.avatar} src={slug?.author?.image} alt="" />
          </div>
          {user.username === slug?.author?.username && isAuth ? (
            <div>
              <button className={styles.delete} onClick={deleteArticleFunction}>
                Delete
              </button>
              <button className={styles.edite} onClick={editMyArticle}>
                Edite
              </button>
            </div>
          ) : null}
        </div>
      </div>
      <Markdown className={styles.markbody}>{slug.body}</Markdown>
    </div>
  );
};
