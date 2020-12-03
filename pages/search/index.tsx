import React from 'react';
import { connect } from 'react-redux';

const Search: React.FC<{ name: string }> = ({ name }) => {
  return (
    <div>搜索页{name}</div>
  );
};

const mapStateToProps = (state) => ({ name: state.name });

export default connect(mapStateToProps)(Search);
