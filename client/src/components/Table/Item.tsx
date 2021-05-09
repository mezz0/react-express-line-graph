import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { filterData } from "../../store/actions/dataActions";

const ContainerTemplate = styled.span`
  width: 50%;
  padding: 5px 10px;
`;

const MetricContainer = styled(ContainerTemplate)`
  width: 50%;
`;

const ValContainer = styled(ContainerTemplate)`
  display: flex;
  justify-content: center;

  span {
    cursor: pointer;
  }
`;

interface WithProps {
  itemData: any;
  filterData: (data: any, filtberBy: string) => any;
  currentData: any;
}
const Item: React.FC<WithProps> = ({ itemData, filterData, currentData }) => {
  return (
    <>
      <MetricContainer>{itemData.name}</MetricContainer>
      <ValContainer>
        <span onClick={() => filterData(currentData, itemData.name)}>
          {itemData.values}
        </span>
      </ValContainer>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    currentData: state.data.currentData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    filterData: (data: any, filterBy: any) =>
      dispatch(filterData(data, filterBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Item);
