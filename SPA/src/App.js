// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

import { useEffect } from 'react';
import { MsalProvider, useMsal } from '@azure/msal-react';
import { EventType } from '@azure/msal-browser';

// import { Routes, Route } from "react-router-dom";
// import { PageLayout } from './components/PageLayout';
// import { TodoList } from './pages/TodoList';
// import { Home } from './pages/Home';

import { b2cPolicies, protectedResources } from './authConfig';
import { compareIssuingPolicy } from './utils/claimUtils';
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';

const Pages = () => {
  /**
   * useMsal is hook that returns the PublicClientApplication instance,
   * an array of all accounts currently signed in and an inProgress value
   * that tells you what msal is currently doing. For more, visit:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/hooks.md
   */
  const { instance } = useMsal();
  useEffect(() => {
      const callbackId = instance.addEventCallback((event) => {
          if (
              (event.eventType === EventType.LOGIN_SUCCESS || event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS) &&
              event.payload.account
          ) {
              /**
               * For the purpose of setting an active account for UI update, we want to consider only the auth
               * response resulting from SUSI flow. "tfp" claim in the id token tells us the policy (NOTE: legacy
               * policies may use "acr" instead of "tfp"). To learn more about B2C tokens, visit:
               * https://docs.microsoft.com/en-us/azure/active-directory-b2c/tokens-overview
               */
              if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.editProfile)) {
                  // retrieve the account from initial sing-in to the app
                  const originalSignInAccount = instance
                      .getAllAccounts()
                      .find(
                          (account) =>
                              account.idTokenClaims.oid === event.payload.idTokenClaims.oid &&
                              account.idTokenClaims.sub === event.payload.idTokenClaims.sub && 
                              compareIssuingPolicy(account.idTokenClaims, b2cPolicies.names.signUpSignIn)        
                      );

                  let signUpSignInFlowRequest = {
                      authority: b2cPolicies.authorities.signUpSignIn.authority,
                      account: originalSignInAccount,
                  };

                  // silently login again with the signUpSignIn policy
                  instance.ssoSilent(signUpSignInFlowRequest);
              }

              /**
               * Below we are checking if the user is returning from the reset password flow.
               * If so, we will ask the user to reauthenticate with their new password.
               * If you do not want this behavior and prefer your users to stay signed in instead,
               * you can replace the code below with the same pattern used for handling the return from
               * profile edit flow
               */
              if (compareIssuingPolicy(event.payload.idTokenClaims, b2cPolicies.names.forgotPassword)) {
                  let signUpSignInFlowRequest = {
                      authority: b2cPolicies.authorities.signUpSignIn.authority,
                      scopes: [
                          ...protectedResources.apiTodoList.scopes.read,
                          ...protectedResources.apiTodoList.scopes.write,
                      ],
                  };
                  instance.loginRedirect(signUpSignInFlowRequest);
              }
          }

          if (event.eventType === EventType.LOGIN_FAILURE) {
              // Check for forgot password error
              // Learn more about AAD error codes at https://docs.microsoft.com/en-us/azure/active-directory/develop/reference-aadsts-error-codes
              if (event.error && event.error.errorMessage.includes('AADB2C90118')) {
                  const resetPasswordRequest = {
                      authority: b2cPolicies.authorities.forgotPassword.authority,
                      scopes: [],
                  };
                  instance.loginRedirect(resetPasswordRequest);
              }
          }
      });

      return () => {
          if (callbackId) {
              instance.removeEventCallback(callbackId);
          }
      };
      // eslint-disable-next-line
  }, [instance]);

  return (
      // <Routes>
      //     <Route path="/todolist" element={<TodoList />} />
      //     <Route path="/" element={<Home />} />
      // </Routes>

      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
     </ThemeProvider>


    
    // <Routes>
    //   <Route path="/" element={<Home />} />
    // </Routes>
  );
};


// export default function App() {
//   return (
//     <ThemeProvider>
//       <ScrollToTop />
//       <StyledChart />
//       <Router />
//     </ThemeProvider>
//   );
// }

// const App = ({ instance }) => {
//   return (
//       <MsalProvider instance={instance}>
//         <Pages />
//       </MsalProvider>
//   );
// };

const App = ({ instance }) => {
  return (
      <MsalProvider instance={instance}>
              <Pages />
      </MsalProvider>
  );
};


export default App;

{/* <Routes>
<Route path="/todolist" element={<TodoList />} />
<Route path="/" element={<Home />} />
</Routes> */}