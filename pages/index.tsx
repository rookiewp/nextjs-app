import React from 'react';
import { connect } from 'react-redux';
import { IState } from '../store/reducer';

const Home: React.FC<Record<string, unknown>> = (props) => {
  return (
    <div className="wp">home</div>
  );
};
const mapStateToProps = (state: IState) => ({
  name: state.name,
});

export default connect(mapStateToProps)(Home);
