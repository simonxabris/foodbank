/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { withAuthenticator } from "@aws-amplify/ui-react";

import { Block } from "../src/components";
import styles from "../styles/new-recipe.module.css";

function newRecipe() {
  return (
    <>
      <Block>
        <h1>Add a new recipe</h1>
        <form className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.textInput}
              type="text"
              name="name"
              id="name"
            />
          </div>
          <p className={styles.ingredientsText}>Ingredients</p>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
              flex-direction: column;
              align-items: center;
              gap: 20px;
            `}
          >
            <div
              css={css`
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                gap: 20px;
              `}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Name:
                </label>
                <input
                  className={styles.textInput}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Amount:
                </label>
                <input
                  className={styles.textInput}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="name">
                  Unit type:
                </label>
                <input
                  className={styles.textInput}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div
                css={css`
                  margin-top: 23px;
                `}
              >
                <img src="/delete.svg" alt="Delete row of ingredients" />
              </div>
            </div>
            <div className={styles.add}>
              <img className={styles.addSvg} src="/add.svg" alt="Add icon" />
            </div>
          </div>
        </form>
      </Block>
    </>
  );
}

export default withAuthenticator(newRecipe);
