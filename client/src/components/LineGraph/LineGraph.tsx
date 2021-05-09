import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { connect } from "react-redux";

const Wrapper = styled.div`
  width: calc(100vw - 40px);
  height: 600px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledToolTip = styled.div`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 0 10px 10px;
  box-shadow: 0px 3px 6px #00000029;

  p {
    color: #000000;
    width: 100%;
    text-align: center;
    font-weight: 300;

    &:nth-child(2) {
      color: teal;
      font-weight: 600;
    }
  }
`;

interface WithProps {
  data: any;
  filteredBy: any;
}
const LineGraph: React.FC<WithProps> = ({ data, filteredBy }) => {
  let allTimeDate: any = [];
  Object.keys(data).map(
    (key: any, index) =>
      data[key].times &&
      data[key].values[data[key].values.length - 1] !== 0 &&
      typeof data[key].values[data[key].values.length - 1] !== "string" &&
      allTimeDate.push({
        name: key,
        value: data[key].values[data[key].values.length - 1],
      })
  );

  let selected: any = [];
  if (data[filteredBy] !== undefined) {
    data[filteredBy].times.map((time: any, index: number) => {
      if (time !== 0) {
        selected.push({
          name: time,
          value: data[filteredBy].values[index],
        });
      }
    });
  }

  return (
    <Wrapper>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={800}
          height={500}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="5 10" />
          <XAxis
            dataKey="name"
            angle={-90}
            interval={0}
            height={200}
            tick={{ fontSize: "10px", dy: 100, dx: -5 }}
          />
          <YAxis dataKey="value" />
          <Tooltip
            payload={[{ name: "name", value: "value" }]}
            content={(value) => {
              return (
                // @ts-ignore
                value.payload[0] ? (
                  <StyledToolTip>
                    <p>
                      {
                        // @ts-ignore
                        value.payload[0].payload.name
                      }
                    </p>
                    <p>
                      {
                        // @ts-ignore
                        value.payload[0].payload.value
                      }
                    </p>
                  </StyledToolTip>
                ) : (
                  ""
                )
              );
            }}
          />
          <Legend />
          {!filteredBy && (
            <Line
              data={allTimeDate}
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          )}
          {filteredBy && (
            <Line
              data={selected}
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              activeDot={{ r: 8 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </Wrapper>
  );
};

const mapStateToProps = (state: any) => {
  return {
    filteredBy: state.data.filterBy,
  };
};

export default connect(mapStateToProps)(LineGraph);
