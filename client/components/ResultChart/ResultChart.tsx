import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheck, FiX } from 'react-icons/fi';
import formatDate from '../../utils/formatDate';
import { ResultChartWrapper, Plots } from './ResultChart.styles';

interface Props {
  result: ResultResource;
}

const ResultChart: React.FC<Props> = ({ result }) => {
  const totalCorrect = result.items.filter((r) => r.correct).length;
  const total = result.items.length;

  return (
    <ResultChartWrapper>
      <h4 className="large border-b-s">
        {formatDate(result.updatedAt)} -{' '}
        <span className="bold">
          {totalCorrect} / {total}
        </span>{' '}
        correct
      </h4>
      {!result.finished ? (
        <p>
          This game is still in progress,{' '}
          <Link to={`/play/${result._id}`}>resume game</Link>
        </p>
      ) : (
        <ul>
          {result.items.map(({ item, correct, attempts }) => (
            <li key={item._id}>
              <p>{item.tran}</p>
              <Plots correct={correct}>
                {[...Array(attempts)].map((_, index) => (
                  /* eslint-disable-next-line */
                  <li key={index}>
                    {index === attempts - 1 && correct ? <FiCheck /> : <FiX />}
                  </li>
                ))}
              </Plots>
            </li>
          ))}
        </ul>
      )}
    </ResultChartWrapper>
  );
};

export default ResultChart;
