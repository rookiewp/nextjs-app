import React from 'react';
import { connect } from 'react-redux';
import styles from '../styles/Home.module.css';
import { IState } from '../store/reducer';

const Home: React.FC<Record<string, unknown>> = (props) => {
  console.log(props);
  return (
    <div className={styles.container}>
      hello world
    </div>
  );
};
const mapStateToProps = (state: IState) => ({
  name: state.name,
});

export default connect(mapStateToProps)(Home);
