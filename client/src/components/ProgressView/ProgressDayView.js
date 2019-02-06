import React, { useContext, useState } from 'react';
import { Store } from '../../index';
import styled from 'styled-components';
import Button from '../../shared/Button';
import axios from 'axios';
import firebase from 'firebase';

const ProgressDayView = props => {
  const { state, dispatch } = useContext(Store);

  const sortMetrics = metrics => {
    const nM = metrics.map(m => {
      const copy = m;
      copy.date = dateParser(m.date);
      return copy;
    });

    const sortedMetrics = nM
      .sort((a, b) => {
        a = a.date
          .split('/')
          .reverse()
          .join('');
        b = b.date
          .split('/')
          .reverse()
          .join('');
        return a > b ? 1 : a < b ? -1 : 0;
      })
      .reverse();

    return sortedMetrics;
  };

  const dateParser = date => {
    if (date.toString().length === 10) {
      return date;
    }

    date = date.split('T')[0].split('-');

    return date[0] + '/' + date[1] + '/' + date[2];
  };

  const editMetric = metric => {
    dispatch({
      type: 'EDIT_METRIC',
      payload: metric
    });
    dispatch({ type: 'SHOW_METRIC_FORM' });
  };

  const renderDays = () => {
    return (
      <StyledContainer>
        <StyledHeader>
          <h2>Daily Entrys: {state.graphType}</h2>
          <ButtonContainer>
            <Button onClick={() => dispatch({ type: 'SHOW_METRIC_FORM' })}>
              Add Metrics
            </Button>
          </ButtonContainer>
        </StyledHeader>
        {state.metrics &&
          sortMetrics(state.metrics).map((m, i) => {
            if (state.graphType === 'legs') {
              const day = new Date(m.date);
              let progressL = 0.0;
              let isPositiveL = true;
              if (i !== state.metrics.length - 1) {
                const cur = Number(m['leg_left']);
                const prev = Number(
                  sortMetrics(state.metrics)[i + 1]['leg_left']
                );

                const percentage =
                  (Math.abs(cur - prev) / ((cur + prev) / 2)) * 100;

                const rounded = Math.round(100 * percentage) / 100;
                if (cur < prev) {
                  progressL = '-' + rounded.toString();
                  isPositiveL = false;
                } else {
                  progressL = '+' + rounded.toString();
                }
              }

              let progressR = 0.0;
              let isPositiveR = true;
              if (i !== state.metrics.length - 1) {
                const cur = Number(m['leg_right']);
                const prev = Number(
                  sortMetrics(state.metrics)[i + 1]['leg_right']
                );

                const percentage =
                  (Math.abs(cur - prev) / ((cur + prev) / 2)) * 100;

                const rounded = Math.round(100 * percentage) / 100;
                if (cur < prev) {
                  progressR = '-' + rounded.toString();
                  isPositiveR = false;
                } else {
                  progressR = '+' + rounded.toString();
                }
              }

              return (
                <>
                  <DayItem key={i}>
                    <StyledDate>
                      <span>{day.toDateString()} </span>
                      <StyledIcon onClick={() => editMetric(m)}>
                        <i className="fas fa-edit" />
                      </StyledIcon>
                    </StyledDate>
                    <StyledStats isPositive={isPositiveL}>
                      <span>Left {m['leg_left']}in</span>
                      <Percentage>
                        {progressL}%
                        {isPositiveL ? (
                          <i className="fas fa-arrow-up" />
                        ) : (
                          <i className="fas fa-arrow-down" />
                        )}
                      </Percentage>
                    </StyledStats>
                  </DayItem>
                  <DayItem key={i}>
                    <StyledDate>
                      <span>{day.toDateString()} </span>
                      <StyledIcon onClick={() => editMetric(m)}>
                        <i className="fas fa-edit" />
                      </StyledIcon>
                    </StyledDate>
                    <StyledStats isPositive={isPositiveR}>
                      <span>Right {m['leg_right']}in</span>
                      <Percentage>
                        {progressR}%
                        {isPositiveR ? (
                          <i className="fas fa-arrow-up" />
                        ) : (
                          <i className="fas fa-arrow-down" />
                        )}
                      </Percentage>
                    </StyledStats>
                  </DayItem>
                </>
              );
            }

            if (state.graphType === 'arms') {
              const day = new Date(m.date);
              let progressL = 0.0;
              let isPositiveL = true;
              if (i !== state.metrics.length - 1) {
                const cur = Number(m['arm_left']);
                const prev = Number(
                  sortMetrics(state.metrics)[i + 1]['arm_left']
                );

                const percentage =
                  (Math.abs(cur - prev) / ((cur + prev) / 2)) * 100;

                const rounded = Math.round(100 * percentage) / 100;
                if (cur < prev) {
                  progressL = '-' + rounded.toString();
                  isPositiveL = false;
                } else {
                  progressL = '+' + rounded.toString();
                }
              }

              let progressR = 0.0;
              let isPositiveR = true;
              if (i !== state.metrics.length - 1) {
                const cur = Number(m['arm_right']);
                const prev = Number(
                  sortMetrics(state.metrics)[i + 1]['arm_right']
                );

                const percentage =
                  (Math.abs(cur - prev) / ((cur + prev) / 2)) * 100;

                const rounded = Math.round(100 * percentage) / 100;
                if (cur < prev) {
                  progressR = '-' + rounded.toString();
                  isPositiveR = false;
                } else {
                  progressR = '+' + rounded.toString();
                }
              }

              return (
                <>
                  <DayItem key={i}>
                    <StyledDate>
                      <span>{day.toDateString()} </span>
                      <StyledIcon onClick={() => editMetric(m)}>
                        <i className="fas fa-edit" />
                      </StyledIcon>
                    </StyledDate>
                    <StyledStats isPositive={isPositiveL}>
                      <span>Left {m['arm_left']}in</span>
                      <Percentage>
                        {progressL}%
                        {isPositiveL ? (
                          <i className="fas fa-arrow-up" />
                        ) : (
                          <i className="fas fa-arrow-down" />
                        )}
                      </Percentage>
                    </StyledStats>
                  </DayItem>
                  <DayItem key={i}>
                    <StyledDate>
                      <span>{day.toDateString()} </span>
                      <StyledIcon onClick={() => editMetric(m)}>
                        <i className="fas fa-edit" />
                      </StyledIcon>
                    </StyledDate>
                    <StyledStats isPositive={isPositiveR}>
                      <span>Right {m['arm_right']}in</span>
                      <Percentage>
                        {progressR}%
                        {isPositiveR ? (
                          <i className="fas fa-arrow-up" />
                        ) : (
                          <i className="fas fa-arrow-down" />
                        )}
                      </Percentage>
                    </StyledStats>
                  </DayItem>
                </>
              );
            }

            const day = new Date(m.date);
            let progress = 0.0;
            let isPositive = true;
            if (i !== state.metrics.length - 1) {
              const cur = Number(m[state.graphType]);
              console.log('cur: ', cur)
              const prev = Number(
                sortMetrics(state.metrics)[i + 1][state.graphType]
              );
              console.log('prev: ', prev)

              const percentage = !cur && !prev ? 0 : (Math.abs(cur - prev) / ((cur + prev) / 2)) * 100;

              console.log('percentage ', percentage)

              const rounded = Math.round(100 * percentage) / 100;
              if (cur < prev) {
                progress = '-' + rounded.toString();
                isPositive = false;
              } else {
                progress = '+' + rounded.toString();
              }
            }

            return (
              <DayItem key={i}>
                <StyledDate>
                  <span>{day.toDateString()} </span>
                  <StyledIcon onClick={() => editMetric(m)}>
                    <i className="fas fa-edit" />
                  </StyledIcon>
                </StyledDate>
                <StyledStats isPositive={isPositive}>
                  <span>
                    {m[state.graphType]}
                    {state.graphType === 'weight' ? 'lbs' : 'in'}
                  </span>
                  <Percentage>
                    {progress}%
                    {isPositive ? (
                      <i className="fas fa-arrow-up" />
                    ) : (
                      <i className="fas fa-arrow-down" />
                    )}
                  </Percentage>
                </StyledStats>
              </DayItem>
            );
          })}
      </StyledContainer>
    );
  };

  return renderDays();
};

export default ProgressDayView;

const StyledHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    text-transform: capitalize;
  }
`;

const ButtonContainer = styled.div`
  margin: 0;
`;

const Percentage = styled.span``;

const StyledStats = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  font-size: 22px;
  font-weight: 600;
  ${Percentage} {
    width: 150px;
    text-align: right;
    color: ${props =>
      props.isPositive ? props.theme.accent : props.theme.primaryDark};
  }
`;

const StyledDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  font-size: 16px;
  font-weight: 500;
`;

const StyledIcon = styled.span`
  font-size: 18px;
  cursor: pointer;
  color: ${props => (props.delete ? 'red' : 'black')};
`;

const StyledContainer = styled.div`
  width: 100%;
  margin-top: 40px;
`;

const DayItem = styled.div`
  width: 100%;
  height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-top: solid 1px ${props => props.theme.primaryDark};
  padding: 10px;
`;
