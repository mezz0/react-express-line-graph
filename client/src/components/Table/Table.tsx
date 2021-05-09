import React from "react";
import styled from "styled-components";
import Item from "./Item";

const Wrapper = styled.div`
  padding: 20px;
`;

const StyledUl = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  border: 1px solid #ebebeb;

  .title {
    text-align: center;
    font-weight: 800;
    text-decoration: underline;
  }

  li {
    display: flex;

    div {
      width: 50%;
      padding: 5px 10px;
    }
  }
`;

const StyledLi = styled.li`
  transition: all 0.2s ease;
  &:hover {
    font-weight: 800;
    background-color: #ebebeb;
  }
`;

interface WithProps {
  data: any;
}
const Table: React.FC<WithProps> = ({ data }) => {
  const dataKeys = Object.keys(data);

  let valued: any[] = [];
  dataKeys.forEach((item) => {
    if (data[item].values && data[item].values.length > 1) {
      valued.push({
        name: item,
        values: data[item].values[data[item].values.length - 1],
      });
    }
  });

  return (
    <Wrapper>
      <StyledUl>
        <li className="title">
          <div>Metric</div>
          <div>Value</div>
        </li>
        {valued.map((data) => (
          <StyledLi key={data.name}>
            <Item itemData={data} />
          </StyledLi>
        ))}
      </StyledUl>
    </Wrapper>
  );
};

export default Table;
