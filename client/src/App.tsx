import React, { useEffect } from "react";
import styled from "styled-components";
import Table from "./components/Table/Table";
import LineGraph from "./components/LineGraph/LineGraph";

import { fetchData } from "./store/actions/dataActions";
import { connect } from "react-redux";

const LoadingScreen = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #00000050;
  color: white;
`;

interface WithProps {
  fetchData: (val: any) => any;
  currentData: any;
  loading: boolean;
  filteredData: any;
}

const App: React.FC<WithProps> = (props) => {
  const { fetchData } = props;
  const { currentData, loading, filteredData } = props;

  useEffect(() => {
    retrieveData();
    // eslint-disable-next-line
  }, []);

  const retrieveData = async () => {
    fetchData("/api/tk1");
  };

  if (loading || currentData.length < 1)
    return (
      <LoadingScreen>
        <div>loading</div>
      </LoadingScreen>
    );

  return (
    <div className="App">
      <Table data={currentData.data.TK1} />
      <LineGraph data={currentData.data.TK1} />
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    loading: state.data.loading,
    currentData: state.data.currentData,
    filteredData: state.data.filteredData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchData: (url: any) => dispatch(fetchData(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
