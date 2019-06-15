import MyComponent from '../pages/KpopPage'
import { drizzleConnect } from 'drizzle-react'

const mapStateToProps = state => ({
  accounts: state.accounts,
  SimpleStorage: state.contracts.SimpleStorage,
  TutorialToken: state.contracts.TutorialToken,
  drizzleStatus: state.drizzleStatus
});

const KpopContainer = drizzleConnect(
  MyComponent,
  mapStateToProps
);

export default KpopContainer;
