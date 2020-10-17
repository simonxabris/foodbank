import { withAuthenticator } from "@aws-amplify/ui-react";

import { Block } from "../src/components";

function newRecipe() {
  return (
    <>
      <Block>
        <h1>Add a new recipe</h1>
      </Block>
    </>
  )
}

export default withAuthenticator(newRecipe);