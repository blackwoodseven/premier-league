import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { AuthProvider } from './auth-context';
const queryClient = new QueryClient();

function AppProviders({ children }) {
   return (
      <QueryClientProvider client={queryClient}>
         <Router>
            <AuthProvider>{children}</AuthProvider>
         </Router>
      </QueryClientProvider>
   )
}

export default AppProviders