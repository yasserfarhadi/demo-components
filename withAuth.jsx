import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

// This HOC adds authentication to any component that requires it
function withAuth(WrappedComponent) {
  class WithAuth extends React.Component {
    render() {
      const { isLoggedIn } = this.props;

      // If user is not authenticated, redirect to login page
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      }

      // Otherwise, render the wrapped component
      return <WrappedComponent {...this.props} />;
    }
  }

  const mapStateToProps = (state) => ({
    isLoggedIn: state.auth.isLoggedIn,
  });

  return connect(mapStateToProps)(WithAuth);
}

// A component that requires authentication
class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Welcome to the Dashboard</h1>
        <p>Only logged-in users can see this page.</p>
      </div>
    );
  }
}

// Wrap the Dashboard component with the withAuth HOC
const AuthenticatedDashboard = withAuth(Dashboard);

export default AuthenticatedDashboard;
