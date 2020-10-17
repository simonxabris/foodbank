/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import * as React from "react";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { animated, useTransition } from "react-spring";
import uid from "uid";
import { API } from "aws-amplify";

import { Block } from "../src/components";
import styles from "../styles/new-recipe.module.css";
import { createRecipe } from "../src/graphql/mutations";

interface NewRecipeState {
  name: string;
  ingredients: {
    id: string;
    name: string;
    amount: number;
    unitType: string;
  }[];
}

type Action =
  | { type: "add" }
  | { type: "delete"; payload: { id: string } }
  | { type: "set"; payload: { field: "name"; value: string } }
  | {
      type: "set_ingredient";
      payload: {
        id: string;
        field: "name" | "amount" | "unitType";
        value: string | number;
      };
    };

const initialState: NewRecipeState = {
  name: "",
  ingredients: [
    {
      id: uid(),
      name: "",
      amount: 0,
      unitType: "",
    },
  ],
};

function reducer(state: NewRecipeState, action: Action): NewRecipeState {
  switch (action.type) {
    case "set":
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case "set_ingredient":
      const ingredientToUpdate = state.ingredients.find(
        (ingredient) => ingredient.id === action.payload.id
      );
      const ingredientToUpdateIndex = state.ingredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      const newIngredient = {
        ...ingredientToUpdate,
        [action.payload.field]: action.payload.value,
      };

      const ingredients = [...state.ingredients];

      ingredients.splice(ingredientToUpdateIndex, 1, newIngredient);

      const newState = {
        ...state,
        ingredients,
      };
      return newState;
    case "add":
      return {
        ...state,
        ingredients: [
          ...state.ingredients,
          { name: "", amount: 0, unitType: "", id: uid() },
        ],
      };
    case "delete":
      const newIngredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
      return {
        ...state,
        ingredients: newIngredients,
      };
    default:
      return initialState;
  }
}

function newRecipe() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const listTransitions = useTransition(
    state.ingredients,
    state.ingredients.map((ingredient) => ingredient.id),
    {
      from: { opacity: 0, transform: "translateX(-20px)" },
      enter: { opacity: 1, transform: "translateX(0px)" },
      leave: { opacity: 0, transform: "translateX(20px)" },
    }
  );

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();

    await API.graphql({
      query: createRecipe,
      variables: {
        input: state,
      },
    });
  }

  return (
    <>
      <Block>
        <h1>Add a new recipe</h1>
        <form className={styles.form} onSubmit={onSubmit}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.textInput}
              value={state.name}
              onChange={(event) =>
                dispatch({
                  type: "set",
                  payload: { field: "name", value: event.target.value },
                })
              }
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
            {listTransitions.map(({ item, props }) => (
              <animated.div
                style={props}
                key={item.id}
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
                    value={item.name}
                    onChange={(event) =>
                      dispatch({
                        type: "set_ingredient",
                        payload: {
                          id: item.id,
                          value: event.target.value,
                          field: "name",
                        },
                      })
                    }
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
                    value={item.amount}
                    onChange={(event) =>
                      dispatch({
                        type: "set_ingredient",
                        payload: {
                          id: item.id,
                          value: event.target.value,
                          field: "amount",
                        },
                      })
                    }
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
                    value={item.unitType}
                    onChange={(event) =>
                      dispatch({
                        type: "set_ingredient",
                        payload: {
                          id: item.id,
                          value: event.target.value,
                          field: "unitType",
                        },
                      })
                    }
                    type="text"
                    name="name"
                    id="name"
                  />
                </div>
                <div
                  css={css`
                    margin-top: 23px;
                  `}
                  onClick={() =>
                    dispatch({
                      type: "delete",
                      payload: { id: item.id },
                    })
                  }
                >
                  <img src="/delete.svg" alt="Delete row of ingredients" />
                </div>
              </animated.div>
            ))}
            <div
              onClick={() => dispatch({ type: "add" })}
              className={styles.add}
            >
              <img className={styles.addSvg} src="/add.svg" alt="Add icon" />
            </div>
          </div>
          <button>Create Recipe</button>
        </form>
      </Block>
    </>
  );
}

export default withAuthenticator(newRecipe);
