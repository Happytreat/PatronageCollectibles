import MyComponent from '../pages/Kitty'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => ({
  accounts: state.accounts,
  SimpleStorage: state.contracts.SimpleStorage,
  TutorialToken: state.contracts.TutorialToken,
  drizzleStatus: state.drizzleStatus
});

const KittyContainer = drizzleConnect(
  MyComponent,
  mapStateToProps
);

export default KittyContainer;
